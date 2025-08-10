import React from "react";

const PromptForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  isLoading,
  handleClear,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 max-w-3xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-xl font-bold text-purple-700 mb-2">
            Describe your design:
          </label>
          <p className="text-gray-600 mb-4">
            Be specific about the design, functionality, and style you want
          </p>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="e.g., a calculator with a modern design, glassmorphism effect, and large buttons..."
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
            {prompt.length}/200
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 bg-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Generating...
              </span>
            ) : (
              "Generate Application"
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
