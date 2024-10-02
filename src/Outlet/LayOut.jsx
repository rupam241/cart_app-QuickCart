import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { cartState } from '../CartContext/CartContextProvider';
import Header from '../components/Header/Header'; // Import your Header or any other main components

const LayOut = () => {
  const { loginData } = cartState(); // Accessing the login data from context

  // Retrieve username from local storage
  const localData = JSON.parse(localStorage.getItem('loginData'));

  // Check if the user is logged in and matches the local storage username
  const isLoggedIn = loginData.username && (localData && localData.username === loginData.username);

  return (
    <div>
      { isLoggedIn? (
        <>
          <Header /> {/* Render your header or navigation bar */}
          <Outlet /> {/* Render the nested routes */}
        </>
      ) : (
        <Navigate to="/login" /> // Redirect to the login page if not logged in
      )}
    </div>
  );
};

export default LayOut;
