var banco = document.getElementById("banks")
banco.addEventListener("change", opcionesl)
var bank = "lol";
var ton = document.getElementById("ton")
ton.addEventListener("click", tranferencia)

class bancos
{
    constructor(n, c, s)
    {
        this.nombre = n;
        this.cuenta = c;
        this.saldo = s;
    }
}

var persona = []
persona["cliente"] = (new bancos(bank, true, 5000));
persona["destino"] = (new bancos('loll', true, 0));

var banks = [];
 
var trasferir = 0;
var costo = 100;
var hora = 20;

function tranferencia()
{
    var res = document.getElementById("respuesta")
    if (persona['cliente'].cuenta && banks["push"].cuenta)
    {
        var cajatx = document.getElementById("cantidadd");
        trasferir = parseInt(cajatx.value)
        console.log(trasferir, banks)
        if (hora >= 9 && hora <= 12 || hora >= 15 && hora <= 20)
        {
            if (persona['cliente'].saldo >= trasferir + costo)
            {
                if (banks["push"].nombre == bank)
                {
                    banks["push"].saldo = trasferir;
                    persona["cliente"].saldo = persona["cliente"].saldo - trasferir
                    console.log(banks, persona)
                    res.innerHTML = "<h3> Transferencia exitosa!</h3><br> Tranferiste: $" + trasferir + "<br>Costo: 0 <hr> <h2>Gracias!</h2><hr>"
                    trasferir = 0

                }
                else 
                {
                    banks["push"].saldo = trasferir;
                    persona["cliente"].saldo = (persona["cliente"].saldo - costo) - trasferir 
                    res.innerHTML = "<h3> Transferencia exitosa!</h3><br> Tranferiste: $" + trasferir + "<br>Costo: $" + costo + "<hr> <h2>Gracias!</h2><hr>"
                    trasferir = 0
                }
            }
            else 
            {
                res.innerHTML = "<h3> Transferencia Denegada!</h3><br><h4>Saldo Insuficiente :c </h4><br>Tranferiste: 0" + "<br>Costo: 0" + "<hr> <h2>Gracias!</h2><hr>"
            }
        }
        else
        {
            res.innerHTML = "<h3> Lo sentimos </h3> <br><h4>Estamos descansando :)</h4><hr>Nuestro horario de atencion es de: 9:00am <br>a 12:00m y de 15:00pm a 20:00pm<hr><h4>Gracias!</h4><hr>"
        }

    }
    else
    {
        res.innerHTML = "<h3> Lo sentimos </h3> <br><h4>Tu cuenta no es Oficial >:c</h4><hr>Nuestros agentes legales van para tu casa<hr><h4>Gracias!</h4><hr>"
    }
}
function opcionesl()
{
    banks.push = (new bancos(banco.options[banco.selectedIndex].value, true, 0));
    console.log(banks)
}
