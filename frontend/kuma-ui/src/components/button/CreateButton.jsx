import { PiPlusCircle } from "react-icons/pi";
import { useState } from 'react';
import WarehouseForm from "../warehouse/WarehouseForm";
import ProductForm from '../product/ProductForm';
import OrderForm from '../order/OrderForm'
import './CreateButton.css';

function CreateButton({ formType }) {
    const [isCreate, setItCreate] = useState(false);

    const handleCreate = () => {
        setItCreate(!isCreate);
    }

    return (
        <>
        <div className="create-item-button"><PiPlusCircle className="icon" onClick={handleCreate}/></div>
        {(isCreate && formType === 'Warehouse') ? (<WarehouseForm />) : (isCreate && formType === 'Product') ? (<ProductForm />) : (isCreate && <OrderForm />)}
        </>
    )
}

export default CreateButton;