//====== 전역 변수 ========
let todos = [];

// ====== DOM 요소 ========



// ===== 초기화 함수 ========
//웹이 시작될 때 실행되는 기본함수
//이벤트 등록과 화면 렌더링을 담당
function init(){
    bindEvents();
}

function bindEvents(){
    const addBtn = document.getElementById('todo-add-btn');
    addBtn.addEventListener('click', addTodo);
}

//=========== 데이터 조작 함수 =======================
//새로운 할일을 추가하는 함수
function addTodo(){
    const todoInput = document.getElementById('todo-input');

    const text = todoInput.value.trim();
    if(!text) return; //빈문자열이면 함수 종료
}


//========= load 이벤트 함수 ==================
// window.onload = function(){
//     init();
// }

//DOMContentLoaded -> HTML이 전부 로드되어 DOM트리가 완성되면 실행
document.addEventListener('DOMContentLoaded', init);