import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { fetchShows, setSearchQuery } from '../../store/slices/showsSlice';
import ShowCard from '../../components/MovieCard/ShowCard';
import Skeleton from '../../components/Skeleton/Skeleton';
import EmptyState from '../../components/comman/EmptyState';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { 
    items, 
    filteredItems, 
    loading, 
    error, 
    searchQuery 
  } = useAppSelector((state: RootState) => state.shows);

  useEffect(() => {
    // Only fetch shows if we don't have any yet
    if (items.length === 0 && !loading && !error) {
      dispatch(fetchShows("all"));
    }
  }, [dispatch, items.length, loading, error]);

  const handleRetry = () => {
    dispatch(fetchShows("all"));
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Discover Shows</h1>
          <div className="relative w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search shows..."
                value={searchQuery}
                className="w-full bg-[#564d4d]/30 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(e.target.value))}
              />
            </div>
          </div>
        </div>
        
        {searchQuery && (
          <p className="text-sm text-gray-400">
            <span>{filteredItems.length}</span> results found
          </p>
        )}
      </div>

      {loading && <Skeleton type="card" count={8} />}

      {error && <EmptyState type="error" message={error} onRetry={handleRetry} />}

      {!loading && !error && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}

      {!loading && !error && filteredItems.length === 0 && items.length > 0 && (
        <EmptyState type="search" />
      )}
    </section>
  );
};

export default HomePage;
