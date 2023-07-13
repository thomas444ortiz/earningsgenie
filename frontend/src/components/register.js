import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterPage () {
    return (
        <Box m="auto" sx={{  
            width: 300,
            height: 300,
            border:'2px dashed grey',
            borderRadius: '15px',
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>Register Below</h2>
                <TextField label="Email" sx={{ padding: "2px" }}/>
                <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" sx={{ padding: "2px" }}/>
                <Button variant="contained" sx={{ marginTop: "10px" }}>Create My Account</Button>
                <RouterLink to="/login" style={{ marginTop: "20px", textAlign: "center" }}>Already have an account? Log in</RouterLink>                                 
            </form>
        </Box>     
    );
}
