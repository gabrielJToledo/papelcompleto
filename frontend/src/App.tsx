import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import './App.css';
import { useAppDispatch } from './store/hooks';

import Header from './presentation/templates/Header';
import Footer from './presentation/templates/Footer';
import Home from './presentation/home/Home';
import AdminLogin from './presentation/admin/AdminLogin';
import AdminDash from './presentation/admin/AdminDash';
import { useGetProductsFromDB } from './service/productsService';
import { useGetCategoriesFromDB } from './service/categoriesService';
import { getCurrentUserFromDB } from './store/ducks/user/actions';
import CreateProduct from './presentation/admin/createProduct/CreateProduct';
import CreateCategory from './presentation/admin/createCategory/CreateCategory';
import RegisteredCategories from './presentation/admin/registerCategories/RegisteredCategories';
import RegisteredProducts from './presentation/admin/registerProducts/RegisteredProducts';
import Products from './presentation/products/Products';
import CurrentProduct from './presentation/products/CurrentProduct';
import Cart from './presentation/cart/Cart';
import Register from './presentation/register/Register';
import Login from './presentation/login/Login';
import MyAccount from './presentation/myAccount/MyAccount';
import ProductsByCategory from './presentation/products/ProductsByCategory';

function App() {
  const dispatch = useAppDispatch()
  useGetProductsFromDB();
  useGetCategoriesFromDB();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const userPayload = localStorage.getItem('userPayload');
    if (userPayload) {
      const userData = JSON.parse(userPayload);

      dispatch(getCurrentUserFromDB(userData));
    }
  }, [dispatch]);

  return (
    <div className="app">
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/categoria/:id" element={<ProductsByCategory />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/produto/:id" element={<CurrentProduct />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDash />}>
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="createCategory" element={<CreateCategory />} />
          <Route path="registeredCategories" element={<RegisteredCategories />} />
          <Route path="registeredProducts" element={<RegisteredProducts />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/minha-conta" element={<MyAccount />} />
        <Route path="*" element={<Navigate to="/home" replace={true} />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
