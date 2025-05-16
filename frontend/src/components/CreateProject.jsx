import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "../api/axios";

const CreateProject = ({ fetchProjects }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/projects", { name });
      toast.success("project created successfully!");
      fetchProjects();
      setName(""); // Reset the input after successful creation
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create a New Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="New Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
