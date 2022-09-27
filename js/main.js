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
var third = document.getElementById('third-content')
var fourth = document.getElementById('fourth-content')

var web = document.getElementById('web-botton')
var js = document.getElementById('js-botton')
var contact = document.getElementById('contact-botton')
var aboutme = document.getElementById('aboutme-botton')

var webD = document.getElementById('web-botton-desktop')
var jsD = document.getElementById('js-botton-desktop')
var contactD = document.getElementById('contact-botton-desktop')
var aboutmeD = document.getElementById('aboutme-botton-desktop')


var main = document.getElementById("main");
var home = document.getElementById("home-icon")
var homeD = document.getElementById("home-icon-desktop")

web.addEventListener("click", openweb);
js.addEventListener("click", openjs);
contact.addEventListener("click", opencontact)
aboutme.addEventListener("click", openaboutme)
home.addEventListener("click", openhome);

webD.addEventListener("click", openweb);
jsD.addEventListener("click", openjs);
contactD.addEventListener("click", opencontact)
aboutmeD.addEventListener("click", openaboutme)
homeD.addEventListener("click", openhome);

function openweb()
{
        main.classList.add('main-open');
        first.classList.remove('openjs');
        second.classList.add('openweb');
        third.classList.remove('opencontact')
        fourth.classList.remove('openaboutme')
        change.classList.toggle("menu-active");
        menu.classList.remove("menu-icon-active");
        js.style.color="white"
        web.style.color="gray"
        aboutme.style.color="white"
        contact.style.color="white"
        jsD.style.color="white"
        webD.style.color="gray"
        aboutmeD.style.color="white"
        contactD.style.color="white"
}

function openjs()
{
    main.classList.add('main-open');
    second.classList.remove('openweb');
    first.classList.add('openjs');
    third.classList.remove('opencontact')
    fourth.classList.remove('openaboutme')
    change.classList.toggle("menu-active");
    menu.classList.remove("menu-icon-active");
    js.style.color="gray"
    web.style.color="white"
    aboutme.style.color="white"
    contact.style.color="white"
    jsD.style.color="gray"
    webD.style.color="white"
    aboutmeD.style.color="white"
    contactD.style.color="white"
}

function openhome()
{
    main.classList.remove('main-open');
    second.classList.remove('openweb');
    first.classList.remove('openjs');
    third.classList.remove('opencontact')
    fourth.classList.remove('openaboutme')
    change.classList.remove("menu-active");
    menu.classList.remove("menu-icon-active");
    js.style.color="white"
    web.style.color="white"
    aboutme.style.color="white"
    contact.style.color="white"
    jsD.style.color="white"
    webD.style.color="white"
    aboutmeD.style.color="white"
    contactD.style.color="white"
}

function opencontact()
{
    main.classList.add('main-open');
    first.classList.remove('openjs');
    second.classList.remove('openweb');
    third.classList.add('opencontact')
    fourth.classList.remove('openaboutme')
    change.classList.toggle("menu-active");
    menu.classList.remove("menu-icon-active");
    js.style.color="white"
    web.style.color="white"
    aboutme.style.color="white"
    contact.style.color="gray"
    jsD.style.color="white"
    webD.style.color="white"
    aboutmeD.style.color="white"
    contactD.style.color="gray"
}

function openaboutme()
{
    main.classList.add('main-open');
    first.classList.remove('openjs');
    second.classList.remove('openweb');
    third.classList.remove('opencontact')
    fourth.classList.add('openaboutme')
    change.classList.toggle("menu-active");
    menu.classList.remove("menu-icon-active");
    js.style.color="white"
    web.style.color="white"
    aboutme.style.color="gray"
    contact.style.color="white"
    jsD.style.color="white"
    webD.style.color="white"
    aboutmeD.style.color="gray"
    contactD.style.color="white"
}