import { useNavigate } from 'react-router-dom';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/movie/${movie.imdbID}`); }}
      aria-label={`Abrir detalhes de ${movie.Title}`}
    >
      <div className="movie-poster">
        {hasPoster ? (
          <img src={movie.Poster} alt={`Poster de ${movie.Title}`} loading="lazy" />
        ) : (
          <div className="poster-placeholder" aria-hidden>
            <div className="placeholder-icon">🎞️</div>
            <div className="placeholder-text">Sem poster</div>
          </div>
        )}
      </div>
      <h3>{movie.Title}</h3>
    </div>
  );
}
