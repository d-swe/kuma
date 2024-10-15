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
import { WarehouseForm } from "../form/WarehouseForm";

// Define the Warehouse type
export type Warehouse = {
	id: number;
	name: string;
	city: string;
	state: string;
	currentCapacity: number;
	maxCapacity: number;
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<Warehouse>[] = [];

export function WarehouseTable() {
	// Initialize state for warehouses as an array
	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const url = "http://localhost:8080/warehouses";

	useEffect(() => {
		const fetchWarehouses = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				// Expecting an array of Warehouse objects
				const data: Warehouse[] = await response.json();
				setWarehouses(data); // Update the state with the fetched data
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};

		fetchWarehouses(); // Call the fetch function
	}, []); // Run only on component mount

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

	const handleDeleteWarehouse = async (id: number) => {
		try {
			let url = `http://localhost:8080/warehouses/${id}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			console.log(response);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<Button onClick={handleCreate}>Add Warehouse</Button>
			{isCreate ? (
				<WarehouseForm />
			) : (
				<Table className="border-full">
					<TableHeader>
						<TableRow className="w-[200px]">
							<TableHead>Name</TableHead>
							<TableHead>City</TableHead>
							<TableHead>State</TableHead>
							<TableHead>Current Capacity</TableHead>
							<TableHead>Max Capacity</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{warehouses.map((warehouse, index) => (
							<TableRow key={index}>
								<TableCell>{warehouse.name}</TableCell>
								<TableCell>{warehouse.city}</TableCell>
								<TableCell>{warehouse.state}</TableCell>
								<TableCell>{warehouse.currentCapacity}</TableCell>
								<TableCell>{warehouse.maxCapacity}</TableCell>
								<TableCell>
									<Button>Edit</Button>
									<Button onClick={() => handleDeleteWarehouse(warehouse.id)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
