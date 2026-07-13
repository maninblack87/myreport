// join_validator.js
document.addEventListener('DOMContentLoaded', function(){

    const idInput = document.getElementById('ipt-id');
    const pwInput = document.getElementById('ipt-pw');
    const cnfPwInput = document.getElementById('cnf-pw');
    const submitBtn = document.getElementById('btn-submit');

    const path = window.contextPath;

    // 함수 : 가입 버튼 상태 활성화/비활성화
    function stateSubmitButton(){
        const isIdValid = idInput.value.length >= 5 && idInput.valu.length <= 25 && !idInput.dataset.duplicate;
        const isPwValid = pwInput.value.length >= 5 && pwInput.value.length <= 25;
        const isCnfValid = cnfPwInput.value != "" && pwInput.value === cnfPwInput.value;

        submitBtn.disabled = !(isIdValid && isPwValid && isCnfValid);
    }

    // 아이디 중복 체크
    const checkDuplicateId = () => {
        const idError = document.getElementById('id-error');
        const idInputVal = idInput.value;

        if (idInputVal.length < 5 || idInputVal.length > 25){
            idError.innerText = "문자 5~25 글자 제한";
            idError.className = "error-msg";
            idInput.dataset.duplicate = "true";
            stateSubmitButton();
            return;
        }

        fetch(`${path}/users/checkId?id=${idInputVal}`)
            .then(res => res.json())
            .then(data => {
                if (data.isDuplicate) {
                    isError.innerText = "사용가능한 아이디"
                }
            })

    }

})