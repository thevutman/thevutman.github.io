var imagenes = [];
imagenes["50"] = "https://drive.google.com/uc?id=102vwQovSVs8BjkhCou5FE43tsvu4Em-h";
imagenes["20"] = 'https://drive.google.com/uc?id=1ZklB8a_W6YIpeGBD8fVNgXGgZLBuhclC';
imagenes["10"] = "https://drive.google.com/uc?id=1Zfr4CRO7lfS0i8OdalisygSBm8EEowdH";

class billete 
{ constructor(v, c)
    { 
        this.valor = v; 
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    } 
}

var caja = [];

caja.push(new billete(50, 5));
caja.push(new billete(20, 7));
caja.push(new billete(10, 10));

contar();

var dinero = 0;

var papeles = 0;

var div = 0;

var r = document.getElementById("parrafo")
var b = document.getElementById("butt");
b.addEventListener("click", entregarDinero);

function entregarDinero()
{
    var dibujado = [];
    var tx = document.getElementById("txt");
    dinero = parseInt(tx.value);
    if (total >= dinero)
    {
        for (var bi of caja)
        {
            if (dinero > 0)
            { 
                div = Math.floor(dinero / bi.valor);
                if(div>bi.cantidad)
                {
                    papeles = bi.cantidad;
                }
            
                else 
                { 
                    papeles = div;
                } 
                bi.cantidad = bi.cantidad - papeles;
                for(var i = 0; i < papeles; i++)
                {
                    dibujado.push(new billete(bi.valor, 1));
                }
                dinero = dinero - (bi.valor * papeles)
            }
        }
        if(dinero == 0)
        {
            r.innerHTML += "Retira <br>"
            for(e of dibujado)
            {
                r.innerHTML += "<img src=" + e.imagen.src + ">";
            }
            r.innerHTML += "<hr>"
        contar();
        }
        else
        {
            r.innerHTML += "Me quede sin dinero <hr>"
        }

    }
    else
    {
        r.innerHTML += "No me han recargado dinero :c<hr>"
    }

}

function contar()
{
    total = 0
    for(var tot of caja)
    {
        total = total + tot.valor * tot.cantidad
    }
}
