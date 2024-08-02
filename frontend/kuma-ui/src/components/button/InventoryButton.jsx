import { PiListChecks } from "react-icons/pi";
import './InventoryButton.css';
import { useNavigate } from "react-router-dom";

function InventoryButton({ itemId }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/inventory/${itemId}`)
    }

    return (
        <>
        <div className="inventory-button"><PiListChecks className="icon" onClick={handleEdit}/></div>
        </>
    )
}

export default InventoryButton;