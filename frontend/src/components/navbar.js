import React from 'react';
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

export default function Navbar(props) {
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
                        <Typography varitan="h6" component="div" sx={{ flexGrow: 1}}>
                            EarningsGenie
                        </Typography>
                        <Button color="inherit" component={RouterLink} to="">About EarningsGenie</Button>
                        <Button color="inherit" component={RouterLink} to="/filings">Filings</Button>
                        <Button color="inherit" component={RouterLink} to="/uploadtranscript">Upload Transcript</Button>                                 
                        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                        <Button color="inherit" component={RouterLink} to="/register">Register</Button>                        
                        <Button color="inherit">Logout</Button>
                    </Toolbar> 
                </AppBar>

                    <Routes>
                        <Route path='' element={<AboutPage />} />       
                        <Route path='/filings' element={<SeeFilingsPage/>}/>   
                        <Route path='/uploadtranscript' element={<UploadTranscriptPage />} />     
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                    </Routes>
            </Box>
        </Router>             
    );
}