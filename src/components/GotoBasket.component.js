import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';



const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	  right: -3,
	  top: 13,
	  border: `2px solid ${theme.palette.background.paper}`,
	  padding: '0 4px',
	},
}));


const GotoBasket = () => {
	const navigate = useNavigate()
	const basketProducts = useSelector(state => state.basketProducts)
	const [basketBadge, setBasketBadge] = useState(0)

	useEffect(() => {
		let sum = 0
        Object.entries(basketProducts).forEach(item => {
            if (item[1].status == 'normal' ||  item[1].status == 'not-enough') {
                sum += (item[1].quantity)
            }
        })
        setBasketBadge(sum)
	}, [basketProducts])

	return (
		<Link to="/basket" style={{textDecoration: 'none', color: 'inherit'}}>
			<Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
				{basketBadge?
					(<IconButton aria-label="cart" sx={{color: 'white', m: 0}}>
						<StyledBadge badgeContent={basketBadge}>
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
					): 
					(<IconButton aria-label="cart" sx={{color: 'white', m:0}}>
						<ShoppingCartIcon />
					</IconButton>) 
				}
				<Typography variant='body' component="label" sx={{cursor: 'pointer'}}>
					سبد خرید
				</Typography>
			</Box>
		</Link>
	)
}

export default GotoBasket;
