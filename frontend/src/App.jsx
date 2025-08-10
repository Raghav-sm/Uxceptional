import React, { useState } from "react";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import { HeroSection } from "./components/HeroSection";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");

  // Fetch base URL on mount
  React.useEffect(() => {
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

    //  API call
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
  const handleClear = () => {
    setPrompt("");
    setFileUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <HeroSection />

        {/* Prompt Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
                Generate Your Design
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Describe the application you want to create
              </p>
            </div>
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              handleClear={handleClear}
            />
            <ResultDisplay
              isLoading={isLoading}
              fileUrl={fileUrl}
              error={error}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



export default App;
