import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { priceFormatter } from "./NumberFormat";

export type Order = {
    id: number,
    customer: {
        id: number,
        firstName: string,
        lastName: string
    },
    inventory: {
        id: number,
        product: {
            id: number,
            price: number,
            name: string
        }
        warehouse: {
            id: number,
            name: string
        }
    },
    quantity: number,
    orderDate: string,
    perItemCost: number
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Id
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    id: "customer.firstName",
    accessorKey: "customer.firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        return (
          <div key={row.original.id} className="flex flex-row items-center gap-x-2">
               <div> {row.original.customer.firstName}</div>
          </div>
        );
      },
  },
  {
    id: "customer.lastName",
    accessorKey: "customer.lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        return (
          <div key={row.original.id} className="flex flex-row items-center gap-x-2">
            
               <div>{row.original.customer.lastName}</div>
          </div>
        );
      },
  },
  {
    id: "product.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (row) => row.inventory.product.name,
    cell: ({ row }) => {
        return (
          <div key={row.original.id} className="flex flex-row items-center gap-x-2">
            <div>{row.original.inventory.product.name}</div>
          </div>
        );
      },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    id: "inventory.product.price",
    accessorKey: "inventory.product.price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price Per Item
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        return (
          <div key={row.original.id} className="flex flex-row items-center gap-x-2">
               <div> {priceFormatter(row.original.inventory.product.price)} </div>
          </div>
        );
      },
  },
  {
    id: "totalCost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Cost
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        const pricePerItem = row.original.inventory.product.price;
        const quantity = row.original.quantity;
        const totalCost = pricePerItem * quantity;
        return <div>{priceFormatter(totalCost)}</div>
    }
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("orderDate")}</div>,
  },
];