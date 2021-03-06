'use strict';
let toggle= document.querySelector('.main-nav__toggle');
let menu = document.querySelector('.list-main');
let overlay=document.querySelector('.modal-overlay');
let modal = document.querySelector('.modal-cart');
let btn =document.querySelector('.featured__btn');
let svg_close=document.querySelector('.main-nav__toggle-svg-close');
let svg_open = document.querySelector('.main-nav__toggle-svg-open');

// закрытие меню
toggle.addEventListener('click', function () {
    menu.classList.toggle('visually-hidden');
    svg_close.classList.toggle('visually-hidden');
    svg_open.classList.toggle('visually-hidden');
});
//открытие модального окна
btn.addEventListener('click', function (event) {
    event.preventDefault();
    overlay.classList.toggle('visually-hidden');
    modal.classList.toggle('visually-hidden');
});
//закрытие модального окна при щелчке на оверлее
overlay.addEventListener('click', function () {
    overlay.classList.toggle('visually-hidden');
    modal.classList.toggle('visually-hidden');
});


