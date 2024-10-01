import React from 'react';
import Rating from '../Rating/Rating';
import { cartState } from '../../CartContext/CartContextProvider';
import { useEffect } from'react';

function SingleProduct({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = cartState();
  useEffect(() => {
    console.log(cart);
  }, [cart]); // This ensures it only logs when 'cart' changes

  

  return (
    <div className='flex flex-col p-4 border-b w-[30%] h-auto m-2 bg-slate-300'>
      <img src={prod.image} alt={prod.name} className='w-full h-60 object-cover mb-2' />
      <div className='mt-3'>
        <h1 className='text-2xl font-semibold'>{prod.name}</h1>
        <h2 className='text-xl'>${Math.floor(prod.price)}</h2>

        {prod.fastDelivery ? (
          <div className='text-md'>Fast Delivery</div>
        ) : (
          <div className='text-md'>4 days Delivery</div>
        )}

        <Rating rating={prod.rating} />
        <div className='flex gap-2 mt-3'>
          {cart.some(p => p.id ===prod.id) ? (
            <button
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: prod.id }); // Pass the product ID for removal
              }}
              className='bg-red-500 p-3 rounded-md'
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: prod });
              }}
              disabled={!prod.inStock}
              className='cursor-pointer bg-green-400 p-5 rounded-md'
            >
              {!prod.inStock ? "Out of stock" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
