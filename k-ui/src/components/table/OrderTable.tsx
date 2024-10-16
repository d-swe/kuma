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
import { InventoryForm } from "../form/InventoryForm";
import { DeleteAlert } from "../modal/DeleteAlert";
import { Order } from "../data/items";
// import { OrderForm } from "../form/OrderForm";

export function OrderTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editOrder, setEditOrder] = useState<Order>();
	const [showAlert, setShowAlert] = useState(false);
	const [orderId, setOrderId] = useState<number | null>(null);

	const url = "http://localhost:8080/orders";

	const closeForm = () => {
		setIsCreate(false);
		setIsEdit(false);
		setEditOrder(undefined);
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				// Expecting an array of order objects
				const data: Order[] = await response.json();
				setOrders(data); // Update the state with the fetched data
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};

		fetchOrders(); // Call the fetch function
	}, []); // Run only on component mount

	const handleCreate = () => {
		setIsCreate(!isCreate);
	};

	const handleEditorder = async (id: number) => {
		try {
			let url = `http://localhost:8080/orders/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Order = await response.json();
			setEditOrder(data); 
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(!isEdit);
	};

	const handleDeleteOrder = async (id: number) => {
		setOrderId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
		if(orderId === null) return;
		try {
			let url = `http://localhost:8080/orders/${orderId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setOrderId(null);
		window.location.reload();
	};

	return (
		<div className="w-full pr-12">
			<Button onClick={handleCreate}>Add order</Button>
			{(isCreate || isEdit) ? (
				<InventoryForm 
					data={editOrder}
					onClose={closeForm}
				/>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="">
							<TableHead>Order Id</TableHead>
							<TableHead>Customer Name</TableHead>
							<TableHead>Order Date</TableHead>
							<TableHead>Total Cost</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order, index) => (
							<TableRow key={index}>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.customer.firstName}, {order.customer.lastName}</TableCell>
								<TableCell>{order.orderDate}</TableCell>
								<TableCell>{order.totalCost}</TableCell>
								<TableCell className="flex flex-row justify-end gap-4">
									<Button size="sm" onClick={() => handleEditorder(order.id)}>Edit</Button>
									<Button size="sm" onClick={() => handleDeleteOrder(order.id)}>
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
