import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import ProjectCard from "../components/ProjectCard";
import CreateProject from "../components/CreateProject";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Welcome to the Task Tracker Dashboard
        </h1>
        <div className="flex justify-between items-center mb-6">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Project Creation Form */}
        <CreateProject fetchProjects={fetchProjects} />

        {/* Projects List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                fetchProjects={fetchProjects}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No projects found. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
