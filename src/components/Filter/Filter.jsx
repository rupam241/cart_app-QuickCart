import React, { useState } from 'react';
import Rating from '../Rating/Rating';
import { cartState } from '../../CartContext/CartContextProvider';

function Filter() {
  const { state: { products } } = cartState();
  const { productState: { byRating, byStock, sort, byFastDelivery, searchQuery }, productDispatch } = cartState();
  
  const [rate, setRate] = useState();

  // console.log(byRating, byStock, byFastDelivery, sort, searchQuery);

  return (
    <>
      <div className='bg-slate-500 text-white p-5 flex flex-col w-80 m-2 h-[80vh] rounded-lg'>
        <span className='text-lg font-semibold mb-4'>
          Filter Products
        </span>

        {/* Sorting Section */}
        <div className='flex flex-col gap-3 mb-4'>
          <div className="flex items-center">
            <input
              type="radio"
              name="sort"
              id="inline-1"
              className="mr-2"
              onChange={() => productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })}
              checked={sort === "lowToHigh"}
            />
            <label htmlFor="inline-1" className="cursor-pointer">
              Ascending
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              name="sort"
              id="inline-2"
              className="mr-2"
              onChange={() => productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })}
              checked={sort === "highToLow"}
            />
            <label htmlFor="inline-2" className="cursor-pointer">
              Descending
            </label>
          </div>
        </div>

        {/* Stock and Delivery Filters */}
        <div className='flex flex-col gap-3 mb-4'>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="stock"
              id="inline-3"
              className="mr-2"
              onChange={() => {
                productDispatch({
                  type: "FILTER_BY_STOCK",
                  payload: !byStock,  // Toggle the stock filter value
                });
              }}
              checked={byStock}  // Bind the checkbox to the stock filter state
            />
            <label htmlFor="inline-3" className="cursor-pointer">
              Include out of stock
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="delivery"
              id="inline-4"
              className="mr-2"
              onChange={() =>
                productDispatch({
                  type: "FILTER_BY_DELIVERY",
                  payload: !byFastDelivery,  // Toggle fast delivery filter
                })
              }
              checked={byFastDelivery}  // Bind checkbox to the delivery filter state
            />
            <label htmlFor="inline-4" className="cursor-pointer">
              Fast Delivery
            </label>
          </div>
        </div>

        {/* Rating Filter */}
        <div className='mb-4 flex '>
          <label htmlFor="rating" className='pr-10'>Rating</label>
          <Rating
            rating={byRating}
            onClick={(i) => productDispatch({
              type: "FILTER_BY_RATING",
              payload: i,
            })}
            className='cursor-pointer flex flex-row'
          />
        </div>

        {/* Clear Filters Button */}
        <button 
          className='bg-red-500 text-white py-2 px-4 rounded-lg mt-auto hover:bg-red-600' 
          onClick={() => {
            productDispatch({
              type: "CLEAR_FILTERS",  // Dispatch the clear filter action
            });
          }}
        >
          Clear Filters
        </button>
      </div>
    </>
  );
}

export default Filter;
