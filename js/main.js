document.addEventListener("DOMContentLoaded", () => {
    fetchPotes();
    fetchHelados();
})

//Cargo informacion de una API(en este caso, json local)
const fetchPotes = async () => {
    try {
        const res = await fetch("/data/potes.json");
        const dataPote = await res.json();
        creoBtnPote(dataPote);
    } catch (error) {
        console.log(error);
    }
}

const fetchHelados = async () => {
    try {
        const res = await fetch("/data/helados.json");
        const dataHelado = await res.json();
        creoCardHelado(dataHelado);
        seleccionHelado(dataHelado);
        let checkBoxes = document.querySelectorAll("#sabores ul li input");
        const gustosSeleccionados = [];
        seleccionPeso(checkBoxes, gustosSeleccionados);
        checkBoxHelados(gustosSeleccionados);
        cancelarSeleccion(checkBoxes)
        confirmarSeleccion(checkBoxes, gustosSeleccionados)
    } catch (error) {
        console.log(error)
    }
}

//Creo los botones de cada pote con la data del fetch
const creoBtnPote = dataPote => {
    dataPote.forEach(pote => {
        let poteContainer = document.getElementById("pesos");
        let btnPote = document.createElement("button");
        btnPote.innerHTML = `
        <img src="${pote.imagen}" alt="">
        <h2>${pote.peso}</h2>
        <h3>$${pote.precio}</h3>
        `;
        btnPote.classList.add("peso");
        btnPote.setAttribute("data-id", pote.id);
        poteContainer.append(btnPote);
    })
};

//Creo los cards de helados con la data del fetch
const creoCardHelado = dataHelado => {
    dataHelado.forEach(helado => {
        let heladoContainer = document.getElementById("helados");
        let cardHelado = document.createElement("div");
        cardHelado.innerHTML = `
        <img src="${helado.img}" alt="">
        <h3>${helado.nombre}</h3>
        <h4>${helado.disponible? "Disponible" : "No Disponible"}</h4>
        `
        cardHelado.classList.add("helado");
        cardHelado.setAttribute("data-id", helado.id);
        heladoContainer.append(cardHelado);
    })
};

// Boton toggle modo oscuro
let btnModoOscuro = document.getElementById("modoOscuro");
btnModoOscuro.onclick = () => {
    let body = document.body;
    if (body.classList.contains("oscuro")) {
        body.classList.remove("oscuro");
    } else {
        body.classList.add("oscuro");
    }
};

//Boton toggle carrito
let btnCarrito = document.getElementById("cartLogo");
let carrito = document.getElementById("openCart");
btnCarrito.onclick = () => {
    if (carrito.classList.contains("invisible")) {
        carrito.classList.remove("invisible");
    } else {
        carrito.classList.add("invisible");
    }
};

//Eleccion de peso, muestra la seccion para armar el pote y crea un card con el pote elegido
//en la misma. Tambien resetea los valores de la seccion.
const seleccionPeso = (checkBoxes, gustosSeleccionados) => {
    let peso = document.querySelectorAll(".peso");
    let overlaySeleccion = document.getElementById("overlaySeleccion");
    let contenedorSeleccion = document.getElementById("contenedorSeleccion");
    peso.forEach(peso => peso.onclick = () => {
        overlaySeleccion.classList.remove("invisible");
        let clone = peso.cloneNode(true);
        clone.setAttribute("id", "poteElegido");
        contenedorSeleccion.prepend(clone);
        gustosSeleccionados.length = 0;
        confirmarGustos.disabled = true;
        checkBoxes.forEach(check => check.checked = false)
    })
}

