import { DefaultTable } from "./DefaultTable";
import { Customer, columns } from "../data/CustomerData";
import { CustomerForm } from "../form/CustomerForm";

export default function CustomerTable() {
	const endpoint = "customers"
	const filterDescription = "by first name, last name, email or address";
	const description = "Deleting this will remove this customer permanently and cannot be undone.";
	return (
		<DefaultTable<Customer> columns={columns} endpoint={endpoint} FormComponent={CustomerForm} description={description} filterDescription={filterDescription}/>
	);
}
