import { useState } from 'react';
import { Season } from '../../lib/types';
import { ChevronDown } from 'lucide-react';

interface SeasonsSectionProps {
  seasons?: Season[];
}

const SeasonsSection: React.FC<SeasonsSectionProps> = ({ seasons }) => {
  const [openSeasons, setOpenSeasons] = useState<number[]>([]);

  const toggleSeasonAccordion = (seasonId: number) => {
    setOpenSeasons(prev => 
      prev.includes(seasonId) 
        ? prev.filter(id => id !== seasonId) 
        : [...prev, seasonId]
    );
  };

  if (!seasons || seasons.length === 0) {
    return (
      <div className="border-t border-[#564d4d]/30 pt-6">
        <h2 className="text-xl font-heading font-bold mb-4 text-white">Seasons</h2>
        <p className="text-gray-400">Season information not available.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#564d4d]/30 pt-6">
      <h2 className="text-xl font-heading font-bold mb-4 text-white">Seasons</h2>
      <div className="space-y-4">
        {seasons.map((season) => (
          <div 
            key={season.id}
            className="bg-[#221f1f] rounded-lg overflow-hidden shadow-md"
          >
            <button 
              className="w-full text-left p-4 flex justify-between items-center focus:outline-none text-white" 
              onClick={() => toggleSeasonAccordion(season.id)}
            >
              <h3 className="font-heading font-bold">Season {season.number}</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-3">{season.episodeOrder || '?'} episodes</span>
                <ChevronDown 
                  className={`text-gray-400 transition-transform ${openSeasons.includes(season.id) ? 'transform rotate-180' : ''}`}
                  size={16}
                />
              </div>
            </button>
            {openSeasons.includes(season.id) && (
              <div className="p-4 pt-0 border-t border-[#564d4d]/30">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {season.image && (
                    <img 
                      src={season.image.medium || ''} 
                      alt={`Season ${season.number}`} 
                      className="w-full md:w-40 h-28 object-cover rounded"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-300 mb-2">
                      Premiered: {season.premiereDate || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-300">
                      {season.summary ? 
                        season.summary.replace(/<\/?[^>]+(>|$)/g, "") : 
                        'No description available for this season.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsSection;
