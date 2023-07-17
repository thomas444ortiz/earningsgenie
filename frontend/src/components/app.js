import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './navbar.js';
import { AuthProvider } from '../authcontext.js';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <AuthProvider>
                <div>
                    <Navbar />        
                </div>
            </AuthProvider>
        );
    }
}

const appDiv = document.getElementById("app");
const root = ReactDOM.createRoot(appDiv);
root.render(<App />);
