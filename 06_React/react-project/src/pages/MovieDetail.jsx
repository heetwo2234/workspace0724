import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  background: #f7fafc;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Loading = styled.div`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #718096;
`;

const Header = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #5568d3;
  }
`;

const DeleteButton = styled.button`
  background: #fc8181;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #f56565;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Genre = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.95rem;
`;

const AuthorInfo = styled.div``;
const DateInfo = styled.div``;

const Content = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #2d3748;
  white-space: pre-wrap;
`;

const CommentSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CommentHeader = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const CommentCount = styled.span`
  color: #667eea;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 0.8rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CommentButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  color: #718096;
  margin-bottom: 2rem;
`;

const LoginLink = styled.span`
  color: #667eea;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  padding: 1.2rem;
  background: #f7fafc;
  border-radius: 8px;
  position: relative;
`;

const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const CommentDate = styled.span`
  color: #a0aec0;
  font-size: 0.85rem;
`;

const CommentText = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const DeleteCommentButton = styled.button`
  background: transparent;
  color: #fc8181;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const NoComments = styled.div`
  text-align: center;
  padding: 2rem;
  color: #a0aec0;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMovie, deleteMovie, addComment, deleteComment } = useMovies();
  const [movie, setMovie] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const foundMovie = getMovie(id);
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      navigate('/404');
    }
  }, [id, getMovie, navigate]);

  if (!movie) {
    return <Loading>로딩 중...</Loading>;
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = deleteMovie(id);
      if (result.success) {
        navigate('/movies');
      } else {
        alert(result.message);
      }
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const result = addComment(id, commentText);
    if (result.success) {
      setCommentText('');
      setMovie(getMovie(id));
    } else {
      alert(result.message);
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const result = deleteComment(id, commentId);
      if (result.success) {
        setMovie(getMovie(id));
      } else {
        alert(result.message);
      }
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const isAuthor = user && user.id === movie.userId;

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderTop>
            <BackButton onClick={() => navigate(-1)}>← 목록으로</BackButton>
            {isAuthor && (
              <ButtonGroup>
                <EditButton onClick={() => navigate(`/movies/${id}/edit`)}>
                  수정
                </EditButton>
                <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
              </ButtonGroup>
            )}
          </HeaderTop>

          <Title>{movie.title}</Title>
          <Genre>{movie.genre || '미분류'}</Genre>
          <Rating>{renderStars(movie.rating || 0)}</Rating>
          
          <MetaInfo>
            <AuthorInfo>
              <span>작성자: {movie.userName}</span>
            </AuthorInfo>
            <DateInfo>
              <span>작성일: {formatDate(movie.createdAt)}</span>
              {movie.updatedAt !== movie.createdAt && (
                <span> (수정됨: {formatDate(movie.updatedAt)})</span>
              )}
            </DateInfo>
          </MetaInfo>
        </Header>

        <Content>{movie.content}</Content>

        <CommentSection>
          <CommentHeader>
            댓글 <CommentCount>({movie.comments?.length || 0})</CommentCount>
          </CommentHeader>

          {user ? (
            <CommentForm onSubmit={handleAddComment}>
              <CommentInput
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글을 입력하세요..."
                rows="3"
              />
              <CommentButton type="submit">댓글 작성</CommentButton>
            </CommentForm>
          ) : (
            <LoginPrompt>
              댓글을 작성하려면 <LoginLink onClick={() => navigate('/login')}>로그인</LoginLink>이 필요합니다.
            </LoginPrompt>
          )}

          <CommentList>
            {movie.comments && movie.comments.length > 0 ? (
              movie.comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentTop>
                    <CommentAuthor>{comment.userName}</CommentAuthor>
                    <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
                  </CommentTop>
                  <CommentText>{comment.text}</CommentText>
                  {user && user.id === comment.userId && (
                    <DeleteCommentButton onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </DeleteCommentButton>
                  )}
                </CommentItem>
              ))
            ) : (
              <NoComments>아직 댓글이 없습니다.</NoComments>
            )}
          </CommentList>
        </CommentSection>
      </ContentWrapper>
    </Container>
  );
};



export default MovieDetail;
