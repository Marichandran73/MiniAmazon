import React, { useState, useEffect } from 'react';
import './Components/Pages/SignupLogin.css';
import Navbar from './Components/Pages/MyNavbar';
import Header from './Components/Pages/Header';

import './Components/Pages/Header.css';


import './Components/Products/Card.css';


import Static2 from './Components/Products/Static2';
import Allproduct from './Components/Products/Allproduct';

import Footer from './Components/Pages/Footer';

const Dashboard = () => {
  const [currDate, setCurrDate] = useState(null); 

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrDate(date.toLocaleString()); 
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
    <div className="Nav_Section">
    <Navbar/>
    <Header/>
    </div>

    <div className="Container">
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
  <figure></figure>
    <div className="second">
        <h1>WELCOME TO My shoping platform </h1>

        <h3>The time is: {currDate}</h3> 
    </div>
  
</div>


  <div className="pro-grid">
  {Static2.map((section) => (
    <Allproduct 
      key={section.id} 
      title={section.title} 
      description={section.description} 
      images={section.images} 
      caption={section.caption}  /> 
  ))}
</div>

<Footer/>
    </>
  );
};

export default Dashboard;
