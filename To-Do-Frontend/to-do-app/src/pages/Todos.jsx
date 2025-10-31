import React from 'react'
import {Link} from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'

function Todos() {

    const [todo , setTodo] = useState([]);

   useEffect(()=>{
        axios.get('http://localhost:8081/api/v1/auth/todos')
        .then((response) => {
            setTodo(response.data);
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
        });
    },[]);

    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8081/api/v1/auth/todos/${id}`);
        setTodo(todo.filter(t => t.id !== id)); // remove from state
    } catch(err) {
        console.error("Error deleting task:", err);
    }
    };


  return (
    <>
       <div className="min-h-screen bg-gradient-to-b from-teal-100 to-teal-300 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-800 text-center drop-shadow-md">
            📝 My To-Do List
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-8 text-center">
            Stay organized and productive every day!
            </p>

            <div className="overflow-x-auto w-full max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-10 border border-white/50">
            <table className="border-collapse w-full text-sm sm:text-base text-gray-700 rounded-xl overflow-hidden">
            <thead>
            <tr className="bg-gradient-to-r from-teal-400 to-teal-500 text-white">
            <th className="px-4 py-3 text-left rounded-tl-lg">Task Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Due Date</th>
            <th className="px-4 py-3 text-center rounded-tr-lg"></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
            {
                todo.map((data , i)=>(
                        <tr
                            key={i}
                            className={`transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md ${
                                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        >

                        <td className="px-6 py-4 text-gray-700 text-sm sm:text-base whitespace-nowrap">{data.title}</td>
                        <td className="px-6 py-4 text-gray-700 text-sm sm:text-base whitespace-nowrap">{data.description}</td>
                        <td className="px-6 py-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            data.priority === 'HIGH'
                                ? 'bg-red-100 text-red-600'
                                : data.priority === 'MEDIUM'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                        >
                            {data.priority}
                        </span>
                        </td>

                        <td className="px-6 py-4 text-gray-700 text-sm sm:text-base whitespace-nowrap">{data.status}</td>
                        <td className="px-6 py-4 text-gray-700 text-sm sm:text-base whitespace-nowrap">{new Date(data.dueDate).toISOString().split('T')[0]}</td>
                        
                        <td className="px-6 py-4 text-gray-700 text-sm sm:text-base whitespace-nowrap">
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Link
                                to={`/UpdateTodo/${data.id}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Update
                            </Link>
                            <button
                                onClick={() => handleDelete(data.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Delete
                            </button>
                            </div>

                        </td>

                    </tr>
                ))
            }
        </tbody>
            </table>
            </div>
            <Link 
                to="/CreateTodo"
                className="mt-8 inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                ➕ Create New Task
                </Link>


        </div>
        </>
  )
}

export default Todos