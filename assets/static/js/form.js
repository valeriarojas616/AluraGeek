document.addEventListener('DOMContentLoaded', ()=>{

    function camposFormulario(){
        
        const dataForm = document.querySelectorAll('input[type="text"]');
        const nameForm = document.querySelector('input[name="name"]');
        if(!nameForm){
            console.log('escribe nombre');
        }else{
            console.log(nameForm);
        }
    }
    camposFormulario();

});