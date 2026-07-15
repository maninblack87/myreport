document.addEventListener('DOMContentLoaded', function(){

    const idInput = document.getElementById('ipt-id');
    const pwInput = document.getElementById('ipt-pw');
    const cnfPwInput = document.getElementById('cnf-pw');
    const submit = document.getElementById('btn-submit');

    const path = window.contextPath;

    function stateSubmitButton(){
        const isIdValid = idInput.value.length >= 5 && idInput.value.length <= 25 && !idInput
    }

})