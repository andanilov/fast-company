import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Users from './pages/Users';
import User from './pages/User';
import Index from './pages/Index';
import Login from './pages/Login';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/users">
      <Route path="" element={<Users />} />
      <Route path=":userId" element={<User />} />
      <Route path=":userId/edit" element={<User edit />} />
    </Route>
    <Route path="/" element={<Index />} />
  </Routes>
);

export default App;
