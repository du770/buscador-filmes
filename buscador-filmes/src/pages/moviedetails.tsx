import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

type Movie = {
  Title: string;
  Poster: string;
  Year: string;
  Director: string;
  Plot: string;
};

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Carregando...</div>;

  return (
    <div className="movie-details" role="main">
      <div>
        <img src={movie.Poster} alt={`Poster de ${movie.Title}`} />
      </div>
      <div>
        <h1>{movie.Title}</h1>
        <p><strong>Ano:</strong> {movie.Year}</p>
        <p><strong>Diretor:</strong> {movie.Director}</p>
        <p><strong>Enredo:</strong> {movie.Plot}</p>
      </div>
    </div>);
}