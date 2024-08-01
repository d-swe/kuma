import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset, Form, Label, Button, RequiredMarker, ComboBox, Table } from '@trussworks/react-uswds';
import TextInput from './TextInput';
import Select from './Select';
import './DefaultForm.css';

function DefaultForm({ 
  formName, 
  fields, 
  initialData,
  onSubmit, 
  onCancel, 
  isOrder,
  productsData,
  buttonText = 'Submit' 
}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit(onSubmit)} large>
        <Fieldset legend={formName} className="title" legendStyle="large">
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <Label htmlFor={field.name}>
                {field.label} {field.required && <RequiredMarker />}
              </Label>
              {field.select ? (
                <Select className='usa-select'
                  id={field.name}
                  name={field.name}
                  {...register(field.name, {
                    required: field.required && `${field.label} is required`,
                    validate: field.validate,
                  })}
                > 
                  <option value="">- Select -</option>
                  {field.options && field.options.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              ) : (
                <TextInput className='usa-input'
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  {...register(field.name, {
                    required: field.required && `${field.label} is required`,
                    validate: field.validate,
                  })}
                />
              )}
              {errors[field.name] && (
                <p style={{ color: 'red' }}>{errors[field.name].message}</p>
              )}
            </div>
          ))}
          {isOrder && (
          <div className="product-table">
            <Label htmlFor="product-table">Available Products</Label>
            <Table bordered>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map(product => (
                  <tr key={product.id}>
                    <td className='checkbox'>
                      <input type="checkbox" name={`product-${product.id}`} value={product.id} />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>
                      <input
                        type="number"
                        name={`quantity-${product.id}`}
                        min="1"
                        className="quantity-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div> )}
        <div className="form-buttons">
          <Button type="submit">{buttonText}</Button>
          <Button type="button" onClick={onCancel}>Cancel</Button>
        </div>
        </Fieldset>
      </Form>    
    </div>

  );
}

export default DefaultForm;