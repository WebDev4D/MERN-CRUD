import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading movies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-4">Movie List</h2>
      {movies.length === 0 ? (
        <p className="text-gray-600">No movies found. Add some movies to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <Card key={movie._id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{movie.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Duration: {movie.duration} min</p>
                <p>Release Year: {movie.releaseYear}</p>
                <p>Rating: {movie.rating}%</p>
                <Button className="mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
