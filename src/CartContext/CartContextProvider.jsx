import React, { useReducer, useContext } from "react";
import Cartcontext from "./Context";
import { faker } from "@faker-js/faker"; 
import cartReducer from "./CartReducer";
import { productReducer } from "./CartReducer";

// faker.seed(99);

const CartContextProvider = ({ children }) => {
    // Creating an array of products using faker
    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),  // Correct method for generating UUID (use faker.datatype.uuid() if needed)
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 1000 }), // Price generation
        image: faker.image.url(200, 200), // Ensure this method works in your version of Faker
        inStock: faker.number.int({ min: 0, max: 10 }), // Returns a number between 0 and 10
        fastDelivery: faker.datatype.boolean(),
        rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));

    // Manage the state using useReducer
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    });

    return (
        <Cartcontext.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cartcontext.Provider>
    );
};

export default CartContextProvider;

export const cartState = () => {
    return useContext(Cartcontext);
};
