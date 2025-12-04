import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Content = styled.div`
  text-align: center;
  background: white;
  padding: 4rem 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
`;

const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Icon = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const HomeButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #667eea;
    color: white;
  }
`;


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Icon>🎬</Icon>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Message>
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </Message>
        <ButtonGroup>
          <HomeButton onClick={() => navigate('/')}>
            홈으로 가기
          </HomeButton>
          <BackButton onClick={() => navigate(-1)}>
            이전 페이지
          </BackButton>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default NotFound;
