import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss'

import { Login, NavBar, Record, Userinfo } from "./components"

export default function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<NavBar />} />
          <Route path="/record" element={<Record />} />
          <Route path="/setting" element={<Userinfo />} />
          <Route path="/" element={<Navigate to="/Login" />} />
      </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);