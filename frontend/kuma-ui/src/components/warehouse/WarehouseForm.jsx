import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './WarehouseForm.css'

export default function WarehouseForm({ onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // useForm initializes: 
  // register: input fields with validation
  // handleSubmit: handles form submission

  // data: holds key value pairs of form data collected from register func
  const onSubmitForm = async (data) => {
    const warehouseData = {
      name: data.name,
      street: data.streetAddress,
      city: data.city,
      state: data.state,
      zip: data.zipCode,
      capacity: data.capacity,
    };

    try { // attempts to post warehouse data into db with user specified content
      const response = await fetch('http://localhost:8080/warehouses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // this tells the server the body is in JSON
        body: JSON.stringify(warehouseData),
      });
      if (!response.ok) {
        throw new Error('Response unsuccessful, not OK');
      }
      const result = await response.json();
      console.log(result);
      toast.success('Warehouse added successfully!');
      onCancel();
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Warehouse not added!");
    }
  };

  return (
    // warehouse form structure
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className='title'>Create Warehouse</h2>

      <div id='input-box'>
        <label htmlFor='name'>Warehouse Name</label>
        <input
          id='name'
          type='text'
          {...register('name', { required: 'Warehouse name is required' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div id='input-box'>
        <label htmlFor='streetAddress'>Street Address</label>
        <input
          id='streetAddress'
          type='text'
          {...register('streetAddress', { required: 'Street address is required' })} />
        {errors.streetAddress && <p style={{ color: 'red' }}>{errors.streetAddress.message}</p>}
      </div>

      <div id='input-box'>
        <label htmlFor='city'>City</label>
        <input
          id='city'
          type='text'
          {...register('city', { required: 'City is required' })} />
        {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
      </div>

      <div id='input-box'>
        <label htmlFor='state'>State</label>
        <input
          id='state'
          type='text'
          {...register('state', { required: 'State is required' })} />
        {errors.state && <p style={{ color: 'red' }}>{errors.state.message}</p>}
      </div>

      <div id='input-box'>
        <label htmlFor='zipCode'>Zip Code</label>
        <input
          id='zipCode'
          type='text'
          {...register('zipCode', { required: 'Zip code is required' })} />
        {errors.zipCode && <p style={{ color: 'red' }}>{errors.zipCode.message}</p>}
      </div>

      <div id='input-box'>
        <label htmlFor='capacity'>Capacity</label>
        <input
          id='capacity'
          type='text'
          {...register('capacity', { required: 'Capacity is required' })} />
        {errors.capacity && <p style={{ color: 'red' }}>{errors.capacity.message}</p>}
      </div>

<div className="buttons">
        <button type='submit'>Create</button>
        <button type='button' onClick={onCancel}>Cancel</button>
</div>
    </form>
    </div>
  );
}