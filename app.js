'use strict';

/**
 * @Constant : 전역변수
 */
/* SELECTOR */
const $loginForm = document.getElementById('formLogin'),
      $userName = $loginForm.querySelector('input');
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

/**
 * @Inits : 초기실행
 */
/* SETTING */
function setInit() {
  login()
}
/* READY */
document.addEventListener("DOMContentLoaded", () => {
  setInit()
});