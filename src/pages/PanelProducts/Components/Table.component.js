import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  {
    id: 'editTools',
    label: 'عملیات',
    minWidth: 90,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'brand', label: 'برند', minWidth: 90, align:'right'},
  { id: 'name', label: 'نام کالا', minWidth: 90, align:'right'},
  { id: 'thumbnail', label: 'تصویر', minWidth: 90, align:'right'},
];

function createData(thumbnail, name, brand, operation) {
  return { thumbnail, name, brand, operation};
}


export default function TableComponent(props) {
  console.log(props)
  const rows = new Array(props.data.length).fill(null).map((item, index) => {
    return createData(
      props.data[index].thumbnail,
      props.data[index].name,
      props.data[index].brand,
      'editTools'
      )
  })

  // const rowss = [
  //   createData('India', 'IN', 1324171354, 3287263),
  //   createData('China', 'CN', 1403500365, 9596961),
  //   createData('Italy', 'IT', 60483973, 301340),
  //   createData('United States', 'US', 327167434, 9833520),
  //   createData('Canada', 'CA', 37602103, 9984670),
  //   createData('Australia', 'AU', 25475400, 7692024),
  //   createData('Germany', 'DE', 83019200, 357578),
  //   createData('Ireland', 'IE', 4857000, 70273),
  //   createData('Mexico', 'MX', 126577691, 1972550),
  //   createData('Japan', 'JP', 126317000, 377973),
  //   createData('France', 'FR', 67022000, 640679),
  //   createData('United Kingdom', 'GB', 67545757, 242495),
  //   createData('Russia', 'RU', 146793744, 17098246),
  //   createData('Nigeria', 'NG', 200962417, 923768),
  //   createData('Brazil', 'BR', 210147125, 8515767),
  // ];

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
                      if (column.id == "thumbnail") {
                        return (
                        <TableCell key={column.id} align={column.align}>
                          <img src={`http://localhost:3002${value}`} style={{width: '100px', height: '100px', objectFit: 'cover',}} />
                        </TableCell>
                      )}
                      else if(column.id == "editTools") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                          {/* <div style={{height: '100%',display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}> */}
                            <Button variant="outlined">حذف</Button>
                            <Button variant="outlined" sx={{m: 1}}>ویرایش</Button>
                          {/* </div> */}
                          </TableCell>
                        );
                      } else {
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
