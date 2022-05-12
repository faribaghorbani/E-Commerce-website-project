import React, { useEffect, useState } from 'react'
import { getData } from '../../services/http.service'
import TableComponent from './Components/OrdersTable.component'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@mui/material'

const PanelQuantityPage = () => {
  const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
      getData('/orders',
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
        {/* <Box>
        </Box> */}
        <TableComponent data={data} />
      </div>
    )
}

export default PanelQuantityPage;
