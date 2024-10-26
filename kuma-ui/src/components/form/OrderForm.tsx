import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Order } from "../data/OrderData";
import { Inventory } from "../data/InventoryData";
import { Customer } from "../data/CustomerData";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { priceFormatter } from "../data/NumberFormat";

type OrderCreateRequest = {
	customerId: number,
	inventoryId: number,
	quantity: number,
}

const url = `${API_URL}/orders`;

const formSchema = z.object({
	id: z.number(),
	customer: z.object({
		id: z.number(),
		firstName: z.string(),
		lastName: z.string(),
	}),
	inventory: z.object({
		id: z.number(),
		product: z.object({
			id: z.number(),
			price: z.number(),
			name: z.string()
		}),
		warehouse: z.object({
			id: z.number(),
			name: z.string(),
		}),
	}),
	quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
	orderDate: z.string(),
	perItemCost: z.coerce.number()
});

const handleAddOrder = async (data: Order) => {
	const addOrder: OrderCreateRequest = {
		customerId: data.customer.id,
		inventoryId: data.inventory.id,
		quantity: data.quantity
	}

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(addOrder),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

const handleEditOrder = async (data: Order) => {
	const addOrder: OrderCreateRequest = {
		customerId: data.customer.id,
		inventoryId: data.inventory.id,
		quantity: data.quantity
	}
	console.log(data.id);
	try {
		let url = `${API_URL}/orders/${data.id}`;

		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(addOrder),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

export function OrderForm({
	data,
	onClose,
}: {
	data?: Order;
	onClose: () => void;
}) {
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			customer: {
				id: data?.customer.id || 0,
				firstName: data?.customer.firstName || "",
				lastName: data?.customer.lastName || ""
			},
			inventory: {
				id: data?.inventory?.id || 0,
				product: {
					id: data?.inventory?.product?.id || 0,
					price: data?.inventory?.product?.price || 0,
				},
				warehouse: {
					id: data?.inventory?.warehouse?.id || 0,
					name: data?.inventory?.warehouse?.name || ""
				}
			},
			quantity: data?.quantity || 0,
			orderDate: data?.orderDate || "",
			perItemCost: data?.perItemCost || 0
		},
	});

	console.log(data);

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await fetch(`${API_URL}/customers`);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: Customer[] = await response.json();
				setCustomers(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchCustomers();
	}, []);

	useEffect(() => {
		const fetchInventories = async () => {
			try {
				const response = await fetch(`${API_URL}/inventories`);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: Inventory[] = await response.json();
				setInventories(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchInventories();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("clicked");
		if (data) {
			await handleEditOrder(values);
		} else {
			await handleAddOrder(values);
		}
		onClose();
		// window.location.reload();
	}

	const errors = form.formState.errors;
	console.log(errors)
	const totalCost = form.watch("quantity") * form.watch("perItemCost");

	console.log(data);
	return (
		<div className="py-12 w-1/2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="customer.id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Customer Name</FormLabel>
								<FormControl>
									<Select
										value={field.value.toString()}
										onValueChange={(value) => {
											field.onChange(Number(value));
										}}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a Customer" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{customers.map((customer) => (
													<SelectItem
														key={customer.id}
														value={customer.id.toString()}
													>
														{customer.firstName}, {customer.lastName}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="inventory.id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product - Warehouse</FormLabel>
								<FormControl>
									<Select
										value={field.value?.toString() || ""}
										onValueChange={(value) => {
											const selectInv = inventories.find(inv => inv.id === Number(value));
											field.onChange(Number(value));
											if(selectInv) {
												form.setValue("perItemCost", selectInv.product.price);
											}
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a Product" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{inventories.map((inventory) => (
													<SelectItem
														key={inventory.id}
														value={inventory.id.toString()}
													>
														{inventory.product.name} ({inventory.stock} available) - {inventory.warehouse.name} : ${inventory.product.price}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantity</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Quantity" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="perItemCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Cost Per Item</FormLabel>
								<FormControl>
									<Input type="number" disabled {...field}/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-4">
						<FormLabel>Total Cost</FormLabel>
						<Input value={priceFormatter(totalCost | 0)} disabled />
					</div>
					<div className="pt-8 flex flex-row gap-4">
						<Button type="submit">Submit</Button>
						<Button onClick={() => onClose()}>Cancel</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}