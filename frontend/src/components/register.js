import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext';  

export default function RegisterPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);  

    const handleSubmit = async (event) => {
        event.preventDefault();  // prevent the form from refreshing the page

        if(password !== confirmPassword) {
            alert("Passwords must match.");
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, confirmPassword }),
        });
      
        const data = await response.json();
      
        if (data.response) {
            alert(data.response);
        } else {
            navigate('/');
            setIsLoggedIn(true);            
        }
    };

    return (
        <Box m="auto" sx={{  
            width: 300,
            border:'2px dashed grey',
            borderRadius: '15px',
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey.100'
        }}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
                <h2>Register Below</h2>
                <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{ padding: "2px", bgColor: 'white' }}/>
                <TextField id="outlined-password-input" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" sx={{ padding: "2px", bgColor: 'white'  }}/>
                <TextField id="outlined-confirm-password-input" label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" sx={{ padding: "2px", bgColor: 'white'  }}/>
                <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">Create My Account</Button>
                <RouterLink to="/login" style={{ margin: "20px", textAlign: "center" }}>Already have an account? Log in</RouterLink>                                 
            </form>
        </Box>     
    );
}
