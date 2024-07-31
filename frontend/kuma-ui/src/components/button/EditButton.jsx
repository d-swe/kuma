import { PiPencil } from "react-icons/pi";
import { useState } from 'react';
import WarehouseForm from "../warehouse/WarehouseForm";
import ProductForm from '../product/ProductForm';
import './EditButton.css';

function EditButton({ itemId, formType}) {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
        <div className="edit-button"><PiPencil className="icon" onClick={handleEdit}/></div>
        {isEdit && (formType === 'warehouse' ?
            <WarehouseForm warehouseId={itemId} /> :
            <ProductForm productId={itemId} />)}
        </>
    )
}

export default EditButton;