import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MovieDetails from './pages/moviedetails';
import Header from './components/Header';
import MyList from './pages/mylist';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="*" element={<div style={{ padding: 20 }}>Página não encontrada</div>} />
      </Routes>
    </Router>);
}