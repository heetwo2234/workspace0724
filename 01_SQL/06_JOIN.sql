/*
    <JOIN>
    두개 이상의 테이블에서 데이터를 조회하고자할 때 사용되는 구문
    조회 결과는 하나의 결과(RESULT SET)을 반환한다.
    
    관계형 데이터베이스에서는 최소한의 데이터를 각각의 테이블에 담고 있음
    (무작정 다 조회해 오는 것이 아니라 각 테이블간 연결고리(외래키)를 통해 데이터를 매칭시켜 조회)
    
    JOIN은 "오라클 전용구문" "ANSI 구문"으로 나뉨
*/

--전체 사원들의 사번, 사원명, 부서코드, 부서명
SELECT EMP_ID, EMP_NAME, DEPT_CODE
FROM EMPLOYEE;

SELECT DEPT_ID, DEPT_TITLE
FROM DEPARTMENT;

/*
    1. 내부조인(INNER JOIN) / 등가조인(EQUAL JOIN)
    연결시키즌 컬럼의 값이 일치하는 행들만 조회(일치하는 값이 없는 행은 조회 제외)
*/

--> 오라클 전용구문
-- FROM절에 조회하고자하는 테이블을 나열(,구분)
-- WHERE절에 매칭시킬 컬럼에대한 조건을 제시
SELECT EMP_ID, EMP_NAME, DEPT_CODE, DEPT_TITLE
FROM EMPLOYEE, DEPARTMENT
WHERE DEPT_CODE = DEPT_ID;

--> ANSI구문
--FROM절에 기준이되는 테이블 하나만 기술한다.
--JOIN절에 같이 조인하고자하는 테이블을 기술 + 매칭시킬 컬럼에대한 조건
-- [INNER] JOIN [USING/ON]

--1. 연결할 두 컬럼명이 다른 경우 JOIN ON을 사용해서 연결할 컬럼명을 명시적으로 연결
SELECT EMP_ID, EMP_NAME, DEPT_CODE, DEPT_TITLE
FROM EMPLOYEE
JOIN DEPARTMENT ON (DEPT_CODE = DEPT_ID);

--2. 연결할 두 컬럼명이 동일한 경우
--전체 사원들의 사번, 사원명, 직급코드, 직급명
SELECT EMP_ID, EMP_NAME, JOB_CODE, JOB_NAME
FROM EMPLOYEE
--JOIN JOB J ON(E.JOB_CODE = J.JOB_CODE);
JOIN JOB USING(JOB_CODE);

--직급이 대리인 사원의 사번, 사원명, 직급명, 급여조회
SELECT EMP_ID, EMP_NAME, JOB_NAME, SALARY
FROM EMPLOYEE
JOIN JOB USING(JOB_CODE)
WHERE JOB_NAME = '대리';

--------------------------------실습------------------------------------
--1. 부서가 인사관리부인 사원들의 사번, 이름, 보너스 조회
SELECT *
FROM EMPLOYEE
JOIN DEPARTMENT ON (DEPT_ID = DEPT_CODE)
WHERE DEPT_TITLE = '인사관리부';

--2. 부서와 지역테이블을 참고하여 전체 부서의 부서코드, 부서명, 지역코드, 지역명 조회
SELECT DEPT_ID, DEPT_TITLE, LOCATION_ID, LOCAL_NAME
FROM DEPARTMENT
JOIN LOCATION ON(LOCAL_CODE = LOCATION_ID);

--3. 보너스를 받는 사원들의 사번, 사원명, 보너스, 부서명 조회
SELECT EMP_ID, EMP_NAME, BONUS, DEPT_TITLE
FROM EMPLOYEE
JOIN DEPARTMENT ON(DEPT_ID = DEPT_CODE)
WHERE BONUS IS NOT NULL;

--4. 부서가 총무부가 아닌 사원들의 사원명, 급여 조회
SELECT EMP_NAME, SALARY
FROM EMPLOYEE
JOIN DEPARTMENT ON(DEPT_ID = DEPT_CODE)
WHERE DEPT_TITLE != '총무부';





