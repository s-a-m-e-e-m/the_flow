import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/Authcontext';
import axios from 'axios';
import { LuPencil } from "react-icons/lu";
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { addTasksLink, deleteTaskLinkPrefix, fetchAllTasksLink, updateTaskDeadlineLink, updateTaskLinkPrefix, updateTaskTitleLink } from '../../links';

const TasksBoard = () => {
  const [taskInputs, setTaskInputs] = useState([{ id: 1, value: '', deadline: '' }]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [tasks, setTasks] = useState(['Add your first task!']);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const navigate = useNavigate();

  const [newDeadline, setNewDeadline] = useState('');
  const [editingDeadlineId, setEditingDeadlineId] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(fetchAllTasksLink, { withCredentials: true });
      setTasks(response?.data?.tasks || ['Add your first task!']);
    } catch (error) {
      setTasks(['Add your first task!']);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    fetchTasks();
  }, [user]);

  const handleInputChange = (id, value) => {
    setTaskInputs((prev) =>
      prev.map((task) => (task.id === id ? { ...task, value } : task))
    )
  }

  const handleDeadlineChange = (id, deadline) => {
    setTaskInputs((prev) =>
      prev.map((task) => (task.id === id ? { ...task, deadline } : task))
    )
  }

  const addInputField = () => {
    setTaskInputs((prev) => [...prev, { id: Date.now(), value: '', deadline: '' }]);
  }

  const removeInputField = (id) => {
    setTaskInputs((prev) => {
      if (prev.length === 1) return prev

      return prev.filter((task) => task.id !== id)
    })
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${deleteTaskLinkPrefix}/${taskId}`, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanedTasks = taskInputs
      .map((task) => ({ title: task.value.trim(), deadline: task.deadline || null }))
      .filter(Boolean);
    try {
      setLoading(true);
      const response = await axios.post(addTasksLink, { tasks: cleanedTasks }, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      return;
    } finally {
      setLoading(false);
      setTaskInputs([{ id: 1, value: '', deadline: '' }]);
    }
  }

  const updateTaskStatus = async (e, taskId) => {
    e.preventDefault();
    const newStatus = e.target.status.value;

    try {
      setLoading(true);
      await axios.put(`${updateTaskLinkPrefix}/${taskId}`, { newStatus }, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      return;
    } finally { setLoading(false); }
  }

  const updateTaskTitle = async (taskId) => {
    const title = newTitle.trim();
    if (!title) {
      alert("Title cannot be empty.");
      return;
    }

    try {
      await axios.put(`${updateTaskTitleLink}/${taskId}`, { title, taskId }, { withCredentials: true });
    } catch (error) {
      console.error("Error updating task title:", error);
      return;
    } finally {
      fetchTasks();
      setEditingTaskId(null);
      setNewTitle('');
    }
  }

  const updateTaskDeadline = async (taskId) => {
    try {
      await axios.put(`${updateTaskDeadlineLink}/${taskId}`, { newDeadline },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task deadline:", error);
      return;
    } finally {
      setEditingDeadlineId(null);
      setNewDeadline('');
    }
  }

  if (loading) {
    return <p>Loading your tasks...</p>
  }

  return (
    <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-2rem)] bg-slate-950 text-slate-100">

      {/* Sidebar */}
      <Sidebar className="hidden md:flex md:basis-1/5 border-r border-slate-700 bg-slate-900/80" />

      {/* Main Content */}
      <div className="w-full md:basis-4/5 p-4 sm:p-6 lg:p-10">
        {tasks?.length === 0 ? (
          <p className="text-center text-slate-400 text-lg font-medium">
            No tasks found. Add some tasks!
          </p>
        ) : (
          <div className='w-full flex flex-col gap-4'>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Tasks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <section className="flex flex-col justify-between border border-slate-700 bg-slate-900/70 shadow-md p-5 rounded-lg hover:shadow-lg transition-shadow w-full h-full" key={index}>

                  {/* Status Badge */}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full
      ${task.status === "pending" ? "bg-yellow-500 text-black" :
                        task.status === "in-progress" ? "bg-blue-500 text-white" :
                          "bg-green-500 text-white"}`}>
                      {task.status}
                    </span>
                  </div>

                  {/* Task Title */}
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="flex items-center gap-2 font-semibold text-lg">
                      <span className="font-semibold text-xl">{task.title}</span>
                      <button className="hover:text-blue-500 cursor-pointer transition" onClick={() => setEditingTaskId(task._id)}>
                        <LuPencil />
                      </button>
                    </span>

                    {editingTaskId === task._id && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                        />
                        <button
                          type="button"
                          onClick={() => updateTaskTitle(task._id)}
                          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white p-2 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    )}


                    <span className="text-sm text-slate-400 italic">
                      {task.status === "pending" ? "It feels impossible until it's done—start now!" : task.status === "in-progress" ? "Just a little persistence and effort needed." : "Well done on completing this achievement!"}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-300">
                      {task.deadline ? task.deadline.slice(0, 10) : "No deadline"}
                    </span>

                    {editingDeadlineId === task._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={newDeadline}
                          onChange={(e) => setNewDeadline(e.target.value)}
                          className="bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                        />
                        <button
                          type="button"
                          onClick={() => updateTaskDeadline(task._id)}
                          className="bg-green-500 hover:bg-green-600 text-white cursor-pointer p-2 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button className="hover:text-blue-500 cursor-pointer transition" onClick={() => setEditingDeadlineId(task._id)}>
                        <LuPencil />
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <form
                      onSubmit={(e) => updateTaskStatus(e, task._id)}
                      className="flex gap-2 bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition-colors flex-1"
                    >
                      <select
                        name="status"
                        className="bg-slate-700 text-white text-sm rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Update Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-1 rounded-md"
                      >
                        Update
                      </button>
                    </form>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white p-2 rounded-md font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* Add New Task */}
        <h2 className="text-xl sm:text-2xl font-bold mt-10">Add New Task</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4">
          {taskInputs.map((task, index) => (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="text"
                value={task.value}
                onChange={(e) => handleInputChange(task.id, e.target.value)}
                placeholder={`Task ${index + 1}`}
                className="flex-1 bg-slate-800 text-white placeholder-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
              />

              <input
                type="date"
                value={task.deadline}
                onChange={(e) => handleDeadlineChange(task.id, e.target.value)}
                className="border border-slate-500 bg-slate-900 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              />

              <button
                type="button"
                onClick={() => removeInputField(task.id)}
                disabled={taskInputs.length === 1}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                Remove
              </button>
            </div>
          ))}

          <section className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={addInputField}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded-md">
              + Add another field
            </button>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white  font-bold py-2 px-4 rounded-md"
              disabled={loading}>
              Save Tasks
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default TasksBoard