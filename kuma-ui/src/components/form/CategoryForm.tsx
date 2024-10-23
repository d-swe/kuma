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
import { Category } from "../data/items";
import { Textarea } from "../ui/textarea";
import { API_URL } from "@/config";

const url = `${API_URL}/categories`;

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(2, { message: "Name is required" }).max(50),
	description: z.string().min(2, { message: "Description name is required" }).max(250),
});

const handleAddCategory = async (data: Category) => {
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

const handleEditCategory = async (data: Category) => {
	console.log(data.id);
	try {
		let url = `${API_URL}/categories/${data.id}`;

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

export function CategoryForm({
	data,
	onClose,
}: {
	data?: Category;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			name: data?.name || "",
			description: data?.description || "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("clicked");
		if (data) {
			await handleEditCategory(values);
		} else {
			await handleAddCategory(values);
		}
		onClose();
		window.location.reload();
	}

	return (
		<div className="py-12 w-1/2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Name</FormLabel>
								<FormControl>
									<Input placeholder="Category name" {...field} />
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
									<Textarea placeholder="Description" {...field}></Textarea>
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
