// 일정 데이터가 들어 있는 배열 선언
const todos = [{
    id: 1,
    text: '할 일 1',
    done: false // checkbox를 클릭해서 할 일을 마쳤는지의 여부
},
{
    id: 2,
    text: '할 일 2',
    done: false // checkbox를 클릭해서 할 일을 마쳤는지의 여부
},
{
    id: 3,
    text: '할 일 3',
    done: false // checkbox를 클릭해서 할 일을 마쳤는지의 여부
},
];

// 화면에 표현할 li.todo-list-item
const $todoList = document.querySelector('.todo-list');

function makeNewTodoNode(newTodo) {
//    const $li = document.createElement('li');
//    const $label = document.createElement('label');
//    const $divMod =document.createElement('div')
//    const $divRev =document.createElement('div')

//    // label 태그작업
//    $label.classList.add('checkbox');
//    const $check = document.createElement('input')





const $newLi = document.createElement('li')
const $label = document.createElement('label');
const $input = document.createElement('input');
const $span = document.createElement('span');
$span.classList.add('text')
$input.type = 'checkbox';
$span.textContent = newTodo.text;
$label.appendChild($input);
$label.appendChild($span);
$label.classList.add('checkbox');
$newLi.appendChild($label);
const $div1 = document.createElement('div');
const $span1 = document.createElement('span');
$span1.classList.add('lnr', 'lnr-undo');
$div1.appendChild($span1);
$div1.classList.add('modify');
$newLi.appendChild($div1);
const $div2 = document.createElement('div');
const $span2 = document.createElement('span');
$span2.classList.add('lnr', 'lnr-cross-circle');
$div2.appendChild($span2);
$div2.classList.add('remove');
$newLi.appendChild($div2);

$newLi.setAttribute('data-id', `${newTodo.id}`)
$newLi.classList.add('todo-list-item');

$todoList.appendChild($newLi);

}
// 추가될 할일 객체의 id생성해주는 함수정의
function makeNewId() {
if (todos.length > 0) {
    // 배열 내의 할일 객체 중 마지막 객체의 id보다 하나 크게
    return todos[todos.length - 1].id + 1;
} else {
    return 1;
}
}


// 할 일 추가 처리 함수 정의
function insertTodoData() {
// 사용자가 작성할 할 일 input 요소 얻기
const $todoText = document.getElementById('todo-text');
// const newTodo = {
//     id: `${todos.length+1}`,
//     text: `${$todoText.value} ${todos.length + 1}`,
//     done: false
// }

// 1. 입력값이 없다면 추가 처리하지 않겠습니다.
// 공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교.
// 공백 제거 함수: trim() === '';
// 입력값이 공백이다? -> background: orangered, placeholder: 필수 입력사항입니다!, 이벤트 강제 종료
if ($todoText.value.trim() === '') {
    $todoText.style.background = 'orangered';
    $todoText.value = '';
    $todoText.setAttribute('placeholder', '필수 입력사항입니다!');
    return;
} else {
    //제대로 입력이 되었다면 속성과 디자인을 초기화
    $todoText.setAttribute('placeholder', '할 일을 입력하세요');
    $todoText.style.background = '';
}


// if($todoText.value === ''){
//     $todoText.style.background = 'orangered';
//     $todoText.value = '';
//     $todoText.setAttribute('placeholder','필수 입력사항입니다!');
//     return;
// }
// 2.todos 배열에 객체를 생성한 후 추가 (id 추가 순서대로 잘 진행하세요.)
const newTodo = {
    id: makeNewId(),
    text: $todoText.value,
    done: false
}
todos.push(newTodo);
console.log(todos);
// 3. 추가된 데이터를 화면에 표현(li 태그를 추가)
makeNewTodoNode(newTodo)

// 4. 입력 완료 후 input에 존재하는 문자열을 제거.
$todoText.value = '';
}

// data-id 값으로 배열을 탐색하여 일치하는 객체가 들어있는 인덱스 반환
function findIndexByDataId(dataId) {
for (let i = 0; i < todos.length; i++) {
    if (dataId === todos[i].id) {
        return i;
    }
}
}


