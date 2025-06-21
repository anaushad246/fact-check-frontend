import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-10">
        {/* Old About Content Section */}
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow p-6 mb-2">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">About FactCheck AI</h1>
          <p className="text-gray-700 mb-4">
            FactCheck AI is an advanced tool designed to help users verify the authenticity of news articles, headlines, and images using artificial intelligence technology.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">How It Works</h2>
          <p className="text-gray-700 mb-4">
            Our AI system analyzes the content you provide and compares it against a vast database of verified information to determine its authenticity. The system provides a confidence score and detailed explanation for its assessment.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Text-based fact checking</li>
            <li>Image verification</li>
            <li>Detailed analysis reports</li>
            <li>Confidence scoring</li>
            <li>Historical record of checks</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-700">
            We aim to combat misinformation by providing accessible, reliable fact-checking tools powered by cutting-edge AI technology. Our goal is to help create a more informed and trustworthy digital environment.
          </p>
        </section>

        {/* Mission Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-4">Our mission is to empower everyone to quickly verify information and fight misinformation using AI and trusted sources.</p>
        </section>

        {/* Team Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Team</h2>
          <ul className="flex flex-col gap-3">
            <li>
              <span className="font-bold text-gray-800">Naushad Ahmad</span> – Founder & Lead Developer
            </li>
            <li>
              <span className="font-bold text-gray-800">A. I. Assistant</span> – Product & UX Design
            </li>
            {/* Add more team members as needed */}
          </ul>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Contact Us</h2>
          <p className="mb-2 text-gray-700">We'd love to hear from you! Reach out for feedback, support, or collaboration.</p>
          <div className="flex flex-col gap-2 items-center">
            <a href="mailto:contact@factcheckai.com" className="text-blue-700 hover:underline font-medium">contact@factcheckai.com</a>
            <a href="/" className="text-blue-700 hover:underline font-medium">Home</a>
            <a href="/privacy" className="text-blue-700 hover:underline font-medium">Privacy Policy</a>
          </div>
        </section>
      </div>
    </div>
  );
} 