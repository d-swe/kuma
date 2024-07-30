import React from 'react';
import Card from './Card';
import { PiTrash, PiNotePencil, PiListNumbers } from "react-icons/pi";

function WarehouseCard({ 
    name, 
    street, 
    city, 
    state, 
    zip, 
    capacity, 
    onInventoryClick, 
    onEditClick, 
    onDeleteClick, 
    showSmallCard }) {
  const title = name;
  const description = (
    <>
      <p>{street}</p>
      <p>{city}, {state} {zip}</p>
    </>
  );
  const additionalContent = (
    <div>
      <h4>Warehouse Information: {name}</h4>
      <p>Max Capacity: {capacity} units</p>
    </div>
  );
  const actions = [
    <PiListNumbers className='icon' onClick={onInventoryClick} />,
    <PiNotePencil className='icon' onClick={onEditClick} />,
    <PiTrash className='icon' onClick={onDeleteClick} />
  ];

  return (
    <Card
      title={title}
      description={description}
      additionalContent={additionalContent}
      actions={actions}
      showAdditionalContent={showSmallCard}
    />
  );
}

export default WarehouseCard;