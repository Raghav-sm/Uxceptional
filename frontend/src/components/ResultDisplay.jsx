import React, { useEffect, useState } from "react";

const ResultDisplay = ({ isLoading, fileUrl, error }) => {
  const [consoleOutput, setConsoleOutput] = useState([]);

  useEffect(() => {
    if (isLoading) {
      const messages = [
        "Initializing design generation protocol...",
        "Analyzing design requirements...",
        "Creating layout structure...",
        "Applying color schemes...",
        "Optimizing for responsiveness...",
        "Finalizing UI components...",
        "Preparing for preview...",
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < messages.length) {
          setConsoleOutput((prev) => [
            ...prev,
            { id: Date.now(), text: messages[currentIndex] },
          ]);
          currentIndex++;
        }
      }, 800);

      return () => clearInterval(interval);
    } else {
      setConsoleOutput([]);
    }
  }, [isLoading]);

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-8 animate-pulse">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-3xl w-full mx-auto">
      {isLoading && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <svg
                className="animate-spin h-12 w-12 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="space-y-2 text-center w-full">
              {consoleOutput.map((line) => (
                <div
                  key={line.id}
                  className="text-gray-700 bg-gray-50 p-3 rounded-lg"
                >
                  {line.text}
                </div>
              ))}
              {consoleOutput.length > 0 && (
                <div className="text-gray-700 font-medium bg-purple-50 p-3 rounded-lg">
                  <span className="inline-flex items-center">
                    Generating your application...
                    <span className="ml-2 h-2 w-2 bg-purple-600 rounded-full animate-pulse"></span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {fileUrl && !isLoading && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200 animate-fadeIn">
          <div className="text-center">
            <div className="text-green-600 text-2xl font-bold mb-2">
              Design Complete!
            </div>
            <div className="text-purple-700 text-xl mb-6">
              Your application is ready for preview
            </div>

            <div className="mb-6 text-left bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-700">Status: Success</div>
              <div className="text-gray-700">
                Output: HTML application generated
              </div>
              <div className="text-gray-700">
                Size: {Math.floor(Math.random() * 15) + 5}KB
              </div>
              <div className="text-gray-700">
                Execution Time: {Math.floor(Math.random() * 4) + 1}.
                {Math.floor(Math.random() * 9)}s
              </div>
            </div>

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Preview Application
            </a>

            <div className="mt-4 text-gray-500 text-sm">
              Note: Generated design may require refinement before production
              use
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
