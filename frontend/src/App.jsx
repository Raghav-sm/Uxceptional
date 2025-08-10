import React, { useState, useEffect } from "react";
import { Send, Code, LogOut } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function App() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("/config")
      .then((res) => res.json())
      .then((data) => setBaseUrl(data.baseUrl))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Input command cannot be empty");
      return;
    }
    if (prompt.length > 200) {
      setError("Command exceeds maximum length (200 characters)");
      return;
    }

    setError(null);
    setIsLoading(true);
    setFileUrl(null);

    fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setFileUrl(data.fileUrl);
      })
      .catch((err) => {
        console.error("Generation Error:", err);
        setError(err.message || "SYSTEM ERROR: Failed to generate application");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Username */}
            <div className="flex items-center space-x-4">
              <div className="bg-white text-black p-2 rounded-lg">
                <Code className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">UXceptional</h1>

              <SignedIn>
                <div className="flex items-center space-x-2 ml-2">
                  <div className="w-1 h-6 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-300 text-sm">
                    Welcome,{" "}
                    <span className="font-semibold text-white">
                      {user?.firstName || user?.username || "User"}
                    </span>
                  </span>
                </div>
              </SignedIn>
            </div>

            {/* Auth Controls */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center space-x-3">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                        userButtonPopoverCard: "bg-gray-900 border-gray-700",
                        userButtonPopoverActions: "bg-gray-900",
                        userButtonPopoverActionButton:
                          "text-gray-300 hover:text-white hover:bg-gray-800",
                      },
                    }}
                  />
                  <SignOutButton>
                    <button className="bg-black border border-gray-700 hover:bg-gray-900 hover:border-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-sm">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </SignOutButton>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            UXceptional
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Describe your vision and watch as we craft beautiful, responsive
            interfaces that bring your ideas to life.
          </p>
        </div>

        {/* Prompt Input */}
        <div className="w-full max-w-3xl">
          <div className="bg-black/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  Describe your interface
                </label>
                <div className="relative flex items-end space-x-4">
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Create a modern landing page with a hero section and call-to-action button..."
                    className="flex-1 bg-black/80 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all duration-300 resize-none h-20 text-base"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || isLoading}
                    className="bg-white text-black p-3 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group shrink-0 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Output */}
            {fileUrl && !isLoading && (
              <div className="mt-6 text-center">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Preview Application
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
