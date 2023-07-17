import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UploadTranscriptPage() {
  const [textFieldValue, setTextFieldValue] = useState('');  // State to hold the value of the TextField
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [responseValue, setResponseValue] = useState('');  // State to hold the response
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null); // State to hold the PDF preview URL
  const [loading, setLoading] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    // Create a blob URL representing the PDF file
    setPdfPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    // Validate input length and file attachment
    if (textFieldValue.length < 10 || !file) {
      alert('Please enter at least 10 characters and attach a PDF file before submitting.');
      return;
    }

    // Disable the button
    setButtonDisabled(true);

    const formData = new FormData();
    formData.append('text', textFieldValue);
    formData.append('file', file);
    setLoading(true);
    try {
      const response = await fetch('/api/submit-text', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);

      setResponseValue(data.response);
      setLoading(false);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 20000);  // Re-enable the button after 20 seconds
    } catch (error) {
      console.error(error);
      // Enable the button if there was an error
      setButtonDisabled(false);
      setLoading(false);
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

      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <Button variant="contained" sx={{marginTop: '20px'}} onClick={handleSubmit} disabled={buttonDisabled}>
          Submit
        </Button>
        {buttonDisabled ? (
          <p style={{margin: '0'}}>Button is disabled for 20 seconds after being pressed.</p>
        ) : null}
      </div>

      <TextField  // Added TextField to display the response
        label="Response"
        variant="outlined"
        fullWidth
        multiline
        minRows={1}
        value={loading ? 'loading...' : responseValue}
        InputProps={{readOnly: true}}
        sx={{marginTop: '20px', marginBottom: '20px'}}
      />

      {/* Display the uploaded PDF file */}
      {pdfPreviewUrl ? (
        <embed
          src={pdfPreviewUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      ) : null}
    </Box>
  );
}
