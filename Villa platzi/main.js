var vp = document.getElementById("villaplat");
var papel = vp.getContext("2d");
var cantidadP = aleatorio(5, 12)
var cantidadV = aleatorio(4, 7)
var movimiento = 8;

var fondo = {
    url: "https://drive.google.com/uc?id=1L5Sfvdl7CRSxGs-r5eP90f6cP6JsuXeZ",
    cargaOk: false
}

var pollo = {
    url: "https://drive.google.com/uc?id=11lyCmJjIW6OafG-WYW0O8caupoKVw5sw",
    cargaOk: false,
}

var vaca = {
    url: "https://drive.google.com/uc?id=13Q_6msUgPylSaOiia584R2RhmS9DI3CZ",
    cargaOk: false,
}

var cerdo = {
    url: "https://drive.google.com/uc?id=1aRQIjdrWD_eqUMNCzELGl7kzFLC5Uk8q",
    cargaOk: false,
    xc: 10,
    yc: 10
}

var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGTH: 39,
};

posV = {
    vx: [],
    vy: []
}

posP = {
    px: [],
    py: []
}

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", dibujarFondo);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", dibujarCerdo);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", dibujarPollo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", dibujarVaca);

document.addEventListener("keydown", moverCerdito);

function moverCerdito(evento)
{
    switch (evento.keyCode)
    {
        case teclas.UP:
            if (0 <= cerdo.yc)
            {
                cerdo.yc = cerdo.yc - movimiento;
                rDibujar();
                console.log("arriba")
            }
            else
            {
                cerdo.yc = cerdo.yc + movimiento;
                rDibujar();
            }

        break;

        case teclas.DOWN:
            if (cerdo.yc <= 420)
            {
                cerdo.yc = cerdo.yc + movimiento;
                rDibujar();
            }
            else
            {
                cerdo.yc = cerdo.yc - movimiento;
                rDibujar();
            }
        break;

        case teclas.LEFT:
            if (0 <= cerdo.xc)
            {
                cerdo.xc = cerdo.xc - movimiento;
                rDibujar();
            }
            else
            {
                cerdo.xc = cerdo.xc + movimiento;
                rDibujar();
            }
        break;

        case teclas.RIGTH:
            if (cerdo.xc <= 420)
            {
                cerdo.xc = cerdo.xc + movimiento;
                rDibujar();
            }
            else
            {
                cerdo.xc = cerdo.xc - movimiento;
                rDibujar();
            }
        break;
    default:
    }
}

function dibujarFondo()
{
    fondo.cargaOk = true;
    dibujar();
}

function dibujarCerdo()
{
    cerdo.cargaOk = true;
    dibujar();
}

function dibujarPollo()
{
    pollo.cargaOk = true;
    dibujar();
}

function dibujarVaca()
{
    vaca.cargaOk = true;
    dibujar();
}

function dibujar()
{
    var i;

    if (fondo.cargaOk)
    {
        papel.drawImage(fondo.imagen, 0, 0);
    }
    if (cerdo.cargaOk)
    {
        papel.drawImage(cerdo.imagen, cerdo.xc, cerdo.yc);
    }
    if (pollo.cargaOk)
    {
        for(i=0; i < cantidadP; i++)
        {
            var x = aleatorio(0, 420);
            var y = aleatorio(0, 420);
            papel.drawImage(pollo.imagen, x, y); 
            posP.px[i] = x;
            posP.py[i] = y;
        }
    }
    if (vaca.cargaOk)
    {
        for(var i=0; i < cantidadV; i++)
        {
            var x = aleatorio(0, 420);
            var y = aleatorio(0, 420);
            papel.drawImage(vaca.imagen, x, y);
            posV.vx[i] = x;
            posV.vy[i] = y;
        }
    }
}

function rDibujar()
{
    var i
    papel.drawImage(fondo.imagen, 0, 0);

    for(var i=0; i < cantidadV; i++)
    {
        papel.drawImage(vaca.imagen, posV.vx[i], posV.vy[i]);
    }
    
    papel.drawImage(cerdo.imagen, cerdo.xc, cerdo.yc);

    for(var i=0; i < cantidadP; i++) 
    {
        papel.drawImage(pollo.imagen, posP.px[i], posP.py[i]);
    }
}

function aleatorio(min, maxi)
{
    var resultado;
    resultado = Math.floor(Math.random() * (maxi - min + 1) + min);
    return resultado;
}
