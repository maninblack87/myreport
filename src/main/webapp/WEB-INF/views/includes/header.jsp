<!-- includes/header.jsp -->

<!-- isELIgnored="false" : EL(Expression Language)를 사용하겠다. -->
<!-- 예 : ${name} -->
<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false"%>

<!-- taglib : 태그 라이브러리 약자 -->
<!-- 특정 태그 라이브러리를 사용하겠다. -->
<!-- 예 : <c:forEach> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <meta charset="UTF-8">                                                  <!-- 한글 깨짐 방지 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- 모바일 반응형 디자인을 위해 -->
    <!-- CSS -->
    <!-- JavaScript -->
    <!-- 전역 변수로 contextPath 사용 -->
    <script>
        window.contextPath = "${pageContext.request.contextPath}";
    </script>
</head>

<body>
    <header>
        <div id="hd1">
            <!-- 로고, 사용자 본인의 계정 관리 -->
            <div class="container">
                <div class="logo">
                    <a href="${pageContext.request.contextPath}">내 Report</a>
                </div>
                <div class="user-account">
                    <c:choose>
                        <%-- 로그인 안한 상태 : 세션에 객체 user가 없다면 --%>
                        <c:when test="${empty sessionScope.user}">
                            <a href="${pageContext.request.contextPath}/login">로그인</a>
                            <a href="${pageContext.request.contextPath}/register">회원가입</a>
                        </c:when>
                        <%-- 로그인 한 상태 : 세션에 객체 user가 있다면 --%>
                        <c:otherwise>
                            <span>${sessionScope.user.name}님</span>
                            <a href="${pageContext.request.contextPath}/logout">로그아웃</a>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
    </header>
</body>