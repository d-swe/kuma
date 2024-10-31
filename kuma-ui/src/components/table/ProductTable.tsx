import { DefaultTable } from "./DefaultTable";
import { Product, columns } from "../data/ProductData";
import { ProductForm } from "../form/ProductForm";

export default function ProductTable() {
	const endpoint = "products";
	const filterDescription = "by product, description or category";
	const description = "Deleting this will remove any inventories associated with this product permanently and cannot be undone.";
	return (
		<DefaultTable<Product> columns={columns} endpoint={endpoint} FormComponent={ProductForm} description={description} filterDescription={filterDescription}/>
	);
}
