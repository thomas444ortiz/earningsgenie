import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SeeDocument() {
  const { docid, ticker } = useParams();
  const [document, setDocument] = useState(null);
  const [company, setCompany] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState('');  // State to hold the value of the TextField
  const [responseValue, setResponseValue] = useState('');  // State to hold the response
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // Fetch the document data
    fetch(`../../api/documents/${docid}`)
      .then(response => response.json())
      .then(data => {
        setDocument(data);
        // Fetch the company data using the ticker from URL params
        return fetch(`../../api/companies/${ticker}`);
      })
      .then(response => response.json())
      .then(data => {
        setCompany(data);
      })
      .catch(error => console.error(error));
  }, [docid, ticker]);

  const handleSubmit = () => {
    // Validate input length
    if (textFieldValue.length < 10) {
      alert('Please enter at least 10 characters before submitting.');
      return;
    }

    // Disable the button
    setButtonDisabled(true);
    
    // Send a POST request to the backend
    fetch('/api/submit-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textFieldValue, body: document.body })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResponseValue(data.response);  // Assume the response data is in a field called 'message'
      setTimeout(() => {
        setButtonDisabled(false);
      }, 15000);  // Re-enable the button after 10 seconds
    })
    .catch(error => {
      console.error(error);
      // Enable the button if there was an error
      setButtonDisabled(false);
    });
  };
  

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '50px'
    }}>
      
      <Box sx={{width: '90%', marginTop: '20px'}}>
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
              <p>Button is disabled for 15 seconds after being pressed.</p>
            ) : null}          
        </div>

        <TextField  // Added TextField to display the response
          label="Response"
          variant="outlined"
          fullWidth
          multiline
          minRows={1}
          value={responseValue}
          InputProps={{readOnly: true}}
          sx={{marginTop: '20px'}}
        />
      </Box>      
      
      {document && company ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #000',
          maxWidth: '100%',
        }}>
          <h1>{company.name}: {document.title}</h1>
          <h2>{new Date(document.date).toLocaleDateString()}</h2>
          <p>{document.body}</p>
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
}