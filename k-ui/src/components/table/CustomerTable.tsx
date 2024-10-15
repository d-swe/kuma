
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// Define the customer type
export type Customer = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<customer>[] = [];

export function CustomerTable() {
    // Initialize state for customers as an array
    const [customers, setCustomers] = useState<Customer[]>([]); 

    useEffect(() => {
        const fetchCustomers = async () => {
            const url = "http://localhost:8080/customers"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of customer objects
                const data: Customer[] = await response.json(); 
                setCustomers(data); // Update the state with the fetched data
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchCustomers(); // Call the fetch function
    }, []); // Run only on component mount

    return (
        <div>
        <Table className="border-full">
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer, index) => (
                    <TableRow key={index}>
                        <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell><Button>Edit</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}