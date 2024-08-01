import { PiListChecks } from "react-icons/pi";
import { useState } from 'react';
import './InventoryButton.css';
import InventoryView from "../inventory/InventoryView";

function InventoryButton({ itemId }) {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
        <div className="inventory-button"><PiListChecks className="icon" onClick={handleEdit}/></div>
        {isEdit && <InventoryView warehouseId={itemId} />}
        </>
    )
}

export default InventoryButton;