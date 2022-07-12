/* clase constructora de helados */
class Helado {
    constructor(id, nombre, disponible) {
        this.id = id;
        this.nombre = nombre;
        this.disponible = disponible;
    }
}

/* asigno variables por c/gusto */
let frutilla = new Helado(01, "Frutilla", true)
let chocolate = new Helado(02, "Chocolate", true)
let dulceDeLeche = new Helado(03, "Dulce de leche", true)
let limon = new Helado(04, "Limon", true)
let vainilla = new Helado(05, "Vainilla", true)
let granizado = new Helado(06, "Granizado", false)
let rocher = new Helado(07, "Rocher", false)

/* Array con cada helado */
let sabores = []
sabores.push(frutilla, chocolate, dulceDeLeche, limon, vainilla, granizado, rocher)


/* Coloco cada helado del array en un card */
let helados = document.querySelectorAll(".helado")

for (i = 0; i < sabores.length; i++) {
    if (sabores[i].disponible === true) {
        helados[i].innerHTML = `
        <img src="/multimedia/${sabores[i].nombre}.jpg" alt="">
        <h3>${sabores[i].nombre}</h3>
        <p>${sabores[i].disponible? "Disponible":"No Disponible"}</p>
        <input class="agregar" type="button" value="Agregar">
        `
    } else {
        helados[i].innerHTML = `
        <img src="/multimedia/${sabores[i].nombre}.jpg" alt="">
        <h3>${sabores[i].nombre}</h3>
        <p>${sabores[i].disponible? "Disponible":"No Disponible"}</p>
        <input class="agregar" type="button" value="Agregar" disabled>
        `
    }

}



/* Aca botones de agregar helados */
let agregar = document.querySelectorAll(".agregar");

/* function click(element) {
    element.onclick = () => {
        if (element.classList.contains("seleccionado")) {
            element.classList.remove("seleccionado")
            element.value = "Agregar";
        } else {
            element.classList.add("seleccionado")
            element.value = "Agregado!"
        }
    }
}
agregar.forEach(click); */

/* Tema oscuro */
let oscuro = document.getElementById("oscuro");
let body = document.querySelector("body");
oscuro.onclick = () => {
    if (body.classList.contains("oscuro")) {
        body.classList.remove("oscuro");
    } else {
        body.classList.add("oscuro")
    }
}

/* Submit del form */
let form = document.getElementById("form");
form.addEventListener("submit", mensaje);

function mensaje(e) {
    e.preventDefault();
    let calle = document.getElementById("calle").value;
    let direccion = document.getElementById("direccion").value;
    if ((calle.length < 3) || (calle === "") || (direccion === "") || (calle.length > 20) || direccion.length > 20) {
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


/* Selector peso */
let pesos = document.querySelectorAll(".peso")
let seleccionado = document.querySelectorAll(".seleccionado");
pesos.forEach(function (element) {
    element.onclick = () => {
        if (element.classList.contains("seleccionado")) {
            element.classList.remove("seleccionado")
        } else {
            element.classList.add("seleccionado")
        }
    }
})
console.log(seleccionado) /* referenciar los datos en aquellos elementos con class seleccionado */
/* expand.innerHTML = `<ul><h4>${seleccionado.h2}</h4>
<li></li>
<li></li>
<li></li>
</ul>` */

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
console.log(agregar)
let seleccion = []

for (let i = 0; i < agregar.length; i++) {
    agregar[i].onclick = () => {
        if (seleccion.length < 4) {
            seleccion.push(sabores[i].nombre)
            console.log(seleccion)
            expand.innerText = seleccion[i]
            agregar[i].classList.add("seleccionado")
            agregar[i].value = "Agregado!"
            Toastify({
                text: "Agregado al carrito",
                duration: 1000,
                newWindow: true,
                gravity: "top",
                position: "center",
            }).showToast();
        } else {
            console.log(seleccion)
        }
    }
}