
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// Define the Warehouse type
export type Product = {
    name: string,
    description: string,
    price: number,
    category: {
        name: string
    },
    sku: string
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<Warehouse>[] = [];

export function ProductTable() {
    // Initialize state for warehouses as an array
    const [products, setProducts] = useState<Product[]>([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            const url = "http://localhost:8080/products"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of Warehouse objects
                const data: Product[] = await response.json(); 
                setProducts(data); // Update the state with the fetched data
                console.log(data)
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchProducts(); // Call the fetch function
    }, []); // Run only on component mount

    return (
        <div>
        <Table className="border-full">
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((warehouse, index) => (
                    <TableRow key={index}>
                        <TableCell>{warehouse.name}</TableCell>
                        <TableCell>{warehouse.description}</TableCell>
                        <TableCell>{warehouse.price}</TableCell>
                        <TableCell>{warehouse.category.name}</TableCell>
                        <TableCell>{warehouse.sku}</TableCell>
                        <TableCell>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}