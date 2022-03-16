

var imagenes = [];
imagenes["Cauchin"] = "img/vaca.png";
imagenes["Pokacho"] = "img/pollo.png";
imagenes["Tocinauro"] = "img/cerdo.png";
imagenes["Pokachochochon"] = "img/pollo.png";

class Pakiman
{
    constructor(n, v, a, t)
    {
        this.imagen = new Image();
        this.nom = n;
        this.vida = v;
        this.ataque = a;
        this.tipo = t;
        this.imagen.src = imagenes[this.nom];

    }
    hablar()
    {
        alert(this.nombre);
    }

    mostra()
    {
        t.innerHTML += "<h2>" + i.nom + "<img src=" + i.imagen.src + ">" + "</h2> <br> Vida: " 
        + i.vida + "<br>"  + "Ataque: " 
        + i.ataque + "<br>"  + "Tipo: " 
        + i.tipo + "<br>";
    }
}

