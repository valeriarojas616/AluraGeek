import { conexionAPI } from "/assets/static/js/conexionAPI.js";

const form = document.querySelector('[data-formulario]');

async function crearProducto(event){

    event.preventDefault();

    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const imagen = document.querySelector('[data-imagen]').value;
    
    await conexionAPI.enviarProducto(nombre,precio,imagen);

    /*Redireccionar
    window.location.href"../asets/index.html"
    */
}

form.addEventListener('submit', event=> crearProducto(event));