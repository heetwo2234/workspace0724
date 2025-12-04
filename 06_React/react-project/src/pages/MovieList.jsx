import { useState } from 'react';
import styled from 'styled-components';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
  const { movies, searchMovies, sortMovies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredMovies = searchQuery ? searchMovies(searchQuery) : movies;
  const displayedMovies = sortMovies(filteredMovies, sortBy);

  return (
    <Container>
      <Header>
        <Title>📽️ 영화 감상 목록</Title>
        <Subtitle>모든 사람들의 감상 기록을 둘러보세요</Subtitle>
      </Header>

      <Controls>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="영화 제목, 장르, 내용으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchBar>

        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="rating-high">평점 높은순</option>
          <option value="rating-low">평점 낮은순</option>
          <option value="title">제목순</option>
        </SortSelect>
      </Controls>

      <ResultInfo>
        총 <strong>{displayedMovies.length}</strong>개의 감상 기록
      </ResultInfo>

      {displayedMovies.length > 0 ? (
        <MovieGrid>
          {displayedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>🎬</EmptyIcon>
          <EmptyText>검색 결과가 없습니다.</EmptyText>
          <EmptySubtext>다른 키워드로 검색해보세요.</EmptySubtext>
        </EmptyState>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.9rem 3rem 0.9rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
`;

const SortSelect = styled.select`
  padding: 0.9rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ResultInfo = styled.div`
  color: #718096;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  strong {
    color: #667eea;
    font-weight: 600;
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
  margin-top: 2rem;
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

export default MovieList;
