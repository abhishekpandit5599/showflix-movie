import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; 
import { RootState, AppDispatch } from '../../store';
import {
  fetchShowDetails
} from '../../store/slices/showsSlice';
import {
  addFavorite,
  removeFavorite
} from '../../store/slices/favoritesSlice';
import Skeleton from '../../components/Skeleton/Skeleton';
import ShowInfo from '../../components/ShowDetails/ShowInfo';
import CastSection from '../../components/ShowDetails/CastSection';
import SeasonsSection from '../../components/ShowDetails/SeasonsSection';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import defaultBannerImg from "../../../public/default-movie-banner.jpg";

const ShowDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const showId = id ? parseInt(id, 10) : undefined;

  const { selectedShow, detailsLoading, error } = useSelector(
    (state: RootState) => state.shows
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isLiked = selectedShow
    ? favorites.some((favorite) => favorite.id === selectedShow.id)
    : false;

  useEffect(() => {
    if (showId && selectedShow?.id !== showId) {
      dispatch(fetchShowDetails(showId));
    }
  }, [dispatch, showId]);

  const handleToggleLike = () => {
    if (!selectedShow) return;

    if (isLiked) {
      dispatch(removeFavorite(selectedShow.id));
      toast({
        title: 'Removed from Favorites',
        description: `"${selectedShow.name}" removed from your favorites.`,
      });
    } else {
      dispatch(addFavorite(selectedShow));
      toast({
        title: 'Added to Favorites',
        description: `"${selectedShow.name}" added to your favorites.`,
      });
    }
  };

  const stripHtml = (html: string | null): string => {
    if (!html) return 'No description available';
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  if (detailsLoading) {
    return <Skeleton type="details" />;
  }

  if (error || !selectedShow) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-[#e50914] text-5xl mb-4"></i>
        <h3 className="text-xl font-heading font-bold mb-2 text-white">Show Not Found</h3>
        <p className="text-gray-400 mb-6">
          {error || "The show you're looking for doesn't exist or has been removed."}
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#e50914] hover:bg-[#e50914]/80 text-white font-bold"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          onClick={() => navigate(-1)}
          className="mr-4 bg-[#564d4d]/20 hover:bg-[#564d4d]/30 rounded-full p-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
          {selectedShow.name}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left section */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div className="relative group rounded-lg overflow-hidden shadow-lg">
              <div className="w-full aspect-[2/3] overflow-hidden">
                <img
                  src={
                    selectedShow.image?.original ||
                    selectedShow.image?.medium ||
                    defaultBannerImg
                  }
                  alt={selectedShow.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <button
                className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                onClick={handleToggleLike}
                aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? 'fill-[#e50914] text-[#e50914]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <ShowInfo show={selectedShow} />
          </div>
        </div>

        {/* Right section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="space-y-8">
            <div>
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <div className="bg-[#e50914]/20 text-[#e50914] px-3 py-1 rounded-full text-sm font-medium">
                  Rating: <span>{selectedShow.rating?.average || 'N/A'}</span>/10
                </div>
                <div className="bg-[#564d4d]/20 px-3 py-1 rounded-full text-sm font-medium text-white">
                  Runtime: <span>{selectedShow.runtime ? `${selectedShow.runtime} min` : 'N/A'}</span>
                </div>
                <div className="bg-[#564d4d]/20 px-3 py-1 rounded-full text-sm font-medium text-white">
                  {selectedShow.type || 'Show'}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{stripHtml(selectedShow.summary)}</p>
              </div>

              {selectedShow.officialSite && (
                <div className="mt-6">
                  <a
                    href={selectedShow.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#e50914] hover:bg-[#e50914]/80 text-white font-bold py-2 px-6 rounded transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Official Site
                  </a>
                </div>
              )}
            </div>

            <CastSection cast={selectedShow._embedded?.cast} />
            <SeasonsSection seasons={selectedShow._embedded?.seasons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailsPage;
