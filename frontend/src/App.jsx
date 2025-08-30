import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PromptForm from "./components/PromptForm";

function App() {
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

  const handleSubmit = (prompt) => {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />

      <Header />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        <PromptForm
          isLoading={isLoading}
          error={error}
          fileUrl={fileUrl}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
