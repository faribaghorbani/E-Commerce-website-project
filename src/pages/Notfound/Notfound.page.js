import { Paper, Typography } from '@mui/material';
import React from 'react'
import './Notfound.scss'

const NotfoundPage = ({title}) => {
  	return (
		<div className='notfound-page'>
			<Paper>
				<Typography>
					{title}
				</Typography>
			</Paper>
		</div>
  	)
}

export default NotfoundPage;
