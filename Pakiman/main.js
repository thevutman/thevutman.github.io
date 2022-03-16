agree = document.getElementById("butt");
agree.addEventListener("click", ver);

agre = document.getElementById("vut");
agre.addEventListener("click", verr);
var cont = 0;
var t = document.getElementById("techo");


var coleccion = [];

coleccion.push(new Pakiman("Cauchin", 100, 30, "Agua"));
coleccion.push(new Pakiman("Pokacho", 80, 50, "Fuego"));
coleccion.push(new Pakiman("Tocinauro", 120, 40, "Tierra"));

for(var i of coleccion)
{
    i.mostra();
}

function ver()
{
    coleccion.push(new Pakiman("Pokachochochon", 120, 120, "Electrico"));
    t.innerHTML += "<h2>" + coleccion[coleccion.length - 1].nom + "<img src=" + coleccion[coleccion.length - 1].imagen.src + ">" + "</h2> <br> Vida: " 
    + coleccion[coleccion.length - 1].vida + "<br>"  + "Ataque: " 
    + coleccion[coleccion.length - 1].ataque + "<br>"  + "Tipo: " 
    + coleccion[coleccion.length - 1].tipo + "<br>";
}

function verr()
{
    coleccion.push(new Pakiman("Pokachon", 10, 20, "Electrico"));
    t.innerHTML += "<h2>" + coleccion[coleccion.length - 1].nom + "<img src=" + coleccion[coleccion.length - 1].imagen.src + ">" + "</h2> <br> Vida: " 
    + coleccion[coleccion.length - 1].vida + "<br>"  + "Ataque: " 
    + coleccion[coleccion.length - 1].ataque + "<br>"  + "Tipo: " 
    + coleccion[coleccion.length - 1].tipo + "<br>";
}

