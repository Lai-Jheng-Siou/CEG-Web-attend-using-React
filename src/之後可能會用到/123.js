import Login from "./Login/Login"
import Main from "./MainFrame/Main"

import React from "react";
import { Routes, Route, redirect, useMatch, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
    const isLogin = false

    const isAtLogin = false //useMatch('/Login/')
    navigator = useNavigate()

    if(!isLogin && !isAtLogin) {
        // return <Navigate to={Login} />
        return navigator({Login})
    }

    return (
        <div className="App">
          <Routes>
            <Route path="/Login" element={<Login />}>
              
            </Route>
            <Route path="/MainFrame" element={<Main />}>
              {/* 如果未登入，重定向到 '/Login' */}
              {!isLogin && <Navigate to={Login} />}
              
            </Route>
            <Route path="*" element={<Login />}>
            </Route>
          </Routes>
        </div>
      );
}

export default App;