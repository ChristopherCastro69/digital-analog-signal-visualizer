import React, { useState } from "react";
import Canvas from "./Canvas";
import { getInputValue } from "./utils";

const SignalVisualizer: React.FC = () => {
  const [binary, setBinary] = useState<string>("");
  const [method, setMethod] = useState<string>("uniPolarNRZ");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[01]*$/.test(value)) {
      setBinary(value);
    } else {
      alert("Please enter binary values");
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleButtonClick = () => {
    const inputValue = getInputValue();
    if (/^[01]+$/.test(inputValue)) {
      setBinary(inputValue);
    } else {
      alert("Please enter binary values");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <div className="border-b border-gray-600 pb-4 w-full mb-6">
        <h4 className="text-4xl text-center mt-5 font-mono">
          DIGITAL SIGNAL VISUALIZER
        </h4>
      </div>
      <select
        onChange={handleMethodChange}
        className="block mx-auto my-4 p-3 bg-gray-800 border border-gray-600 rounded-lg transition duration-200 ease-in-out hover:bg-gray-700"
      >
        <option value="Default" selected>
          Please select a method
        </option>
        <option value="NRZL">NRZ - L</option>
        <option value="NRZI">NRZ - I</option>
        <option value="AMI">Bipolar AMI</option>
        <option value="PST">Pseudoternary</option>
        <option value="MAN">Manchester</option>
        <option value="diffMan">Differential Manchester</option>
        {/* <option value="MLT3">MLT-3</option> */}
        {/* <option value="uniPolarNRZ">Unipolar NRZ</option> */}

        {/* <option value="B8ZS">B8ZS</option> */}
        {/* <option value="HDB3">HDB3</option> */}
      </select>
      <input
        type="text"
        value={binary}
        onChange={handleInputChange}
        placeholder="Enter Binary Value"
        className="block mx-auto my-4 p-3 bg-gray-800 border border-gray-600 rounded-lg transition duration-200 ease-in-out hover:bg-gray-700 w-3/6"
      />
      {/* <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white p-3 rounded-lg transition duration-200 ease-in-out hover:bg-blue-600 mb-4"
      >
        Visualize Test

      </button> */}
      <Canvas binary={binary} method={method} />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Developed by{" "}
          <a
            href="https://github.com/ChristopherCastro69/digital-analog-signal-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Christopher Castro
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignalVisualizer;
