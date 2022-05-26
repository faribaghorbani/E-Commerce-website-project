import React, { useEffect, useState, useCallback} from 'react'
import LoadingPage from '../Loading/Loading.page'
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
import AddproductForm from './Components/AddproductForm.component'
import ModalComponent from './Components/Modal.component'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminPanelSavedProducts } from '../../redux/slices/adminPanelSavedProductsSlice'



const PanelProductsPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const data = useSelector(state => state.adminPanelSavedProducts)
    // const [data, setData] = useState([])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      getData('/products',
        (data) => {
          setLoading(false)
          dispatch(setAdminPanelSavedProducts(data))
        },
        () => navigate("/login", {replace: true})
      )
    }, [navigate])

    const optimisedSearching = useCallback(_.throttle((value) => {
      getData('/products',
      (data) => {
        data = filterProducts(data, value)
        dispatch(setAdminPanelSavedProducts(data))
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
        	<Button variant="contained" sx={{m:3}} onClick={handleOpen}>افزودن کالا</Button>
        </Box>

        <TableComponent data={data} />
		
		<ModalComponent title={"افزودن کالا"}
			open={open} 
			handleClose={handleClose}
			handleOpen={handleOpen}
		>
		  <AddproductForm handleClose={handleClose}/>
		</ModalComponent>
      </div>
    )
}

export default PanelProductsPage;
