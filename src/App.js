import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    // check if number is negative
    if (event.target.value.includes("-")) {
      setErrorMessage("Code cannot be negative");
      return;
    }
    const limit = 3;
    setCode(event.target.value.slice(0, limit));
  };

  const generateUnlockCode = (numbs) => {
    let numbsList = [];
    // convert to array
    let numbsArr = Array.from(numbs.toString()).map(Number);
    for (var i = 0; i < 10; i++) {
      numbsList.push([numbsArr[0] + i, numbsArr[1] + i, numbsArr[2] + i]);
    }
    // filter out the array if it contains numbers greater than 10
    numbsList = numbsList.slice(1).filter((numbs) => {
      return numbs[0] < 10 && numbs[1] < 10 && numbs[2] < 10;
    });
    setResult(numbsList);
    return numbsList;
  };

  // useEffect to generate unlock code
  useEffect(() => {
    generateUnlockCode(code);
  }, [code]);

  return (
    <div className="App">
      <section className="App-header">
        <h1>TSA Unlock Code Generator</h1>
        <p>Enter your 3-digit number and see the possible unlock codes.</p>
      </section>
      <div className="main-wrapper">
        <div className="form-wrapper">
          <input
            className="input-field"
            maxLength={3}
            type="number"
            placeholder="Enter code"
            onChange={handleChange}
            value={code}
          />
          <button
            className="btn-primary"
            onClick={() => generateUnlockCode(code)}
          >
            Generate Code
          </button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <br />
      <h4>Possible unlock codes:</h4>
      <div className="main-result-wrapper">
        {result.map((item, index) => {
          return (
            <div className="result-item" key={index}>
              {item.join(", ")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
