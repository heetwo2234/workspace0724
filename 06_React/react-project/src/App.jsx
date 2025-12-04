import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import MovieForm from './pages/MovieForm';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/movies/:id/edit" element={<MovieForm />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
