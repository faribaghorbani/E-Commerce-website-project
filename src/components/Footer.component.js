import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import logo from './../assets/images/logo.png'
import './style/Footer.scss'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()

    return (
        <Box className="layout-footer" sx={{p: 6, my: 0}}>
            <Grid container 
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
            >
                <Grid item 
                order={{xs:3, md: 1}}
                xs={12} md={3} 
                sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{textAlign: {xs: 'center', md: 'left'}}}>
                        COPYRIGHT © 2022|powered by: Fariba Ghorbani
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}
                order={{xs:1, md: 2}} 
                sx={{display: 'flex', justifyContent: 'center'}}>
                    <div className='logo' onClick={() => navigate('/')}>
                        <img src={logo} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    </div>
                </Grid>
                <Grid item container 
                spacing={2}
                xs={12} md={3}
                alignItems="center"
                justifyContent="center"
                order={{xs:2, md: 3}} 
                >
                    <Grid item>
                        <TwitterIcon className='icon' />
                    </Grid>
                    <Grid item>
                        <InstagramIcon className='icon'/>
                    </Grid>
                    <Grid item>
                        <YouTubeIcon className='icon'/>
                    </Grid>
                    <Grid item>
                        <TelegramIcon className='icon'/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer;
