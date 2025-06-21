import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useImageStore from '../store/imageStore'; // Import the image store
import FactCheckResult from '../components/FactCheckResult';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import api from '../api';

function getClaimFromQuery(location) {
  const params = new URLSearchParams(location.search);
  return params.get('claim') || '';
}

export default function FactCheckDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get state and methods from the image store
  const { imageFile, clearImageFile } = useImageStore((state) => ({
    imageFile: state.imageFile,
    clearImageFile: state.clearImageFile,
  }));

  const [claim, setClaim] = useState(() => getClaimFromQuery(location));
  const [showLoading, setShowLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will run ONE time based on the initial state of the page.
    const runFactCheck = async () => {
      setResult(null); // Always start fresh
      setError(null);
      
      const urlClaim = getClaimFromQuery(location);

      // Priority 1: Check for an image from the store.
      if (imageFile) {
        setShowLoading(true);
        const fetchImageResult = async () => {
          try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post(`/fact-check-image`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            setResult(response.data);
          } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred during image analysis.');
          } finally {
            setShowLoading(false);
            clearImageFile(); // Clean up the store
          }
        };
        fetchImageResult();
      } 
      // Priority 2: Check for a text claim from the URL.
      else if (urlClaim) {
        setShowLoading(true);
        const fetchTextResult = async () => {
          try {
            const response = await api.post(`/fact-check`, {
              content: urlClaim,
            });
            setResult(response.data);
          } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred during text analysis.');
          } finally {
            setShowLoading(false);
          }
        };
        fetchTextResult();
      }
    };
    
    runFactCheck();
  }, [location, imageFile, clearImageFile]); // Dependencies are correct

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    // For new submissions, we simply navigate. The useEffect will handle the fetch.
    navigate(`/dashboard?claim=${encodeURIComponent(claim)}`);
  };

  // --- Defensive Guard ---
  // Before rendering, ensure that factCheckResults is a valid array.
  const claimResults = result?.data?.factCheckResults;
  const claims = Array.isArray(claimResults) ? claimResults : [];
  
  // A clear flag to check if the data format was unexpected.
  const hasDataFormatError = result && !Array.isArray(claimResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-lg p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Fact-Check Dashboard</h1>
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a claim to fact-check..."
            className="p-4 rounded-xl border border-gray-200 bg-white/90 shadow focus:ring-2 focus:ring-blue-200"
            value={claim}
            onChange={e => setClaim(e.target.value)}
            disabled={showLoading}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full py-3 font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
            disabled={!claim.trim() || showLoading}
          >
            {showLoading ? 'Checking...' : 'Check Fact'}
          </button>
        </form>

        {showLoading && <LoadingSpinner />}
        
        {/* Display a specific error for data format issues */}
        {hasDataFormatError && (
          <div className="text-red-600 mb-4">
            Error: The server returned an unexpected data format.
          </div>
        )}
        
        {error && <div className="text-red-600 mb-4">{error}</div>}
        
        {result && !hasDataFormatError && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-xl shadow p-6 flex flex-col gap-2">
              <span className="inline-block bg-red-100 text-red-800 rounded-full px-3 py-1 font-bold w-max">
                {result.data?.aiAnalysis?.match(/(True|False|Misleading)/i)?.[0] || 'AI Verdict'}
              </span>
              <span className="text-gray-500">{result.data?.aiAnalysis}</span>
              <span className="text-gray-400 text-sm">{result.data?.aiCategorization}</span>
            </div>
            
            <div className="space-y-4">
              {claims.length > 0 ? (
                claims.map((claim, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{claim.claimant}</span>
                      <span className="text-gray-400 text-xs">{claim.claimDate && new Date(claim.claimDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-gray-700 font-medium">{claim.text}</div>
                    {claim.claimReview?.map((review, j) => (
                      <div key={j} className="mt-2 border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">{review.publisher?.name}</span>
                          <span className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs">{review.textualRating}</span>
                        </div>
                        <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium block mt-1">{review.title}</a>
                        <span className="text-gray-400 text-xs">Reviewed: {review.reviewDate && new Date(review.reviewDate).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">No fact-check articles found.</div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow p-3">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{result.summary?.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.summary?.labels?.map((label, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">{label}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-400">Fact-check articles found: {result.summary?.claimReviewCount}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 