import React from 'react'
import Footer from './Components/Footer.component';
import Header from './Components/Header.component';
import './Components/style/Header.scss'



const HomeLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}

export default HomeLayout;
