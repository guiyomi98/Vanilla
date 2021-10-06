'use strict';

/**
 * @Constant : 전역변수
 */
/* SELECTOR */
const $loginForm = document.getElementById('formLogin'),
      $userName = $loginForm.querySelector('input'),
      $loginBtn = $loginForm.querySelector('button');
const $userGreet = document.querySelector('#greeting');
const $pageLogin = document.getElementById('pgLogin'),
      $pageIndex = document.getElementById('pgIndex');
/* CSS CLASSNAME */
/* DATA */
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
// test
$userName.addEventListener('keydown', e => {
  $loginBtn.disabled = false;
  console.log('test')
});

// clock
const $time = document.getElementById('time')

function clock() {
  const date = new Date();

  const hours   = String(date.getHours()).padStart(2, "0"),
        minutes = String(date.getMinutes()).padStart(2, "0"),
        seconds = String(date.getSeconds()).padStart(2, "0");
  
  $time.innerHTML = `${hours}:${minutes}:${seconds}`;

  // console.log('Time is ticking')
}

/**
 * @Inits : 초기실행
 */
/* SETTING */
function setInit() {
  login()
  clock()
  setInterval(clock, 1000);
}
/* READY */
document.addEventListener("DOMContentLoaded", () => {
  setInit()
});