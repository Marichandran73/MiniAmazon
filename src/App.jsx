import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './Components/Pages/SignupLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider } from './Context/CartContext.jsx';

// Lazy-loaded components
const Dashboard = lazy(() => import('./Dashboard'));
const Navbars = lazy(() => import('./Components/Pages/MyNavbar'));
const SignupLogin = lazy(() => import('./Components/Pages/SignupLogin'));
const ProductPage = lazy(() => import('./Components/ProductDetails/ProductPage'));
const SubProduct = lazy(() => import('./Components/ProductDetails/SubProduct'));
const CartSidebar = lazy(() => import('./Components/ProductDetails/CardSidebar'));

const App = () => {
  return (
    <CartProvider>
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/subproduct/:id" element={<SubProduct />} />
        <Route path="/cart" element={<CartSidebar />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Suspense>
  </Router>
</CartProvider>

  );
};

export default App;