// 할 일 완료 처리 수행할 함수 정의
function changeCheckState($label) {
/*
할 일 완료된 노드의 클래스 이름을 추가(디자인위해서)
*/
//껏다 켯다
$label.lastElementChild.classList.toggle('checked');

//전역 변수로 선언한 배열 안의 객체의 done 값을 수정해야 합니다.
//data-id를 얻어서 그와 일치하는 객체의 done값을 true로 바꿔야 합니다.
//기존값이 트루였다면 false로 바뀌는거임
const dataId = +$label.parentNode.dataset.id;
const index = findIndexByDataId(dataId);

todos[index].done = !todos[index].done;
console.log(todos);
// changeDone();

}
// function changeDone() {


// }
//할 일 삭제처리함수 정의
function removeTodoData($delTarget) {

// 애니메이션 적용을 위해 클래스 이름을 추가 (delMoving)
$delTarget.classList.add('delMoving');

// ul > il를 removeChild로 제거하기 전에 애니메이션 발동 및
// 배열 내부 객체 삭제가 진행 될 수 있도록 시간을 일부러 지연.
// 시간 지연은 1.5초 진행해주세요. (시간을 지연하는 함수)
setTimeout(() => {
    $todoList.removeChild($delTarget);
}, 1000);
//배열 내에 있는 객체도 삭제를 진행.
// 삭제되는 객체가 배열 안에 몇번째인지를 확인 ->  할 일 완료처리 쪽에 비슷한 로직이 있음
//함수화 시켜보자(콜백함수)
const dataId = +$delTarget.dataset.id;
const index = findIndexByDataId(dataId);
todos.splice(index, 1);
console.log(todos);
}


// 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan) {
const $modify = document.querySelector('ul li .modify');

// 수정 모드 진입 버튼을 교체 lnr-undo -> lnr-checkmark-circle
$modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');
// span.text를 input태그로 교체(replaceChild)
// input 태그에는 .modify-input을 추가하시고, input에는 기존의 할 일 텍스트가 미리 작성되어 있어야 합니다.
const $label = $modSpan.parentNode.previousElementSibling;
const $textSpan = $label.lastElementChild;

const $modInput = document.createElement('input');
$modInput.classList.add('modify-input');
$modInput.setAttribute('value',$textSpan.textContent);

$label.replaceChild($modInput, $textSpan); 

}
// 수정 완료 이벤트 처리 함수
function modifyTodoData($modCompleteSpan){

//버튼을 원래대로 돌립니다.
$modCompleteSpan.classList.replace('lnr-checkmark-circle','lnr-undo');
//input을 다시 span.text로 변경
const $label = $modCompleteSpan.parentNode.previousElementSibling;
const $modInput = $label.lastElementChild;

const $textSpan = document.createElement('span');
$textSpan.textContent = $modInput.value;
$textSpan.classList.add('text');

$label.replaceChild($textSpan, $modInput);
// 배열 내의 객체를 찾아서 그 text 프로퍼티 값을 수정된 값으로 변경
const dataId = +$label.parentNode.dataset.id;
const i = findIndexByDataId(dataId);
todos[i].text = $modInput.value;
console.log(todos);

}


// 메인 역할을 하는 즉시 실행 함수.
(function () {

// 할 일 추가 이벤트 등록
const toDo = document.getElementById('todo-text');
const $addBtn = document.getElementById('add');
$addBtn.addEventListener('click', e => {
    //form태그 안의 button은 type을 명시하지 않으면 자동 submit이 동작합니다.
    e.preventDefault(); // 버튼의 고유기능을 중지

    insertTodoData();

});

// 할 일 완료(체크박스) 이벤트
$todoList.addEventListener('click', e => {
    if (!e.target.matches('input[type=checkbox')) {
        return;
    }

    changeCheckState(e.target.parentNode);
});


// 할 일 삭제 이벤트
$todoList.addEventListener('click', e => {
    if (!e.target.matches('.todo-list .remove span')) {
        return;
    }
    removeTodoData(e.target.parentNode.parentNode);
});

//할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
$todoList.addEventListener('click', e => {
    if (e.target.matches('.todo-list .modify span.lnr-undo')) {
        enterModifyMode(e.target);
    } else if(e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
        modifyTodoData(e.target); //수정모드에서 수정을 확정지으려는 이벤트
    } else {
        return;
    }
});

})();