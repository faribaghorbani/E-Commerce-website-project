import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataUser } from '../../../services/http.service'
import { setCategoryData } from '../../../redux/slices/categoryDataSlice'
import LoadingComponent from '../../Loading/Components/Loading.component'
import { Form, useFormik } from 'formik';
import axios from 'axios'
import TextField from '@mui/material/TextField';


const AddproductForm = () => {
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [files, setFiles] = useState([])
	const [thumbnail, setThumbnail] = useState()
	const [uploads, setUploads] = useState([])
	const [flag, setFlag] = useState(false)
	const [values, setValues] = useState({
		name: '',
		brand: '',
		price: '',
		quantity: '',
		category: {},
		description: '',
		thumbnail: '',
		gallery: [],
		color: []
	})
	const dispatch = useDispatch()


	useEffect(() => {
		if (categoryData.length === 0) {
			console.log("not stored category data");
			console.log(categoryData);
			getDataUser('/category?_embed=subCategory', 
				(data) => {
					dispatch(setCategoryData(data))
					setLoading(false)
				},
				() => {
					setLoading(false)
					setError(true)
				})
		} else {
			setLoading(false)
		}
	}, [])

	const submitTheForm = () => {
		const thumbnailFormData = new FormData()
		thumbnailFormData.append('image', thumbnail)
		let temp = []
		temp = [...temp, thumbnailFormData]
		files.map(item => {
			const tempFormData = new FormData()
			tempFormData.append('image', item)
			temp = [...temp, tempFormData]
		})

		Promise.all(temp.map((formdata) => axios.post('upload', formdata)))
			.then((responses)=> {
				setUploads(responses.map(res => res.data.filename))
			})
			.catch((err) => console.log(err))

	}

	useEffect(() => {
		console.log(uploads)
		// const formData = new FormData()
		// formData.append('image', files[files.length-1])
		// if (files.length === 0) {
		// 	axios.post('/upload', formData)
		// 		.then(res => res.data)
		// 		.then(data => setUploads(prev => [...prev, data.filename]))
		// }
	}, [uploads])


	if (loading) {
		return (
			<div>
				<TextField
					dir='rtl'
					sx={{mb: 3}}
					id="standard-password-input"
					label="نام کالا"
					type="text"
					name="name"
					variant="standard"
				/>
				<LoadingComponent />
			</div>
		
		)
	} else if (error) {
		return (
			<>
				اتصال به سرور با خطا رو به رو شد
			</>
		)
	} else {
		return (
			<div>
				{/* <input type="file" multiple onChange={e => setFiles(prev => [...prev, e.target.files[0]])}/> */}
				<input type="file" multiple onChange={e => setThumbnail(e.target.files[0])}/>
				<input type="file" multiple onChange={e => {
					console.log(e.target.files)
					setFiles(Object.values(e.target.files))
				}}/>
				<button onClick={submitTheForm}>Hello</button>
			</div>
		)
	}
}

export default AddproductForm;
