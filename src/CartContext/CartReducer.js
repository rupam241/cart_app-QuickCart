const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }] // Add item to cart with initial quantity of 1
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload) // Remove item from cart
            };

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, qty: action.payload.qty } // Update quantity of the specific item
                        : item
                )
            };

          


        default:
            return state; // Return current state if no matching action type
    }
};

export const productReducer = (state, action) => {

    switch (action.type) {
        case "SORT_BY_PRICE": {
            return {
                ...state,
                sort: action.payload,
            };
        }


        case "FILTER_BY_STOCK": {
            return {
                ...state,
                byStock: !state.byStock,
            };
        }

        case "FILTER_BY_RATING": {
            return {
                ...state,
                byRating: action.payload,
            };
        }


        case "FILTER_BY_DELIVERY": {
            return {
                ...state,
                byFastDelivery: !state.byFastDelivery,
            };
        }


        case "FILTER_BY_SEARCH": {
            return {
                ...state,
                searchQuery: action.payload,
            };
        }

        case "CLEAR_FILTERS": {
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
            }
        }

    
        
        default: return state;
    }
}

// CartReducer.js
export const loginValue = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                isLoggedIn: action.payload.isLoggedIn,
                image: action.payload.image,
            };
        case 'LOGOUT':
            return {
                username: '',
                password: '',
                isLoggedIn: false,
                image: '',
            };
        default:
            return state;
    }
};
  
export default cartReducer;
