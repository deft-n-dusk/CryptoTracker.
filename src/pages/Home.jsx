import React from 'react'
import Header from "../Components/Common/Header";
import MainComponent from "../Components/LandingPage/MainComponent"
import Footer from '../Components/Common/Footer';

function Home() {
  return (
    <div>
        <Header/>
        <MainComponent/>
        <Footer/>
    </div>
  )
}

export default Home