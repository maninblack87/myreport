<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<html lang="en">

<%@ include file="/WEB-INF/views/includes/head.jsp" %>

<body>
    
<%@ include file="/WEB-INF/views/includes/header.jsp" %>

<main>

    <%@ include file="/WEB-INF/views/includes/sub_top.jsp" %>

    <div class="containter">

        <section class="content">

            <div class="join-box">

                <h2 class="content-heading">회원가입</h2>

                <!-- 에러 메세지 -->

                <form action="${pageContext.request.contextPath}/users/join" method="POST">

                    <div class="form-group">
                        <label for="ipt-id">아이디</label>
                        <input type="text" id="ipt-id" name="id" required>
                        <span id="id-error" class="error-msg"></span>
                    </div>

                    <div class="form-group">
                        <label for="ipt-pw">패스워드</label>
                        <input type="password" id="ipt-pw" name="password" required>
                        <span id="pw-error" class="error-msg"></span>
                    </div>

                    <div class="form-group">
                        <label for="cnf-pw">비밀번호 확인</label>
                        <input type="password" id="cnf-pw" name="confirm-password" required>
                        <span id="cnf-pw-error" class="error-msg"></span>
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