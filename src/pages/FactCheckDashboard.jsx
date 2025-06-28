import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useImageStore from '../store/imageStore';
import FactCheckResult from '../components/FactCheckResult';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../api';

function getClaimFromQuery(location) {
  const params = new URLSearchParams(location.search);
  return params.get('claim') || '';
}

export default function FactCheckDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { imageFile, clearImageFile } = useImageStore((state) => ({
    imageFile: state.imageFile,
    clearImageFile: state.clearImageFile,
  }));

  const [claim, setClaim] = useState(() => getClaimFromQuery(location));
  const [showLoading, setShowLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runFactCheck = async () => {
      setResult(null);
      setError(null);

      const urlClaim = getClaimFromQuery(location);

      if (imageFile) {
        setShowLoading(true);
        const fetchImageResult = async () => {
          try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post(`/fact-check-image`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Frontend received data:", response.data); // ✅ LOG HERE

            setResult(response.data);
          } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred during image analysis.');
          } finally {
            setShowLoading(false);
            clearImageFile();
          }
        };
        fetchImageResult();
      } else if (urlClaim) {
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
  }, [location, imageFile, clearImageFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    navigate(`/dashboard?claim=${encodeURIComponent(claim)}`);
  };

  const claimResults = result?.data?.factCheckResults;
  const claims = Array.isArray(claimResults) ? claimResults : [];
  const hasDataFormatError = result && !Array.isArray(claimResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Fact-Check Dashboard</h1>

        {/* Input Form */}
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a claim to fact-check..."
            className="p-4 rounded-xl border border-gray-200 bg-white/90 shadow focus:ring-2 focus:ring-blue-200"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
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

        {/* Show Uploaded Image Preview */}
        {imageFile && (
          <div className="flex justify-center mb-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="max-h-64 rounded-xl border shadow"
            />
          </div>
        )}

        {/* Show Entered Text Claim */}
        {claim && !imageFile && (
          <div className="bg-white rounded-xl shadow p-4 mb-4 text-gray-700 text-center">
            <span className="font-semibold">Claim:</span> {claim}
          </div>
        )}

        {/* Show Loading */}
        {showLoading && <LoadingSpinner />}

        {/* Data format error */}
        {hasDataFormatError && (
          <div className="text-red-600 mb-4">
            Error: The server returned an unexpected data format.
          </div>
        )}

        {/* General Error */}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* AI Analysis Summary */}
      {result && !hasDataFormatError && (
  <FactCheckResult result={result} isLoading={showLoading} error={error} />
)}

      </div>
    </div>
  );
}
