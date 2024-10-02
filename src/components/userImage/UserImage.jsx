// UserAvatar.jsx
import React from 'react';
import { cartState } from '../../CartContext/CartContextProvider';

const UserAvatar = ({ username }) => {
  // Get the first letter of the username
  const firstLetter = username.charAt(0).toUpperCase();

  // Define a style for the avatar
  const avatarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px', // Set width for the avatar
    height: '50px', // Set height for the avatar
    borderRadius: '50%', // Make it circular
    backgroundColor: '#4CAF50', // You can change this to any color you like
    color: 'white', // Text color
    fontSize: '24px', // Font size for the letter
    fontWeight: 'bold', // Make the letter bold
  };

  return (
    <div style={avatarStyle}>
      {firstLetter}
    </div>
  );
};

export default UserAvatar;
