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
import { API_URL } from "@/config";

export function InventoryTable() {
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editInventory, setEditInventory] = useState<Inventory>();
	const [showAlert, setShowAlert] = useState(false);
	const [inventoryId, setInventoryId] = useState<number | null>(null);

	const url = `${API_URL}/inventories`;

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
			let url = `${API_URL}/inventories/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Inventory = await response.json();
			setEditInventory(data); 
			console.log(data)
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
			let url = `${API_URL}/inventories/${inventoryId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			setInventories(inventories.filter(i => i.id !== inventoryId))
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setInventoryId(null);
	};

	const description = "Deleting this will remove it permnanently and cannot be undone."
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
							<TableHead>Inventory Id</TableHead>
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
								<TableCell>{inventory.id}</TableCell>
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
			<DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete} description={description}/>
		</div>
	);
}
