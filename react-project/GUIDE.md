# 🎬 영화 감상일지 - 설치 및 실행 가이드

## 📋 목차

1. [시스템 요구사항](#시스템-요구사항)
2. [설치 방법](#설치-방법)
3. [실행 방법](#실행-방법)
4. [빌드 방법](#빌드-방법)
5. [프로젝트 구조](#프로젝트-구조)
6. [트러블슈팅](#트러블슈팅)

---

## 시스템 요구사항

### 필수 소프트웨어

- **Node.js**: v18.0.0 이상 (권장: v20.x)
- **npm**: v8.0.0 이상 (또는 yarn, pnpm)

### 확인 방법

```bash
node --version   # v20.x.x
npm --version    # 8.x.x
```

---

## 설치 방법

### 1. 프로젝트 다운로드

```bash
# Git을 통한 클론 (GitHub에 업로드된 경우)
git clone [repository-url]
cd movie-diary

# 또는 ZIP 파일 다운로드 후 압축 해제
```

### 2. 의존성 설치

```bash
# npm 사용
npm install

# 또는 yarn 사용
yarn install

# 또는 pnpm 사용
pnpm install
```

### 3. 설치 확인

```bash
# node_modules 폴더가 생성되었는지 확인
ls node_modules

# package.json의 dependencies가 설치되었는지 확인
npm list --depth=0
```

---

## 실행 방법

### 개발 서버 실행

```bash
npm run dev
```

실행 후 브라우저에서 다음 주소로 접속:
```
http://localhost:5173
```

### 다른 포트에서 실행

```bash
# 5000번 포트에서 실행
npm run dev -- --port 5000
```

---

## 빌드 방법

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

로컬에서 프로덕션 빌드를 테스트할 수 있습니다.

---

## 프로젝트 구조

```
movie-diary/
├── index.html              # HTML 진입점
├── package.json            # 프로젝트 설정
├── vite.config.js          # Vite 설정
├── README.md               # 프로젝트 문서
├── BLOG_POST.md           # 블로그 포스트
├── PRESENTATION.md         # 발표 자료
├── GUIDE.md               # 이 파일
└── src/
    ├── main.jsx           # JavaScript 진입점
    ├── App.jsx            # 메인 App 컴포넌트
    ├── index.css          # 글로벌 스타일
    ├── components/        # 재사용 컴포넌트
    │   ├── Header.jsx
    │   └── MovieCard.jsx
    ├── context/           # Context API
    │   ├── AuthContext.jsx
    │   └── MovieContext.jsx
    └── pages/             # 페이지 컴포넌트
        ├── Home.jsx
        ├── Login.jsx
        ├── Signup.jsx
        ├── MovieList.jsx
        ├── MovieDetail.jsx
        ├── MovieForm.jsx
        ├── MyPage.jsx
        └── NotFound.jsx
```

---

## 주요 기능 사용법

### 1. 회원가입

1. 상단 네비게이션에서 **회원가입** 클릭
2. 이름, 이메일, 비밀번호 입력
3. 비밀번호는 6자 이상, 이메일은 올바른 형식이어야 함
4. 회원가입 버튼 클릭

### 2. 로그인

1. 상단 네비게이션에서 **로그인** 클릭
2. 가입한 이메일과 비밀번호 입력
3. 로그인 버튼 클릭

### 3. 감상 기록 작성

1. 로그인 후 **글쓰기** 또는 홈에서 **감상 기록하기** 클릭
2. 영화 제목, 장르 선택, 평점(별점) 선택
3. 감상평 작성 (최소 10자)
4. **작성하기** 버튼 클릭

### 4. 감상 기록 조회

1. **감상 목록** 메뉴 클릭
2. 검색창에 키워드 입력하여 검색
3. 정렬 옵션으로 원하는 순서로 정렬
4. 카드 클릭하여 상세 페이지로 이동

### 5. 댓글 작성

1. 감상 기록 상세 페이지 접속
2. 하단 댓글 입력란에 댓글 작성
3. **댓글 작성** 버튼 클릭

### 6. 마이페이지

1. 상단 **마이페이지** 클릭
2. 프로필 정보 확인 및 수정
3. 내가 작성한 감상 목록 확인
4. 통계 정보 확인 (작성 수, 평균 평점, 받은 댓글)

---

## 트러블슈팅

### 문제 1: 의존성 설치 오류

**증상:**
```
npm ERR! code ERESOLVE
```

**해결:**
```bash
# npm 캐시 삭제
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 문제 2: 포트가 이미 사용 중

**증상:**
```
Port 5173 is already in use
```

**해결:**
```bash
# 다른 포트에서 실행
npm run dev -- --port 3000

# 또는 5173 포트를 사용하는 프로세스 종료
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID [프로세스ID] /F
```

### 문제 3: React Router 404 오류 (프로덕션)

**증상:**
새로고침 시 404 에러

**해결:**
Vite 설정에 다음 추가 (이미 기본 설정되어 있음):

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  // 프로덕션에서 서브 경로 처리
  base: './',
})
```

### 문제 4: Local Storage 데이터 초기화 필요

**증상:**
잘못된 데이터로 인한 오류

**해결:**
```javascript
// 브라우저 개발자 도구 콘솔에서 실행
localStorage.clear();
location.reload();
```

### 문제 5: 스타일이 제대로 적용되지 않음

**증상:**
CSS가 깨져 보이거나 적용되지 않음

**해결:**
```bash
# 빌드 폴더 삭제 후 재시작
rm -rf dist
npm run dev
```

---

## 개발 팁

### 1. 개발자 도구 활용

- **React DevTools**: 컴포넌트 구조 확인
- **Network 탭**: API 호출 모니터링 (추후 백엔드 연동 시)
- **Application 탭**: Local Storage 데이터 확인

### 2. Hot Module Replacement (HMR)

Vite는 HMR을 지원하므로 코드 수정 시 자동으로 반영됩니다.
브라우저 새로고침 불필요!

### 3. 디버깅

```javascript
// 컴포넌트에서 디버깅
console.log('데이터:', data);

// Context 상태 확인
const { user, movies } = useAuth();
console.log({ user, movies });
```

---

## 추가 리소스

### 공식 문서

- [React 공식 문서](https://react.dev/)
- [React Router 공식 문서](https://reactrouter.com/)
- [Styled Components 공식 문서](https://styled-components.com/)
- [Vite 공식 문서](https://vitejs.dev/)

### 유용한 링크

- [React Hooks 가이드](https://react.dev/reference/react)
- [Context API 가이드](https://react.dev/learn/passing-data-deeply-with-context)
- [Local Storage 사용법](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

---

## 지원

문제가 발생하거나 질문이 있으시면:

1. README.md 파일 참조
2. 코드 내 주석 확인
3. Issue 등록 (GitHub에 업로드된 경우)

---

## 라이센스

MIT License

---

**즐거운 개발 되세요! 🎬**
