import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.token) {
            // Save token somewhere (like localStorage) and redirect user
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            // Show error message to user
            alert('Invalid login credentials');
        }
    };

    return (
        <Box m="auto" sx={{  
            width: 300,
            height: 300,
            border:'2px dashed grey',
            borderRadius: '15px',
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey.100'
        }}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>Log In Below</h2>
                <TextField label="Email" onChange={e => setEmail(e.target.value)} sx={{ padding: "2px", bgColor: 'white'  }}/>
                <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} sx={{ padding: "2px", bgColor: 'white' }}/>
                <Button variant="contained" type="submit" sx={{ marginTop: "10px" }}>Log In</Button>
                <RouterLink to="/register" style={{ marginTop: "20px", textAlign: "center" }}>Don't Have an Account? Create One</RouterLink>                                   
            </form>
        </Box>      
    );
}
