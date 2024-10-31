import { DefaultTable } from "./DefaultTable";
import { Warehouse, columns } from "../data/WarehouseData";
import { WarehouseForm } from "../form/WarehouseForm";

export default function WarehouseTable() {
	const endpoint = "warehouses"
	const filterDescription = "by name, city or state"
	const description = "Deleting this will remove any inventories associated with this warehouse and cannot be undone."
	return (
		<>
		<DefaultTable<Warehouse> columns={columns} endpoint={endpoint} FormComponent={WarehouseForm} description={description} filterDescription={filterDescription}/>
		<div>
		</div>
		</>
	);
}
