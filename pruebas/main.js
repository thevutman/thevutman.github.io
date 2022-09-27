var n = 8
var fib0 = 0
var fib1 = 1
var temp
var result

if (n > 0)
{
    temp = fib0
    fib0 = fib1
    fib1 = fib1 = temp
    n = n - 1
}
else
{
    result = fib0
}