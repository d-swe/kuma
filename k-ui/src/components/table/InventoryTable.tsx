import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
// import { InventoryForm } from "../form/InventoryForm";
import { DeleteAlert } from "../modal/DeleteAlert";
import { Inventory } from "../data/items";
import { InventoryForm } from "../form/InventoryForm";

export function InventoryTable() {
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editInventory, setEditInventory] = useState<Inventory>();
	const [showAlert, setShowAlert] = useState(false);
	const [inventoryId, setInventoryId] = useState<number | null>(null);

	const url = "http://localhost:8080/inventories";

	const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditInventory(undefined);
	};

	useEffect(() => {
		const fetchInventories = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				// Expecting an array of Inventory objects
				const data: Inventory[] = await response.json();
				setInventories(data); // Update the state with the fetched data
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};

		fetchInventories(); // Call the fetch function
	}, []); // Run only on component mount

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

	const handleEditInventory = async (id: number) => {
		try {
			let url = `http://localhost:8080/inventories/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Inventory = await response.json();
			setEditInventory(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(!isEdit);
	};

	const handleDeleteInventory = async (id: number) => {
		setInventoryId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
		if(inventoryId === null) return;
		try {
			let url = `http://localhost:8080/inventories/${inventoryId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setInventoryId(null);
		window.location.reload();
	};

	return (
		<div className="w-full pr-12">
			<Button onClick={handleCreate}>Add Inventory</Button>
			{(isCreate || isEdit) ? (
				<InventoryForm 
					data={editInventory}
					onClose={closeForm}
				/>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="">
							<TableHead>Product</TableHead>
							<TableHead>Warehouse</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Last Update</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{inventories.map((inventory, index) => (
							<TableRow key={index}>
								<TableCell>{inventory.product.name}</TableCell>
								<TableCell>{inventory.warehouse.name}</TableCell>
								<TableCell>{inventory.stock}</TableCell>
								<TableCell>{inventory.lastUpdate}</TableCell>
								<TableCell className="flex flex-row justify-end gap-4">
									<Button size="sm" onClick={() => handleEditInventory(inventory.id)}>Edit</Button>
									<Button size="sm" onClick={() => handleDeleteInventory(inventory.id)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			<DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete}/>
		</div>
	);
}
