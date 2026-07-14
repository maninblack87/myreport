// join.js
document.addEventListener('DOMContentLoaded', function(){
    
    // 변수 : 회원가입 페이지에서 필요한 요소들 가져오기
    const idInput = document.getElementById('ipt-id');
    const pwInput = document.getElementById('ipt-pw');
    const cnfPwInput = document.getElementById('cnf-pw');
    const submitBtn = document.getElementById('btn-submit');

    // 변수 : header.jsp에서 정의되어 있는 홈페이지 경로 가져오기
    const path = window.contextPath;


    // 가입 버튼 상태 활성화/비활성화 함수
    function updateSubmitButton() {
        // 1. 아이디: 5~25자 사이 && 중복 딱지(dataset)가 없어야 함
        const isIdValid = idInput.value.length >= 5 && idInput.value.length <= 25 && !idInput.dataset.duplicate;
        // 2. 비밀번호 : 2~25자 사이
        const isPwValid = pwInput.value.length >= 2 && pwInput.value.length <= 25;
        // 3. 비밀번호 확인 : 비어있지 않음 && 비밀번호와 값이 같음
        const isCnfValid = cnfPwInput.value != "" && pwInput.value === cnfPwInput.value;

        // 1~3이 true가 되면 disabled가 false가 된다. 즉 disabled가 풀린다는 뜻이다.
        submitBtn.disabled = !(isIdValid && isPwValid && isCnfValid);
    }


    // [아이디 체크] 해당 커서가 나갈 때마다 실행된다
    const checkDuplicateId = () => {
        const idError = document.getElementById('id-error');
        const idInputval = idInput.value;

        // 1. 아이디 길이 체크
        if (idInputval.length < 5 || idInputval.length > 25){
            idError.innerText = "문자 5~25자 제한";
            idError.className = "error-msg";
            idInput.dataset.duplicate = "true"; // 중복 여부와 상관이 없는 체크이지만, 보안을 위해 '부적격' 딱지를 부여한다
            updateSubmitButton();
            return; // ★ 여기서 종료! (즉, 아이디 길이 체크가 통과해야 아이디 중복 여부를 체크한다는 뜻임.)
        }

        // 2. 아이디 중복 체크
        fetch(`${path}/users/checkId?id=${idInputval}`)
            .then(res => res.json())    // 반환한 Map을 JSON으로 변환시킨다   *res는 컨트롤러에 의해 반환된 결과(봉투)
            .then(data => {
                // [참고] data는 { "isDuplicate": true/false } 의 형태임!

                // 아이디가 중복되었다면..
                if (data.isDuplicate) {
                    idError.innerText = "아이디 중복";
                    idError.className = "error-msg";
                    idInput.dataset.duplicate = "true";
                // 아이디가 사용가능 하다면..
                } else {
                    idError.innerText = "사용가능한 아이디";
                    idError.className = "success-msg";
                    delete idInput.dataset.duplicate;       // ★ 중복 딱지 떼기!
                }
                updateSubmitButton();
            })
            .catch(err => {
                console.error("서버 통신 에러:", err);
            });
    };


    // [비밀번호 실시간 체크]
    const checkPasswordLength = () => {
        const pwError = document.getElementById("pw-error");

        if (pwInput.value.length < 2 || pwInput.value.length > 25){
            pwError.innerText = "문자 2~25자 제한";
            pwError.className = "error-msg";
        } else {
            pwError.innerText = "사용가능한 비밀번호";
            pwError.className = "success-msg";
        }
        updateSubmitButton();
    };
        

    // [비밀번호 일치 확인]
    const checkMatch = () => {
        const cnfError = document.getElementById("cnf-pw-error");

        if (pwInput.value !== cnfPwInput.value) {
            cnfError.innerText = "비밀번호 불일치";
            cnfError.className = "error-msg";
        } else {
            cnfError.innerText = "비밀번호 일치";
            cnfError.className = "success-msg";
        }
        updateSubmitButton();
    };


    // 이벤트 초기화 (직접 연결)
    pwInput.addEventListener('input', checkPasswordLength);
    pwInput.addEventListener('input', checkMatch);
    cnfPwInput.addEventListener('input', checkMatch);
    idInput.addEventListener('blur', checkDuplicateId);

    // 초기 버튼 상태 체크
    updateSubmitButton();

});