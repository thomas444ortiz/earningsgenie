import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

export default function SeeFilingsPage() {
  const options = ['Company 1', 'Company 2', 'Company 3', 'Company 4'];

  return (
    <Box m="auto" sx={{  
      width: '90%',
      border:'2px dashed grey',
      borderRadius: '15px',
      marginTop: '100px',
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1 style={{textAlign: 'center'}}>Search for Companies Below</h1>
      <Box sx={{width: '90%', margin: '0 auto'}}>
        <Autocomplete
          options={options}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Enter a Ticker Here" />}
        />
        <Button variant="contained" sx={{marginTop: '20px'}}>Go To This Company's Documents</Button>
      </Box>
    </Box>
  );
}

