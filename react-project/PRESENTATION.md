# 🎬 영화 감상일지 프로젝트 발표

---

## 📌 목차

1. 프로젝트 소개
2. 기술 스택
3. 주요 기능
4. 아키텍처
5. 핵심 구현 사항
6. 데모
7. 배운 점 & 개선 방향

---

## 1. 프로젝트 소개

### 영화 감상일지란?

> 영화를 보고 느낀 감상을 기록하고, 다른 사용자들과 공유하며 소통하는 React SPA

### 프로젝트 목표

- ✅ React 핵심 개념 숙달 (Hooks, Props, Context)
- ✅ 완성도 있는 CRUD 구현
- ✅ 사용자 친화적인 UI/UX

### 개발 기간

**1주일** (2024.12)

---

## 2. 기술 스택

### Frontend
```
React 19.2.0
React Router DOM 6.22.0
Styled Components 6.1.19
Vite 7.2.4
```

### State Management
```
Context API
Local Storage
```

### 선택 이유

1. **React 19** - 최신 기능 활용, Hooks 기반 함수형 컴포넌트
2. **React Router** - SPA 라우팅, 동적 라우트
3. **Styled Components** - CSS-in-JS, 컴포넌트 기반 스타일링
4. **Context API** - 간단하고 효율적인 전역 상태 관리
5. **Local Storage** - 백엔드 없이 데이터 영속성 확보

---

## 3. 주요 기능

### ✅ 필수 구현 완료

#### 1️⃣ 게시판형 CRUD
- 감상 기록 등록, 조회, 수정, 삭제
- 검색 기능 (제목, 장르, 내용)
- 정렬 기능 (최신순, 평점순, 제목순 등)

#### 2️⃣ 로그인/회원가입
- 회원가입 (유효성 검사)
- 로그인/로그아웃
- 마이페이지 (프로필 수정)

#### 3️⃣ 라우팅
- **8개 페이지** 구성
- 404 페이지 처리
- 동적 라우팅 활용

### 🎁 추가 기능

- 댓글 시스템 (작성/삭제)
- 평점 시스템 (별점 1-5)
- 권한 관리 (작성자만 수정/삭제)
- 통계 정보 (마이페이지)

---

## 4. 아키텍처

### 폴더 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── Header.jsx      # 네비게이션
│   └── MovieCard.jsx   # 영화 카드
├── context/            # 전역 상태
│   ├── AuthContext.jsx # 인증 관리
│   └── MovieContext.jsx # 영화 데이터
├── pages/              # 페이지
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── MovieList.jsx
│   ├── MovieDetail.jsx
│   ├── MovieForm.jsx
│   ├── MyPage.jsx
│   └── NotFound.jsx
└── ...
```

### Context 설계

**관심사의 분리**

1. **AuthContext** → 사용자 인증
   - 로그인/로그아웃/회원가입
   - 프로필 관리

2. **MovieContext** → 영화 데이터
   - 감상 CRUD
   - 댓글 관리
   - 검색/정렬

---

## 5. 핵심 구현 사항

### 1) 인증 시스템

```javascript
// 로그인 검증
const login = (email, password) => {
  const users = JSON.parse(
    localStorage.getItem('users') || '[]'
  );
  
  const foundUser = users.find(u => 
    u.email === email && 
    u.password === password
  );
  
  if (foundUser) {
    // 보안: 비밀번호 제외하고 저장
    const safeUser = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name
    };
    setUser(safeUser);
    return { success: true };
  }
  
  return { 
    success: false, 
    message: '로그인 정보가 올바르지 않습니다.' 
  };
};
```

### 2) 실시간 유효성 검사

```javascript
// 회원가입 폼 검증
const validateForm = () => {
  const errors = {};

  // 이메일 형식
  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 길이
  if (password.length < 6) {
    errors.password = '6자 이상 입력해주세요.';
  }

  // 비밀번호 확인
  if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};
