import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { movies } = useMovies();

  const recentMovies = movies.slice(0, 6);

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>🎬 영화 감상일지</HeroTitle>
          <HeroSubtitle>
            당신의 영화 경험을 기록하고 공유하세요
          </HeroSubtitle>
          {user ? (
            <HeroButton onClick={() => navigate('/movies/new')}>
              감상 기록하기
            </HeroButton>
          ) : (
            <HeroButton onClick={() => navigate('/login')}>
              시작하기
            </HeroButton>
          )}
        </HeroContent>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>✨ 최근 감상 기록</SectionTitle>
          <ViewAllButton onClick={() => navigate('/movies')}>
            전체보기 →
          </ViewAllButton>
        </SectionHeader>
        
        {recentMovies.length > 0 ? (
          <MovieGrid>
            {recentMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>🎬</EmptyIcon>
            <EmptyText>아직 등록된 감상 기록이 없습니다.</EmptyText>
            <EmptySubtext>첫 번째 감상 기록을 작성해보세요!</EmptySubtext>
          </EmptyState>
        )}
      </Section>

      <Features>
        <FeatureCard>
          <FeatureIcon>✍️</FeatureIcon>
          <FeatureTitle>감상 기록</FeatureTitle>
          <FeatureDesc>영화를 보고 느낀 점을 자유롭게 기록하세요</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>⭐</FeatureIcon>
          <FeatureTitle>평점 매기기</FeatureTitle>
          <FeatureDesc>5점 만점으로 영화를 평가해보세요</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>💬</FeatureIcon>
          <FeatureTitle>댓글 소통</FeatureTitle>
          <FeatureDesc>다른 사람들과 의견을 나눠보세요</FeatureDesc>
        </FeatureCard>
      </Features>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s;

  &:hover {
    color: #764ba2;
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
  background: #f7fafc;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  color: #718096;
`;

const Features = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const FeatureDesc = styled.p`
  color: #718096;
  line-height: 1.6;
`;

export default Home;
