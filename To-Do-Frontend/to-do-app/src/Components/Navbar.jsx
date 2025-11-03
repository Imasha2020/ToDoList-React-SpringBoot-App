import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // install heroicons: npm i @heroicons/react

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <nav className="bg-teal-500 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/todos" className="text-2xl font-bold">
              📝 ToDoApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/todos" className="hover:text-gray-200 transition">
              My Tasks
            </Link>
            <Link to="/createTodo" className="hover:text-gray-200 transition">
              Create Task
            </Link>
            {role === "ROLE_ADMIN" && (
              <Link to="/admin" className="hover:text-gray-200 transition">
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/todos"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600"
              onClick={() => setIsOpen(false)}
            >
              My Tasks
            </Link>
            <Link
              to="/createTodo"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600"
              onClick={() => setIsOpen(false)}
            >
              Create Task
            </Link>
            {role === "ROLE_ADMIN" && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
