import React from 'react'
import Footer from './../../components/Footer.component';
import Header from './Components/Header.component';
import { CssBaseline } from '@mui/material';



const HomeLayout = (props) => {
  return (
    <>
    	<CssBaseline />
      <Header />
      {props.children}
      <Footer />
    </>
  )
}

export default HomeLayout;
