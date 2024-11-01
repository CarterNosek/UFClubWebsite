import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../navbar';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Calendar from '../../pages/Calendar/Calendar';
import Profile from '../../pages/Profile/Profile';
import useToken from './useToken';
import Home from '../../pages';
import PrivateRoutes from './privateRoutes'

function App() {
  const {token, setToken} = useToken()

  return (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route element={<PrivateRoutes token={token} setToken={setToken}/>}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;