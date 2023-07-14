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
    // Send a POST request to the backend
    fetch('/api/submit-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textFieldValue, body: document.body })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
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

        <Button variant="contained" sx={{marginTop: '20px'}} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
