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


const AddproductForm = ({handleClose}) => {
	const navigate = useNavigate()
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [files, setFiles] = useState([])
	const [thumbnail, setThumbnail] = useState([])
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
		thumbnail: [],
		gallery: [],
		color: []
	})
	const dispatch = useDispatch()
	const [errorWarnings, setErrorWarnings] = useState({
        name: {status: false, msg: "لطفا نام کالای مورد نظر را مشخص کنید"},
        category: {status: false, msg: "لطفا سرگروه کالای مورد نظر را انتخاب کنید"},
        subCategory: {status: false, msg: "لطفا زیرگروه کالای مورد نظر را انتخاب کنید"},
        quantity: {status: false, msg: "لطفا موجودی کالای مورد نظر را مشخص کنید"},
        price: {status: false, msg: "لطفا قیمت کالای مورد نظر را مشخص کنید"},
    })


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


	const clickedOnSubmit = () => {
		let shouldTheFunctionBeCalled = false
		if (values.name == '') {
    		setErrorWarnings(prev => ({...prev, name: {status: true, msg: "لطفا نام کالا را وارد کنید"}}))
			shouldTheFunctionBeCalled = true
		} else {
			setErrorWarnings(prev => ({...prev, name: {status: false, msg: "لطفا نام کالا را وارد کنید"}}))
		}
		if (values.category.main == '') {
    		setErrorWarnings(prev => ({...prev, category: {status: true, msg: "لطفا سرگروه کالا را انتخاب کنید"}}))
			shouldTheFunctionBeCalled = true
		} else {
			setErrorWarnings(prev => ({...prev, category: {status: false, msg: "لطفا نام کالا را وارد کنید"}}))
		}
		if (values.category.second == '') {
    		setErrorWarnings(prev => ({...prev, subCategory: {status: true, msg: "لطفا زیرگروه کالا را انتخاب کنید"}}))
			shouldTheFunctionBeCalled = true
		} else {
			setErrorWarnings(prev => ({...prev, subCategory: {status: false, msg: "لطفا زیرگروه کالا را انتخاب کنید"}}))
		}
		if (values.price == '') {
    		setErrorWarnings(prev => ({...prev, price: {status: true, msg: "لطفا قیمت کالا را وارد کنید"}}))
			shouldTheFunctionBeCalled = true
		}else if (values.price < 0) {
    		setErrorWarnings(prev => ({...prev, price: {status: true, msg: "قیمت کالا نمی تواند منفی باشد"}}))
			shouldTheFunctionBeCalled = true
		} else {
			setErrorWarnings(prev => ({...prev, price: {status: false, msg: "لطفا  قیمت کالا را مشخص کنید"}}))
		}
		if (values.quantity == '') {
    		setErrorWarnings(prev => ({...prev, quantity: {status: true, msg: "لطفا موجودی کالا را وارد کنید"}}))
			shouldTheFunctionBeCalled = true
		}else if (values.quantity < 0) {
    		setErrorWarnings(prev => ({...prev, quantity: {status: true, msg: "موجودی کالا نمی تواند منفی باشد"}}))
			shouldTheFunctionBeCalled = true
		} else {
			setErrorWarnings(prev => ({...prev, quantity: {status: false, msg: "لطفا  قیمت کالا را مشخص کنید"}}))
		}

		if (shouldTheFunctionBeCalled == false) {
			submitTheForm()
		}
	}

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
					handleClose()
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
					values={values}
					setValues={setValues}
					files={files}
					thumbnail={thumbnail}
					setFiles={setFiles}
					setThumbnail={setThumbnail}
					errorWarnings={errorWarnings}
					setErrorWarnings={setErrorWarnings}
				/> 
		        <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                	<Button  variant="outlined" onClick={clickedOnSubmit}>افزودن</Button>
            	</Box>
			</>
		)
	}
}

export default AddproductForm;
