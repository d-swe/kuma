import { DefaultTable } from "./DefaultTable";
import { Inventory, columns } from "../data/InventoryData";
import { InventoryForm } from "../form/InventoryForm";

export default function InventoryTable() {
	const endpoint = "inventories"
	const filterDescription = "by product or state"
	const description = "Deleting this will remove it permnanently and cannot be undone."
	return (
		<DefaultTable<Inventory> columns={columns} endpoint={endpoint} FormComponent={InventoryForm} description={description} filterDescription={filterDescription}/>
	);
}
