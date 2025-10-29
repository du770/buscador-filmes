import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MovieDetails from './pages/moviedetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>);
}