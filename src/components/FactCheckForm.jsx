import React, { useState } from 'react';
import { Search, Loader2, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';

export default function FactCheckForm({ onSubmit, isLoading, inputRef = null }) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'image'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'text' && !content.trim()) return;
    if (activeTab === 'image' && !selectedImage) return;
    
    if (activeTab === 'text') {
      // For text submissions, send as JSON
      await onSubmit({ content: content.trim() });
    } else {
      // For image submissions, send as FormData
      const formData = new FormData();
      formData.append('image', selectedImage);
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow p-4 sm:p-8 mt-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'text'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('image')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'image'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Image
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'text' ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            id="fact-input"
            type="text"
            placeholder="Enter news headline, article, or claim to fact-check..."
            className="block w-full pl-10 pr-4 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            ref={inputRef}
          />
        </div>
      ) : (
        <ImageUpload
          onImageSelect={setSelectedImage}
          isLoading={isLoading}
        />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || (activeTab === 'text' ? !content.trim() : !selectedImage)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Facts'
          )}
        </button>
      </div>
    </form>
  );
}