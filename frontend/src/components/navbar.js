import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import SeeFilingsPage from './seefilingspage.js';
import UploadTranscriptPage from './uploadtranscriptpage.js';
import AboutPage from './about.js';
import LoginPage from './login.js';
import RegisterPage from './register.js';
import SeeCompany from './companypage.js';
import SeeDocument from './document.js';
import EarningsGeniePro from './earningsgeniepro.js';
import axios from 'axios';
import { AuthContext } from '../authcontext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar(props) {
    const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        axios.post('/api/check_token', {token: localStorage.getItem('token')})
        .then(response => {
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUserEmail(response.data.email); 
                console.log('logged in')
            } else {
                setIsLoggedIn(false);
                console.log('not logged in')
            }
        })
        .catch(error => {
            console.log(error);
            setIsLoggedIn(false);
        });
    }, []);        

    const logout = () => {
        axios.get('/api/logout')
            .then((response) => {
                console.log(response);
                setIsLoggedIn(false); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Router>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2}}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: 'xl' }}>EarningsGenie</span>
                            {isLoggedIn && <div style={{ marginLeft: '10px', fontStyle: 'italic'}}>Logged in as {userEmail}</div>}
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Button color="inherit" component={RouterLink} to="">About EarningsGenie</Button>
                            <Button color="inherit" component={RouterLink} to="/filings">Filings</Button>
                            <Button color="inherit" component={RouterLink} to="/uploadtranscript">Upload Transcript</Button>                         
                            <Button color="inherit" component={RouterLink} to="/earningsgeniepro">EarningsGenie Pro</Button>
                            { isLoggedIn ? (
                            <Button color="inherit" onClick={logout} to="">Logout</Button>
                            ) : (
                            <>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/register">Register</Button>                             
                            </>
                            )}
                        </Box>

                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Menu</Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem onClick={handleClose} component={RouterLink} to="">About EarningsGenie</MenuItem>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/filings">Filings</MenuItem>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/uploadtranscript">Upload Transcript</MenuItem>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/earningsgeniepro">EarningsGenie Pro</MenuItem>
                                { isLoggedIn ? (
                                <MenuItem onClick={handleClose} onClick={logout} to="">Logout</MenuItem>
                                ) : (
                                <>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/login">Login</MenuItem>
                                <MenuItem onClick={handleClose} component={RouterLink} to="/register">Register</MenuItem>
                                </>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar> 
                </AppBar>

                <Routes>
                    <Route path='' element={<AboutPage />} />       
                    <Route path='/filings' element={<SeeFilingsPage/>}/>   
                    <Route path='/uploadtranscript' element={<UploadTranscriptPage />} />     
                    <Route path='/earningsgeniepro' element={<EarningsGeniePro />} />   
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/filings/:ticker' element={<SeeCompany/>} />
                    <Route path='/filings/:ticker/:docid' element={<SeeDocument/>} />
                </Routes>
            </Box>
        </Router>
    );
}
