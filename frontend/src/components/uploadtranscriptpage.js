import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UploadTranscriptPage() {
  const [textFieldValue, setTextFieldValue] = useState('');  // State to hold the value of the TextField
  const [file, setFile] = useState(null); // State to hold the uploaded file

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('text', textFieldValue);
    formData.append('file', file);

    try {
      const response = await fetch('/api/submit-text', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{width: '90%', marginTop: '20px'}}>
      <h1>Upload Transcript</h1>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
        
        <h1>Type in your question and submit</h1>
      <TextField 
        label="User input"
        variant="outlined"
        fullWidth
        multiline
        minRows={1}
        value={textFieldValue}
        onChange={e => setTextFieldValue(e.target.value)}
        inputProps={{ maxLength: 100 }}
      />

      <Button variant="contained" sx={{marginTop: '20px'}} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
