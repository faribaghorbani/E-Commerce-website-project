import React, { useEffect, useMemo, useState } from 'react'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";
import { Button, Divider } from '@mui/material';
import OrderDetailsTable from './OrderDetailsTable.component';
import './style/OrderDetails.scss'
import axios from 'axios';
import { getData } from '../../../services/http.service';
import { useDispatch } from 'react-redux';
import { setOrders } from '../../../redux/slices/allOrdersSlice';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({orderInModal, closeModal}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [deliveredAt, setDeliveredAt] = useState(null)

	const deliveryRangeBegin = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.deliveryRange[0])).format()
	const deliveryRangeEnd = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.deliveryRange[1])).format()
	const orderDate = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.orderDate)).format()


	useEffect(() => {
		if (orderInModal.deliveredAt == null) {
			setDeliveredAt(null)
		}
		else {
			setDeliveredAt(new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.deliveredAt)).format())
		}
	}, [orderInModal])


	const handleDeliverActions = (id) => {
		axios.patch(`/orders/${id}`, {
			orderStatusId: 6,
			deliveredAt: Date.now()
		})
		.then(res => {
			getData('/orders',
			(data) => {
				dispatch(setOrders(data))
			},
			() => navigate("/login", {replace: true})
			)
			closeModal()
		})
	}


    return (
		<div className='modal-order-details'>
			<h5>نام مشتری: {orderInModal.customerDetail.firstName +" " +orderInModal.customerDetail.lastName}</h5>
			<h5>آدرس: {orderInModal.customerDetail.address}</h5>
			<h5>شماره موبایل: {orderInModal.customerDetail.phone}</h5>
			<h5>زمان تحویل: از {" "}
				{deliveryRangeBegin}  {" "}
				تا {" "}
				{deliveryRangeEnd}
			</h5>
			<h5>زمان ثبت سفارش: {orderDate}</h5>
			<Divider />
			<OrderDetailsTable orderItems={orderInModal.orderItems} />
			<Divider />
			<div className='delivery-actions' style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
				{orderInModal.orderStatusId == 6? (<h5>تاریخ تحویل: {deliveredAt}</h5>)
					: orderInModal.orderStatusId == 3 ? (<Button variant='contained' color="success" disabled>لغو شد</Button>)
					: orderInModal.orderStatusId == 1 ? (<Button variant='contained' color="success" onClick={() => handleDeliverActions(orderInModal.id)}>تحویل شد</Button>)
					: null
				}
			</div>
		</div>
    )
}

export default OrderDetails;
