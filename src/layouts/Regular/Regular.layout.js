import React from 'react'
import Header from './Components/Header.component';



const RegularLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}

export default RegularLayout;
