<%@ page language="java" contextType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">

<%@ include file="/WEB-INF/views/includes/head.jsp" %>

<body>
    
<%@ include file="/WEB-INF/views/includes/header.jsp" %>

<main>

    <div class="container">

        <section class="content">

            <div class="join-box">

                <h2 class="content-heading">회원가입</h2>

                <c:if test="${param.error eq 'idLength'}">
                    <p style="color:red;">아이디는 5~25 글자 이내</p>
                </c:if>
                <c:if test="${param.error eq 'passwordLength'}">
                    <p style="color:red;">비밀번호는 5~25 글자 이내</p>
                </c:if>
                <c:if test="${param.error eq 'idDuplicate'}">
                    <p style="color:red;">이미 사용중인 아이디입니다</p>
                </c:if>
                <c:if test="${param.error eq 'serverError'}">
                    <p style="color:red;">서버 오류가 발생했습니다</p>
                </c:if>

                <form action="${pageContext.request.contextPath}/users/join" method="POST">

                    <div class="form-group">
                        <label for="ipt-id">아이디</label>
                        <input type="text" id="ipt-id" name="id" required>
                        <span id="id-error" class="error-msg"></span>
                    </div>

                    <div class="form-group">
                        <label for="ipt-pw">비밀번호</label>
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