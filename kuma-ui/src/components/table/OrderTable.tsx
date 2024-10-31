import { DefaultTable } from "./DefaultTable";
import { Order, columns } from "../data/OrderData";
import { OrderForm } from "../form/OrderForm";

export default function OrderTable() {
	const endpoint = "orders";
	const filterDescription = "by first name, last name or product";
	const description = "Deleting this will remove it permanently and cannot be undone.";
	return (
		<DefaultTable<Order> columns={columns} endpoint={endpoint} FormComponent={OrderForm} description={description} filterDescription={filterDescription}/>
	);
}