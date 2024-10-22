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
import { states } from "../data/states";
import { Warehouse } from "../data/items";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const url = "http://localhost:8080/warehouses";

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(2, { message: "Warehouse name is required" }).max(100),
	city: z.string().min(2, { message: "City is required" }).max(20),
	state: z.string().min(2, { message: "State is required" }).max(20),
	maxCapacity: z.coerce
		.number()
		.min(1, { message: "Max capacity is required" })
		.max(1000000000, { message: "Max capacity cannot exceed 1B" }),
});

const handleAddWarehouse = async (data: Warehouse) => {
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

const handleEditWarehouse = async (data: Warehouse) => {
	console.log(data.id);
	try {
		let url = `http://localhost:8080/warehouses/${data.id}`;

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

export function WarehouseForm({
	data,
	onClose,
}: {
	data?: Warehouse;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id || 0,
			name: data?.name || "",
			city: data?.city || "",
			state: data?.state || "",
			maxCapacity: data?.maxCapacity || 0,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("clicked");
		if (data) {
			await handleEditWarehouse(values);
		} else {
			await handleAddWarehouse(values);
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
								<FormLabel>Warehouse Name</FormLabel>
								<FormControl>
									<Input placeholder="Warehouse name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="City" {...field}></Input>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a State" />
										</SelectTrigger>
										<SelectContent {...field}>
											<SelectGroup>
												{states.map((state, index) => (
													<SelectItem key={index} value={state.value}>
														{state.label}
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
						name="maxCapacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Max Capacity</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Max Capacity" {...field} />
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
