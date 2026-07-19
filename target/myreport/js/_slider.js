document.addEventListener("DOMContentLoaded", function () {
    const sliderImage = document.getElementById("slider-image");
    const images = ["/img/slider1.jpg", "/img/slider2.jpg", "/img/slider3.jpg"]; // 변경할 이미지 목록
    const dottedBtns = ["dotted-btn1", "dotted-btn2", "dotted-btn3"];
    let currentIndex = 0;


    // 이미지를 변경하는 함수
    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % images.length; // 0 -> 1 -> 2 -> ... -> (images.length) - 1 -> 0 -> 1 -> ... 이렇게 반복된다
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    }


    // 버튼을 클릭하면 이미지를 변경하는 함수
    // 첫번째 'O' 버튼 클릭 시
    document.getElementById(dottedBtns[0]).addEventListener("click", function () {
        currentIndex = 0; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });
    // 두번째 'O' 버튼 클릭 시
    document.getElementById(dottedBtns[1]).addEventListener("click", function () {
        currentIndex = 1; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });
    // 세번째 'O' 버튼 클릭 시
    document.getElementById(dottedBtns[2]).addEventListener("click", function () {
        currentIndex = 2; // 다음 이미지로 변경
        sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
    });

    
    // 자동으로 슬라이드 변경
    setInterval(changeBackgroundImage, 7000); // 7초마다 자동 변경

    // 초기 이미지 설정
    sliderImage.style.backgroundImage = `url(${images[currentIndex]})`;
});