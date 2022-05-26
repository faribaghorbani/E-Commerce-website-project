import React from 'react'
import Footer from './Components/Footer.component';
import Header from './Components/Header.component';



const RegularLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}

export default RegularLayout;
