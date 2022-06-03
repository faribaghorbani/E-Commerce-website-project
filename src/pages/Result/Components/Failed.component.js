import React from 'react'
import { Paper, Typography } from '@mui/material';
import RTL from '../../../components/RTL.component';
import { IoMdCloseCircle } from 'react-icons/io'

const FailedComponent = () => {
    return (
        <Paper className='failed-component' style={{textAlign: 'center'}}>
            <div className='banner'>
                <IoMdCloseCircle className='banner-icon'/>
            </div>
            <RTL>
                <Typography dir='rtl'>
                    خطا در پرداخت
                </Typography>
                <Typography dir='rtl'>
                    سفارش شما در انتظار پرداخت است
                </Typography>
            </RTL>
        </Paper>
    )
}

export default FailedComponent;
