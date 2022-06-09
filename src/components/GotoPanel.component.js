import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


const GotoPanel = () => {
    return (
		<Box sx={{display: 'flex', alignItems: 'center'}}>
			<Link to='/panel' style={{textDecoration: 'none', color: 'inherit'}}>
				<IconButton aria-label="cart" sx={{color: 'white'}}>
					<AccountCircleIcon />
				</IconButton>
				<Typography variant='body' component="label" sx={{cursor: 'pointer'}}>
					سبد خرید
				</Typography>
			</Link>
		</Box>
    )
}

export default GotoPanel;
