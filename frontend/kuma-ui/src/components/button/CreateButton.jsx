import { PiPlusBold } from "react-icons/pi";
import { useState } from 'react';
import WarehouseForm from "../warehouse/WarehouseForm";
import ProductForm from '../product/ProductForm';
import OrderForm from '../order/OrderForm'
import './CreateButton.css';

function CreateButton({ formType }) {
    const [isCreate, setIsCreate] = useState(false);

    const handleCreate = () => {
        setIsCreate(!isCreate);
    }

    return (
        <>
        <div className="create-item-button">
            <div className="cr-btn" onClick={handleCreate} >
                {formType}<PiPlusBold className="icon" /></div>
            </div>
        {(isCreate && formType === 'Warehouse') ? (<WarehouseForm />) : (isCreate && formType === 'Product') ? (<ProductForm />) : (isCreate && <OrderForm />)}
        </>
    )
}

export default CreateButton;