import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useNavigate, useSelector } from 'react-router-dom';
import { setAdminPanelSavedProducts } from '../../../redux/slices/adminPanelSavedProductsSlice';
import { useDispatch } from 'react-redux';
import { getData } from '../../../services/http.service';
import ModalComponent from './Modal.component';
import EditproductForm from './EditproductForm.component';

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

function createData(id, thumbnail, name, brand, operation) {
  return {id, thumbnail, name, brand, operation};
}


export default function TableComponent(props) {
	const [open, setOpen] = useState(false);
	const rows = new Array(props.data.length).fill(null).map((item, index) => {
		return createData(
		props.data[index].id,
		props.data[index].thumbnail,
		props.data[index].name,
		props.data[index].brand,
		'editTools'
		)
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteData = (id) => {
		console.log(id)
		axios.delete(`/products/${id}`)
		.then(res => {
			getData('/products',
			(data) => {
			dispatch(setAdminPanelSavedProducts(data))
			},
			() => navigate("/login", {replace: true})
			)
		})
		.catch(err => {
			if (err.response.status == 401) {
			navigate('/login')
			} 
		})
	}

	const handleEditData = (id) => {
		const targetData = props.data.filter(item => item.id === id)
		handleOpen()
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
						if (column.id == "thumbnail") {
							return (
							<TableCell key={column.id} align={column.align}>
							<img src={`http://localhost:3002/files/${value}`} style={{width: '100px', height: '100px', objectFit: 'cover',}} />
							</TableCell>
						)}
						else if(column.id == "editTools") {
							return (
							<TableCell key={column.id} align={column.align}>
							{/* <div style={{height: '100%',display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}> */}
								<Button variant="outlined" onClick={() => handleDeleteData(row.id)}>حذف</Button>
								<Button variant="outlined" onClick={() => handleEditData(row.id)} sx={{m: 1}}>ویرایش</Button>
							{/* </div> */}
							</TableCell>
							);
						} else {
							return (
							<TableCell dir="rtl" key={column.id} align={column.align}>
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

			<ModalComponent title={"افزودن کالا"}
				open={open} 
				handleClose={handleClose}
				handleOpen={handleOpen}
			>
				<EditproductForm closeModal={handleClose} />
			</ModalComponent>

		</Paper>
	);
}
