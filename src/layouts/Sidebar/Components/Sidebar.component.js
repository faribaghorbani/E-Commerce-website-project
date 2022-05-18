import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../../redux/slices/selectedCategorySlice';

const SidebarComponent = () => {
    const categoryData = useSelector(state => state.categoryData)
    const selectedCategory = useSelector(state => state.selectedCategory)
    const dispatch = useDispatch()
	const [openStatus, setOpenStatus] = useState({});

    const updateReduxState = (obj) => {
        if (JSON.stringify(selectedCategory) !== JSON.stringify(obj)) {
            dispatch(setSelectedCategory(obj))
        }
    }

	useEffect(() => {
		categoryData.map((category) => {
			setOpenStatus(prevState => ({...prevState, [category.name]: false}))
		})
	}, [categoryData])

    return (
        <List>
            {categoryData.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        <ListItemButton onClick={() => {
                            const temp = openStatus[item.name]
                            setOpenStatus(prevState => ({...prevState, [item.name]: !temp}))
                            updateReduxState({category: item.name, subCategory: ""})
                        }}>
                            <ListItemText primary={item.title} />
                            {openStatus[item.name] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openStatus[item.name]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.subCategory.map((sub) => {
                                    return (
                                    <ListItemButton key={sub.id} sx={{ pl: 4 }} onClick={() => {
                                        updateReduxState({category: item.name, subCategory: sub.name})
                                    }}>
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
    )
}

export default SidebarComponent
