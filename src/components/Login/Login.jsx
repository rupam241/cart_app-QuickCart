import React, { useState, useEffect } from 'react';
import { cartState } from '../../CartContext/CartContextProvider';
import { Navigate } from 'react-router-dom';
import UserAvatar from '../userImage/UserImage';
function Login() {
  const { loginData, loginDispatch } = cartState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(3);
  

  // Check if the user is already logged in and redirect if necessary
  if (loginData.username) {
    return <Navigate to="/" />; // Redirect without reloading
}
  

  const handleData = (e) => {
    e.preventDefault(); // Prevents the form from submitting the traditional way

    // Dispatch login action
    loginDispatch({
      type: 'LOGIN',
      payload: {
        username: email,
        password: password,
        isLoggedIn: true,
        image: image,
      },
    });
  };

  const localData = JSON.parse(localStorage.getItem('loginData'));
  
  return (
   
    <form
    
      onSubmit={handleData}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto mt-10"
    >
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <span className="text-gray-600">Enter to get unlimited access to products</span>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="pass" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="pass"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default Login;
