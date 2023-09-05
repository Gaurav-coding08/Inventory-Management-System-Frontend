import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Assistant = () => {

  const [inventoryData, setInventoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    // axios.get('http://localhost:8080/inventory')
    axios.get('http://52.195.170.220:8080/inventory')
      .then((response) => {
        setInventoryData(response.data);
      })
      .catch((error) => {
        alert('Server loading try again..');
        navigate('/manager')
      });
  };

  const torequest = () => {
    navigate('/Request_item')
  }
  return (
    <div>
      <h1 className="text-center my-4" style={{ textDecoration: 'underline' }}>
        Assistant Dashboard
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Stock</th>           
            <th>Price per unit</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item._id}</td>
              <td>{item.productname}</td>
              <td>{item.productcategory}</td>
              <td>{item.stock}</td>
              <td>{item.priceperunit}</td>
              <td>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={torequest}>
          Request to Add Item
        </button>
      </div>
    </div>
  );
};

export default Assistant;

