// src/components/MainFeatures.jsx
import React from "react";
import { HiLightBulb, HiPencil, HiSparkles } from "react-icons/hi";

const features = [
  {
    icon: <HiLightBulb className="h-10 w-10 text-purple-600" />,
    title: "Ideate",
    description:
      "Generate unique design concepts from simple text prompts. Our AI understands your vision and creates innovative starting points.",
  },
  {
    icon: <HiPencil className="h-10 w-10 text-purple-600" />,
    title: "Sketch",
    description:
      "Transform ideas into wireframes and mockups in seconds. Adjust layouts, components, and flows with intuitive controls.",
  },
  {
    icon: <HiSparkles className="h-10 w-10 text-purple-600" />,
    title: "Refine",
    description:
      "Iterate designs with AI-powered suggestions. Get accessibility checks, usability improvements, and style recommendations.",
  },
];

const MainFeatures = () => (
  <section id="features" className="py-20 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Transform Ideas into Exceptional UX
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our AI-powered workflow streamlines the design process from concept to
          polished prototype
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MainFeatures;
