// join_validator1.js

document.addEventListener('DOMContentLoaded', function(){

    // 변수 : 회원가입 페이지에서 필요한 요소들 가져오기
    const inputId = document.getElementById('ipt-id');
    const inputPw = document.getElementById('ipt-pw');
    const inputCnf = document.getElementById('cnf-pw');
    const btnSubmit = document.getElementById('btn-submit');

    // 변수 : header.jsp에서 정의되어 있는 홈페이지 경로 가져오기
    const pathHome = window.contextPath;


    // [함수] 가입 버튼 상태 활성화/비활성화
    function stateSubmitButton() {
        // 1. 아이디: 5~25 글자 and "중복 딱지(dataset)"가 없어야 됨
        const isIdValid = inputId.value.length >= 5 && inputId.value.length <= 25 && !inputId.dataset.duplicate;
        // 2. 비밀번호: 5~25 글자
        const isPwValid = inputPw.value.length >= 5 && inputPw.value.length <= 25;
        // 3. 비밀번호 확인: 비어있지 않음 and 비밀번호와 값이 같음
        const isCnfValid = inputCnf.value != "" && inputPw.value === inputCnf.value;

        // 1-2-3이 true가 되면 disabled가 false가 된다.
        btnSubmit.disabled = !(isIdValid && isPwValid && isCnfValid);
    }


    // [함수] 해당 커서가 나갈 때마다 실행된다
    const checkDuplicateId = () => {
        const idError = document.getElementById('id-error');
        const inputIdVal = inputId.value;

        // 1. 아이디 길이 체크
        if (inputIdVal.length < 5 || inputIdVal.length > 25){
            idError.innerText = "문자 5~25 글자 제한";
            idError.className = "error-msg";
            inputId.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        }

        // 2. 아이디 중복 체크
        fetch(`${pathHome}/users/checkId?id=${inputIdVal}`)
            .then(res => res.json())
            .then(data => {
                // 아이디가 중복인 경우
                if (data.isDuplicate) {
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    inputId.dataset.duplicate = "true";
                // 아이디가 중복이 아닐 경우
                } else {
                    idError.innerText = "사용가능한 아이디";
                    idError.className = "success-msg";
                    delete idInput.dataset.duplicate;
                }
                // 함수 호출 : 버튼 상태 활성화/비활성화
                stateSubmitButton();
            })
            .catch(err => {
                console.error("서버 통신 에러:", err);
            });
    };

    // [함수] 비밀번호 실시간 체크
    const checkPasswordLength = () => {
        const pwError = document.getElementById("pw-error");

        // 1. 비밀번호 길이 체크
        if (inputPw.value.length < 2 || inputPw.value.length > 25){
            pwError.innerText = "문자 5~25 글자 제한";
            pwError.className = "error-msg";
        } else {
            pwError.innerText = "사용가능한 비밀번호";
            pwError.className = "success-msg";
        }
        stateSubmitButton();
    };

    // [함수] 비밀번호 일치 여부 체크
    const checkMatch = () => {
        const cnfError = document.getElementById("cnf-pw-error");

        if (inputPw.value !== inputCnf.value) {
            cnfError.innerText = "비밀번호 불일치";
            cnfError.className = "error-msg";
        } else {
            cnfError.innerText = "비밀번호 일치"
            cnfError.className = "sucess-msg";
        }

        stateSubmitButton();
    };

    // 이벤트 초기화 (직접 연결)
    inputId.addEventListener('blur', checkDuplicateId);
    inputPw.addEventListener('input', checkPasswordLength);
    inputPw.addEventListener('input', checkMatch);
    inputCnf.addEventListener('input', checkMatch);

    // 초기 버튼 상태 체크
    stateSubmitButton();

})