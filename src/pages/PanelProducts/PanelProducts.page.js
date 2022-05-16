import React, { useEffect, useState, useCallback} from 'react'
import { getData } from '../../services/http.service'
import TableComponent from './Components/Table.component'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import RTL from '../../components/RTL.component';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { filterProducts } from '../../utils/filterAdminPanel'


const PanelProductsPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
      getData('/products',
        (data) => {
          setLoading(false)
          setData(data)
        },
        () => navigate("/login", {replace: true})
      )
    }, [])

    const optimisedSearching = useCallback(_.throttle((value) => {
      getData('/products',
      (data) => {
        data = filterProducts(data, value)
        setData(data)
      },
      () => navigate("/login", {replace: true})
    )
    }, 1000), [])
  
  
    const handleChange = (e) => {
      setSearchValue(e.target.value);
      optimisedSearching(e.target.value)
    }


    if (loading) return "loading"
    return (
      <div>
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
        <Box>
        <Button variant="contained" sx={{m:3}}>افزودن کالا</Button>
        </Box>
        <TableComponent data={data} />
      </div>
    )
}

export default PanelProductsPage;
