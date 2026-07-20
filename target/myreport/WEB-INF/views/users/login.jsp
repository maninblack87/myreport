<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">

<%@ include file="/WEB-INF/views/includes/head.jsp" %>

<body>
    
<%@ include file="/WEB-INF/views/includes/header.jsp" %>

<main>

    <%@ include file="/WEB-INF/views/includes/sub_top.jsp" %>

    <div class="container">

        <section class="content">

            <div class="login-box">

                <h2 class="content-heading">로그인</h2>

                <!-- 로그인 폼 -->
                <form action="${pageContext.request.contextPath}/users/login" method="POST">

                    <!-- 아이디 -->
                    <div class="form-group">
                        <label for="ipt-id">아이디</label>
                        <input type="text" id="ipt-id" name="id" required>
                        <span id="id-error" class="error-msg"></span>
                    </div>

                    <!-- 비밀번호 -->
                    <div class="form-group">
                        <label for="ipt-pw">비밀번호</label>
                        <input type="password" id="ipt-pw" name="password" required>
                        <span id="pw-error" class="error-msg"></span>
                    </div>

                    <!-- 버튼 셋 -->
                    <div class="btn-set">
                        <button type="submit" id="btn-submit">로그인</button>
                    </div>
                    
                </form>

            </div>

        </section>

    </div>

</main>

</body>

</html>
