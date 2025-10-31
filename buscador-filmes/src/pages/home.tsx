import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Listen to ?q= in URL so header-search and home search work together
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q && q !== query) {
      setQuery(q);
      (async () => {
        setLoading(true);
        const results = await searchMovies(q);
        setMovies(results);
        setLoading(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Search is handled by the header (sync via URL `?q=`). Home keeps query, loading and results.

  return (
    <div className="home" role="main">
      <h1>Buscador de Filmes</h1>

      {/* Busca removida daqui — use a busca do header para evitar duplicação */}
      <p style={{ marginTop: 6, color: 'var(--muted)' }} aria-hidden>
        Use a barra de pesquisa no topo para procurar filmes.
      </p>

      <div className="results-grid" aria-live="polite">
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="movie-card" aria-hidden>
            <div className="movie-poster skeleton">
              <div className="skeleton-poster" />
            </div>
            <div className="skeleton-line" style={{ width: '80%', margin: '8px auto' }} />
          </div>
        ))}

        {!loading && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}