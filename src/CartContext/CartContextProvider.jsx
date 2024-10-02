import React, { useReducer, useContext, useEffect } from "react";
import Cartcontext from "./Context";
import { faker } from "@faker-js/faker"; 
import cartReducer, { productReducer, loginValue } from "./CartReducer"; 

const CartContextProvider = ({ children }) => {
    // Creating an array of products using faker
    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 1000 }),
        image: faker.image.url(200, 200),
        inStock: faker.number.int({ min: 0, max: 10 }),
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

    // Load login data from local storage on component mount
    const initialLoginData = JSON.parse(localStorage.getItem('loginData')) || {
        username: '',
        password: '',
        isLoggedIn: false,
        image: '',
    };
   

    const [loginData, loginDispatch] = useReducer(loginValue, initialLoginData);

    console.log(loginData);

    // Update local storage whenever loginData changes
    useEffect(() => {
        localStorage.setItem('loginData', JSON.stringify(loginData));
    }, [loginData]);

    return (
        <Cartcontext.Provider value={{ state, dispatch, productState, productDispatch, loginData, loginDispatch }}>
            {children}
        </Cartcontext.Provider>
    );
};

export default CartContextProvider;

export const cartState = () => {
    return useContext(Cartcontext);
};
