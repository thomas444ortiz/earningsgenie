import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './homepage.js';
import Navbar from './navbar.js';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Navbar />
                <HomePage />            
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);