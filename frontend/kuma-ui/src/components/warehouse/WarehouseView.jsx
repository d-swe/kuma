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
        { Header: 'WAREHOUSE NAME', accessor: 'name' },
        { Header: 'STREET ADDRESS', accessor: 'street' },
        { Header: 'CITY', accessor: 'city' },
        { Header: 'STATE', accessor: 'state' },
        { Header: 'ZIP CODE', accessor: 'zip' },
        { Header: 'CAPACITY', accessor: 'capacity' },
        { Header: 'OPTION', accessor: 'option',
            Cell: ({ row }) => (
                <div className="buttons">
                    <EditButton table='warehouses' itemId={row.original.id} formType='warehoues'/>
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