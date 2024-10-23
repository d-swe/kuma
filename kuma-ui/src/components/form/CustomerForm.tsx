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
import { Customer } from "../data/items";
import { API_URL } from "@/config";

const url = `${API_URL}/customers`;

const formSchema = z.object({
	id: z.number(),
	firstName: z.string().min(2, { message: "First name is required" }).max(50),
	lastName: z.string().min(2, { message: "Last name is required" }).max(50),
	email: z.string().min(2, { message: "City is required" }).max(20),
	phone: z.string().min(7, { message: "State is required" }).max(10),
	address: z.string().min(2, { message: "State is required" }).max(100),
});

const handleAddCustomer = async (data: Customer) => {
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

const handleEditCustomer = async (data: Customer) => {
	console.log(data.id);
	try {
		let url = `http://${API_URL}/customers/${data.id}`;

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

export function CustomerForm({
	data,
	onClose,
}: {
	data?: Customer;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			firstName: data?.firstName || "",
			lastName: data?.lastName || "",
			email: data?.email || "",
			phone: data?.phone || "",
			address: data?.address || "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("clicked");
		if (data) {
			await handleEditCustomer(values);
		} else {
			await handleAddCustomer(values);
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
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="First name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Last Name" {...field}></Input>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field}></Input>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input placeholder="Phone" {...field}></Input>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="Address" {...field}></Input>
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
