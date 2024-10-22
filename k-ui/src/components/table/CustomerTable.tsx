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
import { Customer } from "../data/items";
import { CustomerForm } from "../form/CustomerForm";

export function CustomerTable() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editCustomer, setEditCustomer] = useState<Customer>();
	const [showAlert, setShowAlert] = useState(false);
	const [customerId, setCustomerId] = useState<number | null>(null);

	const url = "http://localhost:8080/customers";

	const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditCustomer(undefined);
	};

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				// Expecting an array of order objects
				const data: Customer[] = await response.json();
				setCustomers(data); // Update the state with the fetched data
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};

		fetchCustomers(); 
	}, []);

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

	const handleEditCustomer = async (id: number) => {
		try {
			let url = `http://localhost:8080/customers/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Customer = await response.json();
			setEditCustomer(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(!isEdit);
	};

	const handleDeleteCustomer = async (id: number) => {
		setCustomerId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
		if(customerId === null) return;
		try {
			let url = `http://localhost:8080/customers/${customerId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setCustomerId(null);
		window.location.reload();
	};

	const description = "Deleting this will remove this customer permanently and cannot be undone.";

	return (
		<div className="w-full pr-12">
			<Button onClick={handleCreate}>Add Customer</Button>
			{(isCreate || isEdit) ? (
				<CustomerForm 
					data={editCustomer}
					onClose={closeForm}
				/>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="">
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Address</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer, index) => (
							<TableRow key={index}>
								<TableCell>{customer.firstName}, {customer.lastName}</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>{customer.phone}</TableCell>
								<TableCell>{customer.address}</TableCell>
								<TableCell className="flex flex-row justify-end gap-4">
									<Button size="sm" onClick={() => handleEditCustomer(customer.id)}>Edit</Button>
									<Button size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
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
