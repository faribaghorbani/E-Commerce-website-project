import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDataUser } from '../../services/http.service';
import LoadingPage from '../Loading/Loading.page';
import RTL from '../../components/RTL.component';

const ProductPage = () => {
	const params = useParams()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

	useEffect(() => {
		getDataUser(`/products?id=${params.id}`,
			(data) => {
				setData(data)
				setLoading(false)
			},
			() => {
				setLoading(false)
				setError(true)
			}
		)
		console.log(data);
	}, [])

	useEffect(() => {
		console.log(data)
	}, [data])

	if (loading) {
		return (
			<>
				<LoadingPage/>
			</>
		)
	} else if (error) {
		return (
			<>
				<div>اتصال به سرور با خطا رو به رو شد</div>
			</>
		)
	} else {
		return (
			<>
			<Paper elevation={2}>

				{data.map(item => {
					return (
						<div dir="rtl">
							<React.Fragment key={item.id}>{item.name}</React.Fragment>
						</div>
					)
				})}
			</Paper>
			</>
		)
	}
}

export default ProductPage;
