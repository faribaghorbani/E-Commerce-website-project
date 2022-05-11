import React from 'react'
import './AdminLogin.scss'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import RTL from '../../components/RTL.component';
import {authentication} from '../../services/http.service'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../redux/slices/userSlice';
import Box from '@mui/material/Box';



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
		<Box sx={{backgroundColor: 'white',
		maxWidth: '500px',
		width: '95%',
		borderRadius: '5px'
		}}>
			<form onSubmit={formik.handleSubmit} className='form-container' style={{backgroundColor: 'white'}}>
				<RTL>
					<TextField
					// fullWidth
						sx={{mb: 3}}
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
						sx={{mb: 3}}
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
		</Box>
	)
}

export default AdminLogin;
