import { ShowWithEmbedded } from '../../lib/types';

interface ShowInfoProps {
  show: ShowWithEmbedded;
}

const ShowInfo: React.FC<ShowInfoProps> = ({ show }) => {
  return (
    <div className="bg-[#221f1f]/80 backdrop-blur-sm rounded-lg p-5 shadow-lg">
      <h3 className="font-heading font-bold text-lg mb-3 text-white">Show Info</h3>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Network:</span>
          <span className="text-white">
            {show.network?.name || show.webChannel?.name || 'Unknown'}
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Schedule:</span>
          <span className="text-white">
            {(show.schedule?.days?.join(', ') || 'Unknown') + ' at ' + (show.schedule?.time || 'Unknown')}
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Status:</span>
          <span className="text-white">{show.status || 'Unknown'}</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Genre:</span>
          <span className="text-white">{show.genres?.join(', ') || 'Unknown'}</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Language:</span>
          <span className="text-white">{show.language || 'Unknown'}</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-400 w-24 flex-shrink-0">Premiered:</span>
          <span className="text-white">{show.premiered || 'Unknown'}</span>
        </li>
        {show.ended && (
          <li className="flex items-start">
            <span className="text-gray-400 w-24 flex-shrink-0">Ended:</span>
            <span className="text-white">{show.ended}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ShowInfo;
