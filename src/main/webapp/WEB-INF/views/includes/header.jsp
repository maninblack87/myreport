<!-- includes/header.jsp -->

<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false">

<!-- jstl 표준 코어 라이브러리를 사용하겠다. -->
<!-- 예 : <c:forEach> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" isELIgnored="false">
        <title>My Report</title>
    </head>

    <body>
        <header>
            <div id="hd1">
                <div class="container">
                    <div class="logo">
                        <a href="${pageContext.request.contextPath}">Home</a>
                    </div>
                    <div class="my-account">
                        <c:choose>
                        </c:choose>
                    </div>
                </div>
            </div>
            <div id="hd2">
                <div class="container">
                    <p>준비 중입니다</p>
                </div>
            </div>
        </header>
    </body>
