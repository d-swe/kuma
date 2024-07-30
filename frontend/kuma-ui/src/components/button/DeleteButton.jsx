/**
 * Renders a button when clicked sends a DELETE request to a specified URL.
 */
import { PiTrash } from "react-icons/pi";
import DeleteRequest from "../webAPI/DeleteRequest";
import './DeleteButton.css'

function DeleteButton({ table, itemId }) {

    const handleDelete = () => {
        const url = `http://localhost:8080/${table}/${itemId}`;
        DeleteRequest({ url })
    }

    return (
        <div className="delete-button"><PiTrash className="icon" onClick={handleDelete}/></div>
    )
}

export default DeleteButton