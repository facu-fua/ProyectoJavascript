alert ("Calculadora costo helado");

let peso = prompt("Ingrese el peso que desea: cuarto, mediokilo o kilo");
let cantidad = parseInt(prompt("Cuantos desea llevar?"));
let resultado;
let envio = prompt("Desea que se envie a su domicilio? si/no");

function domicilio(){
    let calle = prompt("Ingrese su calle");
    let numero = +prompt("Ingrese su numero de domicilio");
    alert("Usted ingreso: " + calle + " " + numero);
    /* aca se colocaria alguna operacion para enviar esta info al cadete */
}

switch(peso.toLowerCase()){
    case "cuarto":
        resultado = cantidad*450;
        break;
    case "mediokilo":
        resultado = cantidad*750;
        break;
    case "kilo":
        resultado = cantidad*1500;
        break;
    default:
        alert("Error: escriba correctamente alguna de las opciones dadas")
        break;
}

if (envio.toLowerCase() === "si"){
    resultado=resultado+200;
    domicilio()
}
alert("El costo total sera de: " + resultado)




