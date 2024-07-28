import React, { useEffect, useState } from 'react'

const WarehouseView = () => {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch('http://localhost:8080/warehouses');
                if(!response.ok) {
                    throw new Error('Failed to fetch warehouses');
                }
                const data = await response.json();
                setWarehouses(data);
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };
        fetchWarehouses();
    }, []);

  return (
    <>
    <div>WarehouseView</div>
    <div className="warehouse-list">
      <h2>Warehouses</h2>
      <ul>
        {warehouses.map((warehouse) => (
          <li key={warehouse.id}>
            {warehouse.name} - {warehouse.city}, {warehouse.state}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default WarehouseView;