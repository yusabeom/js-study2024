



// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 계산 이력을 모아 둘 배열
const logEntries = [];

let seq = 0; //로그 번호

// 입력창에 입력한 숫자를 읽는 함수.
const getUserNumberInput = () => parseInt($userInput.value);

// 계산 기능을 담당하는 함수
const calculate = type => {
    const originalResult = currentResult;
    const enteredNumber = getUserNumberInput();

    if(!enteredNumber && enteredNumber !== 0){
        alert('문제발생');
        return;
    }

    let mark;
    if(type === 'ADD') {
        mark = '+';
        currentResult += enteredNumber;
    } else if(type === 'SUB'){
        mark = '-';
        currentResult -= enteredNumber;
    } else if(type === "MULTI") {
        mark = '*';
        currentResult *= enteredNumber;
    } else {
        if(enteredNumber === 0){
            alert('0으로 나눌 수 없습니다.');
            return;
        }
        mark = "/";
        currentResult /= enteredNumber;
    }

    //연산식과 결과값을 두번째 section에 렌더링
    $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enteredNumber}`
    $currentResultOutput.textContent = currentResult;

    //로그 이력 쌓기
    writeToLog(mark, originalResult, enteredNumber, currentResult);

}
// 로그 이력을 만드는 함수
    const writeToLog = (operation, prevResult, number, result) => {
        //하나의 로그 객체(연산타입, 이전결과, 연산숫자, 연산결과)
        const logObject = {
            operation,
            prevResult,
            number,
            result
        };
        logEntries.push(logObject);
        console.log(logEntries);
        //화면에 로그를 li로 렌더링하는 함수 호출
        renderToLog(logObject);
    }
    //로그 이력을 화면에 렌더링 하는 함수
    const renderToLog = ({operation: mark, prevResult, number, result}) => {
    //li 생성
    const $newLi = document.createElement('li');
    $newLi.classList.add('log-entries-item');
    $newLi.textContent = `#${++seq}. ${prevResult} ${mark} ${number} = ${result}`;
    
    $logEntries.appendChild($newLi);
    };

// 더하기 버튼 이벤트 핸들러
const addHandler = () => {
    //계산 전 값을 기억
    // const originalResult = currentResult;
    // //입력창에 입력한 숫자를 읽자.
    // const enteredNumber = getUserNumberInput(); //숫자로 변환 인풋은 초기값 문자
   calculate('ADD')

    // $currentCalculationOutput.textContent = `${originalResult} + ${enteredNumber}`
    // $currentResultOutput.textContent = currentResult;

    // li 생성
    // const $newLi = document.createElement('li');
    // $newLi.classList.add('log-entries-item');
    // $newLi.textContent = `#${++seq}. ${originalResult} ${mark} ${enteredNumber} = ${currentResult}`;
    // $logEntries.appendChild($newLi);
}
const substractHandler = () => {
    calculate('SUB')
}
const multiplyHandler = () => {
    calculate('MULTI')
}
const divideHandler = () => {
    calculate('DIVIDE')
}





//================이벤트 핸들러 바인딩 ===================//
$addBtn.addEventListener('click', addHandler);
$substractBtn.addEventListener('click', substractHandler);
$multiplyBtn.addEventListener('click', multiplyHandler);
$divideBtn.addEventListener('click', divideHandler);



















