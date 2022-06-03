import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(productId, name, price, quantity) {
  return { productId, name, price, quantity };
}


export default function OrderDetailsTable({orderItems}) {
    console.log(orderItems)
    const rows = new Array(orderItems.length).fill(null).map((item, index) => {
		return createData(
		orderItems[index].productId,
		orderItems[index].name,
		orderItems[index].price,
		orderItems[index].quantity,
		)
	})
      
    return (
        <TableContainer component={Paper} dir='rtl'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="right">نام کالا</TableCell>
                <TableCell align="right">قیمت</TableCell>
                <TableCell align="right">تعداد</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                {/* <TableCell component="th" scope="row">
                    {row.name}
                </TableCell> */}
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
