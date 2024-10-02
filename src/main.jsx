import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LayOut from './Outlet/LayOut.jsx'
import Home from './components/Home/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import Login from './components/Login/Login.jsx'
import SIgnup from './components/SignUp/SIgnup.jsx'
import CartContextProvider, { cartState } from './CartContext/CartContextProvider.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    
      <>
      <Route path='/' element={<LayOut />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SIgnup />} />

      </>



  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* CartContextProvider should wrap the entire app */}
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </StrictMode>,
)
