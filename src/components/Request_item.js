import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const REQUEST_ITEM = (userEmail) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    productname: '',
    productcategory:'',
    stock: '',
    priceperunit: '',
    note:'',
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
      const response = await axios.post('http://52.195.170.220:8080/requests', formData);

      if (response.status === 200) {
        
        console.log('Request added successfully.');
        setFormData({
          
            productname: '',
            productcategory:'',
            stock: '',
            priceperunit: '',
            note:'',
        })
        navigate('/assistant');
        ;

      } else {
        
        alert('Server loading try again..');
        navigate('/assistant');
      }
    } catch (error) {
        alert('Server loading try again..');
        navigate('/assistant');
    }
  };

  const handleReset = () => {
    setFormData({
    
        productname: '',
        productcategory:'',
        stock: '',
        priceperunit: '',
        note:'',
    });
  };

  return (
    <div className="container">
      <h2 className="mt-5">Request to Add a New Product in the Inventory</h2>
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
        <div className="mb-3">
          <label className="form-label">Note:</label>
          <input
            type="text"
            className="form-control"
            name="note"
            value={formData.note}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Request
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default REQUEST_ITEM;
