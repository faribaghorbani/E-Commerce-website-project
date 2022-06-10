import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { v4 as uuidv4 } from 'uuid';
import './style/OrdersTable.scss'
import ModalComponent from './Modal.component';
import OrderDetails from './OrderDetails.component';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";


const columns = [
	{ id: 'viewOrders', label: '', minWidth: 90, align:'right'},
	{ id: 'orderDate', label: 'تاریخ خرید', minWidth: 90, align:'right'},
	{ id: 'purchaseTotal', label: 'مجموع خرید', minWidth: 90, align:'right'},
	{ id: 'name', label: 'نام کاربر', minWidth: 90, align:'right'},
];

function createData(id, name, purchaseTotal, orderDate, viewOrders) {
  	return {id, name, purchaseTotal, orderDate, viewOrders};
}


export default function TableComponent(props) {
	const rows = new Array(props.data.length).fill(null).map((item, index) => {
		return createData(
		props.data[index].id,
		props.data[index].customerDetail.firstName + " " + props.data[index].customerDetail.lastName,
		props.data[index].purchaseTotal,
		new Date(props.data[index].orderDate).toLocaleDateString("fa-IR"),
		"viewOrders"
		)
	})
	const [orderInModal, setOrderInModal] = useState({})
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const openOrderModal = (id) => {
		const targetData = props.data.filter(item => item.id == id)
		setOrderInModal(targetData[0])
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
		<Paper sx={{ width: '100%', overflow: 'hidden' }} className='orders-table-modal'>
		<TableContainer sx={{ }} className='orders-table'>
			<Table stickyHeader aria-label="sticky table">
			<TableHead>
				<TableRow>
				{columns.map((column) => (
					<TableCell
					key={uuidv4()}
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
					<TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
						{columns.map((column) => {
						const value = row[column.id];
						if (value === 'viewOrders') {
							return (
							<TableCell key={column.id} align={column.align} className='view-orders-cell' onClick={() => openOrderModal(row.id)}>
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
			dir='rtl'
			rowsPerPageOptions={[10, 25, 100]}
			component="div"
			count={rows.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
		<ModalComponent 
			title={"نمایش سفارش"}
			open={open} 
			handleClose={handleClose}
			handleOpen={handleOpen}
		>
			<OrderDetails orderInModal={orderInModal} closeModal={handleClose}/>	
		</ModalComponent>
		</Paper>
	);
}
