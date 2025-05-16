import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import TaskCard from './TaskCard';
import CreateTask from './CreateTask';

const ProjectCard = ({ project, fetchProjects }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/projects/${project._id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTasks = () => setShowTasks(!showTasks);
  const handleToggleCreateTask = () => setShowCreateTask(!showCreateTask);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Delete Project
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Button to toggle tasks visibility */}
        <button
          onClick={handleToggleTasks}
          className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          {showTasks ? 'Hide Tasks' : 'Show Tasks'}
        </button>

        {/* Button to toggle task creation form */}
        <button
          onClick={handleToggleCreateTask}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {showCreateTask ? 'Cancel Task Creation' : 'Create Task'}
        </button>

        {/* Show Task creation form when toggled */}
        {showCreateTask && (
          <div className="mt-4">
            <CreateTask projectId={project._id} fetchProjects={fetchProjects} />
          </div>
        )}

        {/* Show task list when toggled */}
        {showTasks && (
          <div className="mt-4 space-y-2">
            {project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  projectId={project._id}
                  fetchProjects={fetchProjects}
                />
              ))
            ) : (
              <p className="text-gray-500">No tasks available for this project.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
