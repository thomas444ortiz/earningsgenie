import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeeCompany() {
  const { ticker } = useParams();
  const [company, setCompany] = useState(null);
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

  return (
    <div>
      {company ? (
        <div>
          <h1>{company.name}: {company.ticker}</h1>
          <h2>More to come here, will probably want to put this in another component</h2>          
        </div>
      ) : (
        <h2>Company not found</h2>
      )}
    </div>
  );
}