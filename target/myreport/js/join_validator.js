// join_validator.js
document.addEventListener('DOMContentLoaded', function(){

    // 변수 : 회원가입 페이지에서 필요한 요소들 가져오기
    const idInput = document.getElementById('ipt-id');
    const pwInput = document.getElementById('ipt-pw');
    const cnfPwInput = document.getElementById('cnf-pw');
    const submitBtn = document.getElementById('btn-submit');

    // 변수 : header.jsp에서 정의되어 있는 홈페이지 경로 가져오기
    const path = window.contextPath;

    // [함수] 가입 버튼 상태 활성화/비활성화
    function stateSubmitButton(){
        const isIdValid = idInput.value.length >= 5 && idInput.value.length <= 25 && !idInput.dataset.duplicate;
        const isPwValid = pwInput.value.length >= 5 && pwInput.value.length <= 25;
        const isCnfValid = cnfPwInput.value != "" && pwInput.value === cnfPwInput.value;

        submitBtn.disabled = !(isIdValid &&  isPwValid && isCnfValid);
    }

    // [함수] 아이디 체크
    const checkDuplicateId = () => {
        const idError = document.getElementById('id-error');
        const idInputVal = idInput.value;

        // 1. 아이디 길이 체크
        if (idInputVal.length < 5 || idInputVal.length > 25){
            idError.innerText = "문자 5~25 글자 제한";
            idError.className = "error-msg";
            idInput.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        }

        // 2. 아이디 중복 체크
        fetch(`${path}/users/checkId?id=${idInputVal}`)
            .then(res => res.json())
            .then(data => {

                // 아이디가 중복되었다면
                if (data.isDuplicate) {
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    idInput.dataset.duplicate = "true";
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

    };

    // [함수] 비밀번호 실시간 체크
    const checkPasswordLength = () => {
        const pwError = document.getElementById("pw-error");

        if (pwInput.value.length < 5 || pwInput.value.length > 25){
            pwError.innerText = "문자 5~25자 제한";
            pwError.className = "error-msg";
        } else {
            pwError.innerText = "사용가능한 비밀번호";
            pwError.className = "success-msg";
        }
        stateSubmitButton();
    };

    // [함수] 비밀번호 일치 확인
    const checkMatch = () => {
        const cnfError = document.getElementById("cnf-pw-error");

        if (pwInput.value != cnfPwInput.value){
            cnfError.innerText = "비밀번호 불일치";
            cnfError.className = "error-msg";
        } else {
            cnfError.innerText = "비밀번호 일치"
            cnfError.className = "success-msg";
        }
        stateSubmitButton();
    };


    // 이벤트 초기화 (직접 연결)
    idInput.addEventListener('blur', checkDuplicateId);
    pwInput.addEventListener('input', checkPasswordLength);
    pwInput.addEventListener('input', checkMatch);
    cnfPwInput.addEventListener('input', checkMatch);

    // 초기 버튼 상태 체크
    stateSubmitButton();

})