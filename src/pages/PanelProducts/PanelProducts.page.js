import React, { useEffect, useState } from 'react'
import { getData } from '../../services/http.service'
import TableComponent from './Components/Table.component'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@mui/material'


const PanelProductsPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
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


    if (loading) return "loading"
    return (
      <div>
        <Box>
        <Button variant="contained" sx={{m:3}}>افزودن کالا</Button>
        </Box>
        <TableComponent data={data} />
      </div>
    )
}

export default PanelProductsPage;
