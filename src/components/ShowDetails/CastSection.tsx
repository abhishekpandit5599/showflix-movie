import { CastMember } from '../../lib/types';

interface CastSectionProps {
  cast?: CastMember[];
}

const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
  if (!cast || cast.length === 0) {
    return (
      <div className="border-t border-[#564d4d]/30 pt-6">
        <h2 className="text-xl font-heading font-bold mb-4 text-white">Cast</h2>
        <p className="text-gray-400">Cast information not available.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#564d4d]/30 pt-6">
      <h2 className="text-xl font-heading font-bold mb-4 text-white">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast.slice(0, 8).map((castMember) => (
          <div 
            key={`${castMember.person.id}-${castMember.character.id}`}
            className="bg-[#221f1f] rounded-lg overflow-hidden shadow-md"
          >
            <div className="w-full h-40 overflow-hidden">
              <img 
                src={castMember.person.image?.medium || ''} 
                alt={castMember.person.name} 
                className="w-full h-full object-contain object-top"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm text-white">{castMember.person.name}</h4>
              <p className="text-gray-400 text-xs">{castMember.character.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
