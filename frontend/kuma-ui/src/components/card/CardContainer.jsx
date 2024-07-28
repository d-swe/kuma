import React from 'react';
import Card from './Card';
import './CardContainer.css';

function CardContainer() {
    const warehouseButtonClick = () => {
        alert('Warehouse Clicked!')
    }

    const inventoryButtonClick = () => {
        alert('Inventory Clicked!')
    }

    const productButtonClick = () => {
        alert('Product Clicked!')
    }

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
    </div>
  );
}

export default CardContainer;