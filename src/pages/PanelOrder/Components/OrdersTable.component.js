import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';


const columns = [
  { id: 'viewTools', label: 'بررسی سفارش', minWidth: 90, align:'right'},
  { id: 'orderDate', label: 'تاریخ خرید', minWidth: 90, align:'right'},
  { id: 'purchaseTotal', label: 'مجموع خرید', minWidth: 90, align:'right'},
  { id: 'name', label: 'نام کاربر', minWidth: 90, align:'right'},
];

function createData(name, purchaseTotal, orderDate) {
  return {name, purchaseTotal, orderDate};
}


export default function TableComponent(props) {
  const rows = new Array(props.data.length).fill(null).map((item, index) => {
    return createData(
      props.data[index].customerDetail.firstName + " " + props.data[index].customerDetail.lastName,
      props.data[index].purchaseTotal,
      props.data[index].orderDate,
      "viewTools"
      )
  })

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (value === 'viewTools') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            بررسی سفارش
                          </TableCell>
                        );
                      }
                      else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
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
