import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../api"

function UpdateTodos() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priorirty: 'LOW',
    status: 'PENDING'
  });

  // Fetch existing data
 useEffect(() => {
    // Define an async function inside useEffect
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/todos/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching ToDo:", error);
      }
    };

    fetchTodo(); // call the async function
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/todos/${id}`, formData)
      .then(() => {
        alert("To-Do Updated Successfully!");
        navigate('/todos'); // redirect to todo list
      })
      .catch((error) => {
        console.error("Error updating ToDo:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-200 to-teal-400 flex items-center justify-center p-4 sm:p-6 lg:p-12">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/40"
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 text-center drop-shadow-sm">
      ✏️ Update Task
    </h2>
    <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
      Make changes and keep your tasks up-to-date.
    </p>

    {/* Task Name */}
    <div className="mb-5">
      <label className="block text-gray-700 font-semibold mb-2">Task Name</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        placeholder="Enter task name"
        required
      />
    </div>

    {/* Description */}
    <div className="mb-5">
      <label className="block text-gray-700 font-semibold mb-2">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        placeholder="Enter task description"
      ></textarea>
    </div>

    {/* Status and Priority side-by-side on larger screens */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
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
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
    </div>

    {/* Due Date */}
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        required
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
    >
      💾 Update Task
    </button>
  </form>
</div>

  )
}

export default UpdateTodos