import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Createtodos() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [status, setStatus] = useState('PENDING');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

     const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/v1/auth/todos', { title, description, priority, status, dueDate })
            .then((response) => {
                console.log("Task created:", response.data);
                navigate('/Todos');
            })
            .catch((error) => {
                console.error("Error creating task:", error);
            });
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-200 to-teal-400 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/40"
            >

           <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 text-center drop-shadow-sm">
            ✨ Create New Task
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
              Organize your day with style and focus.
            </p>

            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">Task Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                placeholder="Enter task name"
                required
              />
            </div>


              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  placeholder="Enter task description"
                ></textarea>
              </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
    </div>

        <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        required
      />
    </div>

         <button
      type="submit"
      className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
    >
      🚀 Create Task
    </button>

        </form>
        </div>
  )
}

export default Createtodos