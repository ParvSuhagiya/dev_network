import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./components/login/Login"
import Signup from "./components/login/Signup"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
