/**
 * Main table view of warehouse data.
 */
import { useEffect, useState } from "react";
import TableView from "../table/TableView";
import GetRequest from "../webAPI/GetRequest";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";
import './WarehouseView.css'

function WarehouseView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/warehouses';

        GetRequest({ url, onSuccess: setData });
    }, []);

    const columns = [
        { Header: 'Warehouse', accessor: 'name' },
        { Header: 'Street Address', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state' },
        { Header: 'Zip Code', accessor: 'zip' },
        { Header: 'Capacity', accessor: 'capacity' },
        { Header: 'Actions', accessor: 'actions',
            Cell: ({ row }) => (
                <div className="buttons">
                    <EditButton table='warehouses' itemId={row.original.id} />
                    <DeleteButton table='warehouses' itemId={row.original.id} />
                </div>
            )
        }
    ]

    return (

        <TableView columns={columns} data={data} />
    )

}

export default WarehouseView;