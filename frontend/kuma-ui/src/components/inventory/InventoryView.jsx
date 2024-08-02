/**
 * Main table view of warehouse data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import './InventoryView.css'
import { useParams } from "react-router-dom";

function InventoryView({  }) {
  const { warehouseId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (warehouseId) {
      const url = `http://localhost:8080/products/warehouse/${warehouseId}`;
      GetRequest({ url, onSuccess: setData });
    }
  }, [warehouseId]);

  const columns = [
    { Header: 'PRODUCT ID', accessor: 'id' },
    { Header: 'PRODUCT NAME', accessor: 'name' },
    { Header: 'CATEGORY', accessor: 'category' },
    { Header: 'PRICE', accessor: 'price' },
    { Header: 'SKU', accessor: 'sku' },
    { Header: 'QUANTITY', accessor: 'quantity' },
    { Header: 'WAREHOUSE ID', accessor: 'warehouseId' },
  ];

  return (
    <>
    <div className="inventory-head">
      <div className="view-title">Inventory</div>
    </div>
      <TableView columns={columns} data={data} />
    </>
  );
}

export default InventoryView;