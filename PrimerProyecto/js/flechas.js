var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGTH: 39,
};

console.log(teclas);

document.addEventListener("keydown", dibujarTeclado);

var cuadrito = document.getElementById("dibujo_a");
var ancho = cuadrito.width;
var papel = cuadrito.getContext("2d");
var x = 449;
var y = 149;

dibujarLinea("gray", 449, 149, 452, 149,)

function dibujarLinea(color, xIn, yIn, xFn, yFn)
{
    papel.beginPath();
    papel.strokeStyle = color;
    papel.lineWidth = 3;
    papel.moveTo(xIn, yIn);
    papel.lineTo(xFn, yFn);
    papel.stroke();
    papel.closePath();
}

function dibujarTeclado(evento)
{
    var colorcito = "gray";
    var movimiento = 10;
    switch(evento.keyCode)
    {
        case teclas.UP:
            dibujarLinea(colorcito, x, y, x, y - movimiento);
            y = y - movimiento
            console.log("arriba");
        break;
        case teclas.DOWN:
            dibujarLinea(colorcito, x, y, x, y + movimiento);
            y = y + movimiento
            console.log("abajo");
        break;
        case teclas.LEFT:
            dibujarLinea(colorcito, x, y, x - movimiento, y);
            x = x - movimiento
            console.log("izquierda");
        break;
        case teclas.RIGTH:
            dibujarLinea(colorcito, x, y, x + movimiento, y);
            x = x + movimiento
            console.log("derecha");
        break;
        default:
            console.log("no me importaaaaaa")
    }
}