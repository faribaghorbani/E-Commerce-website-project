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


const columns = [
  { id: 'quantity', label: 'موجودی', minWidth: 90, align:'right'},
  { id: 'price', label: 'قیمت', minWidth: 90, align:'right'},
  { id: 'name', label: 'نام کالا', minWidth: 90, align:'right'},
];

function createData(name, price, quantity, id) {
  return {name, price, quantity, id};
}


export default function TableComponent(props) {
  const rows = new Array(props.data.length).fill(null).map((item, index) => {
    return createData(
      props.data[index].name,
      props.data[index].price,
      props.data[index].quantity,
      props.data[index].id
      )
  })
  const [idBasedData, setIdBasedData] = useState(() => {
    let tempObj = {}
    props.data.map((eachPro) => {
      tempObj = {...tempObj, [eachPro.id]: {'price': eachPro.price, 'quantity': eachPro.quantity, 'readOnly': true}}
    })
    return tempObj
  })
  const [changedIds, setChangedIds] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleInputReadability = (id) => {
    setIdBasedData(prev => ({...prev, [id]: {...prev[id], readOnly: false}}))
  }

  const handleChanegInput = (e, id, field) => {
    setIdBasedData(prev => ({...prev, [id]: {...prev[id], [field]: +e.target.value}}))
    setChangedIds(prev => [...new Set([...prev, +id])])
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
			console.log('ok')
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
                        return (
                          <TableCell dir="rtl" key={column.id} align={column.align}>
                            <input value={idBasedData[row.id][column.id]}
                             readOnly={idBasedData[row.id].readOnly} 
                             onClick={() => handleInputReadability(row.id)}
                             onChange={(e) => handleChanegInput(e, row.id, column.id)}
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
