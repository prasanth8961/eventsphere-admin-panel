import React from "react";

const DebugLogger = ({ data, label = "Debug Log", onClose }) => {
  const getFormattedData = (input) => {
    try {
      if (typeof input === "object" && input !== null) {
        return JSON.stringify(input, null, 2);
      } else {
        return String(input);
      }
    } catch (error) {
      return "Error formatting data: " + error.message;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white border border-gray-300 rounded-md p-6 max-w-3xl w-full m-4 shadow-lg overflow-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">{label}</h2>
          (
            <button
              onClick={() => window.history.back()}
              className="text-red-900 hover:text-red font-bold text-2xl"
            >
              Close ✕
            </button>
          )
        </div>
        <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
          {getFormattedData(data)}
        </pre>
      </div>
    </div>
  );
};

export default DebugLogger;
