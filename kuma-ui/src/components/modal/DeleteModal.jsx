import React from 'react';
import './DeleteModal.css'

function DeleteModal({ show, onClose, onConfirm, name }) {
  if (!show) {
    return null;
  }

  return (
    <div className="delete-container">
      <div className="delete-modal">
        <h2 className='delete-msg'>Are you sure you want to delete this item?</h2>
        <div className="delete-buttons">
          <button className="yes-button" onClick={onConfirm}>Yes</button>
          <button className="no-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
 );
}

export default DeleteModal;