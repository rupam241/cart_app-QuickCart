import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { cartState } from '../../CartContext/CartContextProvider';

function Signup() {
  // Accessing the cart state and login dispatch function
  const { loginData, loginDispatch } = cartState();

  // Logout handler
  const handleLogOut = () => {
    loginDispatch({
      type: 'LOGOUT',
      payload: {
        username: '',
        password: '',
        isLoggedIn: false,
        image: "",
      },
    });
  };

  // If user is not logged in, show a message and a link to log in
  if (!loginData.isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-white rounded shadow-md text-center">
          <h1 className="text-xl font-bold mb-4">You are not logged in.</h1>
          <Link to="/login" className="text-blue-500 hover:underline">
            Click here to log in.
          </Link>
        </div>
      </div>
    );
  }

  // If user is logged in, show the logout option
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-white rounded shadow-md text-center">
        <h1 className="text-xl font-bold mb-4">you want to logout from {loginData.username}?</h1>
        <button
          onClick={handleLogOut}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Signup;
