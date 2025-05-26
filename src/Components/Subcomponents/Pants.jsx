import React from 'react';
import Card from './Card';
import Static from './Static';
import Navbar from '../Pages/MyNavbar';
import Footer from '../Pages/Footer';

const Pants = () => {
 
  return (
    <>
    <Navbar/>
    <div className="Pant-card">

      
      { Static.map((product) => (
        <Card
        key={product.id}
        name={product.name}
          price={product.price}
          image={product.image}
          />
        ))}
    </div>
    <Footer/>

    </>
  )
}

export default Pants