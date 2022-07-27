import React from 'react';
import * as reactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.css';

// --- components
import App from './App';

const root = reactDOMClient.createRoot(document.getElementById('root'));

root.render(<Provider store={store}><App /></Provider>);
