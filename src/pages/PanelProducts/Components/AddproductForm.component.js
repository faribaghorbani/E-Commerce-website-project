import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataUser } from '../../../services/http.service'
import { setCategoryData } from '../../../redux/slices/categoryDataSlice'
import LoadingComponent from '../../Loading/Components/Loading.component'
import { Form, useFormik } from 'formik';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import RTL from '../../../components/RTL.component'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box } from '@mui/system'


const AddproductForm = () => {
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [group, setGroup] = useState('');
	const [files, setFiles] = useState([])
	const [thumbnail, setThumbnail] = useState()
	const [uploads, setUploads] = useState([])
	const [flag, setFlag] = useState(false)
	const [values, setValues] = useState({
		name: '',
		brand: '',
		price: '',
		quantity: '',
		category: {
			main: '',
			second: ''
		},
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
		console.log(values)
		// const formData = new FormData()
		// formData.append('image', files[files.length-1])
		// if (files.length === 0) {
		// 	axios.post('/upload', formData)
		// 		.then(res => res.data)
		// 		.then(data => setUploads(prev => [...prev, data.filename]))
		// }
	}, [values])


	if (loading) {
		return (
			<div>
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
				<RTL>
					<TextField
						fullWidth
						dir='rtl'
						sx={{mb: 3}}
						id="standard-password-input1"
						label="نام کالا"
						type="text"
						name="name"
						variant="standard"
						onChange={e => setValues(prev => ({...prev, 'name': e.target.value}))}
					/>
					<TextField
						fullWidth
						dir='rtl'
						sx={{mb: 2}}
						id="standard-password-input2"
						label="قیمت"
						type="number"
						name="price"
						variant="standard"
						onChange={e => setValues(prev => ({...prev, 'price': e.target.value}))}
					/>
					<TextField
						fullWidth
						dir='rtl'
						sx={{mb: 2}}
						id="standard-password-input3"
						label="برند"
						type="text"
						name="brand"
						variant="standard"
						onChange={e => setValues(prev => ({...prev, 'brand': e.target.value}))}
					/>
					<div>
						<FormControl dir='rtl' fullWidth sx={{ m: 1, minWidth: 80 }}>
							<InputLabel id="demo-simple-select-autowidth-label1">دسته بندی سرگروه</InputLabel>
								<Select
								labelId="demo-simple-select-autowidth-label1"
								id="demo-simple-select-autowidth1"
								value={values.category.main}
								onChange={e => setValues(prev => ({...prev, 'category':{...values.category, 'main': e.target.value}}))}
								autoWidth
								label="دسته بندی سرگروه"
								>
								<MenuItem value="">
									<em>-</em>
								</MenuItem>
								{categoryData.map(itemCat => {
									return (
										<MenuItem value={itemCat.name}>{itemCat.title}</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</div>
					<div>
						<FormControl dir='rtl' fullWidth sx={{ m: 1, minWidth: 80 }} disabled={values.category.main == ""}>
							<InputLabel id="demo-simple-select-autowidth-label2">دسته بندی زیرگروه</InputLabel>
								<Select
								labelId="demo-simple-select-autowidth-label2"
								id="demo-simple-select-autowidth2"
								value={values.category.second}
								onChange={e => setValues(prev => ({...prev, 'category':{...values.category, 'second': e.target.value}}))}
								autoWidth
								label="دسته بندی زیرگروه"
								>
								<MenuItem value="">
									<em>-</em>
								</MenuItem>
								{categoryData
									?.filter(itemCat => itemCat.name == values.category.main)[0]?.subCategory
									?.map((sub) => {
										return (
											<MenuItem value={sub.name}>{sub.title}</MenuItem>
										)
									})
								}
							</Select>
						</FormControl>
					</div>
					<TextField
						fullWidth
						dir='rtl'
						sx={{mb: 2}}
						id="standard-password-input4"
						label="موجودی"
						type="number"
						name="quantity"
						variant="standard"
						onChange={e => setValues(prev => ({...prev, 'quantity': e.target.value}))}
					/>

					<CKEditor
						editor={ ClassicEditor }
						data=""
						onReady={ editor => {
							// You can store the "editor" and use when it is needed.
							console.log( 'Editor is ready to use!', editor );
						} }
						onChange={ ( event, editor ) => {
							const data = editor.getData();
							setValues(prev => ({...prev, 'description': data}))
						} }
						// onBlur={ ( event, editor ) => {
						// 	console.log( 'Blur.', editor );
						// } }
						// onFocus={ ( event, editor ) => {
						// 	console.log( 'Focus.', editor );
						// } }
					/>
					<Box>
						<label>آپلود تامبنیل</label>
						<input type="file" multiple onChange={e => setThumbnail(e.target.files[0])}/>
					</Box>
					<Box>
						<label>آپلود گالری</label>
						<input type="file" multiple onChange={e => {
							console.log(e.target.files)
							setFiles(Object.values(e.target.files))
						}}/>
					</Box>
					<button onClick={submitTheForm}>Hello</button>
				</RTL>
			</div>
		)
	}
}

export default AddproductForm;
