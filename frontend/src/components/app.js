import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './navbar.js';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Navbar />        
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
const root = ReactDOM.createRoot(appDiv);
root.render(<App />);
