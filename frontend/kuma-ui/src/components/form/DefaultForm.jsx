/**
 * Default form is used as the base for all forms.
 */
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

  // setting data for edit form
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  return (
    <div className="form-container">
      {/** onSubmit will take inputs and send it on post or put depending on use case */}
      <Form onSubmit={handleSubmit(onSubmit)} large>
        <Fieldset legend={formName} className="title" legendStyle="large">
          {/** fields retrieved from previous form */}
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <Label htmlFor={field.name}>
                {field.label} {field.required && <RequiredMarker />}
              </Label>
              {/** any fields with select: true provided will trigger this to create a select drop down in form */}
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
                  <th>Product Id</th>
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
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
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