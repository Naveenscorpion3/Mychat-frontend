import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Chat from './pages/Chat'


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={< Login />} />
      <Route path="/chat" element={< Chat />} />
    </Routes>
  </Router>
  );
}

export default App;