alert("Algoritmo para calculo de porcentajes")
let monto = prompt("Ingrese un monto");
let calculos = parseInt(prompt("Cuantas veces desea hacer calculos?"));
let porcentaje;
let resultado;

for (let k=1; k<=calculos; k++){
porcentaje=parseInt(prompt("Ingrese el numero de porcentaje que desea obtener"));
if (porcentaje == 0){
    alert("Error: ingrese un porcentaje distinto de 0");
    break;
}
resultado=(monto*porcentaje)/100
alert("El porcentaje es= " + resultado)
}



