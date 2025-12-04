import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // 로컬 스토리지에서 영화 목록 불러오기
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  const saveToLocalStorage = (updatedMovies) => {
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    setMovies(updatedMovies);
  };

  const addMovie = (movieData) => {
    if (!user) return { success: false, message: '로그인이 필요합니다.' };

    const newMovie = {
      id: Date.now().toString(),
      ...movieData,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    const updatedMovies = [newMovie, ...movies];
    saveToLocalStorage(updatedMovies);
    return { success: true, movie: newMovie };
  };

  const updateMovie = (id, movieData) => {
    if (!user) return { success: false, message: '로그인이 필요합니다.' };

    const movie = movies.find(m => m.id === id);
    if (!movie) return { success: false, message: '영화를 찾을 수 없습니다.' };
    if (movie.userId !== user.id) return { success: false, message: '수정 권한이 없습니다.' };

    const updatedMovies = movies.map(m =>
      m.id === id
        ? { ...m, ...movieData, updatedAt: new Date().toISOString() }
        : m
    );

    saveToLocalStorage(updatedMovies);
    return { success: true };
  };

  const deleteMovie = (id) => {
    if (!user) return { success: false, message: '로그인이 필요합니다.' };

    const movie = movies.find(m => m.id === id);
    if (!movie) return { success: false, message: '영화를 찾을 수 없습니다.' };
    if (movie.userId !== user.id) return { success: false, message: '삭제 권한이 없습니다.' };

    const updatedMovies = movies.filter(m => m.id !== id);
    saveToLocalStorage(updatedMovies);
    return { success: true };
  };

  const addComment = (movieId, commentText) => {
    if (!user) return { success: false, message: '로그인이 필요합니다.' };

    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };

    const updatedMovies = movies.map(m =>
      m.id === movieId
        ? { ...m, comments: [...(m.comments || []), newComment] }
        : m
    );

    saveToLocalStorage(updatedMovies);
    return { success: true };
  };

  const deleteComment = (movieId, commentId) => {
    if (!user) return { success: false, message: '로그인이 필요합니다.' };

    const movie = movies.find(m => m.id === movieId);
    const comment = movie?.comments?.find(c => c.id === commentId);
    
    if (!comment) return { success: false, message: '댓글을 찾을 수 없습니다.' };
    if (comment.userId !== user.id) return { success: false, message: '삭제 권한이 없습니다.' };

    const updatedMovies = movies.map(m =>
      m.id === movieId
        ? { ...m, comments: m.comments.filter(c => c.id !== commentId) }
        : m
    );

    saveToLocalStorage(updatedMovies);
    return { success: true };
  };

  const getMovie = (id) => {
    return movies.find(m => m.id === id);
  };

  const getUserMovies = (userId) => {
    return movies.filter(m => m.userId === userId);
  };

  const searchMovies = (query) => {
    if (!query) return movies;
    const lowerQuery = query.toLowerCase();
    return movies.filter(m =>
      m.title.toLowerCase().includes(lowerQuery) ||
      m.content.toLowerCase().includes(lowerQuery) ||
      m.genre?.toLowerCase().includes(lowerQuery)
    );
  };

  const sortMovies = (moviesArray, sortBy) => {
    const sorted = [...moviesArray];
    switch (sortBy) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'rating-high':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'rating-low':
        return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        addComment,
        deleteComment,
        getMovie,
        getUserMovies,
        searchMovies,
        sortMovies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
