import React, { useEffect, useState } from 'react';
import Card from './Card';
import './CardContainer.css';
import {useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal';
import WarehouseForm from '../warehouse/WarehouseForm'

function CardContainer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/warehouses');

                if(!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch(error) {
                    console.log(error);
            }
        }
        fetchData();
    },[]);

    const handleEdit = () => {
        alert('Edit Clicked!')
    };

    const handleDelete = () => {
        alert('Delete Clicked')
    };

  return (
    <div className="card-container">
      {data.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          onEditClick={() => handleEdit()}
          onDeleteClick={() => handleDelete()}
        />
      ))}
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WarehouseForm onSubmit={handleFormSubmit} onCancel={handleCancel}/>
      </Modal> */}
    </div>
  );
}

export default CardContainer;