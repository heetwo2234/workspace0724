<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>1. fmt:formatNumber</h3>
	<p>
		숫자 데이터의 표시형식을 지정 <br>
		(fmt:formatNumber value="출력할 값" 
			[
				groupingUsed="true|false" 
			 	type="number|percent|currency"
			 	
			 	currencySimbol="문자"
			 	currencyCode="통화"
			 ]
		)
	</p>
	
</body>
</html>