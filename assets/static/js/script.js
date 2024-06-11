document.addEventListener('DOMContentLoaded', ()=>{
    
    //captura formulario
    const formNewProducts = document.querySelector('.form-products');
    //capturar boton clean
    const buttonClean = document.querySelector('.button-clean');

    const contenedorProductos = document.querySelector('.container-products');
    
    //conexion de api simulada
    const nameRequest = async()=>{
        try{
            const response = await fetch("http://localhost:3000/productos");
            const _json = await response.json();
            return _json;
        }catch(error){
            throw 'Error';
        }
    };
    nameRequest()
    .then(_json => {
        _json.forEach(element =>{
            let nombre = element.nombre;
            let precio = element.precio;
            let img = element.imagen;

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

            contenedorProductos.appendChild(_divFicha);
            _divFicha.appendChild(_divContainerImg);
            _divContainerImg.appendChild(_img);
            _divFicha.appendChild(_h3TitleProduct);
            _divFicha.appendChild(_pPrice);
            _divFicha.appendChild(_trashButton);

            _img.setAttribute('src', img); 
            _img.setAttribute('alt', nombre); 
            _h3TitleProduct.textContent = nombre;
            _pPrice.textContent = precio;
    
        })
        //capturar boton trash
        const trashButtons = document.querySelectorAll('.trash-button');
        function buttonTrashFunction(){
            // Iterar sobre cada botón y añadir un event listener para el clic
            trashButtons.forEach(button => {
                button.addEventListener('click', () => {
                    console.log('se oprimio')
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
    })
    .catch(error => console.log(error));
    
    function cleanForm(){
        buttonClean.addEventListener('click', ()=>{
            formNewProducts.reset();
        });
    };
    cleanForm();
});

