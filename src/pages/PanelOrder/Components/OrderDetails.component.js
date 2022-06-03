import React from 'react'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";
import { Divider } from '@mui/material';
import OrderDetailsTable from './OrderDetailsTable.component';

const OrderDetails = ({orderInModal, closeModal}) => {

	const deliveryRangeBegin = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.deliveryRange[0])).format()
	const deliveryRangeEnd = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.deliveryRange[1])).format()
	const orderDate = new DateObject({calendar: persian, locale: persian_fa },JSON.parse(orderInModal.orderDate)).format()

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
		</div>
    )
}

export default OrderDetails;
