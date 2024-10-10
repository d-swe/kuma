/**
 * Main table view of order data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import DeleteButton from "../button/DeleteButton";
import CreateButton from "../button/CreateButton";

function OrderView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/orders';
        GetRequest({ url, onSuccess: setData });
    }, []);

    const columns = [
        { Header: 'ORDER ID', accessor: 'id' },
        { Header: 'CUSTOMER NAME', accessor: 'customerName' },
        { Header: 'CITY', accessor: 'city' },
        { Header: 'STATE', accessor: 'state' },
        { Header: 'QUANTITY', accessor: 'quantity' },
        { Header: 'PRODUCT ID', accessor: 'productId' },
        { Header: 'DELETE', accessor: 'option',
            Cell: ({ row }) => (
                <div className="buttons">
                    <DeleteButton table='orders' itemId={row.original.id} />
                </div>
            )
        }
    ]

    return (
        <>
            <div className="view-title">Order</div>
            <div className="cr-item-button">
            <CreateButton isIcon={false} formType='Order' />
            </div>
            <TableView columns={columns} data={data} />
        </>
    )

}

export default OrderView;