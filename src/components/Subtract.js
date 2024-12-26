import React, { useState } from "react";
import "../App.css";

const Subtract = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const handleSubtraction = () => {
    setResult(Number(num1) - Number(num2));
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
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default Subtract;
