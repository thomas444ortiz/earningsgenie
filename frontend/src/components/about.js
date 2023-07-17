import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function AboutPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4" align="center" sx={{ margin: '1em' }}>
                Use Artificial Ingelligence to Analyze Earnings Calls Faster and More Efficiently
            </Typography>
            <Typography variant="h6" align="center" sx={{ marginTop: '0em', marginBottom: '1em', maxWidth: '80%' }}>
                Transform how you work with SEC filings and earnings transcripts. Focus on what matters, save time, and do better work — no matter what other tools you have.
            </Typography>
            
            <Paper
                sx={{
                    marginTop: '1em',
                    padding: '2em',
                    maxWidth: '80%',
                    bgcolor: 'grey.100',
                    width: '100%',
                }}
            >
                <Typography variant="h5" align="center" sx={{ marginTop: '0em', marginBottom: '1em'}}>
                        Tools to help you work smarter
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper
                            sx={{
                                padding: '1em',
                                border: 1,
                                bgcolor: 'grey.300',
                            }}
                        >
                            <Typography variant="body1">
                                <SearchIcon sx={{marginRight: '8px'}}/>
                                Search through our libary of transcripts
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            sx={{
                                padding: '1em',
                                border: 1,
                                bgcolor: 'grey.300',
                            }}
                        >
                            <Typography variant="body1">
                                <ChatIcon sx={{marginRight: '8px'}}/>
                                Chat directly with documents using AI
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            sx={{
                                padding: '1em',
                                border: 1,
                                bgcolor: 'grey.300',
                            }}
                        >
                            <Typography variant="body1">
                                <UploadFileIcon sx={{marginRight: '8px'}}/>
                                Upload your own documents for analysis
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            sx={{
                                padding: '1em',
                                border: 1,
                                bgcolor: 'grey.300',
                            }}
                        >
                            <Typography variant="body1">
                                <VerifiedIcon sx={{marginRight: '8px'}}/>
                                Try our pro features (coming soon)
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
                <Typography variant="h6" align="center" sx={{ margin: '1em', maxWidth: '80%' }}>
                        Don't get left behind, join the future of financial analysis.
                </Typography>            
        </Box>
    );
}
