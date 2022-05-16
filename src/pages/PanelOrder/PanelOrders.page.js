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
// import { createTheme } from '@mui/material/styles';
import RadioButtonsGroup from './Components/Radiobuttons.component'

const PanelOrdersPage = () => {
  	const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
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
				<TableComponent data={data} />
			</div>
      	</>
    )
}

export default PanelOrdersPage;
