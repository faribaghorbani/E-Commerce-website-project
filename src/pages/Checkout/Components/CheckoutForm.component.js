import React, { useEffect, useState } from 'react'
import { PAYMENT_PATH } from '../../../utils/constants';
import { useFormik, useField, useFormikContext } from 'formik';
import * as yup from 'yup'
import DateObject from "react-date-object";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/red.css"
import { Box } from '@mui/system';
import RTL from '../../../components/RTL.component';
import { TextField, Button, Paper } from '@mui/material';
import './style/CheckoutForm.scss'
import CustomInput from './CustomInput.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const phoneRegex = RegExp(
	/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/
);

const validationSchema = yup.object().shape({
	firstName: yup.string()
	.required('لطفا نام خود را وارد کنید'),
	lastName: yup.string()
	.required('لطفا نام خانوادگی خود را وارد کنید'),
	address: yup.string()
	.required('لطفا آدرس خود را وارد کنید'),
	datepicker: yup.array()
	.min(2, 'لطفا یک بازه تحویل کامل انتخاب کنید')
	.required('لطفا بازه تحویل را وارد کنید'),
	phone: yup.string()
	.matches(phoneRegex, "شماره موبایل معتبر نیست")
	.required("لطفا شماره موبایل خود را وارد کنید")
});


const CheckoutForm = () => {
	const navigate = useNavigate()
	const basketProducts = useSelector(state => state.basketProducts)
	// const [dataRange, setDateRange] = useState([])
	const [buyedProducts, setBuyedProducts] = useState([])

	useEffect(() => {
		Object.entries(basketProducts).forEach(item => {
			if (item[1].status == 'normal') {
				setBuyedProducts(prev => [...prev, {
					name: item[1].product.name,
					price: item[1].product.price,
					quantity: item[1].quantity,
					id: +item[0]
				}])
			}
		})
	}, [])

	useEffect(() => {
		console.log(buyedProducts)
	}, [buyedProducts])

	const goToBasket = () => {
		navigate('/basket')
	}

	const formik = useFormik({
		initialValues: {
		  firstName: '',
		  lastName: '',
		  address: '',
		  phone: '',
		  datepicker: []
		},
		validationSchema: validationSchema,

		onSubmit: (values) => {
			let purchaseTotal = 0
			buyedProducts.forEach((item) => {
				purchaseTotal += Number(item.price)
			})
			const tempObj = {
				customerDetail: {
					firstName: values.firstName,
					lastName: values.lastName,
					phone : values.phone,
					address: values.address,
				},
				orderDate: Date.now(),
				purchaseTotal: purchaseTotal,
				orderStatusId: 5,
				deliveredAt: null,
				deliveryRange: [JSON.stringify(values.datepicker[0]), JSON.stringify(values.datepicker[1])],
				orderItems: buyedProducts
			}
			axios.post('/orders', tempObj)
				.then(res => {
					localStorage.setItem('order', res.data.id)
					console.log(res.data)
				})
				.catch(err => console.log(err.response))
			console.log(tempObj)
			window.open(PAYMENT_PATH)
		},
	});


	return (
		<Paper elevation={5} className={'checkout-form-container'}>
			<div className='banner'>
				فرم تکمیل خرید
			</div>
			<form onSubmit={formik.handleSubmit} className={'checkout-form'}>
				<Box 
				className='name-lastname'
				sx={{display: 'flex', justifyContent: 'center', gap: {xs: 0, md: '10px'}, flexDirection: {xs: 'column', md: 'row'}}}
				>
					<RTL>
						<TextField
							fullWidth
							sx={{mb: 3}}
							label="نام"
							id="name2"
							name="firstName"
							type="text"
							value={formik.values.firstName}
							onChange={formik.handleChange}
							error={formik.touched.firstName && Boolean(formik.errors.firstName)}
							helperText={formik.touched.firstName && formik.errors.firstName}
						/>
					</RTL>
					<RTL>
						<TextField
							fullWidth
							sx={{mb: 3}}
							label="نام خانوادگی"
							id="lastName2"
							name="lastName"
							type="text"
							value={formik.values.lastName}
							onChange={formik.handleChange}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							helperText={formik.touched.lastName && formik.errors.lastName}
						/>
					</RTL>
				</Box>

				<RTL>
					<TextField
						fullWidth
						sx={{mb: 3}}
						id="address2"
						label="آدرس"
						name="address"
						multiline
						rows={4}
						value={formik.values.address}
						onChange={formik.handleChange}
						error={formik.touched.address && Boolean(formik.errors.address)}
						helperText={formik.touched.address && formik.errors.address}
					/>
				</RTL>
				<Box className='phone-date'
				sx={{display: 'flex', justifyContent: 'center', gap: {xs: 0, md: '10px'}, flexDirection: {xs: 'column', md: 'row'}}}
				>
					<RTL>
						<TextField
							dir='rtl'
							sx={{mb: 3}}
							label="شماره موبایل"
							id="phone2"
							name="phone"
							type="text"
							value={formik.values.phone}
							onChange={formik.handleChange}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
						/>
					</RTL>
					<DatePicker
						onChange={(dateobject) => {
							formik.setFieldValue("datepicker", dateobject);
						}}
						value={formik.values.datepicker}
						className="red"
						containerStyle={{
							width: "100%"
						}}
						animations={[
							opacity(),
							transition({
							from: 40,
							transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
							}),
						]}
						render={<CustomInput 
							touchError={formik.touched.datepicker}
							error={formik.errors.datepicker}
						/>}
						minDate={new DateObject({ calendar: persian })}
						range 
						calendar={persian}
						locale={persian_fa}
						calendarPosition="bottom-right"
						name={"datapicker"}
					/>
				</Box>
				<div className='actions'>
					<Button variant="contained" color="success" type="submit">
						درگاه پرداخت
					</Button>
					<Button variant="contained" className='go-basket-button' onClick={goToBasket}>
						سبد خرید
					</Button>
				</div>
			</form>
		</Paper>
	)
}

export default CheckoutForm;

	// useEffect(() => {
		// console.log(new DateObject(JSON.parse(JSON.stringify(dataRange[0]))).format())
	// }, [dataRange])
