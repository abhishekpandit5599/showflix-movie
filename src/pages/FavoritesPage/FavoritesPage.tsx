import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ShowCard from '../../components/MovieCard/ShowCard';
import EmptyState from '../../components/comman/EmptyState';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">My Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <EmptyState type="favorites" />
      )}
    </section>
  );
};

export default FavoritesPage;
