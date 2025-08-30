import { useState, useRef, useEffect } from "react";
import { Send, Code } from "lucide-react";

export default function PromptForm({ isLoading, error, fileUrl, onSubmit }) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [prompt]);

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-black/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 shadow-2xl">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Describe your interface
            </label>
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-stretch">
                <textarea
                  id="prompt"
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a modern landing page with a hero section and call-to-action button..."
                  className="flex-1 bg-black/80 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all duration-300 resize-none min-h-[3.5rem] max-h-[10rem] text-base"
                  disabled={isLoading}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  className="ml-3 bg-black/60 text-gray-200 p-3 rounded-xl border hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center self-center h-12 w-12 shrink-0 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-200 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {prompt.length}/200 characters
                </span>
              </div>
            </form>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0">
              <svg
                className="w-full h-full animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M8 2v20l-5.5-6L8 2" />
                <path d="M16 2v20l5.5-6L16 2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
          <p className="text-gray-400">Crafting your interface...</p>
        </div>
      )}

      {fileUrl && !isLoading && (
        <div className="mt-6 text-center">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Code className="w-5 h-5 mr-2" />
            Preview Application
          </a>
        </div>
      )}
    </div>
  );
}
