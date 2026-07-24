document.addEventListener('DOMContentLoaded', function(){

    // 변수
    const iptId = document.getElementById("ipt-id");
    const iptPw = document.getElementById("ipt-pw");
    const cnfPw = document.getElementById("cnf-pw");
    const btnSubmit = document.getElementById("btn-submit");

    // 변수2 : header.jsp에서 정의된 홈페이지 경로 가져오기
    const pathHome = window.contextPath;

    // 함수 : 가입버튼 상태 체크
    function stateSubmitButton(){
        const isValidId = iptId.value.length >= 5 && iptId.value.length <= 25 && !iptId.dataset.duplicate;
        const isValidPw = iptPw.value.length >= 5 && iptPw.value.length <= 25;
        const isValidCnf = cnfPw.value != "" && cnfPw.value === iptPw.value;

        btnSubmit.disabled = !(isValidId && isValidPw && isValidCnf);
    }

    // 함수 : 아이디 체크 - 에러 메세지
    const checkId = () => {
        const idError = document.getElementById("id-error");

        // 1. 아이디 길이 체크
        if (iptId.value.length < 5 || iptId.value.length > 25){
            idError.innerText = "문자 5~25 글자 이내";
            idError.className = "error-msg";
            iptId.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        } 

        // 2. 아이디 중복 체크
        // 서버에 요청 - CheckIdServlet.java 실행
        fetch(`${pathHome}/users/checkId?id=${iptId.value}`)
            // 서버가 응답한 JSON문자열을 JavaScript객체로 변환한다
            .then(res => res.json())
            // (그리고) 그 결과(data)를 받아서 아래 코드를 실행한다
            .then(data => {             
                if (data.isDuplicate){
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    iptId.dataset.duplicate = "true";
                } else {
                    idError.innerText = "사용가능한 아이디";
                    idError.className = "success-msg";
                    delete idInput.dataset.duplicate;
                }
                stateSubmitButton();
            })
            .catch(err => {
                console.error("서버 통신 에러:", err);
            });

    }

    // 함수 : 비밀번호 체크 - 에러 메세지

    // 함수 : 비밀번호 확인 체크

    // 이벤트 정의

    // 문서 시작시 즉시 함수 호출

})