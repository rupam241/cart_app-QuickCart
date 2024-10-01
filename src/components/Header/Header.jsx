import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { cartState } from '../../CartContext/CartContextProvider';

function Header() {
  const { state: { cart },dispatch,productState:{searchQuery},productDispatch } = cartState();
  
  return (
    <header className="p-4 w-full">
      <div className="bg-slate-400 flex items-center justify-between p-4">
        {/* Logo or Title */}
        <Link to="" className="text-2xl font-bold">
          SHOPPING CART
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="border-none outline-none w-60"
            onChange={(e)=>{
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload:e.target.value,


  
            })}
          }
          />
          <button>
            <CiSearch className="text-2xl" />
          </button>
        </div>

        {/* Cart with Hover Dropdown */}
        <div className="relative group">
          <Link to="cart" className="flex items-center justify-center gap-1 bg-slate-500 p-3 rounded-md">
            <CiShoppingCart size={32} />
            <p>{cart.length}</p>
          </Link>

          {/* Dropdown Menu (hidden by default, shown on hover) */}
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
            <div className="p-4 text-gray-700">
              <p className="font-semibold">Your Cart</p>
              <hr className="my-2" />

              {/* Dynamically populate this */}
              {cart.length > 0 ? (
                cart.map((prod) => (
                  <div key={prod.id} className='flex items-center justify-between mb-2 cursor-pointer'>
                    <span className="flex items-center gap-2">
                      <img src={prod.image} alt="Product" className="w-20 h-20 rounded-full" />
                      <h1>{prod.name}</h1>
                    </span>
                    <button onClick={()=>{
                      dispatch({type: "REMOVE_FROM_CART", payload: prod.id})
                    }}>
                      <MdDelete size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}

              <Link to="cart" className="block mt-2 text-blue-500 hover:underline">
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <Link to="login" className="text-lg font-medium">
            Login
          </Link>
          <Link to="signup" className="text-lg font-medium">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
