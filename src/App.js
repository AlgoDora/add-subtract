import React from "react";
import Add from "./components/Add";
import Subtract from "./components/Subtract";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const handleSubmit = async (data_) => {
    const id = uuidv4(); // Generate a unique ID

    const data = {
      num1: parseFloat(data_.num1), // Ensure numbers are sent correctly
      num2: parseFloat(data_.num2),
      operation: data_.operation,
      id: id,
    };

    try {
      const response = await axios.post("http://localhost:3001/call", data);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error while calling server:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Add handleSubmit={handleSubmit} /> {/* Pass handleSubmit as a prop */}
      <Subtract handleSubmit={handleSubmit} /> {/* Pass handleSubmit as a prop */}
    </div>
  );
}

export default App;
