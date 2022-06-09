import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ThemeSwitchComponent from './ThemeSwitch.component';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import logo from './../assets/images/logo.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function HeaderDrawer({toggleDrawer, state}) {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        if (matches == true) {
            const temp = toggleDrawer(false)
            temp()
        }
        // console.log(matches)
    }, [matches])

    const list = () => (
        <Box
        dir="rtl"
        sx={{ width: 300 }}
        role="presentation"
        >
            <Box>
                <List>
                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={"منو"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <List>
                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"خانه"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/products?page=1' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ProductionQuantityLimitsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"محصولات"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
            <Divider />
            <Box sx={{display: {xs: 'block', lg: 'none'}}}>
                <List>
                    <Link to='/basket' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={"سبد خرید"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <List>
                    <Link to='/panel' style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"پنل مدیریت"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
            <Divider />
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ThemeSwitchComponent />
                            </ListItemIcon>
                            <ListItemText primary={"تغییر تم"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box dir='rtl'>
        <Drawer
        anchor='right'
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
            {list()}
        </Drawer>
        </Box>

    );
}
