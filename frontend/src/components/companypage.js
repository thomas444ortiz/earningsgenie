import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function SeeCompany() {
  const { ticker } = useParams();
  const [company, setCompany] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`../api/companies/${ticker}`)
      .then(response => {
        if (!response.ok) {
          navigate('/filings'); // Redirect to the filings page if company not found
        } else {
          return response.json();
        }
      })
      .then(data => {
        setCompany(data);
      })
      .catch(error => console.error(error));
  }, [ticker, navigate]);


  useEffect(() => {
    fetch(`../api/companies/${ticker}/documents`)
      .then(response => response.json())
      .then(data => {
        setDocuments(data);
      })
      .catch(error => console.error(error));
  }, [ticker]);


  return (
    <div>
      {company ? (
        <div>
          <h1>{company.name}: {company.ticker}</h1>
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
            <h2>Available Documents:</h2>        

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Actions</TableCell>  {/* New TableCell for the button */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {documents.map((document, index) => (
                    <TableRow key={index}>
                      <TableCell>{document.document_type}</TableCell>
                      <TableCell>{document.title}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => navigate(`/filings/${ticker}/${document.id}`)}>
                          Go to this document
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box> 
        </div>
      ) : (
        <h2>Company not found</h2>
      )}
    </div>
  );
}