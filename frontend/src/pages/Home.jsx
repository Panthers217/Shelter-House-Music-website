// src/components/About.js
import React from 'react';
import Feature from '../components/Feature';
import NewArrivals from '../components/NewArrivals';
import Artist from '../components/Artist';
import Videos from '../components/Videos';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <section>
      <h2>Home Page</h2>
        <p>Welcome to Soul Felt Music!</p>
      <NewArrivals />
      <Feature />
      <Artist />
      <Videos />
      <Community />
      <Footer />
    </section>
  );
};

export default Home;
