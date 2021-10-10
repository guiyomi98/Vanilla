'use strict';

/**
 * @constant
 */
/* SELECTOR */
const $loginForm = document.getElementById('formLogin'),
      $userName = $loginForm.querySelector('input'),
      $loginBtn = $loginForm.querySelector('button');
const $userGreet = document.querySelector('#greeting');
const $pageLogin = document.getElementById('pgLogin'),
      $pageIndex = document.getElementById('pgIndex');
const $time =      document.getElementById('time');
/* CSS CLASSNAME */
const HIDE_CN = 'hide';
/* KEY DATA */
const USERNAME_KEY = 'username';

/**
 * @Function
 */
function onSubmit(e) {
  e.preventDefault();
  const userName = $userName.value;
  paintGreet(userName)
  localStorage.setItem(USERNAME_KEY, userName)
}

function paintGreet(target) {
  $userGreet.innerHTML = target;
  $pageIndex.ariaHidden = 'false';
  $pageLogin.ariaHidden = 'true';
}

function login() {
  const saveUsername = localStorage.getItem(USERNAME_KEY);

  if (saveUsername === null) {
    $loginForm.addEventListener('submit', onSubmit)
  } else {
    paintGreet(saveUsername)
    console.log(`hello, ${saveUsername}`)
  }
}

// clock
function clock() {
  const date = new Date();

  const hours   = String(date.getHours()).padStart(2, "0"),
        minutes = String(date.getMinutes()).padStart(2, "0"),
        seconds = String(date.getSeconds()).padStart(2, "0");
  
  $time.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// todo list
const $todoForm = document.getElementById('formTodo'),
      $todoInput = $todoForm.querySelector('input');
const $todoList = document.getElementById('listTodo');
const TODO_KEY = 'todos';
let todos = [];

function paintTodo(newTodo) {
  const item = document.createElement('li')
  const text = document.createElement('span')
  const button = document.createElement('button')
  item.id = newTodo.id
  button.innerText = 'cancle';
  // button.classList.add('btn')
  item.appendChild(text);
  item.appendChild(button);
  text.innerText = newTodo.text;
  $todoList.appendChild(item)
  button.addEventListener('click', delTodo)
}

function todoSubmit(e) {
  e.preventDefault();
  const newTodo = $todoInput.value;
  $todoInput.value = '';
  const objNewTodo = {
    text: newTodo,
    id: Date.now(),
  }
  todos.push(objNewTodo)
  paintTodo(objNewTodo)
  savTodo()
}

function savTodo() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos))
}

function delTodo(e) {
  const target = e.target.parentElement
  target.remove()
  todos = todos.filter((todo) => todo.id !== parseInt(target.id))
  savTodo()
}

function todo() {
  $todoForm.addEventListener('submit', todoSubmit)

  const savedTodos = localStorage.getItem(TODO_KEY);

  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos)
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo)
  }
}


// test
// let pressed = false;

$userName.addEventListener('keydown', e => {
  $loginBtn.disabled = false;
  console.log('test')
});

/**
 * @Inits : 초기실행
 */
/* SETTING */
function setInit() {
  login()
  clock()
  setInterval(clock, 1000);
  todo()
}
/* READY */
document.addEventListener("DOMContentLoaded", () => {
  setInit()
});