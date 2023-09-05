
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'react-google-charts';


const Manager = () => {


  const [inventoryData, setInventoryData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
  
    axios.get('http://52.195.170.220:8080/inventory')
      .then((response) => {
        setInventoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      });
  };


  const navigateToAddItem = () => {

    const key = Date.now().toString();
    navigate('/Add_item_remove');

  };
  
  const navigateToSeeRequests = () => {
    navigate('/view_requests');
  }
  
  const updateProduct = (itemId) => {
    const updatedProduct = editedData[itemId];
    
      axios.put(`http://52.195.170.220:8080/inventory/${itemId}`, updatedProduct)
      .then(() => {
        fetchInventoryData();
        console.log('Updated product');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  const deleteSelectedItems = () => {    
    const selectedRequestIds = Object.keys(selectedItems).filter(
      (itemId) => selectedItems[itemId]
    );
  
    selectedRequestIds.forEach((itemId) => { 
      console.log(itemId)
      axios.delete('http://52.195.170.220:8080/inventory', { data: { id: itemId } })
      .then(() => {
        console.log('Deleted selected items');
        fetchInventoryData(); 
      })
      .catch((error) => {
        console.error('Error deleting selected items:', error);
      });

    });

    setSelectedItems({});

  };

  
  const handleEditChange = (itemId, fieldName, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [itemId]: {
        ...prevEditedData[itemId],
        [fieldName]: value,
      },
    }));
  };

  const formatInventoryDataForChart = (inventoryData) => {
  
    const uniqueCategories = {};
    inventoryData.forEach((item) => {
      const { productcategory, stock } = item;
      if (!uniqueCategories[productcategory]) {
        uniqueCategories[productcategory] = stock;
      } else {
        uniqueCategories[productcategory] += stock;
      }
    });
    const chartData = [['Product Category', 'Total Stock']];
    for (const category in uniqueCategories) {
      chartData.push([category, uniqueCategories[category]]);
    }
    return chartData;
  };


  return (
    <div>
      <h1 className="text-center my-4" style={{ textDecoration: 'underline' }}>
        Manager Dashboard
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
            <tr key={item._id}>
              <td>
              <input 
                  type="checkbox"
                  checked={selectedItems[item._id]}
                  onChange={() => toggleItemSelection(item._id)}
                  />
              </td>
              <td>{item._id}</td>
              <td>
                <input
                  type="text"
                  value={editedData[item._id]?.productname || item.productname}
                  onChange={(e) => handleEditChange(item._id, 'productname', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedData[item._id]?.productcategory || item.productcategory}
                  onChange={(e) => handleEditChange(item._id, 'productcategory', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={editedData[item._id]?.stock || item.stock}
                  onChange={(e) => handleEditChange(item._id, 'stock', parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={editedData[item._id]?.priceperunit || item.priceperunit}
                  onChange={(e) => handleEditChange(item._id, 'priceperunit', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={() => updateProduct(item._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={navigateToSeeRequests}>
          View Requests
        </button>
        <button className="btn btn-success ml-2" onClick={navigateToAddItem}>
          Add Item
        </button>
        <button className="btn btn-danger ml-2" onClick={deleteSelectedItems}>
          Remove Item
        </button>
      </div>


      <div className="mt-4">
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={formatInventoryDataForChart(inventoryData)}
          options={{
            title: 'Inventory by Product Category',
            pieHole: 0.4,
          }}
        />
      </div>

    </div>
  );
};

export default Manager;

