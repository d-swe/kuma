import React, { useState } from 'react';
import Card from './Card';
import './CardContainer.css';
import Modal from '../modal/Modal';
import WarehouseForm from '../warehouse/WarehouseForm'

function CardContainer() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const warehouseButtonClick = () => {
       openModal();
    };

    const inventoryButtonClick = () => {
        alert('Inventory Clicked!')
    }

    const productButtonClick = () => {
        alert('Product Clicked!')
    }

    const handleFormSubmit = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

  const cardsData = [
    {
      title: 'Warehouse',
      count: 2,
      onButtonClick: warehouseButtonClick
    },
    {
      title: 'Inventory',
      count: 2,
      onButtonClick: inventoryButtonClick
    },
    {
      title: 'Product',
      count: 2,
      onButtonClick: productButtonClick
    }
  ];

  return (
    <div className="card-container">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          count={card.count}
          onButtonClick={card.onButtonClick}
        />
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WarehouseForm onSubmit={handleFormSubmit} onCancel={handleCancel}/>
      </Modal>
    </div>
  );
}

export default CardContainer;