import React from "react";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block mb-10 mt-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-purple-700 text-white px-2 py-1 rounded-lg">
              UX
            </span>
            <span className="text-purple-700">ceptional</span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-purple-600 max-w-3xl mx-auto mb-10">
          Ideate. Sketch. Refine. The AI way to {""}
          <span className="bg-purple-700 text-white  px-2 py-1 rounded-lg">
            UX
          </span>
          ceptional design.
        </p>
      </div>
    </section>
  );
};
