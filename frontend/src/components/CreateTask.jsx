import React, { useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const CreateTask = ({ projectId, fetchProjects }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/tasks/${projectId}`, task);
      toast.success("Task created successfully!");
      fetchProjects();
      // Clear input fields after success
      setTask({ title: '', description: '', status: 'pending' });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
