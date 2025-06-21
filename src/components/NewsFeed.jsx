import React, { useEffect, useState } from "react";
import { Newspaper, Calendar } from 'lucide-react';

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const KEYWORDS = [
  "politics",
  "AI",
  "cryptocurrency",
  "education",
  "climate change",
  "startups",
  "space",
];

const API_KEY = "49a92db9de6140c19b2efa9a9d14044a";
const HEADLINES_URL = "https://newsapi.org/v2/top-headlines";
const EVERYTHING_URL = "https://newsapi.org/v2/everything";

export default function NewsFeed({ limit = null }) {
  const [mode, setMode] = useState("category"); // "category" or "keyword"
  const [selected, setSelected] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (mode === "category") {
          url = `${HEADLINES_URL}?country=us&category=${selected}&apiKey=${API_KEY}`;
        } else {
          url = `${EVERYTHING_URL}?q=${encodeURIComponent(
            selected
          )}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (data.status !== "ok") throw new Error(data.message);
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [mode, selected]);

  // Apply limit if specified
  const displayArticles = limit ? articles.slice(0, limit) : articles;

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Mode Toggle & Buttons (only on full /news page) */}
      {!limit && (
        <>
          <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => {
                setMode("category");
                setSelected("general");
              }}
              className={`px-4 py-2 rounded-lg font-medium border ${
                mode === "category"
                  ? "bg-blue-500 text-white shadow"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => {
                setMode("keyword");
                setSelected("AI");
              }}
              className={`px-4 py-2 rounded-lg font-medium border ${
                mode === "keyword"
                  ? "bg-purple-500 text-white shadow"
                  : "bg-purple-50 text-purple-700"
              }`}
            >
              Topics
            </button>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
            {(mode === "category" ? CATEGORIES : KEYWORDS).map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                  selected === item
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Loading, Error, Empty */}
      {loading && (
        <div className="text-center py-6 text-blue-500 text-sm">Loading news...</div>
      )}
      {error && (
        <div className="text-center py-6 text-red-500 text-sm">Error: {error}</div>
      )}
      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">No news articles found.</div>
      )}

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article, idx) => (
          <a
            key={article.url || idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
              {article.urlToImage ? (
                <img 
                  src={article.urlToImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="text-gray-400 w-10 h-10" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {article.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <span className="font-medium text-blue-800">{article.source?.name || 'Unknown Source'}</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
