import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const MyPage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { getUserMovies } = useMovies();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    setName(user.name);
    setMyMovies(getUserMovies(user.id));
  }, [user, navigate, getUserMovies]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    const result = updateProfile(name);
    if (result.success) {
      setIsEditing(false);
      alert('프로필이 수정되었습니다.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  if (!user) return null;

  const totalRating = myMovies.reduce((sum, movie) => sum + (movie.rating || 0), 0);
  const avgRating = myMovies.length > 0 ? (totalRating / myMovies.length).toFixed(1) : 0;

  return (
    <Container>
      <ProfileSection>
        <ProfileCard>
          <ProfileHeader>
            <Avatar>👤</Avatar>
            <ProfileInfo>
              {isEditing ? (
                <EditForm onSubmit={handleUpdateProfile}>
                  <NameInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                  />
                  <ButtonGroup>
                    <SaveButton type="submit">저장</SaveButton>
                    <CancelButton type="button" onClick={() => {
                      setName(user.name);
                      setIsEditing(false);
                    }}>
                      취소
                    </CancelButton>
                  </ButtonGroup>
                </EditForm>
              ) : (
                <>
                  <Name>{user.name}</Name>
                  <Email>{user.email}</Email>
                  <EditButton onClick={() => setIsEditing(true)}>
                    프로필 수정
                  </EditButton>
                </>
              )}
            </ProfileInfo>
          </ProfileHeader>

          <Stats>
            <StatItem>
              <StatValue>{myMovies.length}</StatValue>
              <StatLabel>작성한 감상</StatLabel>
            </StatItem>
            <StatDivider />
            <StatItem>
              <StatValue>{avgRating}</StatValue>
              <StatLabel>평균 평점</StatLabel>
            </StatItem>
            <StatDivider />
            <StatItem>
              <StatValue>
                {myMovies.reduce((sum, movie) => sum + (movie.comments?.length || 0), 0)}
              </StatValue>
              <StatLabel>받은 댓글</StatLabel>
            </StatItem>
          </Stats>

          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </ProfileCard>
      </ProfileSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>📝 내가 작성한 감상 기록</SectionTitle>
          <WriteButton onClick={() => navigate('/movies/new')}>
            + 새 감상 작성
          </WriteButton>
        </SectionHeader>

        {myMovies.length > 0 ? (
          <MovieGrid>
            {myMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>🎬</EmptyIcon>
            <EmptyText>아직 작성한 감상이 없습니다.</EmptyText>
            <EmptyButton onClick={() => navigate('/movies/new')}>
              첫 감상 기록하기
            </EmptyButton>
          </EmptyState>
        )}
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
  background: #f7fafc;
  padding: 2rem;
`;

const ProfileSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 0.3rem;
`;

const Email = styled.p`
  color: #718096;
  margin-bottom: 1rem;
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

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NameInput = styled.input`
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1.1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SaveButton = styled.button`
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

const CancelButton = styled.button`
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #cbd5e0;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
`;

const StatDivider = styled.div`
  width: 1px;
  background: #e2e8f0;
`;

const LogoutButton = styled.button`
  width: 100%;
  background: transparent;
  color: #fc8181;
  border: 2px solid #fc8181;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #fc8181;
    color: white;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
`;

const WriteButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 1.5rem;
`;

const EmptyButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.05rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default MyPage;