//En base al contenido del array de gustos agrega o quita los helados seleccionados por checkbox
const checkBoxHelados = (gustosSeleccionados) => {
        let checks = document.querySelectorAll("#sabores ul li input");
        let max = 4;
        for (let i = 0; i < checks.length; i++)
            checks[i].onclick = () => {
                let checkedChecks = document.querySelectorAll("#sabores ul li input:checked");
                if (checks[i].checked === true && checkedChecks.length <=max ) {
                    gustosSeleccionados.push(checks[i].id);
                    confirmarGustos.disabled = false;
                } else if (checks[i].checked === false) {
                    posicion = gustosSeleccionados.indexOf(checks[i].id);
                    gustosSeleccionados.splice(posicion, 1);
                    if (gustosSeleccionados.length < 1) {
                        confirmarGustos.disabled = true;
                    }
                }if (checkedChecks.length >= max + 1)
                return false;
            };
}



        //Creo los li checkbox para cada gusto
        const seleccionHelado = (dataHelado) => {
            dataHelado.forEach(sabor => {
                let li = document.createElement("li");
                let ul = document.querySelector("#sabores ul");
                li.innerHTML = `
    <label for="${sabor.nombre.toLowerCase()}">${sabor.nombre}</label>
    <input type="checkbox" id="${sabor.nombre.toLowerCase()}" value="${sabor.nombre}" ${sabor.disponible? "": "disabled"}>
    `;
                ul.append(li);
            })
        };


        //cancelar hace invisible el overlay, borra el div del pote, deselecciona los checkbox y vacia el array
        const cancelarSeleccion = (checkBoxes) => {
            cancelarGustos.onclick = () => {
                overlaySeleccion.classList.add("invisible")
                let poteElegido = document.getElementById("poteElegido")
                poteElegido.remove()
                checkBoxes.forEach(check => check.checked = false)
            }
        }


        //variables
        //Aca verificamos si hay elementos del carrito guardados en el local storage, si existen se guardan en el array
        let arrayPotes = []
        if (JSON.parse(localStorage.getItem("arrayPotes"))){
            arrayPotes = JSON.parse(localStorage.getItem("arrayPotes"))
        }
        contadorEleCarrito = arrayPotes.length
        const precios = []
        let confirmarGustos = document.getElementById("confirmarGustos")
        let cancelarGustos = document.getElementById("cancelarGustos")

        //Al confirmar se crea un div con dos divs dentro, uno con el pote creado y otro con el listado de gustos
        //tambien resetea y pone invisible el overlay de seleccion de gustos, y podruce un objeto del pote
        confirmarSeleccion = (checkBoxes, gustosSeleccionados) => {

                confirmarGustos.onclick = () => {
                    overlaySeleccion.classList.add("invisible");
                    let poteElegido = document.getElementById("poteElegido")
                    let imagen = poteElegido.querySelector("img").getAttribute("src")
                    let peso = poteElegido.querySelector("h2").textContent
                    let precio = +(poteElegido.querySelector("h3").textContent.replace("$", ""))
                    checkBoxes.forEach(check => check.checked = false)
                    let div = document.createElement("div");
                    div.classList.add("pote", `${contadorEleCarrito++}`)
                    let divPote = document.createElement("div");
                    divPote.classList.add("poteCreado");
                    divPote.innerHTML = `
                    <img src="${imagen}" alt="">
                    <h4>${peso} - Precio: $<span class ="precio">${precio}</span></h4>
                    <input class="infoPote" type="button" value="info">
                    <input class="eliminarPote" type="button" value="eliminar">`;
                    let divLista = document.createElement("div");
                    divLista.classList.add("listaInfo", "invisible");
                    for (gusto of gustosSeleccionados) {
                        let h6 = document.createElement("h6");
                        h6.innerHTML = gusto;
                        divLista.append(h6)
                    };
                    div.append(divPote)
                    div.append(divLista)

                    let objPote = {
                        img:imagen,
                        peso:peso,
                        precio:precio,
                        gustos: [...gustosSeleccionados],
                        poteNum:contadorEleCarrito
                    }

                    arrayPotes.push(objPote)
                    localStorage.setItem("arrayCarrito", JSON.stringify(arrayPotes))
                    console.log(arrayPotes)

                    carrito.prepend(div)
                    precioPotes(precio);
                    infoPote();
                    eliminarPote();
                    poteElegido.remove()
                    confirmarCarrito.disabled = false
                    vaciarCarrito.disabled = false
                    Toastify({
                        text: "Agregado al carrito",
                        duration: 1000,
                        newWindow: true,
                        gravity: "top",
                        position: "center",
                    }).showToast();
                }
}


        const precioPotes = (precio) => {
            let precioCarrito = document.getElementById("precioCarrito")
            precios.push(precio)
            precioTotal = precios.reduce((acc, precio) => acc + precio, 0)
            precioCarrito.innerHTML = `Su total es de $${precioTotal}`
        }

        const infoPote = () => {
            let infoPote = document.querySelectorAll(".infoPote")
            infoPote.forEach(pote => pote.onclick = () => {
                let padre = pote.parentElement
                let listaInfo = padre.nextElementSibling
                if (listaInfo.classList.contains("invisible")) {
                    listaInfo.classList.remove("invisible")
                } else {
                    listaInfo.classList.add("invisible")
                }
            })
        }

        const eliminarPote = () => {
            let eliminarPote = document.querySelectorAll(".eliminarPote")
            eliminarPote.forEach(pote => pote.onclick = () => {
                let padre = pote.parentElement
                let abuelo = padre.parentElement
                let precio = +(padre.querySelector(".precio").textContent)
                
                let clasePote = abuelo.classList.item(1)
                arrayPotes.splice(clasePote,1)
                console.log(arrayPotes)
                contadorEleCarrito--
                localStorage.setItem("arrayCarrito", JSON.stringify(arrayPotes))
                
                let index = precios.indexOf(precio)
                precios.splice(index, 1)
                precioTotal = precios.reduce((acc, precio) => acc + precio, 0)
                precioCarrito.innerHTML = `Su total es de $${precioTotal}`
                abuelo.remove()
                if (precioTotal == 0) {
                    confirmarCarrito.disabled = true
                    vaciarCarrito.disabled = true
                }
                Toastify({
                    text: "Pote eliminado",
                    style: {
                        background: "rgb(255, 62, 62)",
                    },
                    duration: 1000,
                    newWindow: true,
                    gravity: "top",
                    position: "center",
                }).showToast();
            })
        }

        //Botones confirmar pago, vaciar carrito
        let confirmarCarrito = document.getElementById("confimarCarrito")
        let vaciarCarrito = document.getElementById("vaciarCarrito")
        //variables del form para pagar
        let overlayPago = document.getElementById("overlayPago")
        const vaciar = () => {
            vaciarCarrito.disabled = true
            confirmarCarrito.disabled = true
            let potes = document.querySelectorAll(".pote")
            potes.forEach(pote => pote.remove())
            precios.length = 0
            precioCarrito.innerHTML = `Su total es de $0`
            carrito.classList.add("invisible");
            arrayPotes.length = 0
            contadorEleCarrito = 0
            localStorage.setItem("arrayCarrito", JSON.stringify(arrayPotes))
        }

        vaciarCarrito.onclick = () => {
            vaciar()
            Toastify({
                text: "Carrito Vaciado",
                style: {
                    background: "rgb(255, 62, 62)",
                },
                duration: 1000,
                newWindow: true,
                gravity: "top",
                position: "center",
            }).showToast();
        }

        //Boton confirmar pago abre el form de pago y envio
        confirmarCarrito.onclick = () => {
            overlayPago.classList.remove("invisible")
            let pagar = document.getElementById("precioPago")
            pagar.innerText = `El total a pagar es de: $${precioTotal}`
        }

        //Botones del formulario
        let compraFinal = document.querySelector("#contenedorForm form")
        let cancelarFinal = document.getElementById("btnCancelarFinal")

        //variables
        let metodoPago = document.querySelectorAll("#metodoPago input");
        let metodoEntrega = document.querySelectorAll("#metodoEntrega input");
        let direccionEnvio = document.querySelector("#direccionEnvio input");

        //Boton cancelarFinal
        cancelarFinal.onclick = () => {
            overlayPago.classList.add("invisible")
            metodoPago.forEach(radio => radio.checked = false)
            metodoEntrega.forEach(radio => radio.checked = false)
            direccionEnvio.value = ""
        }

        compraFinal.addEventListener("submit", (e) => {
            e.preventDefault()
            overlayPago.classList.add("invisible")
            vaciar()
            if (metodoEntrega[0].checked === true){
                swal({
                    icon: "/multimedia/local.jpg",
                    imageWidth: 200,
                    imageHeight: 100,
                    title: `Tu pedido esta siendo preparado. Te esperamos!`,
                    button: "Cerrar",
                });
            }else if (metodoEntrega[1].checked === true) {
                swal({
                    icon: "/multimedia/envio.png",
                    imageWidth: 200,
                    imageHeight: 100,
                    title: `Tu pedido esta en camino a ${direccionEnvio.value}`,
                    button: "Cerrar",
                });
            }
        })

        //Botones/input del Ingreso
        let user = document.getElementById("usuario")
        let password = document.getElementById("password")
        let ingresar = document.getElementById("ingresar")
        let overlayRegistro = document.getElementById("overlayRegistro")

        //Botones del registro
        let registrarme = document.getElementById("registrarme")
        let confimarRegistro = document.getElementById("confimarRegistro")
        let cancelarRegistro = document.getElementById("cancelarRegistro")

        //Botones inputs del registro
        let nuevoUsuario = document.getElementById("nuevoUsuario")
        let nuevoPassword = document.getElementById("nuevoPassword")
        let nuevoEmail = document.getElementById("nuevoEmail")
        let nuevoDomicilio = document.getElementById("nuevoDomicilio")

        ingresar.onclick = () => {
            if (user.value === JSON.parse(localStorage.getItem("nuevoUser")).usuario && password.value === JSON.parse(localStorage.getItem("nuevoUser")).password) {
                document.getElementById("saludo").innerText = `Bienvenid@ ${user.value}`
            } else {
                let mensaje1 = document.getElementById("mensaje1");
                mensaje1.innerText = "Error: el usuario/contraseña son incorrectos";
                document.getElementById("saludo").innerText = ""
                setTimeout(() => {
                    mensaje1.innerText = ""
                }, 5000)
            }
        }

        //Boton registrarme solo habilita la ventana para ingresar datos
        registrarme.onclick = () => {
            overlayRegistro.classList.remove("invisible")
        }

        //Boton cancelar el registro, limpia los valores ingresados previamente
        cancelarRegistro.onclick = () => {
            overlayRegistro.classList.add("invisible");
            let inputs = document.querySelectorAll("#datosRegistro input")
            for (input of inputs) {
                input.value = ""
            }
        }

        //Guarda la data del registro en el storage
        confimarRegistro.onclick = () => {
            overlayRegistro.classList.add("invisible");
            let usuarioCreado = {
                usuario: nuevoUsuario.value,
                password: nuevoPassword.value,
                email: nuevoEmail.value,
                domicilio: nuevoDomicilio.value
            }
            localStorage.setItem("nuevoUser", JSON.stringify(usuarioCreado))
        }



        

        //STORAGE DEL CARRITO
        const localCarrito = () =>{
            if (localStorage.getItem("arrayCarrito")){
                let carritoPrevio = JSON.parse(localStorage.getItem("arrayCarrito"))
                carritoPrevio.forEach(obj =>{
                        let div = document.createElement("div");
                        div.classList.add("pote", `${contadorEleCarrito++}`)
                        let divPote = document.createElement("div");
                        divPote.classList.add("poteCreado");
                        divPote.innerHTML = `
                        <img src="${obj.img}" alt="">
                        <h4>${obj.peso} - Precio: $<span class ="precio">${obj.precio}</span></h4>
                        <input class="infoPote" type="button" value="info">
                        <input class="eliminarPote" type="button" value="eliminar">`;
                        let divLista = document.createElement("div");
                        divLista.classList.add("listaInfo", "invisible");
                        for (gusto of obj.gustos) {
                            let h6 = document.createElement("h6");
                            h6.innerHTML = gusto;
                            divLista.append(h6)
                        };
                        div.append(divPote)
                        div.append(divLista)
                        carrito.prepend(div)
                    precioPotes(obj.precio);
                    infoPote();
                    eliminarPote();
                    confirmarCarrito.disabled = false
                    vaciarCarrito.disabled = false
                    arrayPotes = carritoPrevio 
                })}}
        localCarrito()