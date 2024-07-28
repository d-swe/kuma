// src/components/Card.jsx
import React from 'react';
import './WarehouseCard.css';
import { PiTrash, PiNotePencil } from "react-icons/pi";

function WarehouseCard({ name, street, city, state, zip, capacity, onNameClick, onEditClick, onDeleteClick, showSmallCard}) {

  return (
    <div className="card">
      <div className="card-content">
        <h1 className="card-name" onClick={onNameClick}>{name}</h1>
        <div className='warehouse-options'>
                <div className="edit-button"><PiNotePencil className='icon' onClick={onEditClick} /></div>
                <div className="delete-button" ><PiTrash className='icon' onClick={onDeleteClick}/></div>
        </div>
      </div>
      <div className={`small-card ${showSmallCard ? 'show' : 'hide'}`}>
        <h4>Warehouse Information {name}</h4>
        <p>Location: <br/>{street}<br/>{city}, {state} {zip}</p>
        <p>Max Capacity: {capacity} units</p>
      </div>
    </div>
  );
}

export default WarehouseCard;