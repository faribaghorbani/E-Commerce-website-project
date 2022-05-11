import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import RTL from '../../components/RTL.component'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import zIndex from '@mui/material/styles/zIndex';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import{ GrStorage, GrLogout } from 'react-icons/gr'
import{ AiOutlineTable } from 'react-icons/ai'
import{ BsFillPeopleFill } from 'react-icons/bs'
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function AdminLayout(props) {
  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState('');


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changePanel = (link) => {
    navigate(link)
  }


  const drawer = (
    <div>
      <Toolbar sx={{height : { md: '100px'}}} />
      <Divider />
      <RTL>
        <List>
          {Object.entries({
          "کالاها": {icon: <AiOutlineTable /> , link: '/panel/products'},
          "موجودی وقیمت": {icon: <GrStorage /> , link: '/panel/quantity'},
          "سفارش ها": {icon: <BsFillPeopleFill/> , link: '/panel/order'}
          }).map(([text, {icon, link}]) => (
            <ListItem key={text} disablePadding onClick={() => changePanel(link)}>
              <ListItemButton>
                <ListItemText primary={text} />
                <ListItemIcon sx={{display: 'flex', justifyContent: 'center'}}>
                  {icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </RTL>
      <Divider />
      <RTL>
        <List>
          {Object.entries({
            'خروج از پنل ادمین': {icon: <GrLogout />, link: '/login'}
            }).map(([text, {icon, link}]) => (
            <ListItem key={text} disablePadding onClick={() => changePanel(link)}>
              <ListItemButton>
                <ListItemText primary={text} />
                <ListItemIcon sx={{display: 'flex', justifyContent: 'center'}}>
                  {icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </RTL>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
	<>
	<div style={{
		backgroundColor: 'black',
		color: 'white' , 
		minHeight: '100px',
		position: 'relative',
		zIndex: 100}}
		>
			home
	</div>
	<Box position='relative'
		sx={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'red',
		minHeight: "70px",
		width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
		}}>
			{selectedPanel}
		<IconButton
			color="inherit"
			aria-label="open drawer"
			// edge="start" that was the problem 
			onClick={handleDrawerToggle}
			
			sx={{mr: 0, display:  { md: 'none'}}}
			>
			<MenuIcon />
		</IconButton>
	</Box>


    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Box
        component="nav"
        sx={{width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
			container={container}
			variant="temporary"
			open={mobileOpen}
			onClose={handleDrawerToggle}
			// anchor='right'
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			sx={{
				display: { xs: 'block', md: 'none' },
				'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
			}}
        >
          {drawer}
        </Drawer>
        <Drawer
			position='relative'
			variant="permanent"
			// anchor='right'
			sx={{position: 'absolute',
				zIndex: 90,
				display: { xs: 'none', md: 'block' },
				'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
			}}
			open
        >
          {drawer}
        </Drawer>
      </Box>

	  
      <Box
        component="main"
        sx={{ backgroundColor: 'blue',flexGrow: 1, mx: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
	</>
  );
}

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default AdminLayout;
