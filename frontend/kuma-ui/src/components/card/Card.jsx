// src/components/Card.jsx
import React from 'react';
import './Card.css';
import { PiTrash, PiNotePencil, PiListNumbers } from "react-icons/pi";

function WarehouseCard({ 
  name, 
  street, 
  city, 
  state, 
  zip, 
  capacity, 
  onNameClick, 
  onInventoryClick, 
  onEditClick, 
  onDeleteClick, 
  showSmallCard}) {

  return (
    <div className="card" onClick={onNameClick}>
      <div className="card-content">
        <h1 className="card-name">Warehouse</h1>
        <div className='warehouse-options'>
          <div className="inventory-button"><PiListNumbers className='icon' onClick={onInventoryClick} /></div>
          <div className="edit-button"><PiNotePencil className='icon' onClick={onEditClick} /></div>
          <div className="delete-button" ><PiTrash className='icon' onClick={onDeleteClick} /></div>
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