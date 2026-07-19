<!-- includes/slider.jsp -->

<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8" %>

<!-- 슬라이더 -->
<div class="slider">

    <!-- 슬라이더 이미지 -->
    <!-- 추가: 이미지 소스 여기서 설정 -->
    <div class="slider-image" style="background-image:url('${pageContext.request.contextPath}/img/main-image-01.jpg')"></div>

    <!-- 슬라이더 버튼2 : dotted -->
    <div class="slider-buttons">
        <button id="dotted-btn1"><img src="${pageContext.request.contextPath}//img/dotted-20-20.png" alt="1번으로"></button>
        <button id="dotted-btn2"><img src="${pageContext.request.contextPath}//img/dotted-20-20.png" alt="2번으로"></button>
        <button id="dotted-btn3"><img src="${pageContext.request.contextPath}//img/dotted-20-20.png" alt="3번으로"></button>
        <button id="dotted-btn4"><img src="${pageContext.request.contextPath}//img/dotted-20-20.png" alt="4번으로"></button>
    </div>

</div>