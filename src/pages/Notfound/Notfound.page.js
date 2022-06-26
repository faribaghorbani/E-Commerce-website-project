import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import './Notfound.scss'

const NotfoundPage = ({title}) => {
  	return (
		<Box className='notfound-page'>
			<Paper>
				<Typography>
					{title}
				</Typography>
			</Paper>
		</Box>
  	)
}

export default NotfoundPage;
