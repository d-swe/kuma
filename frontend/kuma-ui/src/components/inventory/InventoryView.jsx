/**
 * Main table view of warehouse data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import { useNavigate } from "react-router-dom";
import CreateButton from '../button/CreateButton'

function InventoryView({ warehouseId }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (warehouseId) {
      const url = `http://localhost:8080/inventories/warehouse/${warehouseId}/products`;

      GetRequest({ url, onSuccess: setData });
    }
  }, [warehouseId]);

  const columns = [
    { Header: 'PRODUCT ID', accessor: 'id' },
    { Header: 'PRODUCT NAME', accessor: 'name' },
    { Header: 'DESCRIPTION', accessor: 'description' },
    { Header: 'PRICE', accessor: 'price' },
    { Header: 'SKU', accessor: 'sku' },
    { Header: 'CATEGORY', accessor: 'category' },
  ];

  useEffect(() => {
    if (data.length > 0) {
        console.log('this is inside just before navigate:', data)
        navigate(`/inventory/warehouse/${warehouseId}`)
    }
  }, [data])

  return (
    <>
      <div className="view-title">Inventory</div>
      <TableView columns={columns} data={data} />
    </>
  );
}

export default InventoryView;