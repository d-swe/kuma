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
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "../data/items";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8080/products";

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(2, { message: "Product name is required" }).max(20),
	description: z.string().min(2, { message: "City is required" }).max(250),
	price: z.coerce.number().min(1, { message: "Price is required" }),
	category: z.object({
		id: z.number(),
		name: z.string(),
	}),
	sku: z.string().min(2, { message: "sku is required" }).max(10),
});

const handleAddProduct = async (data: Product) => {
	try {
		const response = await fetch(url, {
			method: "POST",
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

const handleEditProduct = async (data: Product) => {
	try {
		let url = `http://localhost:8080/products/${data.id}`;

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

export function ProductForm({
	data,
	onClose,
}: {
	data?: Product;
	onClose: () => void;
}) {
	const [categories, setCategories] = useState<Category[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			name: data?.name || "",
			description: data?.description || "",
			price: data?.price || 0,
			category: {
				id: data?.category?.id || 0,
				name: data?.category?.name || "",
			},
			sku: data?.sku || "",
		},
	});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://localhost:8080/categories");
				if (!response.ok) {
					throw new Error(`Error Status: ${response.status}`);
				}
				const data: Category[] = await response.json();
				setCategories(data);
			} catch (err) {
				console.error(
					err instanceof Error ? err.message : "Unknown error occurred"
				);
			}
		};
		fetchCategories();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const productData: Product = {
			id: values.id,
			name: values.name,
			description: values.description,
			price: values.price,
			category: {
				id: values.category.id,
				name: values.category.name,
			}, // Ensure this matches the expected structure
			sku: values.sku,
		};

		console.log(productData);

		if (data) {
			await handleEditProduct(productData);
		} else {
			await handleAddProduct(productData);
		}
		onClose();
		// window.location.reload();
	}

	return (
		<div className="py-12">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Name</FormLabel>
								<FormControl>
									<Input placeholder="Product name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input placeholder="Price" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category.id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(Number(value));
										}}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a Category" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id.toString()}
													>
														{category.name}
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
						name="sku"
						render={({ field }) => (
							<FormItem>
								<FormLabel>SKU</FormLabel>
								<FormControl>
									<Input placeholder="SKU" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="pt-8 flex flex-row gap-4">
						<Button type="submit">Submit</Button>
						<Button type="button" onClick={() => onClose()}>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}