import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Brain,
  Tag,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const ResultSection = ({ title, icon: Icon, children, isLoading, error, badge }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <Icon className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
        </div>
        <div className="py-8">
          <LoadingSpinner size="lg" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-red-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-600">{title}</h3>
        </div>
        <p className="text-red-600">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 p-4 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">{title}</h3>
            {badge && (
              <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${badge.color}`}>
                {badge.text}
              </span>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={sectionId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="border-t border-gray-200 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RatingBadge = ({ rating }) => {
  let badgeClass = '';
  let icon = null;

  switch (rating?.toUpperCase()) {
    case 'TRUE':
      badgeClass = 'bg-green-100 text-green-800';
      icon = <CheckCircle2 className="h-4 w-4 mr-1" />;
      break;
    case 'FALSE':
      badgeClass = 'bg-red-100 text-red-800';
      icon = <XCircle className="h-4 w-4 mr-1" />;
      break;
    case 'MISLEADING':
    case 'MISATTRIBUTED':
      badgeClass = 'bg-yellow-100 text-yellow-800';
      icon = <AlertTriangle className="h-4 w-4 mr-1" />;
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800';
      icon = <Info className="h-4 w-4 mr-1" />;
  }

  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${badgeClass}`}>
      {icon}
      {rating || 'Unrated'}
    </span>
  );
};

export default function FactCheckResult({ result, isLoading, error }) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-xl border border-red-200"
      >
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Error Loading Results</h3>
        </div>
        <p className="text-red-700">{error}</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="py-12 flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-500">Analyzing content...</p>
        </div>
      </motion.div>
    );
  }

  if (!result) {
    return null;
  }

  const claimResults = result.data?.factCheckResults?.claims || result.data?.factCheckResults || [];
  const claimCount = result.summary?.claimReviewCount || claimResults.length || 0;

  return (
    <ErrorBoundary>
      <div className="w-full max-w-3xl mx-auto mt-4 space-y-4">
        {/* Summary Section */}
        <ResultSection
  title="Summary"
  icon={FileText}
  isLoading={isLoading}
  error={error}
>
  <p className="text-gray-700 text-sm whitespace-pre-line">
    {result.summary?.text || 'No summary available'}
  </p>

  {result.summary?.labels && result.summary.labels.length > 0 && (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-500 mb-2">Categories</h4>
      <div className="flex flex-wrap gap-2">
        {result.summary.labels.map((label, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )}
  <p className="mt-4 text-sm text-gray-500">
    Found {result.summary?.claimReviewCount || 0} fact-check results
  </p>
</ResultSection>


        <ResultSection title="AI Analysis" icon={Brain} isLoading={isLoading} error={error}>
          <p className="text-gray-700 whitespace-pre-line text-sm">
            {result.data?.aiAnalysis || 'No AI analysis available'}
          </p>
        </ResultSection>

        <ResultSection title="Categories & Tags" icon={Tag} isLoading={isLoading} error={error}>
          <p className="text-gray-700 whitespace-pre-line text-sm">
            {result.data?.aiCategorization || 'No categorization available'}
          </p>
        </ResultSection>

        <ResultSection
          title="Fact Check Results"
          icon={FileText}
          isLoading={isLoading}
          error={error}
          badge={
            claimCount > 0
              ? {
                  text: `${claimCount} results`,
                  color: 'bg-green-100 text-green-800',
                }
              : null
          }
        >
          {claimResults.length > 0 ? (
            <div className="space-y-4">
              {claimResults.map((claim, index) => {
                const review = claim.claimReview?.[0];
                return (
                  <motion.div
                    key={review?.url || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-100 rounded-lg p-4 hover:shadow-xs transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <RatingBadge rating={review?.textualRating} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{claim.text}</p>
                        {review && (
                          <div className="mt-3 space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Publisher:</span>
                              <span>{review.publisher?.name || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Date:</span>
                              <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
                            </div>
                            <a
                              href={review.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-blue-600 hover:underline mt-2 group"
                            >
                              <span>View full fact-check</span>
                              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No fact check results found.</p>
            </div>
          )}
        </ResultSection>
      </div>
    </ErrorBoundary>
  );
}
