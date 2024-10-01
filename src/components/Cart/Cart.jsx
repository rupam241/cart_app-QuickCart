import React, { useEffect, useState } from 'react';
import { cartState } from '../../CartContext/CartContextProvider';
import Rating from '../Rating/Rating';
import { AiFillDelete } from 'react-icons/ai';

function Cart() {
  const [total, setTotal] = useState(0); // Initialize total

  const { state: { cart }, dispatch } = cartState();

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, curr) => {
      return acc + Number(curr.price) * curr.qty; // Correctly accumulate price based on qty
    }, 0); // Initialize accumulator to 0
    setTotal(calculatedTotal);
  }, [cart]);

  // Function to handle quantity change
  const handleQuantityChange = (prodId, qty) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: {
        id: prodId,
        qty: qty
      }
    });
  };

  return (
    <div className='flex flex-col lg:flex-row items-start justify-between p-6 gap-8 bg-gray-100 min-h-screen'>
      {/* Cart Items */}
      <div className='w-full lg:w-3/4 flex flex-col bg-white shadow-lg rounded-md p-6'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className='text-gray-600'>Your cart is empty</p>
        ) : (
          cart.map((prod) => (
            <div
              key={prod.id}
              className='flex items-center justify-between p-4 mb-4 border-b border-gray-200'
            >
              <img
                src={prod.image} // Assuming there's an image for the product
                alt={prod.name}
                className='w-20 h-20 object-cover rounded-md'
              />
              <div className='flex flex-col items-start'>
                <span className='text-lg font-medium text-gray-700'>{prod.name}</span>
                <span className='text-sm text-gray-500'>
                  ${prod.price.toFixed(2)} each
                </span>
                <Rating rating={prod.rating} />
              </div>

              {/* Quantity Dropdown */}
              <div className='flex items-center'>
                <select
                  value={prod.qty}
                  onChange={(e) =>
                    handleQuantityChange(prod.id, Number(e.target.value))
                  }
                  className='ml-4 border border-gray-300 rounded-md p-2 text-gray-700'
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Price for the Item */}
              <div className='text-lg font-semibold text-gray-700'>
                ${(prod.price * prod.qty).toFixed(2)}
              </div>
              <button onClick={()=>{

                dispatch(
                  { type: "REMOVE_FROM_CART", payload: prod.id }
                ); 

              }}><AiFillDelete/></button>
            </div>
          ))
        )}

        
      </div>

      {/* Cart Summary */}
      <div className='w-full lg:w-1/4 bg-white shadow-lg rounded-md p-6'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Order Summary</h2>
        <div className='flex justify-between mb-2'>
          <span className='text-gray-600'>Subtotal</span>
          <span className='font-semibold text-gray-700'>
            ({cart.length} items)
          </span>
        </div>
        <div className='flex justify-between mb-4'>
          <span className='text-gray-600'>Total</span>
          <span className='font-semibold text-lg text-gray-700'>
            ${total.toFixed(2)}
          </span>
        </div>
        <button className='w-full bg-blue-600 text-white rounded-md p-3 font-medium hover:bg-blue-700 transition duration-200'>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
