// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="text-2xl font-bold mb-4">
            <span className="bg-purple-700 text-white px-1 rounded">UX</span>
            <span className="text-purple-400">ceptional</span>
          </div>
          <p className="mb-6">The AI way to exceptional design experiences</p>
          <div className="flex space-x-4">
            {/* Social icons would go here */}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4">Product</h3>
          <ul className="space-y-2">
            {["Features", "Examples", "Pricing", "Integrations"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4">Resources</h3>
          <ul className="space-y-2">
            {["Documentation", "Tutorials", "Blog", "Community"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4">Company</h3>
          <ul className="space-y-2">
            {["About", "Careers", "Contact", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-800 text-center text-sm">
        © {new Date().getFullYear()} UXceptional. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
