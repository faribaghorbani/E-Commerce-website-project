import React, { useState } from 'react'
import './AdminLogin.scss'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import RTL from '../../components/RTL.component';
import {authentication} from '../../services/http.service'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../components/Modal.component';



const validationSchema = yup.object().shape({
	username: yup.string()
	.required('لطفا نام کاربری خود را وارد کنید'),
	password: yup.string()
	.min(4, 'رمز عبور باید حداقل دارای 6 کاراکتر باشد')
	.required('لطفا رمز عبور خود را وارد کنید'),
});


const AdminLogin = () => {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
		  username: '',
		  password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			authentication(
				values, 
				(res) => {
					localStorage.setItem("token", res.data.token)
					navigate('/panel')
				},
				() => {handleOpen()}
			)
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
						dir='rtl'
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
						dir='rtl'
						sx={{mb: 3}}
						label="رمز عبور"
						id="password"
						name="password"
						type="text"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button color="primary" type="submit">
						ورود
					</Button>
					<Button color="primary" sx={{mt: 3}} onClick={() => navigate('/')}>
						برگشت به سایت
					</Button>
				</RTL>
			</form>
			<ModalComponent title={"خطا"} description={"نام کاربری یا رمز عبور صحیح نیست"} 
				open={open} 
				handleClose={handleClose}
				handleOpen={handleOpen}
			 />
		</Box>
	)
}

export default AdminLogin;
