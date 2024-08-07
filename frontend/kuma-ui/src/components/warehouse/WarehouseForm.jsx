/**
 * Uses DefaultForm.jsx to create a WarehouseForm with custom input fields.
 * Has two main functions:
 * 1. Allows user to create warehouse and add to the database.
 * 2. Allows user to edit existing warehouse and update to the database.
 * 
 * NOTE: WarehouseForm functions are based on input it receives.
 * Its function converts from CREATE to EDIT if a warehouseId input is received.
 */
import React, { useEffect, useState } from 'react';
import DefaultForm from '../form/DefaultForm';
import ApiRequest from '../webAPI/ApiRequest';
import GetRequest from '../webAPI/GetRequest'; // Assuming this is the component to fetch data
import { toast } from 'react-toastify';

function WarehouseForm({ warehouseId }) {
  const [isVisible, setIsVisible] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (warehouseId) {
      const url = `http://localhost:8080/warehouses/${warehouseId}`;
      GetRequest({ url, onSuccess: setInitialData });
    }
  }, [warehouseId]);

  const fields = [
    { name: 'name', label: 'Warehouse Name', required: true, select: false, type: 'text'},
    { name: 'city', label: 'City', required: true, select: false, type: 'text'},
    { name: 'state', label: 'State', required: true, select: true, type: 'text', options: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'DC', label: 'District of Columbia' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
    ]},
    { name: 'capacity', label: 'Max Capacity', required: true, select: false, type: 'text'},

  ];

  const handleSubmit = (data) => {
    const url = warehouseId ? `http://localhost:8080/warehouses/${warehouseId}` : 'http://localhost:8080/warehouses';
    const requestType = warehouseId ? 'PUT' : 'POST';
    ApiRequest({ url, formData: data, requestType });
    setIsVisible(false);
    toast.success(`Warehouse ${(warehouseId ? 'updated' : 'created')} successfully!`)
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <DefaultForm 
          formName="Warehouse Form" 
          fields={fields} 
          initialData={initialData}
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          buttonText={warehouseId ? "Update Warehouse" : "Create Warehouse"}
        />
      )}
    </>
  );
}

export default WarehouseForm;