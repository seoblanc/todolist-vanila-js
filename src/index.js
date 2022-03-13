/**
 * todo list 만들기
 * javascript
 * 1. input 박스로 입력한다. 내용이 있는 경우만 입력가능하게 한다.
 * 2. 만들어진 일정은 완료, 삭제가 가능하다.
 * 3. drag&drop으로 순서도 바꿀 수 있다.
 * 4. 일정 내용 수정이 가능하다.(완료된 아이템 제외)
 * 5. 리스트를 메모리로 관리한다. localstorage?
 * 6. 스타일을 입힌다.
 */

const input = document.querySelector('#input');
const button = document.querySelector('#button');
const list = document.querySelector('#list');

input.addEventListener('keyup', onKeyUp);
button.addEventListener('click', addItem);

function init() {
  input.value = '';
  setBtnStyle();
}

function setBtnStyle() {
  if (validate()) {
    button.classList.remove('btn-secondary')
    button.classList.add('btn-primary')
    button.removeAttribute('disabled')
  } else {
    button.classList.remove('btn-primary')
    button.classList.add('btn-secondary')
    button.setAttribute('disabled', true)
  }
}

function onKeyUp(e) {
  setBtnStyle();
  if (e.keyCode === 13) addItem();
}
function addItem() {
  if (button.getAttribute('disabled')) {
    return;
  }
  const item = document.createElement('li');
  const text = document.createElement('span');
  item.className="list-group-item row";
  item.setAttribute('id', generateIndex());
  text.innerHTML = input.value;
  text.className="col-sm-9 align-middle text-item"
  item.appendChild(text)
  item.appendChild(renderButtons())
  list.appendChild(item);
  init();
}

function renderButtons() {
  const btnGroupWrap = document.createElement('div');
  btnGroupWrap.className="btn-group col-sm-3 float-end"
  btnGroupWrap.appendChild(renderCompleteButton())
  btnGroupWrap.appendChild(renderRemoveButton())
  return btnGroupWrap;
}

function completeItem(e) {
  const textElement = e.currentTarget.parentElement.parentElement.querySelector('span');
  textElement.classList.add('text-decoration-line-through');
  e.currentTarget.parentElement.removeChild(e.currentTarget);
}
function renderCompleteButton() {
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '완료';
  completeBtn.setAttribute('type', 'button');
  completeBtn.className = "btn btn-outline-primary";
  completeBtn.addEventListener('click', completeItem);
  return completeBtn;
}
function removeItem(e) {
  list.removeChild(e.currentTarget.parentElement.parentElement);
}
function renderRemoveButton() {
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '삭제';
  removeBtn.setAttribute('type', 'button');
  removeBtn.className = "btn btn-outline-danger";
  removeBtn.addEventListener('click', removeItem);
  return removeBtn;
}

// utils
function validate() {
  return !!input.value;
}
function generateIndex() {
  return list.childElementCount + 1
}

init();
