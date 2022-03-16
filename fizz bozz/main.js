var numeros = 100;

for(var i = 1; i <=100; i++)
{
    if(esdiv(i, 3))
    {
        document.write("Fizz");
        divisible = true;
    }
    if(esdiv(i, 5))
    {
        document.write("Buzz")
        divisible = true;
    }
    if(!esdiv(i, 3) && !esdiv(i, 5))
    {
        document.write(i);
    }
    document.write("<br>")
}

function esdiv(num, div)
{
    if(num % div == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}