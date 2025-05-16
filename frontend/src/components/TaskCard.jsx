import React, { useState } from 'react';
import axios from '../api/axios';

const TaskCard = ({ task, projectId, fetchProjects }) => {
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ title: task.title, description: task.description, status: task.status });

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/delete/${task._id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`/tasks/update/${task._id}`, { status: newStatus });
      setStatus(newStatus);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/update/${task._id}`, updatedTask);
      setIsEditing(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col space-y-4">
      <h4 className="text-xl font-semibold text-gray-800">{task.title}</h4>
      <p className="text-gray-600">{task.description}</p>

      {/* Edit Form or Task Details */}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            placeholder="Updated Task Title"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            placeholder="Updated Task Description"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Task
          </button>
        </form>
      ) : (
        <div className="space-x-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleEditToggle}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Edit Task
          </button>
        </div>
      )}

      <div className="flex justify-between space-x-4">
        <button
          onClick={handleDelete}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
