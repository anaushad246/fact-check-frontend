import React from 'react';
import { motion } from 'framer-motion';

const BlogCardSkeleton = ({ index }) => {
  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 
      }
    }
  };

  return (
    <motion.div
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full"
    >
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col h-full">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4 animate-pulse" />

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  );
};

export default BlogCardSkeleton; 