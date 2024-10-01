import React from 'react';
import Filter from '../Filter/Filter';
import SingleProduct from '../SingleProduct/SingleProduct';
import { cartState } from '../../CartContext/CartContextProvider';

function Home() {
  const { state: { products }, productState: { byRating, byStock, sort, byFastDelivery, searchQuery } } = cartState();
  console.log(products);

  const transformProduct = () => {
    let sortedProducts = [...products]; // Create a copy to avoid mutating the original array

    // Sorting
    if (sort) {
      sortedProducts.sort((a, b) => {
        if (sort === "lowToHigh") {
          return a.price - b.price; // Ascending
        } else if (sort === "highToLow") {
          return b.price - a.price; // Descending
        }
        return 0; // No change if sort value is not recognized
      });
    }

    // Filtering by stock
   if(!byStock){
     sortedProducts = sortedProducts.filter(prod => prod.inStock);
   }
    // Filtering by fast delivery
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(prod => prod.fastDelivery);
    }

       // Filtering by  rating
    if(byRating){
      sortedProducts = sortedProducts.filter(prod => prod.rating === byRating);
    }
  
    // Filtering by search query
   
    if(searchQuery){
      sortedProducts = sortedProducts.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return sortedProducts;
  };

  return (
    <>
      <div className='flex gap-2 p-2 '>
        <div className='flex '>
          <Filter />
        </div>
        <div className='flex w-[78%] p-5 flex-wrap justify-around '>
          {transformProduct().map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
