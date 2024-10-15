
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// Define the inventory type
export type Inventory = {
    product: {
        name: string
    },
    warehouse: {
        name: string
    },
    stock: number,
    lastUpdate: string
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<inventory>[] = [];

export function InventoryTable() {
    // Initialize state for inventorys as an array
    const [inventories, setInventories] = useState<Inventory[]>([]); 

    useEffect(() => {
        const fetchInventories = async () => {
            const url = "http://localhost:8080/inventories"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of inventory objects
                const data: Inventory[] = await response.json(); 
                setInventories(data); // Update the state with the fetched data
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchInventories(); // Call the fetch function
    }, []); // Run only on component mount

    return (
        <div>
        <Table className="border-full">
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Product</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventories.map((inventory, index) => (
                    <TableRow key={index}>
                        <TableCell>{inventory.product.name}</TableCell>
                        <TableCell>{inventory.warehouse.name}</TableCell>
                        <TableCell>{inventory.stock}</TableCell>
                        <TableCell>{inventory.lastUpdate}</TableCell>
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