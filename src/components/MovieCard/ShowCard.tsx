import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Show } from '../../lib/types';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import { RootState } from '../../store';
import { useToast } from '../../hooks/use-toast';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { InfoIcon, Heart } from 'lucide-react';
import defaultBannerImg from "../../../public/default-movie-banner.jpg";

interface ShowCardProps {
  show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  
  const isLiked = favorites.some(favorite => favorite.id === show.id);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      dispatch(removeFavorite(show.id));
      toast({
        title: "Removed from Favorites",
        description: `"${show.name}" removed from your favorites.`,
        variant: "default",
      });
    } else {
      dispatch(addFavorite(show));
      toast({
        title: "Added to Favorites",
        description: `"${show.name}" added to your favorites.`,
        variant: "default",
      });
    }
  };

  const stripHtml = (html: string | null): string => {
    if (!html) return 'No description available';
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };
  
  return (
    <Card className="bg-[#221f1f] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md border-none">
      <div className="relative group">
        <div className="w-full h-[200px] overflow-hidden">
          <img 
            src={show.image?.medium || show.image?.original || defaultBannerImg} 
            alt={show.name} 
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <Link to={`/show/${show.id}`} className="no-underline">
            <Button 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-colors text-white"
            >
              <InfoIcon className="mr-2 h-4 w-4" /> More Info
            </Button>
          </Link>
        </div>

        <button 
          className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
          onClick={handleToggleLike}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-[#e50914] text-[#e50914]' : 'text-white'}`} />
        </button>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-lg text-white">{show.name}</h3>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-400 mr-1"></i>
            <span className="text-sm text-white">{show.rating?.average || 'N/A'}</span>
          </div>
        </div>
        <div className="text-sm text-gray-400 mb-2">
          <span>{show.premiered?.substring(0, 4) || 'Unknown'}</span> | 
          <span> {show.genres?.join(', ') || 'Unknown genre'}</span>
        </div>
        <p className="text-sm line-clamp-3 text-gray-300">
          {stripHtml(show.summary)}
        </p>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
