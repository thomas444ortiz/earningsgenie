import React, { Component } from 'react';
import SeeFilingsPage from './seefilingspage.js';
import UploadTranscriptPage from './uploadtranscriptpage.js';
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import Navbar from './navbar.js';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Router>
                    <Routes>
                        <Route path='/' element={<p>This is the homepage</p>} />
                        <Route path='/filings' element={<SeeFilingsPage />} />
                        <Route path='/uploadtranscript' element={<UploadTranscriptPage />} />             
                    </Routes>
                </Router>                
            </div>
        );
    } 
}