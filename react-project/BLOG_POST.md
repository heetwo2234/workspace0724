# 영화 감상일지 - React SPA 개발기

## 프로젝트 소개

안녕하세요! 오늘은 React를 활용하여 만든 **영화 감상일지** 프로젝트를 소개하려고 합니다. 이 프로젝트는 영화를 보고 느낀 감상을 기록하고, 다른 사용자들과 공유하며 댓글로 소통할 수 있는 SPA(Single Page Application)입니다.

## 🎯 프로젝트 목표

이 프로젝트의 주요 목표는 다음과 같습니다:

1. **React의 핵심 개념 숙달** - Hooks, Props, Context API
2. **완성도 있는 CRUD 구현** - 게시판과 회원가입/로그인
3. **사용자 경험 최적화** - 직관적인 UI/UX와 반응형 디자인

## 🛠 기술 스택 선택 이유

### React 19.2.0
최신 버전의 React를 사용하여 최신 기능들을 활용했습니다. 특히 Hooks를 적극적으로 활용하여 함수형 컴포넌트로 깔끔하게 구현했습니다.

### React Router DOM
SPA의 핵심인 라우팅을 위해 선택했습니다. 8개의 페이지를 자연스럽게 연결하고, 동적 라우팅과 404 처리까지 구현했습니다.

### Styled Components
CSS-in-JS 방식을 통해 컴포넌트 단위로 스타일을 관리했습니다. Props를 활용한 동적 스타일링과 재사용 가능한 스타일 컴포넌트를 만들 수 있었습니다.

### Context API + Local Storage
Redux나 다른 상태 관리 라이브러리 대신 React의 Context API를 사용했습니다. 간단한 애플리케이션에는 Context API만으로도 충분하며, Local Storage를 활용하여 데이터 영속성을 확보했습니다.

## 📐 아키텍처 설계

### 폴더 구조

프로젝트의 구조는 기능별로 명확하게 분리했습니다:

```
src/
├── components/    # 재사용 가능한 UI 컴포넌트
├── context/       # 전역 상태 관리
├── pages/         # 페이지 컴포넌트
└── ...
```

### Context 설계

두 개의 Context를 분리하여 관심사를 명확히 했습니다:

1. **AuthContext** - 사용자 인증 관련
   - 로그인/로그아웃/회원가입
   - 프로필 관리
   - 인증 상태 유지

2. **MovieContext** - 영화 데이터 관련
   - 감상 CRUD
   - 댓글 관리
   - 검색/정렬 기능

## 💡 주요 기능 구현

### 1. 인증 시스템

```javascript
// 로그인 검증
const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const foundUser = users.find(u => 
    u.email === email && u.password === password
  );
  
  if (foundUser) {
    // 비밀번호는 제외하고 저장
    const userWithoutPassword = { 
      id: foundUser.id, 
      email: foundUser.email, 
      name: foundUser.name 
    };
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return { success: true };
  }
  return { 
    success: false, 
    message: '이메일 또는 비밀번호가 올바르지 않습니다.' 
  };
};
```

### 2. 실시간 유효성 검사

회원가입 폼에서 사용자가 입력할 때마다 실시간으로 검증합니다:

```javascript
const validateForm = () => {
  const newErrors = {};

  // 이메일 형식 검사
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 길이 검사
  if (formData.password.length < 6) {
    newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
  }

  // 비밀번호 확인
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  return newErrors;
};
```

### 3. 검색 및 정렬 기능

사용자가 원하는 방식으로 감상 목록을 탐색할 수 있습니다:

```javascript
// 검색
const searchMovies = (query) => {
  if (!query) return movies;
  const lowerQuery = query.toLowerCase();
  return movies.filter(m =>
    m.title.toLowerCase().includes(lowerQuery) ||
    m.content.toLowerCase().includes(lowerQuery) ||
    m.genre?.toLowerCase().includes(lowerQuery)
  );
};

// 정렬
const sortMovies = (moviesArray, sortBy) => {
  const sorted = [...moviesArray];
  switch (sortBy) {
    case 'latest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    case 'rating-high':
      return sorted.sort((a, b) => 
        (b.rating || 0) - (a.rating || 0)
      );
    // ... 기타 정렬 옵션
  }
};
```

### 4. 권한 관리

작성자만 자신의 글을 수정/삭제할 수 있도록 구현했습니다:

```javascript
const deleteMovie = (id) => {
  if (!user) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  const movie = movies.find(m => m.id === id);
  if (!movie) {
    return { success: false, message: '영화를 찾을 수 없습니다.' };
  }
  
  // 권한 검사
  if (movie.userId !== user.id) {
    return { success: false, message: '삭제 권한이 없습니다.' };
  }

  // 삭제 처리
  const updatedMovies = movies.filter(m => m.id !== id);
  saveToLocalStorage(updatedMovies);
  return { success: true };
};
```

