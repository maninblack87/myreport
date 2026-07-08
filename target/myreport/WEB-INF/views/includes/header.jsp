<!-- includes/header.jsp -->
<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8" %>

<!-- jstl 표준 코어 라이브러리를 사용하겠다. -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/header.css">

<header>

    <div id="hd1">
        <div class="container">
            <div class="logo">
                <a href="${pageContext.request.contextPath}">Home</a>
            </div>
            <div class="menu">
                <nav>
                    <li><a href="${pageContext.request.contextPath}">메인1</a></li>
                    <li><a href="${pageContext.request.contextPath}">메인2</a></li>
                    <li><a href="${pageContext.request.contextPath}">메인3</a></li>
                    <li><a href="${pageContext.request.contextPath}">메인4</a></li>
                </nav>
            </div>
            <div class="my-account">
                <c:choose>
                    <c:when test="${empty sessionScope.loginUser}">
                        <a href="${pageContext.request.contextPath}/users/login" class="to-login">로그인</a>
                        <a href="${pageContext.request.contextPath}/users/join" class="to-join">회원가입</a>
                    </c:when>
                    <c:otherwise>
                        <span class="welcome">환영합니다 <strong>${sessionScope.loginUser.id}</strong></span>
                        <a href="${pageContext.request.contextPath}/users/logout" class="to-logout">로그아웃</a>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>

</header>