import { DefaultTable } from "./DefaultTable";
import { Category, columns } from "../data/CategoryData";
import { CategoryForm } from "../form/CategoryForm";

export default function CategoryTable() {
	const endpoint = "categories"
	const filterDescription = "by category or description";
	const description = "Deleting this will remove this permanently and cannot be undone.";
	return (
		<DefaultTable<Category> columns={columns} endpoint={endpoint} FormComponent={CategoryForm} description={description} filterDescription={filterDescription}/>
	);
}
