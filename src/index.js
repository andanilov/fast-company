import React from 'react';
import * as reactDOMClient from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

// --- components
import Users from './components/Users';

const root = reactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>
);
