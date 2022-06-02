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
import { TextField, Button } from '@mui/material';


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
});


const CheckoutForm = () => {
	const [dataRange, setDateRange] = useState([])

	const formik = useFormik({
		initialValues: {
		  name: '',
		  lastName: '',
		  address: '',
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
		<div>
			<form onSubmit={formik.handleSubmit} style={{ direction: "rtl" }}>
				<div>
					<RTL>
						<TextField
							dir='rtl'
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
							dir='rtl'
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
				<DatePicker
					onChange={(dateobject) => {
						formik.setFieldValue("datepicker", dateobject);
						setDateRange(dateobject)
					}}
					value={formik.values.datepicker}
					className="red"
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
				
				<label>{formik.touched.datepicker && formik.errors.datepicker}</label>

				<Button color="primary" type="submit">
					ثبت
				</Button>
			</form>
		</div>
	)
}

export default CheckoutForm;
