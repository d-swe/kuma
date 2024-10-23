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
import { DeleteAlert } from "../modal/DeleteAlert";
import { Category } from "../data/items";
import { CategoryForm } from "../form/CategoryForm";
import { API_URL } from "@/config";

export function CategoryTable() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editCategory, setEditCategory] = useState<Category>();
	const [showAlert, setShowAlert] = useState(false);
	const [categoryId, setCategoryId] = useState<number | null>(null);

	const url = `${API_URL}/categories`;

	const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditCategory(undefined);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				// Expecting an array of order objects
				const data: Category[] = await response.json();
				setCategories(data); // Update the state with the fetched data
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};

		fetchCategories(); 
	}, []);

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

	const handleEditCategory = async (id: number) => {
		try {
			let url = `${API_URL}/categories/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Category = await response.json();
			setEditCategory(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(!isEdit);
	};

	const handleDeleteCategory = async (id: number) => {
		setCategoryId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
		console.log(categoryId);

		if(categoryId === null) return;
		try {
			let url = `${API_URL}/categories/${categoryId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if(!response.ok) {
				
			}
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setCategoryId(null);
		// window.location.reload();
	};

	const description = "Deleting this will remove this permanently and cannot be undone.";

	return (
		<div className="w-full pr-12">
			<Button onClick={handleCreate}>Add Category</Button>
			{(isCreate || isEdit) ? (
				<CategoryForm 
					data={editCategory}
					onClose={closeForm}
				/>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="">
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.map((category, index) => (
							<TableRow key={index}>
								<TableCell>{category.name}</TableCell>
								<TableCell>{category.description}</TableCell>
								<TableCell className="flex flex-row justify-end gap-4">
									<Button size="sm" onClick={() => handleEditCategory(category.id)}>Edit</Button>
									<Button size="sm" onClick={() => handleDeleteCategory(category.id)}>
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
