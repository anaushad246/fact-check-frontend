import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import BlogCardSkeleton from './BlogCardSkeleton';
import api from '../api';

export default function BlogFeed({ limit = 3 }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/fact-check/articles?limit=${limit}`);
        setArticles(response.data.articles || []);
      } catch (error) {
        console.error('Error fetching latest blog articles:', error);
        setError('Failed to load articles.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <BlogCardSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-6 text-red-500 text-sm">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center py-6 text-gray-500 text-sm">No blog articles found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((blog, index) => (
        <BlogCard key={blog.id || index} blog={blog} index={index} />
      ))}
    </div>
  );
} 