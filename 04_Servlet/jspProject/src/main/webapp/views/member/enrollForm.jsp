<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <jsp:include page="/views/common/menubar.jsp" />

    <div>
        <br>
        <h2>회원가입</h2>
        <form action="">
            <table>
                <tr>
                    <td>아이디</td>
                    <td><input type="text" name="userId" required></td>
                    <td><button type="button" onclick="">중복확인</button></td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td><input type="password" name="userPwd" required></td>
                    <td></td>
                </tr>
                <tr>
                    <td>비빌번호 확인</td>
                    <td><input type="password" required></td>
                    <td></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td><input type="text" name="userName" required></td>
                    <td></td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td><input type="text" name="phone"></td>
                    <td></td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td><input type="text" name="email"></td>
                    <td></td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td><input type="text" name="address"></td>
                    <td></td>
                </tr>
                <tr>
                    <td>관심분야</td>
                    <td colspan="2">
                        <label>
                            <input type="checkbox" name="interest" value="sports">
                            운동
                        </label>
                        <label>
                            <input type="checkbox" name="interest" value="hiking">
                            등산
                        </label>
                        <label>
                            <input type="checkbox" name="interest" value="fishing">
                            낚시
                        </label>
                        <br>
                        <label>
                            <input type="checkbox" name="interest" value="cooking">
                            요리
                        </label>
                        <label>
                            <input type="checkbox" name="interest" value="gaming">
                            게임
                        </label>
                        <label>
                            <input type="checkbox" name="interest" value="movie">
                            영화
                        </label>
                    </td>
                </tr>
            </table>

            <br><br>

            <div>
                <input type="submit" value="회원가입">
                <input type="reset" value="다시입력">
            </div>
        </form>
    </div>
</body>
</html>