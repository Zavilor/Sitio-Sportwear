window.addEventListener('load', function(){
    let formularioLogin = document.querySelector('form.formularioLogin'); 
    //agrego esa clase al form login del ejs(formularioLogin)
    
    let campoEmail = formularioLogin.querySelector('input.email');
    let campoPass = formularioLogin.querrySelector('input.verPassword');
    //toma el input con id =email/password

    formularioLogin.onsubmit = function (event) {
    //funciona cuando le doy click al boton submit
        
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    //regexEmail es el formato que debe adoptar el input Email (name@algo.com)

        if (!regexEmail.test(campoEmail.value)){
        event.preventDefault();
        //cancelo el comportamiento por defecto
        campoEmail.classList.add('is-invalid');
        //agrego la clase, que enmarca el inpu en rojo
        alert('email invalido')
        //mensaje de error
        }
    
    
    let verPassword = formularioLogin.querySelector('.verPassword')

     if (verPassword.value.length < 5){
         event.preventDefault();
         campoPass.classList.add('is-invalid');
         alert('la contraseña debe tener al menos 5 caracteres')
     }       
   /* 
    verPassword.onmousedown = () => {
        campoPass.type = 'text';
    }   
    verPassword.onmouseup = () => {
        campoPass.type = 'password';
    }   


   verPassword.onclick = function() {

    if (campoPass.type.contains("password")){        
        campoPass.type.toggle('text')
    }else{
        campoPass.classList.toggle('password')
        }
    }
    */
    }
})


