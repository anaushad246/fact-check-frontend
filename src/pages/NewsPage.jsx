import React from 'react';
import NewsFeed from '../components/NewsFeed';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Latest Fact-Checked News</h1>
        <NewsFeed />
      </div>
    </div>
  );
} 