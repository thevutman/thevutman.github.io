var peso = document.getElementById("cP")
var martep = document.getElementById("1");
var jupiterp = document.getElementById("2");
var resu = document.getElementById("resultado")
var peso_final = 0;

martep.addEventListener("click", pesoMarte)
jupiterp.addEventListener("click", pesoJupiter)

function pesoMarte()
{
    var g_tierra = 9.8;
    var g_marte = 3.7;
    var pF = 0;
    var p = parseInt(peso.value);
    pF = p * g_marte / g_tierra;
    pF = parseInt(pF);
    if(pF > 0)
    {
        resu.innerHTML = "Tu peso en Marte es: " + pF + "Kg";
    }
}

function pesoJupiter()
{
    var g_tierra = 9.8;
    var g_jupiter = 24.8;
    var pFs;
    var pe = parseInt(peso.value)
    pFs = pe * g_jupiter / g_tierra;
    pFs = parseInt(pFs)
    if (pFs > 0)
    {
        resu.innerHTML = "Tu peso en Jupiter es: " + pFs + "Kg";
    }
}

