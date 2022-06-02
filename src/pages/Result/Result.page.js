import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './ResultPage.scss'
import { Container } from '@mui/material';
import FailedComponent from './Components/Failed.component';
import SucceedComponent from './Components/Succeed.component';
import NotfoundPage from '../Notfound/Notfound.page';
import axios from 'axios';
import { emptyBasketProducts } from '../../redux/slices/basketProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ResultPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const basketProducts = useSelector(state => state.basketProducts)

    useEffect(() => {
        const orderId = +localStorage.getItem('order')
        if (params.status == 'succed' && orderId) {
            let requests = []
            Object.entries(basketProducts).forEach(([id, info]) => {
                if (info.status == 'normal') {
                    let newQuantity = Number(info.product.quantity) - Number(info.quantity)
                    let tempRequest = axios.patch(`/products/${id}`, {quantity: newQuantity})
                    console.log(newQuantity)
                    requests = [...requests, tempRequest]
                }
            })
            Promise.all(requests)
            .then(res => {
                axios.patch(`/orders/${orderId}`, {
                    orderStatusId: 1
                })
                dispatch(emptyBasketProducts())
                // localStorage.setItem('state', JSON.stringify({'basketProducts':{}}))
            })
            .catch(err => {
                axios.patch(`/orders/${orderId}`, {
                    orderStatusId: 4
                })
            })

        } else if (params.status == 'failed' && orderId) {
            axios.patch(`/orders/${orderId}`, {
                orderStatusId: 3
            })
        }
        localStorage.removeItem('order')
    }, [params])

    return (
        <Container maxWidth='xl' className='result-page'>
            {params.status == 'failed'? <FailedComponent/>
            :<SucceedComponent/>
            }

        </Container>
    )
}

export default ResultPage;
