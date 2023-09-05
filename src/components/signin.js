import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import axios from 'axios';
import './SignIn.css'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignIn = () => 
    {

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
    
    setIsLoading(true); 
    const apiUrl = `http://52.195.170.220:8080/login/${email}/${password}`

    axios 
      .get(apiUrl)
      .then((response) => {
        const userData = response.data[0]
      if (userData && userData.email.includes("man-")) {
        localStorage.setItem('userRole', 'manager');
        navigate('/manager');
      } 
      else if (userData && userData.email.includes("assis-")) {

        console.log("here")
        try{localStorage.setItem('userRole', 'assistant');}
        catch (error) {
         // Handle the error or log it
        console.error('Error setting userRole in localStorage:', error);
        }
        navigate('/assistant');
      }   
      })

      .catch((error) => {
        window.location.reload();
        alert('Incorrect credentials. Please try again.');
      })

      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <div className="container mt-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6 glossy-container">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Sign In</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


  );
}

export default SignIn;
