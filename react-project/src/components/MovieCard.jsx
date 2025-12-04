import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components를 먼저 정의
const Card = styled(Link)`
  display: block;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  color: #2d3748;
  flex: 1;
`;

const Rating = styled.div`
  font-size: 1rem;
  margin-left: 1rem;
`;

const Genre = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const Content = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 1rem 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const Author = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const DateText = styled.span`
  color: #a0aec0;
  font-size: 0.85rem;
`;

const CommentCount = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f7fafc;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #4a5568;
`;

// 컴포넌트 정의
const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
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
