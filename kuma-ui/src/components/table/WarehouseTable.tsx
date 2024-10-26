// import { useEffect, useState } from "react";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import { WarehouseForm } from "../form/WarehouseForm";
// import { DeleteAlert } from "../modal/DeleteAlert";
// import { API_URL } from "@/config";
// import { Input } from "../ui/input";
// import { SortingState } from "@tanstack/react-table";

// // Define the Warehouse type
// export type Warehouse = {
// 	id: number;
// 	name: string;
// 	city: string;
// 	state: string;
// 	currentCapacity: number;
// 	maxCapacity: number;
// };

// export function WarehouseTable() {
// 	// Initialize state for warehouses as an array
// 	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
// 	const [isCreate, setIsCreate] = useState(false);
// 	const [isEdit, setIsEdit] = useState(false);
// 	const [editWarehouse, setEditWarehouse] = useState<Warehouse>();
// 	const [showAlert, setShowAlert] = useState(false);
// 	const [warehouseId, setWarehouseId] = useState<number | null>(null);
// 	const [sorting, setSorting] = useState<SortingState>([]);

// 	const url = `${API_URL}/warehouses`;

// 	const closeForm = () => {
// 		setIsCreate(false);
// 		setIsEdit(false);
// 		setEditWarehouse(undefined);
// 	};

// 	useEffect(() => {
// 		const fetchWarehouses = async () => {
// 			try {
// 				const response = await fetch(url);
// 				if (!response.ok) {
// 					throw new Error(`Error Status: ${response.status}`);
// 				}
// 				// Expecting an array of Warehouse objects
// 				const data: Warehouse[] = await response.json();
// 				setWarehouses(data); // Update the state with the fetched data
// 			} catch (err) {
// 				console.error(
// 					err instanceof Error ? err.message : "Unknown error occurred"
// 				);
// 			}
// 		};
// 		fetchWarehouses();
// 	}, []);

// 	const handleCreate = () => {
// 		setIsCreate(!isCreate);
// 	};

// 	const handleEditWarehouse = async (id: number) => {
// 		try {
// 			let url = `${API_URL}/warehouses/${id}`;
// 			const response = await fetch(url);
// 			if (!response.ok) {
// 				throw new Error(`Error Status: ${response.status}`);
// 			}
// 			const data: Warehouse = await response.json();
// 			setEditWarehouse(data); 
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 		setIsEdit(!isEdit);
// 	};

// 	const handleDeleteWarehouse = async (id: number) => {
// 		setWarehouseId(id);
// 		setShowAlert(true);
// 	}

// 	const confirmDelete = async () => {
// 		if(warehouseId === null) return;
// 		try {
// 			let url = `${API_URL}/warehouses/${warehouseId}`;
// 			const response = await fetch(url, {
// 				method: "DELETE",
// 			});
// 			if (!response.ok) {
// 				throw new Error(`Error Status: ${response.status}`);
// 			}
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 		setShowAlert(false);
// 		setWarehouseId(null);
// 	};

// 	const description = "Deleting this will remove any inventories associated with this warehouse and cannot be undone."

// 	return (
// 		<div className="w-full pr-12">
// 			<Button onClick={handleCreate}>Add Warehouse</Button>
// 			{(isCreate || isEdit) ? (
// 				<WarehouseForm 
// 					data={editWarehouse}
// 					onClose={closeForm}
// 				/>
// 			) : (
// 				<div>
// 				<Input
// 				/>
// 				<Table>
// 					<TableHeader>
// 						<TableRow className="">
// 							<TableHead>Name</TableHead>
// 							<TableHead>City</TableHead>
// 							<TableHead>State</TableHead>
// 							<TableHead>Current Capacity</TableHead>
// 							<TableHead>Max Capacity</TableHead>
// 							<TableHead className="text-right">Actions</TableHead>
// 						</TableRow>
// 					</TableHeader>
// 					<TableBody>
// 						{warehouses.map((warehouse, index) => (
// 							<TableRow key={index}>
// 								<TableCell>{warehouse.name}</TableCell>
// 								<TableCell>{warehouse.city}</TableCell>
// 								<TableCell>{warehouse.state}</TableCell>
// 								<TableCell>{warehouse.currentCapacity}</TableCell>
// 								<TableCell>{warehouse.maxCapacity}</TableCell>
// 								<TableCell className="flex flex-row justify-end gap-4">
// 									<Button size="sm" onClick={() => handleEditWarehouse(warehouse.id)}>Edit</Button>
// 									<Button size="sm" onClick={() => handleDeleteWarehouse(warehouse.id)}>
// 										Delete
// 									</Button>
// 								</TableCell>
// 							</TableRow>
// 						))}
// 					</TableBody>
// 				</Table>

// 				</div>
// 			)}
// 			<DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete} description={description}/>
// 		</div>
// 	);
// }

import { DefaultTable } from "./DefaultTable";
import { Warehouse, columns } from "../data/WarehouseData";
import { WarehouseForm } from "../form/WarehouseForm";

export default function WarehouseTable() {
	const endpoint = "warehouses"
	const description = "Deleting this will remove any inventories associated with this warehouse and cannot be undone."
	return (
		<DefaultTable<Warehouse> columns={columns} endpoint={endpoint} FormComponent={WarehouseForm} description={description}/>
	);
}
