document.addEventListener('DOMContentLoaded', ()=>{
    //capturar boton
    const trashButtons = document.querySelectorAll('.trash-button');

    function buttonTrashFunction(){
        // Iterar sobre cada botón y añadir un event listener para el clic
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
});

