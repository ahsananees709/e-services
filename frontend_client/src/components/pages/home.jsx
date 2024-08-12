import React from 'react'
import AuthWrapper from "../AuthWrapper"
import { useStateProvider } from "../context/StateContext";
import HeroBanner from "../Landing/HeroBanner";
import Companies from '../Landing/Companies';
import Category from '../Landing/Our Category';

const Home = () => {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  return (
    <div>
      <HeroBanner />
      <Companies />
      <Category />

    </div>
  )
}

export default Home
