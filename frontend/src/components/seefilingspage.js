import React, { useEffect, useState } from 'react';  
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export default function SeeFilingsPage() {
  const [options, setOptions] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const navigate = useNavigate();  // Get a reference to the navigate function

  useEffect(() => {
        fetch('api/companies')
            .then(response => response.json())
            .then(data => {
                const tickers = data.map(company => company.ticker);
                const sortedTickers = tickers.sort();
                setOptions(sortedTickers);  
            })
            .catch(error => console.error(error));
    }, []); 

  return (
    <Box m="auto" sx={{  
      width: '90%',
      borderRadius: '10px',
      marginTop: '100px',
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'grey.100',
    }}>
      <h1 style={{textAlign: 'center'}}>Search for Companies Below</h1> 
      <Box sx={{width: '90%', margin: '0 auto'}}>
        <Autocomplete
          options={options}
          fullWidth
          onChange={(event, newValue) => setSelectedTicker(newValue)}  
          renderInput={(params) => <TextField {...params} label="Enter a Ticker Here" />}
        />
        <Button variant="contained" sx={{marginTop: '20px'}} onClick={() => navigate(`/filings/${selectedTicker}`)}>Go To This Company's Documents</Button>
      </Box>
    </Box>
  );
}



