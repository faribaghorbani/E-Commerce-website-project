import React, { useCallback, useEffect, useState } from 'react'
import LoadingPage from '../Loading/Loading.page'
import { getData } from '../../services/http.service'
import TableComponent from './Components/OrdersTable.component'
import { useNavigate } from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import RTL from '../../components/RTL.component';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { filterOrders } from '../../utils/filterAdminPanel'
import RadioButtonsGroup from './Components/Radiobuttons.component'
import { useSelector } from 'react-redux'

const PanelOrdersPage = () => {
	const navigate = useNavigate()
	const orderStatus = useSelector(state => state.orderStatus)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
	const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
		console.log("check navigate depen")
		getData('/orders',
			(data) => {
			setLoading(false)
			setData(data)
			},
			() => navigate("/login", {replace: true})
		)
    }, [navigate])
	

	const optimisedSearching = useCallback(_.throttle((value) => {
		console.log(value)
		getData('/orders',
		(data) => {
			data = filterOrders(data, value)
			setData(data)
		},
		() => navigate("/login", {replace: true})
	)
	}, 1000), [navigate])
	
	// apply filter after using search-bar
	useEffect(() => {
		if (orderStatus == 0) {
			setFilteredData(data)
		}
		else {
			setFilteredData(data.filter((item) => {
				if (item.orderStatus == orderStatus) return item
			}))
		}
	}, [data])


	useEffect(() => {
		if (orderStatus == 0) {
			setFilteredData(data)
		}
		else {
			setFilteredData(data.filter((item) => {
				if (item.orderStatus == orderStatus) return item
			}))
		}
	}, [orderStatus])


	const handleChange = (e) => {
		setSearchValue(e.target.value);
		optimisedSearching(e.target.value)
	}

    if (loading) return <LoadingPage />
    return (
      	<>
			<div>
				<RTL>
					<FormControl fullWidth sx={{ m: 1 }}>
						<OutlinedInput
							sx={{textAlign: 'left'}}
							id="outlined-adornment-amount"
							value={searchValue}
							onChange={handleChange}
							startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
							label="search"
						/>
						<InputLabel htmlFor="outlined-adornment-amount">جست و جو</InputLabel>
					</FormControl>
				</RTL>
			</div>
			<div>
				<RadioButtonsGroup />
			</div>
			<div>
				<TableComponent data={filteredData} />
			</div>
      	</>
    )
}

export default PanelOrdersPage;
