import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Box } from '@mui/material'
import axios from 'axios';
import './style/Table.scss'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminPanelSavedProducts } from '../../../redux/slices/adminPanelSavedProductsSlice'
import { getData } from '../../../services/http.service'


const columns = [
  { id: 'quantity', label: 'موجودی', minWidth: 90, align:'right'},
  { id: 'price', label: 'قیمت', minWidth: 90, align:'right'},
  { id: 'name', label: 'نام کالا', minWidth: 90, align:'right'},
];

function createData(name, price, quantity, id) {
  return {name, price, quantity, id};
}


export default function TableComponent(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rows = new Array(props.data.length).fill(null).map((item, index) => {
    return createData(
      props.data[index].name,
      props.data[index].price,
      props.data[index].quantity,
      props.data[index].id
      )
  })
  const [backup, setBackup] = useState(() => {
    let tempObj = {}
    props.data.map((eachPro) => {
      tempObj = {...tempObj, [eachPro.id]: {'price': eachPro.price, 'quantity': eachPro.quantity, 'quantityReadOnly': true, 'priceReadOnly': true}}
    })
    return tempObj
  })
  const [idBasedData, setIdBasedData] = useState(() => {
    let tempObj = {}
    props.data.map((eachPro) => {
      tempObj = {...tempObj, [eachPro.id]: {'price': eachPro.price, 'quantity': eachPro.quantity, 'quantityReadOnly': true, 'priceReadOnly': true}}
    })
    return tempObj
  })
  const [changedIds, setChangedIds] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleInputReadability = (id, readOnlyField) => {
    setIdBasedData(prev => ({...prev, [id]: {...prev[id], [readOnlyField]: false}}))
  }

  const handleChanegInput = (e, id, field) => {
    setIdBasedData(prev => ({...prev, [id]: {...prev[id], [field]: +e.target.value}}))
    setChangedIds(prev => [...new Set([...prev, +id])])
  }

  const handleEscKeyReset = (e, id, field, readOnlyField) => {
    if (e.key ==='Escape' && idBasedData[id][readOnlyField] === false) {
      console.log(changedIds)
      setIdBasedData(prev => ({...prev, [id]: {...prev[id], [field]: +backup[id][field], [readOnlyField]: true}}))
    }
  }

  const resetAll = () => {
    setIdBasedData(backup)
  }

  const submitNewData = () => {
    let requests = []
    changedIds.map(changedId => {
      const data = {'price': idBasedData[changedId].price, 'quantity': idBasedData[changedId].quantity}
      const req = axios.patch(`/products/${changedId}`, data)
      requests = [...requests, req]
    })
    Promise.all(requests)
		.then((responses)=> {
			getData('/products',
        (data) => {
          let tempObj = {}
          data.map((eachPro) => {
            tempObj = {...tempObj, [eachPro.id]: {'price': eachPro.price, 'quantity': eachPro.quantity, 'quantityReadOnly': true, 'priceReadOnly': true}}
          })
          setBackup(tempObj)
          setIdBasedData(tempObj)
        },
        () => navigate("/login", {replace: true})
      )
		})
		.catch((err) => console.log('error'))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box>
        <Button variant="contained" sx={{m:3}} onClick={submitNewData}>ذخیره</Button>
        <Button variant="contained" sx={{m:3}} onClick={resetAll}>برگشت</Button>
      </Box>
      <TableContainer sx={{ }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id == "price" || column.id == "quantity") {
                        let readOnlyField
                        column.id == 'price'? readOnlyField = 'priceReadOnly': readOnlyField = 'quantityReadOnly'
                        return (
                          <TableCell dir="rtl" key={column.id} align={column.align}>
                            <input 
                            className={`editting-input ${idBasedData[row.id][readOnlyField]? `not-active`: `active`}`}
                            value={idBasedData[row.id][column.id]}
                            readOnly={idBasedData[row.id][readOnlyField]} 
                            onClick={() => handleInputReadability(row.id, readOnlyField)}
                            onChange={(e) => handleChanegInput(e, row.id, column.id)}
                            onKeyUp={(e) => handleEscKeyReset(e, row.id, column.id, readOnlyField)}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell dir="rtl" key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        dir='rtl'
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
