import React, { useEffect, useState, useCallback } from 'react'
import LoadingPage from '../Loading/Loading.page'
import { getData } from '../../services/http.service'
import TableComponent from './Components/Table.component'
import { useNavigate } from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import RTL from '../../components/RTL.component';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { filterQuantity } from '../../utils/filterAdminPanel'

const PanelQuantityPage = () => {
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
    }, [navigate])


    const optimisedSearching = useCallback(_.throttle((value) => {
      getData('/products',
      (data) => {
        data = filterQuantity(data, value)
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
      <div>
        <div>
          <RTL>
            <FormControl dir="rtl" fullWidth sx={{ m: 1 }}>
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
        <TableComponent data={data} />
      </div>
    )
}

export default PanelQuantityPage;
