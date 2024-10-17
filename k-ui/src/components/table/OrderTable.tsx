
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// Define the order type
export type Order = {
    customer: {
        firstName: string,
        lastName: string
    },
    orderDate: number,
    totalCost: number
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<order>[] = [];

export function OrderTable() {
    // Initialize state for orders as an array
    const [orders, setOrders] = useState<Order[]>([]); 

    useEffect(() => {
        const fetchOrders = async () => {
            const url = "http://localhost:8080/orders"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of order objects
                const data: Order[] = await response.json(); 
                setOrders(data); // Update the state with the fetched data
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchOrders(); // Call the fetch function
    }, []); // Run only on component mount

    return (
        <div className="w-full">
        <Table>
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Name</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, index) => (
                    <TableRow key={index}>
                        <TableCell>{order.customer.firstName} {order.customer.lastName}</TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>{order.totalCost}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button size="sm">Edit</Button>
                            <Button size="sm">Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}