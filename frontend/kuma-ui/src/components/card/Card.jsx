// src/components/Card.jsx
import React from 'react';
import './Card.css';

function Card({ title, icon, count1, description1, count2, description2 }) {

  return (
    <>
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          <div className='card-icon'>{icon}</div>
          <h3 className="title">{title}</h3>
        </div>
        <div className="card-description">
          <div className="description-item">
            <h5 className='count'>{count1}</h5>
            <h5 className='description'>{description1}</h5>
          </div>
          <div className="description-item">
            <h5 className='count'>{count2}</h5>
            <h5 className='description'>{description2}</h5>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Card;