## 🎨 UI/UX 디자인

### 디자인 시스템

일관된 사용자 경험을 위해 다음과 같은 디자인 시스템을 적용했습니다:

**컬러 팔레트:**
- Primary: `#667eea` (보라) - `#764ba2` (그라데이션)
- Text: `#2d3748` (다크 그레이)
- Background: `#f7fafc` (라이트 그레이)
- Error: `#fc8181` (레드)

**타이포그래피:**
- 제목: 2.5rem, bold
- 본문: 1rem, regular
- 캡션: 0.9rem, light

### 반응형 디자인

Grid와 Flexbox를 활용하여 다양한 화면 크기에 대응했습니다:

```javascript
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;
```

### 인터랙션

부드러운 애니메이션과 hover 효과로 생동감을 더했습니다:

```javascript
const Card = styled(Link)`
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;
```

## 🔍 개발 과정에서 마주한 도전과 해결

### 1. Local Storage 데이터 동기화

**문제:** Context가 업데이트되어도 컴포넌트가 재렌더링되지 않는 문제

**해결:** 데이터 변경 시 항상 새로운 배열을 생성하여 상태를 업데이트

```javascript
// ❌ 잘못된 방법
movies.push(newMovie);
setMovies(movies);

// ✅ 올바른 방법
const updatedMovies = [newMovie, ...movies];
setMovies(updatedMovies);
```

### 2. 날짜 포맷팅

**문제:** ISO 형식의 날짜를 사용자 친화적으로 표시

**해결:** `toLocaleDateString`과 `toLocaleString` 활용

```javascript
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('ko-KR');
};
```

### 3. 별점 UI 구현

**문제:** 시각적으로 매력적인 별점 시스템 필요

**해결:** 이모지와 반복문을 활용한 간단한 구현

```javascript
const renderStars = (rating) => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};
```

## 📊 프로젝트 통계

- **총 페이지 수:** 8개
- **컴포넌트 수:** 10개+
- **코드 라인 수:** 약 2,500줄
- **개발 기간:** 1주일

## 🎓 배운 점

### 기술적 학습

1. **React Hooks의 깊은 이해**
   - useState, useEffect, useContext의 실전 활용
   - Custom Hooks 패턴 이해

2. **Context API 마스터**
   - Provider 패턴
   - 최적화 방법 (불필요한 재렌더링 방지)

3. **Router 활용**
   - 동적 라우팅
   - 프로그래매틱 네비게이션
   - 404 페이지 처리

4. **Styled Components 활용**
   - Props 기반 동적 스타일링
   - 테마 시스템
   - 재사용 가능한 컴포넌트

### 소프트 스킬

1. **프로젝트 설계 능력**
   - 폴더 구조 설계
   - 데이터 모델링
   - 컴포넌트 분리

2. **사용자 중심 사고**
   - UX 관점에서의 기능 구현
   - 직관적인 UI 디자인
   - 에러 처리와 피드백

## 🚀 향후 개선 방향

### 단기 목표
- [ ] TypeScript 마이그레이션
- [ ] 테스트 코드 작성 (Jest, React Testing Library)
- [ ] 성능 최적화 (React.memo, useMemo 활용)

### 중기 목표
- [ ] 백엔드 API 개발 및 연동
- [ ] 이미지 업로드 기능
- [ ] 영화 DB API 통합 (TMDb 등)

### 장기 목표
- [ ] 소셜 기능 추가 (팔로우, 좋아요)
- [ ] 추천 알고리즘 구현
- [ ] 모바일 앱 개발 (React Native)

## 💭 회고

이 프로젝트를 통해 React를 활용한 실전 웹 애플리케이션 개발 경험을 쌓을 수 있었습니다. 특히 Context API를 활용한 상태 관리와 React Router를 통한 SPA 구현은 매우 유익한 학습 경험이었습니다.

처음에는 단순한 CRUD 애플리케이션으로 시작했지만, 사용자 경험을 고려하면서 검색, 정렬, 댓글, 권한 관리 등 다양한 기능을 추가하며 점점 완성도 있는 서비스로 발전시킬 수 있었습니다.

무엇보다 중요한 것은 **사용자 중심의 개발**이라는 것을 깨달았습니다. 기술적으로 완벽한 코드보다 사용자가 편리하게 사용할 수 있는 서비스를 만드는 것이 더 중요하다는 것을 배웠습니다.

## 🔗 프로젝트 링크

- GitHub: [링크 예정]
- 데모: [링크 예정]

## 📞 연락처

궁금한 점이나 피드백이 있으시다면 언제든 연락 주세요!

---

긴 글 읽어주셔서 감사합니다! 🙏
