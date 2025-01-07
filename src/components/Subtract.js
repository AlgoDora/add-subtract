import React, { useState } from "react";
import "../App.css";

const Subtract = ({ handleSubmit, results }) => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [requestId, setRequestId] = useState(null);

  const handleSubtraction = () => {
    const data = {
      num1: num1,
      num2: num2,
      operation: "subtract",
    };
    handleSubmit(data, setRequestId); 
  };

  return (
    <div className="container">
      <h3>Subtract Two Numbers</h3>
      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={handleSubtraction}>Subtract</button>
      {requestId && results[requestId] !== undefined && 
      (
        <p> Result : {results[requestId]}</p>
      )}
    </div>
  );
};

export default Subtract;
