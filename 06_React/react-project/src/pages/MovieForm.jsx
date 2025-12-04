import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMovie, addMovie, updateMovie } = useMovies();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: 5,
    content: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (isEditMode) {
      const movie = getMovie(id);
      if (!movie) {
        navigate('/404');
        return;
      }
      if (movie.userId !== user.id) {
        alert('수정 권한이 없습니다.');
        navigate('/movies');
        return;
      }
      setFormData({
        title: movie.title,
        genre: movie.genre || '',
        rating: movie.rating || 5,
        content: movie.content
      });
    }
  }, [id, user, navigate, getMovie, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '영화 제목을 입력해주세요.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '감상평을 입력해주세요.';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = '감상평은 최소 10자 이상 입력해주세요.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      if (isEditMode) {
        const result = updateMovie(id, formData);
        if (result.success) {
          navigate(`/movies/${id}`);
        } else {
          alert(result.message);
        }
      } else {
        const result = addMovie(formData);
        if (result.success) {
          navigate(`/movies/${result.movie.id}`);
        } else {
          alert(result.message);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <FormCard>
        <Header>
          <Title>{isEditMode ? '✏️ 감상 수정' : '✍️ 새 감상 기록'}</Title>
          <Subtitle>
            {isEditMode ? '영화 감상을 수정해보세요' : '본 영화에 대한 감상을 기록해보세요'}
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>영화 제목 *</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="영화 제목을 입력하세요"
              $hasError={errors.title}
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </InputGroup>

          <InputRow>
            <InputGroup>
              <Label>장르</Label>
              <Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">선택하세요</option>
                <option value="액션">액션</option>
                <option value="드라마">드라마</option>
                <option value="코미디">코미디</option>
                <option value="로맨스">로맨스</option>
                <option value="스릴러">스릴러</option>
                <option value="공포">공포</option>
                <option value="SF">SF</option>
                <option value="판타지">판타지</option>
                <option value="애니메이션">애니메이션</option>
                <option value="다큐멘터리">다큐멘터리</option>
                <option value="기타">기타</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>평점 *</Label>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarButton
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    $active={star <= formData.rating}
                  >
                    {star <= formData.rating ? '⭐' : '☆'}
                  </StarButton>
                ))}
                <RatingText>{formData.rating}점</RatingText>
              </RatingContainer>
            </InputGroup>
          </InputRow>

          <InputGroup>
            <Label>감상평 *</Label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="영화를 보고 느낀 점을 자유롭게 작성해주세요..."
              rows="12"
              $hasError={errors.content}
            />
            {errors.content && <ErrorText>{errors.content}</ErrorText>}
            <CharCount $warning={formData.content.length < 10}>
              {formData.content.length}자
              {formData.content.length < 10 && ' (최소 10자)'}
            </CharCount>
          </InputGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <SubmitButton type="submit">
              {isEditMode ? '수정하기' : '작성하기'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
  background: #f7fafc;
  padding: 2rem;
`;

const FormCard = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1.05rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2d3748;
  font-weight: 600;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.9rem;
  border: 2px solid ${props => props.$hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#fc8181' : '#667eea'};
  }
`;

const Select = styled.select`
  padding: 0.9rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const RatingText = styled.span`
  margin-left: 0.5rem;
  color: #667eea;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.$hasError ? '#fc8181' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#fc8181' : '#667eea'};
  }
`;

const CharCount = styled.div`
  text-align: right;
  color: ${props => props.$warning ? '#fc8181' : '#a0aec0'};
  font-size: 0.9rem;
`;

const ErrorText = styled.span`
  color: #c53030;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #cbd5e0;
  }
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default MovieForm;
