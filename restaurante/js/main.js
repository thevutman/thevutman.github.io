var movil = document.getElementById("movil");
var icon = document.getElementById("icmovil");

icon.addEventListener("click", prueba);

function prueba()
{ 
    movil.classList.toggle('movil-active');
}


/*
movil.classList.toggle('movil')
movil.classList.toggle('movil-active')
cont = cont + 1
*/

addEventListener('scroll', scr);
var nav = document.getElementById("nav");
let lastScroll = 0;

function scr()
{
    var cont = window.pageYOffset;
    if (cont <= 0)
    {
        nav.classList.remove("scrollUp");
    }
    if (cont > lastScroll && !nav.classList.contains("scrollDown"))
    {
        nav.classList.remove("scrollUp");
        nav.classList.add("scrollDown");
    }
    else if (cont < lastScroll && nav.classList.contains("scrollDown"))
    {
        nav.classList.remove("scrollDown");
        nav.classList.add("scrollUp");
    }
    lastScroll = cont
}   

/*contador*/

var con = 0;
var element = document.getElementById('combos')

function cambiar(){
    element.classList.toggle('combos')
    element.classList.toggle('combos-dos')
}

/*
setInterval('cambiar()',6000);
/**/