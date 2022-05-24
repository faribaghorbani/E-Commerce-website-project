import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataUser } from '../../../services/http.service'
import { setCategoryData } from '../../../redux/slices/categoryDataSlice'
import LoadingComponent from '../../Loading/Components/Loading.component'
import axios from 'axios'
import { setAdminPanelSavedProducts } from '../../../redux/slices/adminPanelSavedProductsSlice'
import { getData } from '../../../services/http.service'
import { useNavigate } from 'react-router-dom'
import FormComponent from './Form.component'
import { Box } from '@mui/system'
import Button from '@mui/material/Button';


const EditproductForm = ({closeModal}) => {
	const navigate = useNavigate()
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [files, setFiles] = useState([])
	const [thumbnail, setThumbnail] = useState([])
	const [flag, setFlag] = useState(false)
	const [tempColor, setTempColor] = useState("#000000")
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
		thumbnail: [],
		gallery: [],
		color: []
	})
	const dispatch = useDispatch()


	const handleChange = (e, editor) => {
		if (e.name === 'change:data') {
			setValues(prev => ({...prev, 'description': editor.getData()}))
		} else if(e.target.name === 'category') {
			setValues(prev => ({...prev, 'category':{...values.category, 'main': e.target.value}}))
		} else if(e.target.name === 'subCategory') {
			setValues(prev => ({...prev, 'category':{...values.category, 'second': e.target.value}}))
		} else if(e.target.name === 'color') {
			setTempColor(e.target.value)
		} else if(e.target.name === 'thumbnail') {
			setThumbnail([e.target.files[0]])
		} else if(e.target.name === 'gallery') {
			setFiles(prev => [...prev, ...Object.values(e.target.files)])
		} else {
			setValues(prev => ({...prev, [e.target.name]: e.target.value}))
		}
	}

	const addColor = () => {
		setValues(prev => ({...prev, 'color': [...new Set([...values.color, tempColor])]}))
	}

	useEffect(() => {
		if (categoryData.length === 0) {
			getDataUser('/categories?_embed=subCategories', 
				(data) => {
					dispatch(setCategoryData(data))
					setLoading(false)
					console.log(data)
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
		thumbnailFormData.append('image', thumbnail[0])
		const thumbnailReq = axios.post('upload', thumbnailFormData)
		let requests = []
		
		files.forEach(item => {
			const tempFormData = new FormData()
			tempFormData.append('image', item)
			const tempReq = axios.post('upload', tempFormData)
			requests = [...requests, tempReq]
		})

		Promise.all([thumbnailReq, ...requests])
			.then((responses)=> {
				const encodedImages = responses.map(res => res.data.filename)
				setValues(prev => {
					return {...prev, 'thumbnail': encodedImages.slice(0,1)[0], 'gallery': encodedImages.slice(1)}
				})
				setFlag(true)
			})
			.catch((err) => setError(true))
	}


	useEffect(() => {
		if (flag === true) {
			axios.post('/products', values)
				.then(res => {
					setFlag(false)
					closeModal()
					getData('/products',
					(data) => {
					dispatch(setAdminPanelSavedProducts(data))
					},
					() => navigate("/login", {replace: true})
					)
				})
				.catch(err => {
					setError(true)
				})
		}
	}, [flag])


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
			<>
				<FormComponent 
					handleChange={handleChange}
					addColor={addColor}
					values={values}
					files={files}
					thumbnail={thumbnail}
					editGallery={setFiles}
					editThumbnail={setThumbnail}
				/> 
		        <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                	<Button  variant="outlined" onClick={submitTheForm}>افزودن</Button>
            	</Box>
			</>
		)
	}
}

export default EditproductForm;
