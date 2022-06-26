import React from 'react'
import Footer from './../../components/Footer.component';
import Header from './Components/Header.component';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';



const RegularLayout = (props) => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{py: '50px'}}>
      {props.children}
      </Box>
      <Footer />
    </>
    
  )
}

export default RegularLayout;
