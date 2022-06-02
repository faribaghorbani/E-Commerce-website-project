import React, { useEffect, useState } from 'react'
import { useFormik, useField, useFormikContext } from 'formik';
import * as yup from 'yup'
import DateObject from "react-date-object";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/red.css"
import RTL from '../../../components/RTL.component';
import { TextField, Button, Paper } from '@mui/material';
import './style/CheckoutForm.scss'

const phoneRegex = RegExp(
	/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/
);

const validationSchema = yup.object().shape({
	name: yup.string()
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
	const [dataRange, setDateRange] = useState([])

	const formik = useFormik({
		initialValues: {
		  name: '',
		  lastName: '',
		  address: '',
		  phone: '',
		  datepicker: []
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values)
		},
	});

	useEffect(() => {
		console.log(dataRange)
		// console.log(new DateObject(JSON.parse(JSON.stringify(dataRange[0]))).format())
	}, [dataRange])

	return (
		<Paper elevation={5} className={'checkout-form-container'}>
			<div className='banner'>
				فرم تکمیل خرید
			</div>
			<form onSubmit={formik.handleSubmit} className={'checkout-form'}>
				<div className='name-lastname'>
					<RTL>
						<TextField
							fullWidth
							sx={{mb: 3}}
							label="نام"
							id="name2"
							name="name"
							type="text"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
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
				</div>

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
				<div className='phone-date'>
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
					<div className='date-box'>
						<DatePicker
							onChange={(dateobject) => {
								formik.setFieldValue("datepicker", dateobject);
								setDateRange(dateobject)
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
							minDate={new DateObject({ calendar: persian })}
							range 
							calendar={persian}
							locale={persian_fa}
							calendarPosition="bottom-right"
							name={"datapicker"}
						/>
						<span className='date-error'>{formik.touched.datepicker && formik.errors.datepicker}</span>
					</div>
				</div>
				<div className='actions'>
					<Button variant="contained" color="success" type="submit">
						درگاه پرداخت
					</Button>
					<Button variant="contained" className='go-basket-button'>
						سبد خرید
					</Button>
				</div>
			</form>
		</Paper>
	)
}

export default CheckoutForm;
