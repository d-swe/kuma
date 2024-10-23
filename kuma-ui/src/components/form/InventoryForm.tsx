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
import { Inventory, Product, Warehouse } from "../data/items";
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

const url = `${API_URL}/inventories`;

const formSchema = z.object({
	id: z.number(),
	product: z.object({
		id: z.number(),
		name: z.string(),
		price: z.number(),
	}),
	warehouse: z.object({
		id: z.number(),
		name: z.string(),
	}),
	stock: z.coerce.number(),
	lastUpdate: z.string(),
});

const handleAddInventory = async (data: Inventory) => {
    const newInventory = {
        stock: data.stock,
        productId: data.product.id,
        warehouseId: data.warehouse.id
    }

    console.log(newInventory);
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newInventory),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

const handleEditInventory = async (data: Inventory) => {
	console.log(data.id);
	try {
		let url = `${API_URL}/inventories/${data.id}`;

		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

export function InventoryForm({
	data,
	onClose,
}: {
	data?: Inventory;
	onClose: () => void;
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			product: {
				id: data?.product.id || 0,
				name: data?.product.name || "",
				price: data?.product.price || 0,
			},
			warehouse: {
				id: data?.warehouse.id || 0,
				name: data?.warehouse.name || "",
			},
			stock: data?.stock || 0,
			lastUpdate: data?.lastUpdate || "",
		},
	});

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${API_URL}/products`);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: Product[] = await response.json();
				setProducts(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchWarehouses = async () => {
			try {
				const response = await fetch(`${API_URL}/warehouses`);
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: Warehouse[] = await response.json();
				setWarehouses(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchWarehouses();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("clicked");
		if (data) {
			await handleEditInventory(values);
		} else {
			await handleAddInventory(values);
		}
		onClose();
		// window.location.reload();
	}
	const errors = form.formState.errors;
	console.log(errors)
	return (
		<div className="py-12 w-1/2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="product.id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(Number(value));
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a Product" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{products.map((product) => (
													<SelectItem
														key={product.id}
														value={product.id.toString()}
													>
														{product.name}
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
						name="warehouse.id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Warehouse</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(Number(value));
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a Warehouse" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{warehouses.map((warehouse) => (
													<SelectItem
														key={warehouse.id}
														value={warehouse.id.toString()}
													>
														{warehouse.name}
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
						name="stock"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Stock" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="pt-8 flex flex-row gap-4">
						<Button type="submit">Submit</Button>
						<Button onClick={() => onClose()}>Cancel</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}