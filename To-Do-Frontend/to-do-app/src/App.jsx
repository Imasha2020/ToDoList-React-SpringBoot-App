import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todos from './pages/Todos.jsx'
import CreateTodo from './pages/Createtodos.jsx'
import UpdateTodo from './pages/UpdateTodos.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
      {/* Show Navbar only if logged in */}
      {token && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/todos" element={
    <ProtectedRoute role="ROLE_USER"><Todos/></ProtectedRoute>
  }/>

  <Route path="/createTodo" element={
    <ProtectedRoute role="ROLE_USER"><CreateTodo/></ProtectedRoute>
  }/>

  <Route path="/updateTodo/:id" element={
    <ProtectedRoute role="ROLE_USER"><UpdateTodo/></ProtectedRoute>
  }/>

  <Route path="/admin" element={
    <ProtectedRoute role="ADMIN"><AdminDashboard/></ProtectedRoute>
  }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App