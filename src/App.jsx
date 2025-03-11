import React, { useState } from "react";
import { CircleX, ChevronDown, ChevronUp, CirclePlus } from "lucide-react";

import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
    else{
      alert("Please enter a task");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
    else{
      alert("This task is already at the top of the list");
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
    else{
      alert("This task is already at the bottom of the list");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  return (
    <BackgroundBeamsWithCollision>
      <div className="relative z-10 container mx-auto max-w-md px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-4 py-4">
            <div className="flex flex-row items-center gap-2 pb-6">
              <div className="h-3 w-3 bg-red-400 rounded-4xl"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-4xl"></div>
              <div className="h-3 w-3 bg-green-400 rounded-4xl"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
          </div>

          <div className="p-6 bg-cyan-100/20">
            <div className="flex mb-6">
              <input
                value={newTask}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                <CirclePlus className="w-5 h-5" />
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                No tasks yet. Add one above!
              </p>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-grow font-medium">{task}</div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => moveTaskUp(index)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-full"
                        title="Move Up"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => moveTaskDown(index)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-full"
                        title="Move Down"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-full"
                        title="Delete"
                      >
                        <CircleX className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 text-sm text-gray-500 text-right">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} total
            </div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default App;
