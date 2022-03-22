var cuadrit = document.getElementById("dibujo_b");
var papeli = cuadrit.getContext("2d");
var x;
var y;
var estado;
var c = document.getElementById("colore")

cuadrit.addEventListener("mousedown", dibujarConMouse);
cuadrit.addEventListener("mouseup", noDibujarConMouse);
cuadrit.addEventListener("mousemove", moverMouse);

function dibujarConMouse(evento)
{
    estado = 1;
    x = evento.layerX;
    y = evento.layerY;
}

function noDibujarConMouse(evento)
{
    estado = 0;
}

function moverMouse(evento)
{
    if(estado == 1)
    {
        dibujarLine(c.value, x, y, evento.layerX, evento.layerY, papeli);
    }
    else
    {
        x = evento.layerX;
        y = evento.layerY;
    }

    x = evento.layerX;
    y = evento.layerY;
}

function dibujarLine(color, xIn, yIn, xFn, yFn, lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(xIn, yIn);
  lienzo.lineTo(xFn, yFn);
  lienzo.stroke();
  lienzo.closePath();
}