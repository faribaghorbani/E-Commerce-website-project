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


const EditproductForm = ({closeModal, edittingData}) => {
	const navigate = useNavigate()
	const categoryData = useSelector(state => state.categoryData)
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const [files, setFiles] = useState(edittingData.gallery)
	const [thumbnail, setThumbnail] = useState([edittingData.thumbnail])
	const [flag, setFlag] = useState(false)
	const [values, setValues] = useState({
		name: edittingData.name,
		brand: edittingData.brand,
		price: edittingData.price,
		quantity: edittingData.quantity,
		category: edittingData.category,
		description: edittingData.description,
		thumbnail: "",
		gallery: [],
		color: edittingData.color
	})
	const dispatch = useDispatch()


	useEffect(() => {
		if (categoryData.length === 0) {
			getDataUser('/categories?_embed=subCategories', 
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
		let mixedImagesTypes = [...thumbnail, ...files]
		console.log(mixedImagesTypes)
		let requests = []
		mixedImagesTypes.forEach(item => {
			if (typeof item === 'object') {
				const tempFormData = new FormData()
				tempFormData.append('image', item)
				const tempReq = axios.post('upload', tempFormData)
				requests = [...requests, tempReq]
			}
		})

		Promise.all(requests)
			.then((responses)=> {
				const encodedImages = responses.map(res => res.data.filename)
				console.log(encodedImages)
				let counter = 0
				mixedImagesTypes = mixedImagesTypes.map(item => {
					if (typeof item === 'object') {
						console.log(counter)
						return encodedImages[counter] 
						counter+=1
					} else {
						console.log("no")
						return item
					}
				})
				setValues(prev => {
					return {...prev, 'thumbnail': mixedImagesTypes.slice(0,1)[0], 'gallery': mixedImagesTypes.slice(1)}
				})
				setFlag(true)
			})
			.catch((err) => setError(true))
	}

	useEffect(() => {
		if (flag === true) {
			axios.patch(`/products/${edittingData.id}`, values)
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
					values={values}
					setValues={setValues}
					files={files}
					thumbnail={thumbnail}
					setFiles={setFiles}
					setThumbnail={setThumbnail}
				/> 
		        <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                	<Button  variant="outlined" onClick={submitTheForm}>ویرایش</Button>
            	</Box>
			</>
		)
	}
}

export default EditproductForm;
