import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type Product = {
	name: string;
	city: string;
	state: string;
	maxCapacity: number;
};

const url = "http://localhost:8080/products"; 

const formSchema = z.object({
    name: z.string().min(2, {message:"Warehouse name is required"}).max(20),
    city: z.string().min(2, {message:"City is required" }).max(20),
    state: z.string().min(2, {message: "State is required"}).max(20), 
    maxCapacity: z.coerce.number().min(1, { message: "Max capacity is required" }),
});

const handleAddWarehouse = async (data: Product) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch(error) {
            console.error('Error:', error);
        }
};

export function WarehouseForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            state: "",
            maxCapacity: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await handleAddWarehouse(values);
    }

    return (
        <div className="py-12">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}    
                    name="name"
                    render= {({ field }) => (
                        <FormItem>
                            <FormLabel>Warehouse Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Warehouse name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}    
                    name="city"
                    render= {({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}    
                    name="state"
                    render= {({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}    
                    name="maxCapacity"
                    render= {({ field }) => (
                        <FormItem>
                            <FormLabel>Max Capacity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Max Capacity" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </div>
    )
}