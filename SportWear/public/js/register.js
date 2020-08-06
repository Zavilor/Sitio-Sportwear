window.addEventListener('load', function(){
    let formRegister = document.querySelector('form.formRegister');
    
    formRegister.onsubmit = function (event){
        
        let campoNombre = document.querySelector('.nombreUsuario');
        
        if (campoNombre.value == ''){
            event.preventDefault();
            alert('el campo nombre tiene que estar completo')
            campoNombre.classList.add('is-invalid')            
        }
        else if(campoNombre.value.length < 3){
            event.preventDefault();
            alert('el nombre debe tener al menos 3 caracteres')
            campoNombre.classList.add('is-invalid') 
        }
        
        let campoApellido = document.querySelector('#apellido');
        
        if (campoApellido.value == ''){
            event.preventDefault();
            alert('el campo Apellido tiene que estar completo')
            campoApellido.classList.add('is-invalid')            
        }
        else if(campoApellido.value.length < 3){
            event.preventDefault();
            alert('el campo Apellido debe tener al menos 3 caracteres')
            campoApellido.classList.add('is-invalid') 
        }
        
        let campoEmail = document.querySelector('#email');
        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i 
        
        
        
        if (!regexEmail.test(campoEmail.value)){
            event.preventDefault();
            //cancelo el comportamiento por defecto
            campoEmail.classList.add('is-invalid');
            //agrego la clase, que enmarca el inpu en rojo
            alert('email invalido')
            //mensaje de error
        }
        
        
        let campoContraseña = document.querySelector('.password')//agregar clase 'password' al html
        
        if (campoContraseña.value.length < 5){
            event.preventDefault();
            campoContraseña.classList.add('is-invalid');
            alert('la Contraseña debe tener al menos 5 caracteres')
        }
        
        
        let campoConfirmar = document.querySelector('.confirmarPassword');
        
        if (campoConfirmar.value != campoContraseña.value){
            event.preventDefault();
            campoConfirmar.classList.add('is-invalid');
            alert('Las dos contraseñas deben coincidir')
            
        }
    }        
})
