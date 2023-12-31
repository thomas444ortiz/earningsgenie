import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EarningsGeniePro() {
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Handle file upload here...
        console.log(file);
    };

    useEffect(() => {
        // Get token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
            // If there is no token, redirect to login page
            window.alert('You must be logged in to use EarningsGenie Pro. You will now be redirected to login.');
            navigate('/login');
        } else {
            // If there is a token, validate it
            axios.post('/api/check_token', {
                token: token
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            })
            .then(response => {
                // If token is valid, do nothing
            })
            .catch(error => {
                // If token is invalid, redirect to login page
                window.alert('You must be logged in to use EarningsGenie Pro');
                navigate('/login');
            });
        }
    }, [navigate]);

    return (
        <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <h1>Welcome to EarningsGenie Pro</h1>
            <h2>I will eventually throw some premium features in here to make money with it. If you have any good ideas, please share them with me.</h2>   
            <h2>Best idea at the moment is: upload audio files (or send a bot into an earnings call) for live transcription, advanced sentiment analysis, etc. For now, I just have a placeholder file upload input below.</h2>
            <input type="file" accept=".mp3" onChange={handleFileUpload} />
        </div>
    );
}


