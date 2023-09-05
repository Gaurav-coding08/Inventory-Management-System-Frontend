import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ADD_ITEM_REMOVE = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    productname: '',
    productcategory: '',
    stock: '',
    priceperunit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://52.195.170.220:8080/inventory', formData);

      if (response.status === 200) {
  
        console.log('Product added successfully.');
        setFormData({
          productname: '',
          productcategory: '',
          stock: '',
          priceperunit: '',
        })
       
        
        navigate('/manager');
        
        ;

      } else {

        alert('Server loading try again..');
        navigate('/manager');
      }
    } catch (error) {
        alert('Server loading try again..');
        navigate('/manager');
    }
  };

  const handleReset = () => {
    setFormData({
      productname: '',
      productcategory: '',
      stock: '',
      priceperunit: '',
    });
  };


  return (
    <div className="container">
      <h2 className="mt-5">Add a New Product in the Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="productname"
            value={formData.productname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Category:</label>
          <input
            type="text"
            className="form-control"
            name="productcategory"
            value={formData.productcategory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Stock:</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price per Unit:</label>
          <input
            type="number"
            className="form-control"
            name="priceperunit"
            value={formData.priceperunit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};



export default ADD_ITEM_REMOVE;
