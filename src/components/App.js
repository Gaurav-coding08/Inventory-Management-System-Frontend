import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import SignIn from './signin';
import Assistant from './assistant';
import Manager from './managerdash';
import ADD_ITEM_REMOVE from './Add_item_remove';
import REQUEST_ITEM from './Request_item';
import VIEW_REQUESTS from './view_requests';


function App() {
  
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);


  return  (  
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/Add_item_remove" element={<ADD_ITEM_REMOVE/>} />
      <Route path="/Request_item" element={<REQUEST_ITEM   />} />
      <Route path="/view_requests" element={<VIEW_REQUESTS   />} />
    </Routes>
);
}
export default App;
