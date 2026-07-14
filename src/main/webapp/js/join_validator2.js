// join_validator.js
document.addEventListener('DOMContentLoaded', function(){

    // 변수 : 입력창-id, pw, cnf-pw, 버튼-submit
    const inputId = document.getElementById('ipt-id');
    const inputPw = document.getElementById('ipt-pw');
    const inputCnf = document.getElementById('cnf-pw');
    const btnSubmit = document.getElementById('btn-submit');

    // 변수 : 홈페이지 경로
    const path = window.contextPath;

    // [함수] 가입 버튼 상태 활성화/비활성화
    function stateSubmitButton() {
        // 1. 아이디: 5~25 글자, 중복 딱지(dataset)가 없어야 함
        const isIdValid = inputId.value.length >= 5 && inputId.value.length <= 25 && !inputId.dataset.duplicate;
        // 2. 비밀번호 : 5~25 글자
        const isPwValid = inputPw.value.length >= 5 && inputPw.value.length <= 25;
        // 3. 비밀번호 확인 : 비어있지 않음 & 비밀번호와 값이 같음
        const isCnfPwValid = cnfPwInput.value != "" && inputPw.value === inputCnf.value;

        // 1~3이 true가 되면 disabled가 false가 된다.
        btnSubmit.disabled = !(isIdValid && isPwValid && isCnfPwValid);
    };

    // [함수] 아이디 실시간 체크
    const checkIdValid = () => {
        // 1. 아이디 길이 체크
        // 2. 아이디 중복 체크
        // 3. 함수 호출 : 가입 버튼 상태 활성화/비활성화
    };

    // [함수] 비밀번호 실시간 체크
    const checkPasswordValid = () => {
        // 1. 비밀번호 길이 체크
        // 2. 함수 호출 : 가입 버튼 상태 활성화/비활성화
    }

    // [함수] 비밀번호 일치 확인
    const checkMatch = () => {
        // 1. 비밀번호 일치 여부 체크
        // 2. 함수 호출 : 가입 버튼 상태 활성화/비활성화
    }

    // 이벤트 초기화(직접 연결)

    // 함수 호출 : 초기 버튼 상태 체크

})