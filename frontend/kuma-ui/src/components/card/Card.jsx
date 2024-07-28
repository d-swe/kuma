// src/components/Card.jsx
import React from 'react';
import './Card.css';
import { PiPlusBold } from "react-icons/pi";

function Card({ title, count, onButtonClick}) {
  return (
    <div className="card">
      <div className="card-content">
        <h1 className="card-title">{title}</h1>
        <div className='bottom-desc'>
                <h2 className="card-count">Count: {count}</h2>
                <div className="card-button" ><PiPlusBold className='add-icon' onClick={onButtonClick}/></div>
        </div>
      </div>
    </div>
  );
}

export default Card;