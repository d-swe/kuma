// src/components/Card.jsx
import React from 'react';
import './Card.css';
import { PiTrash, PiNotePencil } from "react-icons/pi";

function Card({ name, onEditClick, onDeleteClick}) {
  return (
    <div className="card">
      <div className="card-content">
        <h1 className="card-name">Warehouse: {name}</h1>
        <div className='warehouse-options'>
                <div className="edit-button"><PiNotePencil className='icon' onClick={onEditClick} /></div>
                <div className="delete-button" ><PiTrash className='icon' onClick={onDeleteClick}/></div>
        </div>
      </div>
    </div>
  );
}

export default Card;