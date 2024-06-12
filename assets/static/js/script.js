document.addEventListener('DOMContentLoaded', ()=>{
    
    //captura formulario
    const formNewProducts = document.querySelector('.form-products');
    //capturar boton clean
    const buttonClean = document.querySelector('.button-clean');

    const contenedorProductos = document.querySelector('.container-products');
    
    //conexion de api simulada/ arrow funcion asincrona
    const nameRequest = async()=>{
        try{
            //variable agregada dentro de la funcion/ llamada a la API
            const response = await fetch("http://localhost:3000/productos");
            //variable en espera de la API transformada a json
            const _json = await response.json();
            return _json;
        }catch(error){
            throw 'Error';
        }
    };
    //lamada a la arrow funcion junto con .then
    nameRequest() 
    //dentro de la misma llamada para cada elemento json
    .then(_json => {
        _json.forEach(element =>{
            //variables con la informacion del objeto json de ser necesario podemos disponer de un id ya que se encuentra en la API
            let nombre = element.nombre;
            let precio = element.precio;
            let img = element.imagen;

            //creando etiquetas div y su nombre de clase / almacenandolas en variables
            let _divFicha = document.createElement('div');
            _divFicha.classList.add('container-product-ficha');

            let _divContainerImg = document.createElement('div');
            _divContainerImg.classList.add('container-product-img');

            let _img = document.createElement('img');
            _img.classList.add('img-product');

            let _h3TitleProduct = document.createElement('h3');
            _h3TitleProduct.classList.add('product-name');

            let _pPrice = document.createElement('p');
            _pPrice.classList.add('product-price-ficha');

            let _trashButton = document.createElement('button');
            _trashButton.classList.add('trash-button');

            //Tomando la variable que almacena el div que contiene la seccion de productos le añadimos la variable de la etiqueta ficha
            /* Ejemplo visual
            
            <contenedorProducto>

            <divFicha>  </divFicha>
            
            </contenedorProducto>
            
            */
            contenedorProductos.appendChild(_divFicha);
            //introducimos hijos a las etiquetas para dar la estructura correcta al html

            /* 
            <divFicha>  

            <divContainerImg>   </divContainerImg>

            </divFicha> */
            _divFicha.appendChild(_divContainerImg);
            _divContainerImg.appendChild(_img);
            //Asi sucesivamente
            _divFicha.appendChild(_h3TitleProduct);
            _divFicha.appendChild(_pPrice);
            _divFicha.appendChild(_trashButton);

            //la variable imagen se actualiza con informacion en su etiqueta cambiando el valor de src por la imagen que viene de la API
            _img.setAttribute('src', img);
            //igual que el anterior pero actualizamos la info alt 
            _img.setAttribute('alt', nombre); 
            //agregamos contenido a la etiqueta con textContent y le asignamos el valor de la informacio de la api que corresponde al nombre
            _h3TitleProduct.textContent = nombre;
            //añadimos strings y la variable precio al text content de la etiqueta de precio
            _pPrice.textContent = `$ ${precio}`;
    
        })//se cierra el forEach
        //Dento del mismo then colocamos la funcion del trashButton

        //capturar botones trash
        const trashButtons = document.querySelectorAll('.trash-button');
        
        function buttonTrashFunction(){
            // Iterar sobre cada botón y añadir un event listener para el click
            trashButtons.forEach(button => {
                button.addEventListener('click', () => {
                    //tomar el elemento donde se añadira nuevo contenido
                    const documentoPrincipal = document.querySelector('main');

                    //declarar el elemento que se añade
                    const ventanaEmergente = `<div class="alert-window" id="confirm-trash">
                    <div class="alert-window-content">
                        <p class="alert-window-title">¿Deseas eliminar este producto?</p>
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
    
        /*para llamar al objeto e imprimirlo
                console.log(_json[0].nombre);
        */
    })//se cierra el then, pero sigue dentro de la llamada a la funcion  nameRequest()
    .catch(error => console.log(error));//este ';' finalmente cierra el llamado a la funcion  nameRequest()
    
    //FUNCION PARA LIMPIAR FORMULARIO
    /*function cleanForm(){
        buttonClean.addEventListener('click', ()=>{
            formNewProducts.reset();
        });
    };
    cleanForm();*/
});

