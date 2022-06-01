import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import './style/PaymentBill.scss'
import { Link, useNavigate } from 'react-router-dom';

const PaymentBill = () => {
    const navigate = useNavigate()
    const basketProducts = useSelector(state => state.basketProducts)
    const [totalPurchase, setTotalPurchase] = useState(() => {
        let sum = 0
        Object.entries(basketProducts).forEach(item => {
            if (item[1].status == 'normal' ||  item[1].status == 'not-enough') {
                sum += (item[1].quantity*item[1].product.price)
            }
        })
        return sum
    })
    const [totalProducts, setTotalProducts] = useState(() => {
        let sum = 0
        Object.entries(basketProducts).forEach(item => {
            if (item[1].status == 'normal' ||  item[1].status == 'not-enough') {
                sum += (item[1].quantity)
            }
        })
        return sum
    })

    const goToPaymentForm = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        let sumPurchase = 0
        let sumProducts = 0
        Object.entries(basketProducts).forEach(item => {
            if (item[1].status == 'normal' ||  item[1].status == 'not-enough') {
                sumPurchase += (item[1].quantity*item[1].product.price)
                sumProducts += (item[1].quantity)
            }
        })
        setTotalPurchase(sumPurchase)
        setTotalProducts(sumProducts)
    }, [basketProducts])

    return (
        <Paper className='payment-bill' dir='rtl' elevation={5}>
            <h4 className='title'>جمع تعداد کالاها:</h4>
            <h3 className='price'>{totalProducts}</h3>
            <h4 className='title'>جمع سبد خرید:</h4>
            <h3 className='price'>{totalPurchase}</h3>
            <Button className='continue' variant="contained" fullWidth disabled={totalProducts == 0} onClick={goToPaymentForm}>ادامه</Button>
        </Paper>
    )
}

export default PaymentBill;
