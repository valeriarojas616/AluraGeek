import { conexionAPI } from "/assets/static/js/conexionAPI.js";

document.addEventListener('DOMContentLoaded', ()=>{

    //tomamos la etiqueta que tendra un nuevo contenido
    const fichaProducts = document.querySelector('.container-products');

    function crearFicha(nombre, precio, imagen){
        //creando etiquetas div y su nombre de clase 
        let _divFicha = document.createElement('div');
        _divFicha.className='container-product-ficha';
        //añadiendo el contenido al nuevo div
        _divFicha.innerHTML=`
        <div class="container-product-img">
            <img class="img-product" src="${imagen}" alt="${nombre}">
        </div>
        <h3 class="product-name">${nombre}</h3>
        <p class="product-price-ficha">$${precio}</p>
        <button class="trash-button"></button>`
        //retornar la nueva ficha
        return _divFicha;
    };
    async function capturarProductos(){
        try {
            //aislamos los datos de la conexion en una variable
            const listaAPI = await conexionAPI.listaProductos();
            //para cada valor de los datos de la conexion tomamos la etiqueta ficha y le agregamos una etiqueta hija con los datos que faltan
            listaAPI.forEach(producto => fichaProducts.appendChild(crearFicha(producto.nombre, producto.precio, producto.imagen)));
            //capturamos error si no se mandan los datos de la api
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };
    capturarProductos()//sin cerrar el llamado a la funcion con ";" agregamos ".then"

    .then(listaAPI=>{
        //capturar botones trash
        const trashButtons = document.querySelectorAll('.trash-button');
            
        function buttonTrashFunction(){
            // Iterar sobre cada botón y añadir un event listener para el click
            trashButtons.forEach(button => {
                button.addEventListener('click', () => {

                    console.log('boton basura');
                    //tomar el elemento donde se añadira nuevo contenido
                    const documentoPrincipal = document.querySelector('main');

                    //declarar el elemento que se añade
                    const ventanaEmergente = `<div class="alert-window" id="confirm-trash">
                    <div class="alert-window-content">
                        <p class="alert-window-title">¿Eliminar este producto?</p>
                        <div class="section-buttons-alert">
                            <button class="alert-window-button" id="confirm-yes">Sí</button>
                            <button class="alert-window-button" id="confirm-no">No</button>
                        </div>
                    </div>
                </div>`
                //introducir elemento
                documentoPrincipal.insertAdjacentHTML('beforeend', ventanaEmergente);

                // Añadir event listeners a los botones dentro de la ventana emergente
                document.getElementById('confirm-yes').addEventListener('click', () => {
                    // Acción para eliminar el producto
                    document.querySelector('.container-product-ficha').remove();
                    //cerrar ventana emergente
                    document.getElementById('confirm-trash').remove();
                });

                document.getElementById('confirm-no').addEventListener('click', () => {
                    // Cerrar la ventana emergente sin eliminar
                    document.getElementById('confirm-trash').remove();
                });
                
                });
            });
        };
        buttonTrashFunction();
    }); 

});