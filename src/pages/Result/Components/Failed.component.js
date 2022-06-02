import React from 'react'
import { Paper, Typography } from '@mui/material';
import RTL from '../../../components/RTL.component';
import { IoMdCloseCircle } from 'react-icons/io'

const FailedComponent = () => {
    return (
        <Paper className='failed-component'>
            <div className='banner'>
                <IoMdCloseCircle />
            </div>
            <RTL>
                <Typography dir='rtl'>
                    پرداخت موفقیت آمیز بود
                </Typography>
                <Typography dir='rtl'>
                    سفارش شما ثبت شده است و برای هماهنگی جهت ارسال، متعاقبا با شما تماس گرفته خواهد شد.
                </Typography>
            </RTL>
        </Paper>
    )
}

export default FailedComponent;
