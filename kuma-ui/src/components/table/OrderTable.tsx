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
import { Order } from "../data/items";
import { OrderForm } from "../form/OrderForm";
import { API_URL } from "@/config";
import { priceFormatter } from "../data/NumberFormat";

export function OrderTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isCreate, setIsCreate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editOrder, setEditOrder] = useState<Order>();
	const [showAlert, setShowAlert] = useState(false);
	const [orderId, setOrderId] = useState<number | null>(null);

	const url = `${API_URL}/orders`;

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
		setIsCreate(true);
		setIsEdit(false);
	};

	const handleEditorder = async (id: number) => {
		setIsCreate(false);
		try {
			let url = `${API_URL}/orders/${id}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error Status: ${response.status}`);
			}
			const data: Order = await response.json();
			setEditOrder(data); 
			console.log("Edit order data:",data);
		} catch (error) {
			console.error("Error:", error);
		}
		setIsEdit(true);
	};

	const handleDeleteOrder = async (id: number) => {
		setOrderId(id);
		setShowAlert(true);
	}

	const confirmDelete = async () => {
		if(orderId === null) return;
		try {
			let url = `${API_URL}/orders/${orderId}`;
			const response = await fetch(url, {
				method: "DELETE",
			});
			if(!response.ok) {

			}

		} catch (error) {
			console.error("Error:", error);
		}
		setShowAlert(false);
		setOrderId(null);
		window.location.reload();
	};

	const description = "Deleting this will remove it permanently and cannot be undone."

	return (
		<div className="w-full pr-12">
			<Button onClick={handleCreate}>Add Order</Button>
			{(isCreate || isEdit) ? (
				<OrderForm 
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
							<TableHead>Per Item Cost</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Total</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order, index) => (
							<TableRow key={index}>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.customer.firstName}, {order.customer.lastName}</TableCell>
								<TableCell>{order.orderDate}</TableCell>
								<TableCell>{priceFormatter(order.perItemCost)}</TableCell>
								<TableCell>{order.quantity}</TableCell>
								<TableCell>{priceFormatter(order.perItemCost * order.quantity)}</TableCell>
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
			<DeleteAlert showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={confirmDelete} description={description}/>
		</div>
	);
}
