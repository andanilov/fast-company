import React from 'react';
import * as reactDOMClient from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

// --- components
import App from './App';

const root = reactDOMClient.createRoot(document.getElementById('root'));

root.render(<App/>);
