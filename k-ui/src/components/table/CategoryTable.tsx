import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// Define the category type
export type Category = {
    name: string,
    description: string
};

// Define the columns for your table if needed (this is just an example)
// export const columns: ColumnDef<category>[] = [];

export function CategoryTable() {
    // Initialize state for categorys as an array
    const [categories, setCategories] = useState<Category[]>([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            const url = "http://localhost:8080/categories"; // Replace with your actual API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                // Expecting an array of category objects
                const data: Category[] = await response.json(); 
                setCategories(data); // Update the state with the fetched data
            } catch (err) {
                console.error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        };

        fetchCategories(); // Call the fetch function
    }, []); // Run only on component mount

    return (
        <div>
        <Table className="border-full">
            <TableHeader>
                <TableRow className="w-[200px]">
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category, index) => (
                    <TableRow key={index}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
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