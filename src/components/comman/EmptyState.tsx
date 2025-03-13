import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface EmptyStateProps {
  type: 'search' | 'favorites' | 'error';
  message?: string;
  onRetry?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, message, onRetry }) => {
  if (type === 'search') {
    return (
      <div className="text-center py-12">
        <i className="fas fa-film text-[#e50914] text-5xl mb-4 opacity-70"></i>
        <h3 className="text-xl font-heading font-bold mb-2 text-white">No shows found</h3>
        <p className="text-gray-400">Try adjusting your search or check back later for more content.</p>
      </div>
    );
  }

  if (type === 'favorites') {
    return (
      <div className="text-center py-12">
        <i className="far fa-heart text-[#e50914] text-5xl mb-4 opacity-70"></i>
        <h3 className="text-xl font-heading font-bold mb-2 text-white">No favorites yet</h3>
        <p className="text-gray-400 mb-6">Start adding shows to your favorites by clicking the heart icon.</p>
        <Link to="/">
          <Button className="bg-[#e50914] hover:bg-[#e50914]/80 text-white font-bold transition-colors">
            Discover Shows
          </Button>
        </Link>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="bg-[#e50914]/10 border border-[#e50914]/30 text-white p-6 rounded-lg text-center">
        <i className="fas fa-exclamation-triangle text-[#e50914] text-4xl mb-4"></i>
        <h3 className="text-xl font-heading font-bold mb-2">Something went wrong</h3>
        <p className="mb-4">{message || 'Unable to fetch shows. Please try again later.'}</p>
        {onRetry && (
          <Button 
            className="bg-[#e50914] hover:bg-[#e50914]/80 text-white font-bold transition-colors"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return null;
};

export default EmptyState;
