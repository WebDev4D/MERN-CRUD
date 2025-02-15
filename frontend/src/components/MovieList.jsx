import { useEffect, useState } from 'react';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const result = await response.json();
        setMovies(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies found. Add some movies to get started!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id} className="border-b py-2">
              <strong>{movie.title}</strong> - {movie.duration} min - {movie.releaseYear} - Rating: {movie.rating}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
