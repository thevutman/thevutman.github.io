var texto = document.getElementById("txt");
var boton = document.getElementById("butt");
boton.addEventListener("click", dibujoPorClick );

var d = document.getElementById("dibujo");
var ancho = d.width;
var lienzo = d.getContext("2d");


function dibujarLineaaa(color, xIn, yIn, xFn, yFn)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xIn, yIn);
  lienzo.lineTo(xFn, yFn);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarLineaa(color, xIn, yIn, xFn, yFn)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xIn, yIn);
  lienzo.lineTo(xFn, yFn);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujoPorClick()
{
  console.log("si di click")
  var lineas = (texto.value);
  var l = 0;
  var yI;
  var xF;
  var culore = "pink"
  var espacio = ancho / lineas

  while(l < lineas)
  {
     yI = espacio * l;
     xF = espacio * (l + 1);
     dibujarLineaaa(culore, 1, yI, xF, 299);
     l = l + 1;
  }

  for(l = 0; l < lineas; l++)
  {
     yI = espacio * l;
     xF = espacio * (l + 1);
     dibujarLineaa(culore, 299, yI, xF, 1);
  }

  dibujarLineaaa(culore, 1, 1, 1, 299);
  dibujarLineaaa(culore, 1, 299, 299, 299);
  dibujarLineaa(culore, 299, 299, 299, 1);
  dibujarLineaa(culore, 299, 1, 1, 1);
}

