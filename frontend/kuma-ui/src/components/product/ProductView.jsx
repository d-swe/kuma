/**
 * Main table view of product data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";
import './ProductView.css'

function ProductView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/products';

        GetRequest({ url, onSuccess: setData });
    }, []);

    const columns = [
        { Header: 'PRODUCT NAME', accessor: 'name' },
        { Header: 'CATEGORY', accessor: 'category' },
        { Header: 'DESCRIPTION', accessor: 'description' },
        { Header: 'PRICE', accessor: 'price' },
        { Header: 'SKU', accessor: 'sku' },
        { Header: 'LAST UPDATED', accessor: 'lastUpdate' },
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

        <TableView columns={columns} data={data} />
    )

}

export default ProductView;