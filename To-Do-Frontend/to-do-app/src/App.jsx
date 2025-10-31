import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todos from './pages/Todos.jsx'
import CreateTodo from './pages/Createtodos.jsx'
import UpdateTodo from './pages/UpdateTodos.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Todos" element={<Todos />} />
          <Route path="/CreateTodo" element={<CreateTodo />} />
          <Route path="/UpdateTodo/:id" element={<UpdateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App