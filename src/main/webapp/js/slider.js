// js/slider.js
document.addEventListener("DOMContentLoaded", function () {
    const sliderImage = document.querySelector(".slider-image");
    const images = [
        window.contextPath + "/img/main-image-01.jpg",
        window.contextPath + "/img/main-image-02.jpg",
        window.contextPath + "/img/main-image-03.jpg",
        window.contextPath + "/img/main-image-04.jpg"
    ];
    const dottedBtns = ["dotted-btn1", "dotted-btn2", "dotted-btn3", "dotted-btn4"];
    let currentIndex = 0;

    // 이미지를 변경하는 함수
    function changeBackgroundImage(){
        currentIndex = (currentIndex + 1) % images.length;
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    // 버튼을 클릭하면 이미지를 변경하는 함수
    // 1번째 버튼 클릭시
    document.getElementById(dottedBtns[0]).addEventListener("click", function () {
        currentIndex = 0; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });
    // 2번째 버튼 클릭시
    document.getElementById(dottedBtns[1]).addEventListener("click", function () {
        currentIndex = 1; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });
    // 3번째 버튼 클릭시
    document.getElementById(dottedBtns[2]).addEventListener("click", function () {
        currentIndex = 2; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });
    // 4번째 버튼 클릭시
    document.getElementById(dottedBtns[3]).addEventListener("click", function () {
        currentIndex = 3; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });

    // 자동으로 슬라이드 변경
    setInterval(changeBackgroundImage, 5000); // 밀리초마다(1초 = 1000밀리초) 자동 변경

    // 초기 이미지 설정
    sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;

});