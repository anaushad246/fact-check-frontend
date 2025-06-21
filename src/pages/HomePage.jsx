import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Newspaper, BookOpen } from 'lucide-react';
import FactCheckForm from '../components/FactCheckForm';
import NewsFeed from '../components/NewsFeed';
import BlogFeed from '../components/BlogFeed';
import useImageStore from '../store/imageStore'; // Import the new store

export default function HomePage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const setImageFile = useImageStore((state) => state.setImageFile);
  const [error, setError] = useState(null); // Keep error for text-only issues if needed

  const handleSubmit = (formData) => {
    setError(null);

    // Check if the submission is for an image (FormData)
    if (formData instanceof FormData) {
      const image = formData.get('image');
      if (image) {
        setImageFile(image);
        navigate('/dashboard'); // Immediately navigate
      } else {
        setError("No image file found in form data.");
      }
    } else {
      // Text submission remains the same
      const claim = formData.content || '';
      if (claim.trim()) {
        navigate(`/dashboard?claim=${encodeURIComponent(claim)}`);
      }
    }
  };

  const handleGetStarted = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="pt-16 pb-8 min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100">
      {/* Hero Section - More Compact */}
      <section className="w-full flex flex-col items-center justify-center text-center py-6 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-lg mt-6 mb-8 max-w-4xl mx-auto">
        <motion.div 
          className="flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Welcome to
          </h1>

          {/* Images Row */}
          <div className="flex justify-center gap-6 mb-2">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/08/19/24/fake-news-2127597_1280.png"
              alt="FactCheck Illustration"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
            <img
              src="https://cdn.pixabay.com/photo/2017/09/08/08/57/binary-2728117_1280.jpg"
              alt="Data Visualization"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          {/* Subheader */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Your reliable fact-checking
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Quickly analyze claims with ease and stay informed with verified news.
          </p>

          {/* Prominent Get Started Button */}
          <motion.button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
            Get Started
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Fact Check Form */}
          <div className="w-full mt-6">
            <FactCheckForm onSubmit={handleSubmit} isLoading={false} inputRef={inputRef} />
            {error && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}
          </div>
        </motion.div>
      </section>

      {/* Content Sections Container */}
      <div className="space-y-8">
        {/* News Section - Enhanced */}
        <motion.section 
          className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Latest News</h2>
            <p className="text-gray-600">Stay updated with the latest headlines and events.</p>
          </div>
          
          <div className="mb-6">
            <NewsFeed limit={3} />
          </div>

          <div className="text-center">
            <motion.a
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Read More News <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.section>

        {/* Blog Section - New */}
        <motion.section 
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Latest From Our Blog</h2>
            <p className="text-gray-600">Explore fact-checked articles and in-depth analysis.</p>
          </div>
          
          <div className="mb-6">
            <BlogFeed limit={3} />
          </div>

          <div className="text-center">
            <motion.a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Explore More Blogs <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
