import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './Components/Pages/SignupLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ErrorBoundry from './Components/ProductDetails/ErrorBoundry';

import { CartProvider } from './context/CartContext.jsx';

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
            <Route path="/dashboard" element={<ErrorBoundry><Dashboard /></ErrorBoundry>} />
            <Route path="/product/:id" element={<ErrorBoundry><ProductPage /></ErrorBoundry>} />
            <Route path="/subproduct/:id" element={<ErrorBoundry><SubProduct /></ErrorBoundry>} />
            <Route path="/cart" element={<ErrorBoundry><CartSidebar /></ErrorBoundry>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
};

export default App;
