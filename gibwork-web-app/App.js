import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "https://api2.gib.work"; // Replace with actual base URL
const API_KEY = X1I13klR8S7aOfhkmbYAl5zKQ7txRtqc9hAnfa64 ; // Replace with your API key

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDetails, setTaskDetails] = useState(null);
  const [error, setError] = useState("");

  const createTask = async () => {
    try {
      setError(""); // Clear previous errors
      setTaskDetails(null); // Clear previous task details

      // Call API to create a task
      const response = await axios.post(
        `${API_BASE_URL}/tasks/public/transactionendpoint`,
        {
          name: taskName,
          description: taskDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`, // Use if authentication is needed
          }
        }
      );

      const taskId = response.data.id;

      // Fetch task details
      const taskResponse = await axios.get(`${API_BASE_URL}/explore/${taskId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Use if authentication is needed
        }
      });

      setTaskDetails(taskResponse.data); // Update state with task details
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gibwork Task Creator</h1>
        <div className="form">
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />
          </label>
          <label>
            Task Description:
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </label>
          <button onClick={createTask}>Create Task</button>
        </div>
        {error && <p className="error">Error: {error}</p>}
        {taskDetails && (
          <div className="task-details">
            <h2>Task Details</h2>
            <pre>{JSON.stringify(taskDetails, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;