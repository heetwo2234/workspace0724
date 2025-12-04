import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2d3748;
  font-weight: 600;
  font-size: 0.95rem;
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

const ErrorText = styled.span`
  color: #c53030;
  font-size: 0.85rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #718096;

  a {
    color: #667eea;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 해당 필드의 에러 제거
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
      const result = signup(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ email: result.message });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>회원가입</Title>
        <Subtitle>새로운 계정을 만들어보세요</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              $hasError={errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              $hasError={errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="6자 이상의 비밀번호"
              $hasError={errors.password}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              $hasError={errors.confirmPassword}
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </InputGroup>

          <SubmitButton type="submit">회원가입</SubmitButton>
        </Form>

        <LoginLink>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </LoginLink>
      </FormCard>
    </Container>
  );
};


export default Signup;
