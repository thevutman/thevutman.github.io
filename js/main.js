/* Menu desplegable */
var menu = document.getElementById('menu-icon');
var change = document.getElementById('menu')
menu.addEventListener("click", desplegable);

function desplegable()
{
    change.classList.toggle("menu-active");
}

/* opciones */

var first = document.getElementById('first-content');
var second = document.getElementById('second-content');
var web = document.getElementById('web-botton');
var js = document.getElementById('js-botton');

var main = document.getElementById("main")

web.addEventListener("click", openweb);
js.addEventListener("click", openjs);

function openweb()
{
        main.classList.add('main-open')
        first.classList.remove('openjs')
        second.classList.add('openweb')
}

function openjs()
{
    main.classList.add('main-open')
    second.classList.remove('openweb')
    first.classList.add('openjs')
}