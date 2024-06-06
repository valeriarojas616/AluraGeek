document.addEventListener('DOMContentLoaded', ()=>{
    //capturar boton
    const trashButton = document.querySelectorAll('.trash-button');

    // Iterar sobre cada botón y añadir un event listener para el clic
    trashButton.forEach(button => {
        button.addEventListener('click', () => {
            // Mostrar una confirmación al usuario
            const userConfirmed = confirm('¿Deseas eliminar este producto?');

            // Si el usuario confirma, eliminar el contenedor padre
            if (userConfirmed) {
                // Capturar el contenedor ficha más cercano
                const containerProductFicha = button.closest('.container-product-ficha');

                // Eliminar el contenedor padre
                if (containerProductFicha) {
                    containerProductFicha.remove();
                }
            }
        });
    });
});

