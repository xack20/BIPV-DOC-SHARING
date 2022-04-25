import React from "react";
import { Routes, Route, BrowserRouter as Router,Navigate } from "react-router-dom";

import './App.css'
import SignIn from "./Layouts/Auth/Login/SignIn";
import Register from "./Layouts/Auth/Signup/Register";
import MainLayout from "./Layouts/MainLayout/MainLayout";



function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate replace to="/login" />} />
                <Route exact path="/login" element={<SignIn/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/home" element={<MainLayout/>} />
                <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
        </Router>
    )
}

export default App
