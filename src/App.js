import React, {useState, useEffect} from "react";
import Add from "./components/Add";
import Subtract from "./components/Subtract";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [ws, setWs] = useState(null);
  const [results, setResults] = useState({});
  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    setWs(socket);

    socket.onmessage = (event) => { 
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);
      const {requestId, result} = message;
      setResults((prevResults) => {
        return {
          ...prevResults,
          [requestId]: result,
        };
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = async (data_, callback) => {
    const id = uuidv4(); // Generate a unique ID

    const data = {
      num1: parseFloat(data_.num1), // Ensure numbers are sent correctly
      num2: parseFloat(data_.num2),
      operation: data_.operation,
      id: id,
    };

    try {
      callback(id);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ requestId: id }));
        console.log(`Sent requestId ${id} to WebSocket server`);
      } else {
        console.warn("WebSocket is not open. Unable to send requestId.");
      }

      const response = await axios.post("http://localhost:3001/call", data);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error while calling server:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Add handleSubmit={handleSubmit} results = {results} /> {/* Pass handleSubmit as a prop */}
      <Subtract handleSubmit={handleSubmit} results = {results} /> {/* Pass handleSubmit as a prop */}
    </div>
  );
}

export default App;
