/**
 * Uses DefaultForm.jsx to create a ProductForm with custom input fields.
 * Has two main functions:
 * 1. Allows user to create product and add to the database.
 * 2. Allows user to edit existing product and update to the database.
 * 
 * NOTE: Product functions are based on input it receives.
 * Its function converts from CREATE to EDIT if a productId input is received.
 */
import React, { useEffect, useState } from 'react';
import DefaultForm from '../form/DefaultForm';
import ApiRequest from '../webAPI/ApiRequest';
import GetRequest from '../webAPI/GetRequest'; // Assuming this is the component to fetch data

function ProductForm({ productId }) {
  const [isVisible, setIsVisible] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (productId) {
      const url = `http://localhost:8080/products/${productId}`;
      GetRequest({ url, onSuccess: setInitialData });
    }
  }, [productId]);

  const fields = [
    { name: 'name', label: 'PRODUCT NAME', required: true, select: false, type: 'text'},
    { name: 'category', label: 'CATEGORY', required: true, select: false, type: 'text', options: [
        { value: '1', label: 'Clothes' },
        { value: '2', label: 'Furniture' },
        { value: '3', label: 'Food' },
    ]},
    { name: 'description', label: 'DESCRIPTION', required: true, select: false, type: 'text'},
    { name: 'price', label: 'PRICE', required: true, select: false, type: 'number'},
    { name: 'sku', label: 'SKU', required: true, select: false, type: 'text'},
  ];

  const handleSubmit = (data) => {
    const url = productId ? `http://localhost:8080/products/${productId}` : 'http://localhost:8080/products';
    const requestType = productId ? 'PUT' : 'POST';
    ApiRequest({ url, formData: data, requestType });
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <DefaultForm 
          formName="Product Form" 
          fields={fields} 
          initialData={initialData}
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          buttonText={productId ? "Update Product" : "Create Product"}
        />
      )}
    </>
  );
}

export default ProductForm;