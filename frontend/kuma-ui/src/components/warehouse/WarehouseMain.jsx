import React, { useEffect, useState } from 'react';
import Card from './WarehouseCard';
import './WarehouseMain.css';
import DeleteModal from '../modal/DeleteModal';
import WarehouseForm from './WarehouseForm';

function WarehouseMain() {
    const [data, setData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItemId, setDeleteItem] = useState(null);
    const [isFormOpen, setFormOpen] = useState(false);

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

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/warehouses/${deleteItemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            setData(data.filter(item => item.id !== deleteItemId));
            setIsModalOpen(false)
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = (itemId) => {
        setDeleteItem(itemId);
        setIsModalOpen(true);
    }

    const handleNameClick = (itemId) => {
        setSelectedItemId(selectedItemId === itemId ? null : itemId);
    };

    const toggleWarehouseForm = () => {
        setFormOpen(!isFormOpen);
    }

    return (
        <>
        <div className="form-button">
            <button onClick={toggleWarehouseForm}>
            Create Warehouse</button>
        </div>
        {isFormOpen && <WarehouseForm onCancel={toggleWarehouseForm} />}
        <div className="card-container">
          {data.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                street={item.street}
                city={item.city}
                state={item.state}
                zip={item.zip}
                capacity={item.capacity}
                onEditClick={() => handleEdit(item)}
                onDeleteClick={() => confirmDelete(item.id)}
                onNameClick={() => handleNameClick(item.id)}
                showSmallCard={selectedItemId === item.id}
              />
          ))}
        <DeleteModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                name="Warehouse"
            />
        </div>
        </>
      );
    }
    
    export default WarehouseMain;