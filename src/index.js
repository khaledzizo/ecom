import React from 'react';
import ReactDOM from 'react-dom/client';


import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'jquery/dist/jquery.min.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';


import App from './App';
import { TokenProvider } from './Context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenProvider>
        <App />
    </TokenProvider>
);