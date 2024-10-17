export type Warehouse = {
	id: number,
	name: string,
	city: string,
	state: string,
	maxCapacity: number
};

export const warehouseHeaders = [
    "Name",
    "City",
    "State",
    "Current Capacity",
    "Max Capacity"
];

export interface warehouse {
    id: number,
	name: string,
	city: string,
	state: string,
	currentCapacity: number,
	maxCapacity: number
}

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    category: {
        id: number,
        name: string
    },
    sku: string
};

export const productHeaders = [
    "Name",
    "Description",
    "Price",
    "Category",
    "SKU"
];

export interface product {
    name: string,
    description: string,
    price: number,
    category: {
        name: string
    },
    sku: string
}

export type Inventory = {
    id: number,
    product: {
        id: number,
        name: string
    },
    warehouse: {
        id: number,
        name: string
    },
    stock: number,
    lastUpdate: string
};

export const inventoryHeaders = [
    "Product",
    "Warehouse",
    "Stock",
    "Last Update"
];

export interface inventory {
    name: string,
    description: string,
    price: number,
    category: {
        name: string
    },
    sku: string
}

export type Order = {
    customer: {
        firstName: string,
        lastName: string
    },
    orderDate: number,
    totalCost: number
};

export const orderHeaders = [
    "Name",
    "Order Date",
    "Total Cost"
];

export interface order {
    name: string,
    description: string,
    price: number,
    category: {
        name: string
    },
    sku: string
}

export type Customer = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
};

export const customerHeaders = [
    "Name",
    "Email",
    "Phone",
    "Address",
];

export type Category = {
    id: number,
    name: string,
    description: string
};

export const categoryHeaders = [
    "Name",
    "Description"
];