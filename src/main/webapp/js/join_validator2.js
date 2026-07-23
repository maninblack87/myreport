document.addEventListener('DOMContentLoaded', function(){
    const idInput = document.getElementById('ipt-id');
    const pwInput = document.getElementById('ipt-pw');
    const cnfPwInput = document.getElementById('cnf-pw');
    const submitBtn = document.getElementById('btn-submit');

    const path = window.contextPath;


    function stateSubmitButton(){
        const isIdValid = idInput.value.length >= 5 && idInput.value.length <= 25 && !idInput.dataset.duplicate;
        const isPwValid = pwInput.value.length >= 5 && pwInput.value.length <= 25;
        const isCnfValid = cnfPwInput.value != "" && pwInput.value === cnfPwInput.value;

        submitBtn.disabled = !(isIdValid && isPwValid && isCnfValid);
    }

    const checkDuplicateId = () => {
        const idError = document.getElementById('id-error');
        
        // 1. 아이디 길이 체크
        if (idInput.value.length < 5 || idInput.value.length > 25){
            idError.innerText = "문자 5~25 글자 제한";
            idError.className = "error-msg";
            idInput.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        }

        // 2. 아이디 중복 체크
        fetch(`${path}/users/checkId?id=${idInput.value}`)
            .then(res => res.json())
            .then(data => {
                if(data.isDuplicate){
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    idInput.dataset.dupblicate = "true";
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

    const checkPasswordLength = () => {
        const pwError = document.getElementById("pw-error");

        if (pwInput.value.length < 5 || pwInput.value.length > 25){
            pwError.innerText = "문자 5~25 글자 제한";
            pwError.className = "error-msg";
        } else {
            pwError.innerText = "사용가능한 비밀번호";
            pwError.className = "success-msg";
        }
        stateSubmitButton();
    };

    const checkMatch = () => {
        const cnfError = document.getElementById("cnf-pw-error");

        if (pwInput.value != cnfPwInput.value){
            cnfError.innerText = "비밀번호 불일치";
            cnfError.className = "error-msg";
        } else {
            cnfError.innerText = "비밀번호 일치";
            cnfError.className = "success-msg";
        }
        stateSubmitButton();
    };

    idInput.addEventListener('blur', checkDuplicateId);
    pwInput.addEventListener('input', checkPasswordLength);
    pwInput.addEventListener('input', checkMatch);
    cnfPwInput.addEventListener('input', checkMatch);

    stateSubmitButton();

})