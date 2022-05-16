import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LoadingComponent from './Components/Loading.component';

export default function LoadingPage() {
  return (
    <Box sx={{  
                height: '100vh', 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <LoadingComponent />
    </Box>
  );
}