```

### 3) 권한 관리

```javascript
// 삭제 권한 검사
const deleteMovie = (id) => {
  if (!user) {
    return { 
      success: false, 
      message: '로그인이 필요합니다.' 
    };
  }

  const movie = movies.find(m => m.id === id);
  
  // 작성자 확인
  if (movie.userId !== user.id) {
    return { 
      success: false, 
      message: '삭제 권한이 없습니다.' 
    };
  }

  // 삭제 처리
  const updated = movies.filter(m => m.id !== id);
  setMovies(updated);
  return { success: true };
};
```

### 4) 검색 & 정렬

```javascript
// 검색
const searchMovies = (query) => {
  const lower = query.toLowerCase();
  return movies.filter(m =>
    m.title.toLowerCase().includes(lower) ||
    m.content.toLowerCase().includes(lower) ||
    m.genre?.toLowerCase().includes(lower)
  );
};

// 정렬
const sortMovies = (movies, sortBy) => {
  const sorted = [...movies];
  
  switch (sortBy) {
    case 'latest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    case 'rating-high':
      return sorted.sort((a, b) => 
        (b.rating || 0) - (a.rating || 0)
      );
    // ...
  }
};
```

---

## 6. 데모

### 주요 페이지 소개

#### 🏠 홈
- 최근 감상 6개 표시
- 주요 기능 소개
- CTA 버튼

#### 🔐 로그인/회원가입
- 유효성 검사
- 실시간 에러 표시
- 깔끔한 폼 디자인

#### 📝 감상 목록
- 카드 레이아웃
- 검색 & 정렬
- 반응형 그리드

#### 📖 감상 상세
- 댓글 시스템
- 수정/삭제 (작성자)
- 별점 표시

#### ✍️ 감상 작성
- 제목, 장르, 평점, 내용
- 인터랙티브 별점 UI
- 글자 수 카운터

#### 👤 마이페이지
- 프로필 정보
- 통계 (작성 수, 평균 평점)
- 내 감상 목록

---

## 7. 배운 점 & 개선 방향

### 💡 배운 점

#### 기술적 성장
1. **React Hooks 마스터**
   - useState, useEffect, useContext 실전 활용
   - Custom Hooks 패턴 이해

2. **Context API 최적화**
   - Provider 패턴
   - 불필요한 재렌더링 방지

3. **Router 활용**
   - 동적 라우팅
   - 프로그래매틱 네비게이션

4. **Styled Components**
   - Props 기반 스타일링
   - 재사용 가능한 컴포넌트

#### 개발 역량
- 프로젝트 설계 능력
- 사용자 중심 사고
- 문제 해결 능력

### 🚀 개선 방향

#### 단기
- TypeScript 도입
- 테스트 코드 작성
- 성능 최적화

#### 중기
- 백엔드 API 연동
- 이미지 업로드
- 영화 DB API 통합

#### 장기
- 소셜 기능 (팔로우, 좋아요)
- 추천 알고리즘
- 모바일 앱 (React Native)

---

## 📊 프로젝트 통계

```
총 페이지:     8개
컴포넌트:      10개+
코드 라인:     약 2,500줄
개발 기간:     1주일
커밋 수:       50+
```

---

## 🎯 핵심 메시지

### 1. 사용자 중심 개발
> 기술보다 **사용자 경험**이 우선

### 2. 점진적 개선
> 작게 시작해서 **지속적으로 개선**

### 3. 실전 학습
> 이론보다 **실제 구현**을 통한 학습

---

## 💭 마무리

### 프로젝트를 통해...

- ✅ React 생태계 이해도 향상
- ✅ 완성도 있는 SPA 개발 경험
- ✅ 실전 문제 해결 능력 향상
- ✅ 사용자 중심 사고 습득

### 느낀 점

> "완벽한 코드보다 **동작하는 서비스**를 만드는 것이 중요하다"

> "작은 기능 하나하나가 모여 **완성도 있는 프로덕트**가 된다"

---

## 🙏 감사합니다!

### Q&A

궁금하신 점이 있으시면 질문해주세요!

---

## 📎 참고 자료

- GitHub: [링크]
- 블로그 포스트: [링크]
- 데모 사이트: [링크]

---

# Thank You! 🎬
