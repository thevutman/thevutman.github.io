var hola = document.getElementById('hola')
hola.addEventListener('click', contador)
var cont = 0

function contador(){
	var contador = document.getElementById("contador");
	contador.value = cont;
	cont++;
    console.log(cont)
}

setInterval('contador()',1000);