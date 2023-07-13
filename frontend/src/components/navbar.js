import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

const Navbar = (props) => {
    return (
        <div>
            <AppBar position="static">  
                <Container maxWidth="xl">
                    <a>Filings</a>
                    <a>Upload Transcript</a>
                    <a>Login</a>
                    <a>Register</a>
                    <a>About</a>
                    <a>Logout</a>                  
                </Container>
            </AppBar>
        </div>
    );
}

export default Navbar;