let gusto1; let gusto2; let gusto3; let gusto4; let resultado = 0; let envio; let direccion;

/* Permito que el usuario modifique el HTML */
let saludo = document.getElementById("saludo");
saludo.innerText = "Hola " + prompt("Ingrese su nombre");
let oscuro = prompt("Desea entrar en modo oscuro? si/no");
if(oscuro.toLowerCase()==="si"){
    document.body.className = "oscuro"
};

/* clase constructora de helados */
class Helado{
    constructor (id,nombre,disponible){
        this.id = id;
        this.nombre = nombre;
        this.disponible = disponible;
    }
}

/* asigno variables por c/gusto */
let frutilla = new Helado (01,"frutilla",true)
let chocolate = new Helado (02,"chocolate",true)
let dulceDeLeche = new Helado (03,"dulce de leche",true)
let limon = new Helado (04,"limon",true)
let vainilla = new Helado (05,"vainilla",true)
let granizado = new Helado (06,"granizado",false)
let rocher = new Helado (07,"rocher",false)

/* Array con cada helado */
let sabores = []
sabores.push(frutilla,chocolate,dulceDeLeche,limon,vainilla,granizado,rocher)
console.log(sabores)

/* Creo divs para c/helado por js */
for(const helado of sabores){
    let sabor = document.createElement("div");
    if(helado.disponible===true){
        helado.disponible= "si"
    }else {helado.disponible="no"};
    sabor.innerHTML = 
    `<h2>Helado: ${helado.nombre} </h2>
    <h5>Disponible: ${helado.disponible} </h5>`;
    document.body.appendChild(sabor)
};

gusto1 = prompt("Elije un sabor " + sabores[nombre].join(", "))
console.log(sabores[1].nombre)

/* let peso = prompt("Ingrese el peso que desee: cuarto, mediokilo o kilo");
let cantidad = parseInt(prompt("Cuantos desea llevar?"));
const gustos = [];
const eleccion = [];
const sabores = ["frutilla","chocolate","vainilla","limon","dulce de leche"];




function casos() { 
    switch(peso.toLowerCase()){
    case "cuarto":
        resultado = cantidad*450;
        alert("Puede seleccionar 3 gustos");
        gusto1 = prompt("Elija el primer gusto " + sabores.join(", "));
        if (sabores.includes(gusto1.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto2 = prompt("Elija el segundo gusto " + sabores.join(", "));
        if (sabores.includes(gusto2.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto3 = prompt("Elija el tercer gusto " + sabores.join(", "));
        if (sabores.includes(gusto3.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        break;
    case "mediokilo":
        resultado = cantidad*750;
        alert("Puede seleccionar 4 gustos");
        gusto1 = prompt("Elija el primer gusto " + sabores.join(", "))
        if (sabores.includes(gusto1.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto2 = prompt("Elija el segundo gusto " + sabores.join(", "));
        if (sabores.includes(gusto2.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto3 = prompt("Elija el tercer gusto " + sabores.join(", "));
        if (sabores.includes(gusto3.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto4 = prompt("Elija el cuarto gusto " + sabores.join(", "));
        if (sabores.includes(gusto4.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        break;
    case "kilo":
        resultado = cantidad*1500;
        alert("Puede seleccionar 4 gustos");
        gusto1 = prompt("Elija el primer gusto " + sabores.join(", "))
        if (sabores.includes(gusto1.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto2 = prompt("Elija el segundo gusto " + sabores.join(", "));
        if (sabores.includes(gusto2.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto3 = prompt("Elija el tercer gusto " + sabores.join(", "));
        if (sabores.includes(gusto3.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        gusto4 = prompt("Elija el cuarto gusto " + sabores.join(", "));
        if (sabores.includes(gusto4.toLowerCase())===false) {
            alert("Gusto ingresado incorrecto");
            break;
        }
        break;
}}
casos();

eleccion.push(gusto1,gusto2,gusto3,gusto4);

envio = prompt("Desea envio a domicilio? si/no");
if (envio.toLowerCase()==="si") {
    direccion = prompt("Ingrese su direccion");
    resultado = resultado + 200
    alert ("Se enviara un " + peso + " de " + eleccion.join(", ") + " a " + direccion + ". El costo total es de " + resultado);
}else{alert ("Elegiste un " + peso + " de " + eleccion.join(", ") + ". El costo total es de " + resultado + ". Te esperamos en rioja al 432");} */
