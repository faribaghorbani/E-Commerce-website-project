import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import RTL from '../../components/RTL.component';
import {authentication} from '../../services/http.service'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../redux/slices/userSlice';



const validationSchema = yup.object().shape({
	username: yup.string()
	.required('لطفا نام کاربری خود را وارد کنید'),
	password: yup.string()
	.min(4, 'رمز عبور باید حداقل دارای 6 کاراکتر باشد')
	.required('لطفا رمز عبور خود را وارد کنید'),
});


const AdminLogin = () => {
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
		  username: 'foobar@example.com',
		  password: 'foobar',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			authentication(values, (token) => dispatch(setUserToken(token)))
		},
	});


	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<RTL>
					<TextField
					// fullWidth
						label="نام کاربری"
						id="username"
						name="username"
						type="text"
						value={formik.values.username}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
					<TextField
					// fullWidth
						label="رمز عبور"
						id="password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button color="primary" type="submit">
						ورود
					</Button>
				</RTL>
			</form>
		</>
	)
}

export default AdminLogin;
