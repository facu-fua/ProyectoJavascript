const helados=["frutilla","dulce de leche","chocolate","limon","granizado"]

class envio{
    constructor(gusto,direccion){
        this.gusto = gusto
        this.direccion = direccion
    }
}

let gusto1 = prompt("Ingrese un sabor de helado: " + helados);
if(helados.includes(gusto1.toLowerCase())===false){
    alert("Ese gusto no esta disponible");
}else{
    let envio1 = new envio(gusto1,prompt("Ingrese su direccion"));
    alert("Se enviara helado de "+ gusto1 + " a "+ envio1.direccion);
}

/* alert ("Calculadora costo helado");

let peso = prompt("Ingrese el peso que desea: cuarto, mediokilo o kilo");
let cantidad = parseInt(prompt("Cuantos desea llevar?"));
let resultado;
let envio = prompt("Desea que se envie a su domicilio? si/no");

function domicilio(){
    let calle = prompt("Ingrese su calle");
    let numero = +prompt("Ingrese su numero de domicilio");
    alert("Usted ingreso: " + calle + " " + numero);
    aca se colocaria alguna operacion para enviar esta info al cadete
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
alert("El costo total sera de: " + resultado) */

/* clase contrusctora de helados
class helado {
    constructor(id, nombre, disponibilidad) disponibilidad: 1=si, 0=no {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.disponbilidad = disponibilidad;
    }
} */
/* array de helados
const helados = [];
agrego gustos helados
helados.push(new helado(0,"frutilla",1));
helados.push(new helado(1,"chocolate",1));
helados.push(new helado(2,"dulce de leche",1));
helados.push(new helado(3,"limon",1));
helados.push(new helado(4,"granizado",0));
helados.push("helado")
console.log(helados);
console.log(helados.includes ("helado")); */

/* let gustos = prompt("Ingrese 3 gustos: frutilla, chocolate, dulce de leche, limon, granizado");
console.log(gustos.toLowerCase()); */