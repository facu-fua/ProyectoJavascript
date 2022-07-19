/* clase constructora de helados */
/* class Helado {
    constructor(id, nombre, disponible) {
        this.id = id;
        this.nombre = nombre;
        this.disponible = disponible;
    }
} */

/* Array con cada helado */
/* let sabores = [] */

/* asigno variables por c/gusto */
/* sabores.push(new Helado(01, "Frutilla", true))
sabores.push(new Helado(02, "Chocolate", true))
sabores.push(new Helado(03, "Dulce de leche", true))
sabores.push(new Helado(04, "Limon", true))
sabores.push(new Helado(05, "Vainilla", true))
sabores.push(new Helado(06, "Granizado", false))
sabores.push(new Helado(07, "Rocher", false)) */


/* Bienvenida */
let nombre = document.getElementById("usuario");
let contrasenia = document.getElementById("contra")
let saludo = document.getElementById("saludo")
let ingresar = document.getElementById("ingresar");
ingresar.onclick = () => {
    if (nombre.value === localStorage.getItem("usuario") && contrasenia.value === localStorage.getItem("password")) {
        document.getElementById("error1").innerText = ""
        saludo.innerText = "Sesion de " + nombre.value
        swal({
            title: "Bienvenido " + nombre.value,
            button: "Cerrar",
            timer: 1500,
        });
    } else {
        saludo.innerText = ""
        document.getElementById("error1").innerText = "Su cuenta no existe, registrese";
        document.getElementById("error1").style = "color: red;";
    }
}

/* Tema oscuro */
let oscuro = document.getElementById("oscuro");
let body = document.querySelector("body");
oscuro.onclick = () => {
    if (body.classList.contains("oscuro")) {
        body.classList.remove("oscuro");
    } else {
        body.classList.add("oscuro")
    }
} /* hacer un storage para el estado del sitio del usuario */

let eleccionPeso = document.getElementById('eleccionPeso')
let eleccionGusto1 = document.getElementById('eleccionGusto1')
let eleccionGusto2 = document.getElementById('eleccionGusto2')
let eleccionGusto3 = document.getElementById('eleccionGusto3')
let eleccionGusto4 = document.getElementById('eleccionGusto4')

/* Selector peso */
/* Falta cambiar el innerHTML de gustos dependiendo del peso,
y permitir seleccionar mas de uno con su respectivo innerhtml */
let peso = document.querySelectorAll(".peso")
let seleccionado = []
console.log(seleccionado)
peso.forEach(function (element) {
    element.onclick = () => {
        if (element.classList.contains("seleccionado") ) {
            element.classList.remove("seleccionado")
            ubicacion = seleccionado.indexOf(element)
            seleccionado.splice(ubicacion,1)
        } else if (seleccionado < 1) {
            element.classList.add("seleccionado")
            seleccionado.push(element)
            eleccionPeso.innerText = element.querySelector("h2").innerText
            console.log(seleccionado)
        }
    }
})

/* Fetch de datos a una falsa api(json local) */
fetch("/data/helados.json")
    .then((resp) => resp.json())
    .then((gustos) => {
        for (i = 0; i < gustos.length; i++) {
            let helados = document.createElement('div')
            helados.innerHTML = `
        <img src="${gustos[i].img}" alt="">
        <h3>${gustos[i].nombre}</h3>
        <p>${gustos[i].disponible? "Disponible":"No Disponible"}</p>
        ${gustos[i].disponible? '<input class="agregar" type="button" value="Agregar"></input>' :
            '<input class="agregar" type="button" value="Agregar" disabled></input>'
        }
        `
            helados.classList.add('helado')
            document.getElementById('sabores').append(helados)
        }
    });

/* Asincronia para los botones del fetch */
const esperarFetch = (resp) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve(
                    document.querySelectorAll('.agregar')
                )
            }
        }, 500)
    })
}

let seleccion = []
let agregar = document.querySelectorAll(".agregar")
console.log(agregar);
let listado = document.getElementById("listado")

/* Esto vendria a crear un array de seleccion al hacer click sobre el
boton "agregar" de cada gusto */
const clickBoton = () => {
    esperarFetch().then((botones) => {
        let agregar = botones;
        for (let i = 0; i < agregar.length; i++) {
            agregar[i].onclick = () => {
                console.log(agregar[i])
                let disponible = agregar[i].previousElementSibling;
                let nombre = disponible.previousElementSibling.innerText;
                let ubicacion = seleccion.indexOf(nombre);
                if (seleccion.length <= 4) {
                    if (agregar[i].classList.contains('seleccionado')) {
                        agregar[i].classList.remove("seleccionado")
                        agregar[i].value = "Agregar"
                        seleccion.splice(ubicacion,1)
                        console.log(seleccion)
                        /* faltaria eliminar cada gusto al deseleccionarlo */
                    }
                    else if (seleccion.length < 4) {
                        seleccion.push(nombre)
                        agregar[i].classList.add("seleccionado")
                        agregar[i].value = "Agregado!"
                        Toastify({
                            text: "Agregado al carrito",
                            duration: 1000,
                            newWindow: true,
                            gravity: "top",
                            position: "center",
                        }).showToast();
                        console.log(seleccion)
                        listado.innerHTML += `<li>${nombre}</li>`
                    }
                }
            }
        }
    })
}
clickBoton();



let expand = document.getElementById("openCart")
let carrito = document.getElementById("cartLogo");

/* Expandir carrito */
carrito.onclick = () => {
    if (expand.classList.contains("invisible")) {
        expand.classList.remove("invisible")
    } else {
        expand.classList.add("invisible")
    }
} /* falta que los sabores y peso se reemplazen por los seleccionados */

/* Expandir registro */
let registrate = document.getElementById("registrate")
let registro = document.querySelector(".registro")
registrate.onclick = () => {
    if (registro.classList.contains("invisible")) {
        registro.classList.remove("invisible")
    } else {
        registro.classList.add("invisible")
    }
}




let user = document.getElementById("userRegristo")
let pass = document.getElementById("passRegistro")
let btn = document.getElementById("btnRegistro")

/* Storage */
localStorage.setItem("sabores", JSON.stringify(sabores));
btn.onclick = () => {
    if (user.value === "" || user.value.length > 15 || pass.value === "" || pass.value.length > 20) {
        document.getElementById("error2").innerText = "Ingrese entre 1 y 20 caracteres en cada area"
        document.getElementById("error2").style = "color: red;"
    } else {
        document.getElementById("error2").innerText = ""
        localStorage.setItem("usuario", (user.value));
        localStorage.setItem("password", (pass.value));
        registro.classList.add("invisible")
    }
}


/* Submit del form */
let form = document.getElementById("form");
form.addEventListener("submit", mensaje);

function mensaje(e) {
    e.preventDefault();
    let calle = document.getElementById("calle").value;
    let direccion = document.getElementById("direccion").value;
    if ((calle.length < 3) || (calle === "") || (direccion === "") || (calle.length > 20) || direccion.length > 20 || direccion.length < 2) {
        document.getElementById("error").innerText = "Ingrese una calle/numero valido";
    } else {
        swal({
            icon: "/multimedia/envio.png",
            imageWidth: 200,
            imageHeight: 100,
            title: "Tu pedido esta en camino a: " + calle + " " + direccion,
            button: "Cerrar",
        });
        document.getElementById("error").innerText = "Su pedido fue enviado con exito!"
    }
}