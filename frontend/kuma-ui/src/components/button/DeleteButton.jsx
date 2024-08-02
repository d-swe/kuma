/**
 * Renders a button when clicked sends a DELETE request to a specified URL.
 */
import { PiTrash } from "react-icons/pi";
import DeleteRequest from "../webAPI/DeleteRequest";
import './DeleteButton.css'
import { useState } from "react";
import DeleteModal from '../modal/DeleteModal'; 
import { toast } from 'react-toastify';

function DeleteButton({ table, itemId }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleDelete = () => {
        const url = `http://localhost:8080/${table}/${itemId}`;
        DeleteRequest({ url })
        toast.success(`Item deleted successfully!`)
        setShowModal(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    return (
        <>
            <div className="delete-button"><PiTrash className="icon" onClick={handleOpenModal}/></div>
            <DeleteModal show={showModal} onClose={handleCloseModal} onConfirm={handleDelete} name={name}/>
        </>
    )
}

export default DeleteButton