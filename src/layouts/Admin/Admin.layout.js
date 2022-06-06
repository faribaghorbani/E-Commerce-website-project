import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet } from 'react-router-dom';
import{ GrStorage, GrLogout } from 'react-icons/gr'
import{ AiOutlineTable } from 'react-icons/ai'
import{ BsFillPeopleFill } from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => {
	return ({
	zIndex: theme.zIndex.drawer - 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	[theme.breakpoints.down('md')]: {
		marginLeft: `calc(${theme.spacing(10)} + 1px )`,
		width: `calc(100% - ${theme.spacing(10)} - 1px)`,
	},
	[theme.breakpoints.up('md')]: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
  	}
})});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
	  
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    },
	[theme.breakpoints.down('md')]:{
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
		...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
		}),
	}
  }),
);

export default function MiniDrawer() {
	const navigate = useNavigate()
	const adminPanelTitle = useSelector(state => state.adminPanelTitle)
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const changePanel = (link) => {
		navigate(link)
		if (link == '/login') {
			localStorage.removeItem("token")
		}
	}

	return (
		<Box sx={{ display: 'flex' }}>
		<CssBaseline />
		<AppBar dir='rtl' position="fixed">
			<Toolbar>
			<Typography variant="h6" noWrap component="div">
				{adminPanelTitle}
			</Typography>
			</Toolbar>
		</AppBar>

		
		<Drawer variant="permanent" 
		onMouseEnter={handleDrawerOpen}
		onMouseLeave={handleDrawerClose}
		sx={{
			position: {xs: 'absolute' ,md: 'static'}
		}}
		open={open}
		>
			<DrawerHeader />
			<Divider />
			<List >
			{Object.entries({
			"کالاها": {icon: <AiOutlineTable /> , link: '/panel/products'},
			"موجودی وقیمت": {icon: <GrStorage /> , link: '/panel/quantity'},
			"سفارش ها": {icon: <BsFillPeopleFill/> , link: '/panel/order'}
			}).map(([text, {icon, link}]) => (
				<ListItem key={text} sx={{ display: 'block' }} disablePadding>
					<Link to={link} style={{textDecoration: 'none', color: 'inherit'}}>
						<ListItemButton
							sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
							}}
						>
							<ListItemIcon sx={{
								minWidth: 0,
								ml: 2,
								mr: 3,
								justifyContent: 'center',
							}}>
							{icon}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: { md: 1, xs: open? 1:0} }} />
						</ListItemButton>
					</Link>
				</ListItem>
			))}
			{/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem key={text} disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					sx={{
					minHeight: 48,
					justifyContent: open ? 'initial' : 'center',
					px: 2.5,
					}}
				>
					<ListItemIcon
					sx={{
						minWidth: 0,
						ml: 2,
						mr: 3,
						justifyContent: 'center',
					}}
					>
					{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} sx={{ opacity: { md: 1, xs: open? 1:0} }} />
				</ListItemButton>
				</ListItem>
			))} */}
			</List>
			<Divider />
			<List>
				{Object.entries({
            	'خروج از پنل ادمین': {icon: <GrLogout />, link: '/login'}
            	}).map(([text, {icon, link}]) => (
					<ListItem key={text} sx={{ display: 'block' }} disablePadding onClick={() => changePanel(link)}>
					<ListItemButton
						sx={{
						minHeight: 48,
						justifyContent: open ? 'initial' : 'center',
						px: 2.5,
						}}
					>
						<ListItemIcon sx={{
							minWidth: 0,
							ml: 2,
							mr: 3,
							justifyContent: 'center',
						}}>
						{icon}
						</ListItemIcon>
						<ListItemText primary={text} sx={{ opacity: { md: 1, xs: open? 1:0} }} />
					</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
		<Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: {xs: `calc(${theme.spacing(10)} + 1px)`, md: 0 } }}>
			<DrawerHeader />
			<Outlet/>
		</Box>
		</Box>
	);
}
