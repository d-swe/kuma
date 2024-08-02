/**
 * Main table view of product data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";
import CreateButton from "../button/CreateButton";

function ProductView( isInventory ) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isInventory) {
            const url = ''
        }
        const url = 'http://localhost:8080/products';

        GetRequest({ url, onSuccess: setData });
    }, []);

    const columns = [
        { Header: 'PRODUCT ID', accessor: 'id' },
        { Header: 'PRODUCT NAME', accessor: 'name' },
        { Header: 'CATEGORY', accessor: 'category' },
        { Header: 'PRICE', accessor: 'price' },
        { Header: 'SKU', accessor: 'sku' },
        { Header: 'WAREHOUSE ID', accessor: 'warehouseId' },
        { Header: 'QUANTITY', accessor: 'quantity' },
        { Header: 'OPTION', accessor: 'option',
            Cell: ({ row }) => (
                <div className="buttons">
                    <EditButton table='products' itemId={row.original.id} formType='products'/>
                    <DeleteButton table='products' itemId={row.original.id} />
                </div>
            )
        }
    ]

    return (
        <>
            <div className="view-title">Product</div>
            <div className="cr-item-button">
            <CreateButton isIcon={false} formType='Product' />
            </div>
            <TableView columns={columns} data={data} />
        </>
    )

}

export default ProductView;