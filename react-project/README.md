# 🎬 영화 감상일지

React를 활용한 영화 감상 기록 SPA (Single Page Application)

## 📖 프로젝트 소개

영화 감상일지는 사용자가 본 영화에 대한 감상과 평가를 기록하고 공유할 수 있는 웹 애플리케이션입니다. 다른 사용자들의 감상 기록을 둘러보고 댓글로 소통할 수 있습니다.

### ✨ 주요 기능

#### 1. 게시판형 CRUD 기능
- ✅ 영화 감상 기록 작성 (제목, 장르, 평점, 내용)
- ✅ 감상 목록 조회 (카드형 레이아웃)
- ✅ 감상 상세 페이지
- ✅ 감상 수정/삭제 (작성자만 가능)
- ✅ 검색 기능 (제목, 장르, 내용)
- ✅ 정렬 기능 (최신순, 오래된순, 평점순, 제목순)

#### 2. 로그인/회원가입 CRUD 기능
- ✅ 회원가입 (이메일, 비밀번호, 이름)
- ✅ 입력값 유효성 검사
- ✅ 로그인/로그아웃
- ✅ 마이페이지
- ✅ 사용자 정보 수정 (이름)

#### 3. 댓글 시스템
- ✅ 댓글 작성
- ✅ 댓글 삭제 (작성자만 가능)
- ✅ 댓글 수 표시

#### 4. 페이지 분리 및 라우팅
- ✅ React Router DOM을 활용한 SPA 라우팅
- ✅ 8개의 라우트 구성
- ✅ 404 페이지 처리

## 🛠 기술 스택

### Core
- **React 19.2.0** - UI 라이브러리
- **React Router DOM 6.22.0** - 라우팅
- **Vite 7.2.4** - 빌드 도구

### Styling
- **Styled Components 6.1.19** - CSS-in-JS

### State Management
- **React Context API** - 전역 상태 관리
- **Local Storage** - 데이터 영속성

## 📂 프로젝트 구조

```
movie-diary/
├── src/
│   ├── components/         # 공통 컴포넌트
│   │   ├── Header.jsx     # 네비게이션 헤더
│   │   └── MovieCard.jsx  # 영화 카드 컴포넌트
│   ├── context/           # Context API
│   │   ├── AuthContext.jsx    # 인증 관리
│   │   └── MovieContext.jsx   # 영화 데이터 관리
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Home.jsx       # 홈 페이지
│   │   ├── Login.jsx      # 로그인
│   │   ├── Signup.jsx     # 회원가입
│   │   ├── MovieList.jsx  # 영화 목록
│   │   ├── MovieDetail.jsx # 영화 상세
│   │   ├── MovieForm.jsx  # 영화 작성/수정
│   │   ├── MyPage.jsx     # 마이페이지
│   │   └── NotFound.jsx   # 404 페이지
│   ├── App.jsx            # 메인 App 컴포넌트
│   ├── main.jsx           # 진입점
│   └── index.css          # 글로벌 스타일
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

### 접속

개발 서버 실행 후 `http://localhost:5173` 에서 확인할 수 있습니다.

## 📱 주요 페이지

### 1. 홈 (/)
- 최근 감상 기록 6개 표시
- 주요 기능 소개
- 시작하기 CTA

### 2. 로그인 (/login)
- 이메일/비밀번호 로그인
- 회원가입 페이지로 이동

### 3. 회원가입 (/signup)
- 이름, 이메일, 비밀번호 입력
- 실시간 유효성 검사
- 비밀번호 확인 검증

### 4. 영화 목록 (/movies)
- 전체 감상 기록 조회
- 검색 기능
- 정렬 기능 (최신순, 평점순 등)

### 5. 영화 상세 (/movies/:id)
- 감상 기록 상세 내용
- 작성자 정보
- 댓글 시스템
- 수정/삭제 버튼 (작성자만)

### 6. 영화 작성 (/movies/new)
- 제목, 장르, 평점(1-5), 감상평 입력
- 별점 시각화
- 최소 10자 입력 제한

### 7. 영화 수정 (/movies/:id/edit)
- 기존 데이터 불러오기
- 작성자만 접근 가능

### 8. 마이페이지 (/mypage)
- 사용자 프로필 정보
- 통계 (작성 수, 평균 평점, 받은 댓글 수)
- 내가 작성한 감상 목록
- 프로필 수정

## 🎨 주요 기능 설명

### Context API 활용

#### AuthContext
- 사용자 인증 상태 관리
- 로그인/로그아웃/회원가입
- 프로필 업데이트

#### MovieContext
- 영화 감상 데이터 관리
- CRUD 작업 (생성, 조회, 수정, 삭제)
- 댓글 관리
- 검색 및 정렬 기능

### Local Storage 활용
- 사용자 데이터 영속성
- 영화 감상 데이터 저장
- 로그인 세션 유지

### 반응형 디자인
- 모바일, 태블릿, 데스크톱 대응
- Grid/Flexbox 레이아웃

### 사용자 경험
- 부드러운 애니메이션
- 직관적인 UI/UX
- 실시간 유효성 검사
- 로딩 상태 표시

## 🔐 데이터 구조

### User
```javascript
{
  id: string,
  email: string,
  password: string,
  name: string,
  createdAt: string
}
```

### Movie
```javascript
{
  id: string,
  title: string,
  genre: string,
  rating: number (1-5),
  content: string,
  userId: string,
  userName: string,
  createdAt: string,
  updatedAt: string,
  comments: Comment[]
}
```

### Comment
```javascript
{
  id: string,
  text: string,
  userId: string,
  userName: string,
  createdAt: string
}
```

## 🎯 학습 포인트

이 프로젝트를 통해 다음을 학습했습니다:

1. **React Hooks 활용**
   - useState, useEffect, useContext
   - Custom Hooks

2. **Context API**
   - 전역 상태 관리
   - Provider 패턴

3. **React Router**
   - SPA 라우팅
   - 동적 라우팅 (/:id)
   - 404 처리

4. **Styled Components**
   - CSS-in-JS
   - Props 기반 스타일링
   - 컴포넌트 재사용성

5. **CRUD 구현**
   - Create, Read, Update, Delete
   - 권한 관리

6. **폼 관리**
   - 유효성 검사
   - 에러 핸들링
   - 사용자 피드백

## 🌟 개선 가능한 부분

- [ ] 백엔드 API 연동
- [ ] 이미지 업로드 기능
- [ ] 영화 검색 API 통합
- [ ] 좋아요/북마크 기능
- [ ] 페이지네이션
- [ ] 다크 모드
- [ ] 소셜 로그인

## 📄 라이센스

MIT License

## 👨‍💻 개발자

프로젝트 개발: [Your Name]
