/**
 * Main table view of order data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";

function OrderView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/orders';

        GetRequest({ url, onSuccess: setData });
    }, []);

    const columns = [
        { Header: 'ORDER ID', accessor: 'id' },
        { Header: 'CUSTOMER ID', accessor: 'customerId' },
        { Header: 'STREET ADDRESS', accessor: 'street' },
        { Header: 'CITY', accessor: 'city' },
        { Header: 'STATE', accessor: 'state' },
        { Header: 'ZIP CODE', accessor: 'zip' },
        { Header: 'TOTAL', accessor: 'totalAmount' },
        { Header: 'NOTES', accessor: 'notes' },
        { Header: 'ORDER DATE', accessor: 'orderDate' },
        { Header: 'DELETE', accessor: 'option',
            Cell: ({ row }) => (
                <div className="buttons">
                    <DeleteButton table='orders' itemId={row.original.id} />
                </div>
            )
        }
    ]

    return (
        <TableView columns={columns} data={data} />
    )

}

export default OrderView;