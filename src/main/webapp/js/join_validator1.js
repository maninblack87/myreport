document.addEventListener('DOMContentLoaded', function(){

    // 변수
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

})