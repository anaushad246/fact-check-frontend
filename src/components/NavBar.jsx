import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, Info, Menu, X, BookOpen } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/news', label: 'News', icon: Info },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/history', label: 'History', icon: History },
    { path: '/about', label: 'About', icon: Info },
  ];

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            FactCheck AI
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive(path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-300 shadow-inner'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}
                `}
              >
                <Icon className="h-5 w-5 opacity-70" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-blue-600 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <div className="ml-auto w-72 sm:w-80 bg-white h-full p-6 shadow-xl animate-slide-in-right rounded-l-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            <hr className="border-blue-100 mb-4" />
            <div className="flex flex-col gap-3">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition
                    ${isActive(path)
                      ? 'bg-blue-100 text-blue-700 border border-blue-200 scale-[1.02]'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}
                  `}
                >
                  <Icon className="h-5 w-5 opacity-70" />
                  {label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-in forwards;
        }
      `}</style>
    </nav>
  );
}
