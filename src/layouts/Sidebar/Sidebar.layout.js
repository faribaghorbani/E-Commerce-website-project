import { Grid } from '@mui/material';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../../pages/Loading/Loading.page';
import { setCategoryData } from '../../redux/slices/categoryDataSlice';
import { getDataUser } from '../../services/http.service';
import Header from './Components/Header.component';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';




const SidebarLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
	const categoryData = useSelector(state => state.categoryData)
	const dispatch = useDispatch()
	const [openStatus, setOpenStatus] = useState({});

	// const handleClick = () => {
	// 	setOpen(!open);
	// };

    useEffect(() => {
		getDataUser('/category?_embed=subCategory', 
		(data) => {
			dispatch(setCategoryData(data))
			setLoading(false)
		},
		() => {
			setLoading(false)
			setError(true)
		})
    }, [])

	useEffect(() => {
		console.log(categoryData)
		categoryData.map((category) => {
			setOpenStatus(prevState => ({...prevState, [category.name]: false}))
		})
	}, [categoryData])

	useEffect(() => {
		console.log(openStatus)
	}, [openStatus])

	if (loading) {
		return (
			<>
				<Header />
				<LoadingPage/>
			</>
		)
	} else if (error) {
		return (
			<>
				<Header />
				<div>error</div>
			</>
		)
	} else {
		return (
			<>
				<Header />
				<h1>salam</h1>
				<Grid container>
					<Grid item xs={9}>
						{props.children}
					</Grid>
					<Grid item xs={3}>
						<List>
							{categoryData.map((item) => {
								// console.log(item)
								return (
									<React.Fragment key={item.id}>
									<ListItemButton onClick={() => {
										const temp = openStatus[item.name]
										setOpenStatus(prevState => ({...prevState, [item.name]: !temp}))
									}}>
										<ListItemText primary={item.title} />
										{openStatus[item.name] ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse in={openStatus[item.name]} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{item.subCategory.map((sub) => {
												console.log(sub)
												return (
												<ListItemButton key={sub.id} sx={{ pl: 4 }}>
													<ListItemText primary={sub.title} />
												</ListItemButton>
												)
											})}
										</List>
									</Collapse>
								</React.Fragment>
								)
							})}
						</List>
					</Grid>
				</Grid>
			</>
		)
	}
}

export default SidebarLayout;
