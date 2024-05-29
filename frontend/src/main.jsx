import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { AuthContextProvider } from './context/AuthContext.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { useLocation } from 'react-router-dom'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { Provider } from 'react-redux'
import store from './store.js'


import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import AllCarsScreen from './screens/AllCarsScreen.jsx'
import NewCarDetailsScreen from './screens/NewCarDetailsScreen.jsx'
import NewCarsScreen from './screens/NewCarsScreen.jsx'
import UsedCarsScreen from './screens/UsedCarsScreen.jsx'
import AboutUsScreen from './screens/AboutUsScreen.jsx'
import UsedCarDetailsScreen from './screens/UsedCarDetailsScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import CarsListScreen from './screens/admin/CarsListScreen.jsx'
import NewCarEditScreen from './screens/admin/NewCarEditScreen.jsx'
import UsedCarEditScreen from './screens/admin/UsedCarEditScreen.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
import UserEditScreen from './screens/admin/UserEditScreen.jsx'
import ProfileScreen from './screens/admin/ProfileScreen.jsx'
import ArticleScreen from './screens/ArticleScreen.jsx'
import AdminChatScreen from './screens/AdminChatScreen.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>} />;
      <Route path='/cars' element={<AllCarsScreen/>} />;


      <Route path='/newcars/' element={<NewCarsScreen/>} />;
      <Route path='/newcars/:id' element={<NewCarDetailsScreen/>} />;

      <Route path='/usedcars/' element={<UsedCarsScreen/>} />;
      <Route path='/usedcars/:id' element={<UsedCarDetailsScreen/>} />;


      <Route path='/about' element={<AboutUsScreen/>} />;

      <Route path='/article' element={<ArticleScreen/>} />;

      <Route path='/messages' element={<AdminChatScreen/>} />;
    

      <Route path='/login' element={<LoginScreen/>} />;
      <Route path='/register' element={<RegisterScreen/>} />;
      

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen/>} />;
        <Route path='/payment' element={<PaymentScreen/>} />;
        <Route path='/placeorder' element={<PlaceOrderScreen/>} />;
        <Route path='/cart' element={<CartScreen/>} />;
        <Route path='/order/:id' element={<OrderScreen/>} />;
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>} />;
        <Route path='/admin/carlist' element={<CarsListScreen/>} />;
        <Route path='/admin/userlist' element={<UserListScreen />} />;

        <Route path='/admin/newcar/:id/edit' element={<NewCarEditScreen/>} />;
        <Route path='/admin/usedcar/:id/edit' element={<UsedCarEditScreen/>} />
        
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>


    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
    <PayPalScriptProvider deferLoading={ false }>
      <RouterProvider router={router} />
      </PayPalScriptProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
)
