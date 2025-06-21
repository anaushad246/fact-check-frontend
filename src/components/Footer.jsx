import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-white to-gray-50 border-t border-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FactCheck AI</h2>
          <p className="text-sm text-gray-600 mt-2">
            &copy; {new Date().getFullYear()} FactCheck AI. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Navigation</h3>
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Legal</h3>
            <a href="/privacy" className="text-gray-700 hover:text-blue-600">Privacy Policy</a>
            <a href="/terms" className="text-gray-700 hover:text-blue-600">Terms of Use</a>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Follow us</h3>
          <div className="flex gap-4 text-xl text-gray-600">
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
