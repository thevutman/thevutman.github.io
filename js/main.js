/* Menu desplegable */
var menu = document.getElementById('menu-icon');
var change = document.getElementById('menu')
menu.addEventListener("click", desplegable);

function desplegable()
{
    change.classList.toggle("menu-active");
    menu.classList.toggle("menu-icon-active");
}

/* opciones */

var first = document.getElementById('first-content');
var second = document.getElementById('second-content');

var buttons = {
    web: document.getElementById('web-botton'),
    js: document.getElementById('js-botton')
}


var main = document.getElementById("main");
var home = document.getElementById("home-icon")

buttons.web.addEventListener("click", openweb);
buttons.js.addEventListener("click", openjs);
home.addEventListener("click", openhome);

function openweb()
{
        main.classList.add('main-open');
        first.classList.remove('openjs');
        second.classList.add('openweb');
        change.classList.toggle("menu-active");
        menu.classList.remove("menu-icon-active");
}

function openjs()
{
    main.classList.add('main-open');
    second.classList.remove('openweb');
    first.classList.add('openjs');
    change.classList.toggle("menu-active");
    menu.classList.remove("menu-icon-active");
    select()
}

function openhome()
{
    main.classList.remove('main-open');
    second.classList.remove('openweb');
    first.classList.remove('openjs');
    change.classList.remove("menu-active");
    menu.classList.remove("menu-icon-active");
}

function select()
{
    switch (buttons){
        case web:
            if (first.classList.contains("openjs"))
            {
                web.classList.add("js-open")
                alert('hola')
            }
        break;
    }
}