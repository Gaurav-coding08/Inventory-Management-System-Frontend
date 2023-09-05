import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VIEW_REQUESTS = () => {

  const [requestsData, setrequestsData] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchrequestsData();
  }, []);

  const fetchrequestsData = () => {
    axios.get('http://52.195.170.220:8080/requests')
      .then((response) => {
        setrequestsData(response.data);
      })
      .catch((error) => {
        alert('Server loading try again..');
        navigate('/manager')
      });
  };


  const toggleRequestSelection = (requestId) => {
    // Toggle the selected state for the request with the given ID
    setSelectedRequests((prevSelectedRequests) => ({
      ...prevSelectedRequests,
      [requestId]: !prevSelectedRequests[requestId],
    }));
  };

  const approveAndAddItems = () => {
    // Filter the selected requests
    setIsLoading(true); 

    const selectedRequestIds = Object.keys(selectedRequests).filter(
      (requestId) => selectedRequests[requestId]
    );
    
    
    // Perform the "Approve & Add" action for each selected request
    selectedRequestIds.forEach((requestId) => {
      // Send an API request to add the item to your inventory
      // Assuming you have an API endpoint for this purpose

      const selectedRequest = requestsData.find((item) => item._id === requestId);


      // Create an object with only the desired fields
      const requestDataToSend = {
        productname: selectedRequest.productname,
        productcategory: selectedRequest.productcategory,
        stock: selectedRequest.stock,
        priceperunit: selectedRequest.priceperunit,
      };

      axios
        .post('http://52.195.170.220:8080/inventory', requestDataToSend)
        .then((response) => {
          // Handle the response as needed
          console.log(`Request ${requestId} approved and added.`);
        })
        .catch((error) => {
          console.error(`Error approving and adding request ${requestId}:`, error);
        });

      
      setTimeout(()=> {console.log("Loading...")}, 5000) 
      
      axios.delete('http://52.195.170.220:8080/requests',{ data: { id: requestId } })
      .then((response) => {
        // Handle the response as needed
        console.log('deleted');
        window.location.reload();
      })
      .catch((error) => {
        console.log("error")
        navigate('/manager')
      });
      });

    // After successfully adding items, you can reset the selectedRequests state
    setIsLoading(false); 
    setSelectedRequests({});
  };

  return (
    <div>
      <h1 className="text-center my-4" style={{ textDecoration: 'underline' }}>
        Request Dashboard
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Stock</th>           
            <th>Price per unit</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {requestsData.map((item) => (
            <tr key={item.id}>
              <td>
                <input 
                type="checkbox" 
                checked={selectedRequests[item._id]}
                onChange={() => toggleRequestSelection(item._id)}
                />
              </td>
              <td>{item.productname}</td>
              <td>{item.productcategory}</td>
              <td>{item.stock}</td>
              <td>{item.priceperunit}</td>
              <td>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={approveAndAddItems}>
          {isLoading ? 'Approving & Adding....' : 'Approve & Add Item'}
        </button>
      </div>
    </div>
  );
};

export default VIEW_REQUESTS;