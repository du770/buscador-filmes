import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'light') document.documentElement.classList.add('theme-light');
      else document.documentElement.classList.remove('theme-light');
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="Ir para página inicial">
          <span className="logo-mark" aria-hidden>🎬</span>
          <span className="logo-text">Buscador</span>
        </Link>

        <form className="header-search" onSubmit={submit} role="search" aria-label="Pesquisar filmes">
          <label htmlFor="header-search-input" className="visually-hidden">Pesquisar filmes</label>
          <input
            id="header-search-input"
            className="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar títulos, atores, gêneros..."
            aria-label="Pesquisar filmes"
          />
          <button className="search-button" aria-label="Pesquisar">Buscar</button>
        </form>

        <nav className="header-actions" aria-label="Ações do site">
          <Link to="/my-list" className="pill" aria-label="Minha lista">Minha lista</Link>
          <button
            className="pill theme-toggle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-pressed={theme === 'light'}
            aria-label="Alternar tema claro e escuro"
          >
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
