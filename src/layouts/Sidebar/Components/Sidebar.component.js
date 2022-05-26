import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import RTL from '../../../components/RTL.component'
import { useNavigate, useParams } from 'react-router-dom';

const SidebarComponent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const categoryData = useSelector(state => state.categoryData)
	const [openStatus, setOpenStatus] = useState({});

	useEffect(() => {
        console.log(params)
		categoryData.map((category) => {
			setOpenStatus(prevState => ({...prevState, [category.name]: false}))
		})
	}, [categoryData])

    return (
        <List>
            <RTL>
                <ListItemButton onClick={() => {
                    navigate(`/products`)
                    }}>
                    <ListItemText primary={"همه"} />
                </ListItemButton>
            </RTL>
            {categoryData.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        <RTL>

                            <ListItemButton onClick={() => {
                                const temp = openStatus[item.name]
                                setOpenStatus(prevState => ({...prevState, [item.name]: !temp}))
                                navigate(`/products/${item.name}`)
                            }}>
                                {openStatus[item.name] ? <ExpandLess /> : <ExpandMore />}
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </RTL>
                        <Collapse in={openStatus[item.name]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.subCategories.map((sub) => {
                                    return (
                                    <RTL>
                                        <ListItemButton key={sub.id} sx={{ pl: 4 }} onClick={() => {
                                            navigate(`/products/${item.name}/${sub.name}`)
                                        }}>
                                            <ListItemText dir="rtl" primary={sub.title} />
                                        </ListItemButton>
                                    </RTL>
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
