import React from 'react';

interface SkeletonProps {
  type: 'card' | 'details';
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="bg-[#564d4d]/20 rounded-lg overflow-hidden h-[360px] animate-pulse">
      <div className="h-[200px] bg-[#564d4d]/40"></div>
      <div className="p-4">
        <div className="h-6 bg-[#564d4d]/40 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#564d4d]/30 rounded w-1/2 mb-3"></div>
        <div className="h-12 bg-[#564d4d]/20 rounded w-full"></div>
      </div>
    </div>
  );

  const renderDetailsSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-[#564d4d]/40 rounded w-3/4 max-w-md mb-6"></div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-[#564d4d]/40 rounded h-[400px] w-full"></div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="h-6 bg-[#564d4d]/40 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-[#564d4d]/30 rounded w-2/4 mb-6"></div>
          <div className="h-4 bg-[#564d4d]/20 rounded w-full mb-3"></div>
          <div className="h-4 bg-[#564d4d]/20 rounded w-full mb-3"></div>
          <div className="h-4 bg-[#564d4d]/20 rounded w-3/4 mb-6"></div>
          <div className="h-10 bg-[#564d4d]/30 rounded w-40 mb-6"></div>
          <div className="h-6 bg-[#564d4d]/40 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-24 bg-[#564d4d]/20 rounded"></div>
            <div className="h-24 bg-[#564d4d]/20 rounded"></div>
            <div className="h-24 bg-[#564d4d]/20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {type === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index}>
              {renderCardSkeleton()}
            </div>
          ))}
        </div>
      )}
      
      {type === 'details' && renderDetailsSkeleton()}
    </>
  );
};

export default Skeleton;
