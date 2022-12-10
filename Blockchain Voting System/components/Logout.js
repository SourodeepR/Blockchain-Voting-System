import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from '../routes';
//import "./Header.module.css";
let style = {
    center: 'auto'
}
const Logout = () => {
    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Votify
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link route="/about">
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} >About Us</Button>
                        </Link>
                        <Link route="/contact">
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Contact us</Button>
                        </Link>
                        <Link route="/#">
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button>
                        </Link>
                    </Box>

                    {/* <Menu>
                        <MenuItem>
                            About us</Link>
                    </MenuItem>
                    <MenuItem key={<Link route="/contact">Contact us</Link>}>

                    </MenuItem>
                </Menu> */}
                    {/* <span style={style}><div className="Logo">
                    <center><h2 style={{ color: 'white' }}>
                        <h1>Votify</h1>
                    </h2>
                    </center>
                </div>
                </span>
            </Toolbar>
            <Toolbar>

                <Button>  <a href="/about">About Us</a></Button>
                <Button>    <a href="/contact">Contact Us</a></Button> */}
                </Toolbar>
            </Container>

        </AppBar >

    )
}

export default Logout;