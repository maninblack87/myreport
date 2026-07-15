// join_validator.js
document.addEventListener('DOMContentLoaded', function(){

    // 변수 : 입력창-id, pw, cnf-pw, 버튼-submit
    const inputId = document.getElementById('ipt-id');
    const inputPw = document.getElementById('ipt-pw');
    const inputCnf = document.getElementById('cnf-pw');
    const btnSubmit = document.getElementById('btn-submit');

    // 변수 : 홈페이지 경로
    const pathHome = window.contextPath;


    // [함수] 가입 버튼 상태 활성화/비활성화
    function stateSubmitButton() {
        // 1. 아이디: 5~25 글자, 중복 딱지(dataset)가 없어야 함
        const isIdValid = inputId.value.length >= 5 && inputId.value.length <= 25 && !inputId.dataset.duplicate;
        // 2. 비밀번호: 5~25 글자
        const isPwValid = inputPw.value.length >= 5 && inputPw.value.length <= 25;
        // 3. 비밀번호 확인: 비어있지 않음 & 비밀번호와 값이 같음
        const isCnfPwValid = inputCnf.value != "" && inputPw.value === inputCnf.value;

        // 1~3이 true가 되면 disabled가 false가 된다
        btnSubmit.disabled = !(isIdValid && isPwValid && isCnfPwValid);
    };


    // [함수] 아이디 실시간 체크
    const checkId = () => {
        const idError = document.getElementById('id-error');
        const idInputVal = idInput.value;

        // 1. 아이디 길이 체크
        if (idInputVal.length < 5 || idInputVal.length > 25) {
            idError.innerText = "문자 5~25 글자 제한";
            idError.className = "error-msg";
            inputId.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        }

        // 2. 아이디 중복 체크
        fetch(`${pathHome}/users/checkId?id=${idInputVal}`)
            .then(res => res.json())
            .then(data => {
                if (data.isDuplicate) {
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    inputId.dataset.duplicate = "true";
                } else {
                    idError.innerText = "사용가능한 아이디";
                    idError.className = "success-msg";
                    delete inputId.dataset.duplicate;
                }
                stateSubmitButton();
            })
            .catch(err => {
                console.error("서버 통신 에러:", err);
            });

    };


    // [함수] 비밀번호 실시간 체크
    const checkPassword = () => {
        const pwError = document.getElementById("pw-error");

        // 1. 비밀번호 길이 체크
        if (inputPw.value.length < 5 || inputPw.value.length > 25) {
            pwError.innerText = "문자 5~25 글자 제한";
            pwError.className = "error-msg";
        } else {
            pwError.innerText = "사용가능한 비밀번호";
            pwError.className = "success-msg";
        }

        // 2. 함수 호출
        stateSubmitButton();

    };


    // [함수] 비밀번호 일치 확인
    const checkMatch = () => {
        const cnfError = document.getElementById("cnf-pw-error");

        // 1. 비밀번호 일치 여부 체크
        if (inputPw.value.length < 5 || inputCnf.value.length > 25) {
            cnfError.innerText = "비밀번호 불일치";
            cnfError.className = "error-msg";
        } else {
            cnfError.innerText = "비밀번호 일치";
            cnfError.className = "success-msg";
        }

        // 2. 함수 호출
        stateSubmitButton();

    };


    // 이벤트 초기화
    inputId.addEventListener('blur', checkId);
    inputPw.addEventListener('input', checkPassword);
    inputPw.addEventListener('input', checkMatch);
    inputCnf.addEventListener('input', checkMatch);

    // 함수 호출
    stateSubmitButton();

})