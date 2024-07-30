import { PiPencil } from "react-icons/pi";
import { useState } from 'react'
import WarehouseForm from "../warehouse/WarehouseForm";
import './EditButton.css'

function EditButton({ table, itemId }) {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
        <div className="edit-button"><PiPencil className="icon" onClick={handleEdit}/></div>
        {isEdit && <WarehouseForm itemId={itemId} />}
        </>
    )
}

export default EditButton