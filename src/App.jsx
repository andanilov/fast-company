import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import NavBar from './components/NavBar';
import Users from './layouts/Users';
import User from './layouts/User';
import Index from './layouts/Index';
import Login from './layouts/Login';

const App = () => (
  <section className="pageArea">
    <NavBar />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<User />} /> */}

      <Route path="/users">
        <Route path="" element={<Users />} />
        <Route path=":userId" element={<User />} />
      </Route>
    </Routes>
  </section>
);

export default App;
