<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">

<%@ include file="/WEB-INF/views/includes/head.jsp" %>

<body>

<%@ include file="/WEB-INF/views/includes/header.jsp" %>

<main>
    
    <div class="container">

        <section class="content">

            <div class="join-box">

                <h2 class="contend-heading">회원가입</h2>

                <!-- 에러 메세지 -->
                <c:if test="${param.error eq 'idLength'}">
                    <p style="color:red;">아이디는 5~25자여야 합니다.</p>
                </c:if>
                <c:if test="${param.error eq 'passwordLength'}">
                    <p style="color:red;">비밀번호는 5~25자여야 합니다.</p>
                </c:if>
                <c:if test="${param.error eq 'duplicate'}">
                    <p style="color:red;">이미 사용 중인 아이디입니다.</p>
                </c:if>
                <c:if test="${param.error eq 'serverError'}">
                    <p style="color:red;">서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
                </c:if>

                <!-- 회원가입 폼 -->
                <form action="${pageContext.request.contextPath}/users/join" method="POST">

                    <!-- 아이디 -->
                    <div class="form-group">
                        <label for="ipt-id">아이디</label>
                        <input type="text" id="ipt-id" name="id" required>
                        <span id="id-error" class="error-msg">문자 5~25자 제한</span>
                    </div>

                    <!-- 비밀번호 -->
                    <div class="form-group">
                        <label for="ipt-pw">비밀번호</label>
                        <input type="password" id="ipt-pw" name="password" required>
                        <span id="pw-error" class="error-msg">문자 2~25자 제한</span>
                    </div>

                    <!-- 비밀번호 확인 -->
                    <div class="form-group">
                        <label for="cnf-pw">비밀번호 확인</label>
                        <input type="password" id="cnf-pw" name="confirm-password" required>
                        <span id="cnf-pw-error" class="error-msg">비밀번호를 다시 입력</span>
                    </div>

                    <div class="btn-set">
                        <button type="submit" id="btn-submit">가입하기</button>
                    </div>

                </form>

            </div>

        </section>

    </div>

</main>

<%@ include file="/WEB-INF/views/includes/footer.jsp" %>

</body>

</html>