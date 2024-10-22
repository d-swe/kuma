import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Product } from "../data/items";
import { ProductForm } from "../form/ProductForm";
import { DeleteAlert } from "../modal/DeleteAlert";

export function ProductTable() {
    // Initialize state for products as an array
    const [products, setProducts] = useState<Product[]>([]); 
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
    const [editProduct, setEditProduct] = useState<Product>();
	const [showAlert, setShowAlert] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);

	const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditProduct(undefined);
	};
    useEffect(() => {
        const fetchProducts = async () => {
            const url = "http://localhost:8080/products"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of product objects
                const data: Product[] = await response.json(); 
                setProducts(data); // Update the state with the fetched data
                console.log(data)
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchProducts(); // Call the fetch function
    }, []); // Run only on component mount

    const handleCreate = () => {
		setIsCreate(true);
        setIsEdit(false);
	};

    const handleEditProduct = async (id: number) => {
        setIsCreate(false);
		try {
			let url = `http://localhost:8080/products/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Product = await response.json();
			setEditProduct(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(true);
	};
    
	const handleDeleteProduct = async (id: number) => {
		setProductId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
        if(productId === null) return;
		try {
			let url = `http://localhost:8080/products/${productId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
        setShowAlert(false);
        setProductId(null);
	};

	const description = "Deleting this will remove any inventories associated with this product permanently and cannot be undone."

    return (
        <div className="w-full pr-12">
        <Button onClick={handleCreate}>Add Product</Button>
			{(isCreate || isEdit) ? (
				<ProductForm 
					data={editProduct}
                    onClose={closeForm}
				/>
			) : (
        <Table>
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell className="flex flex-row justify-end gap-4">
                            <Button size="sm" onClick={() => handleEditProduct(product.id)}>Edit</Button>
                            <Button size="sm" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            )}
			<DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete} description={description}/>
        </div>
    );
}