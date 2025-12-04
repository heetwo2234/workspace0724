import { Link } from 'react-router-dom';
import styled from 'styled-components';


const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    return 
    const dateObj = new window.Date(dateString);
    dateObj.toLocaleDateString('ko-KR');
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <Card to={`/movies/${movie.id}`}>
      <CardHeader>
        <Title>{movie.title}</Title>
        <Rating>{renderStars(movie.rating || 0)}</Rating>
      </CardHeader>
      <Genre>{movie.genre || '미분류'}</Genre>
      <Content>{movie.content?.substring(0, 100)}...</Content>
      <Footer>
        <Author>by {movie.userName}</Author>
        <DateText>{formatDate(movie.createdAt)}</DateText>
      </Footer>
      {movie.comments && movie.comments.length > 0 && (
        <CommentCount>💬 {movie.comments.length}</CommentCount>
      )}
    </Card>
  );
};


export default MovieCard;
