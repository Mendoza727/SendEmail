

//variables 
const emailInputDom = document.querySelector('#email');
const asuntoInputDom = document.querySelector('#asunto');
const msgInputDom = document.querySelector('#mensaje');
const formDom = document.querySelector('#formulario');
const bntSubmitFormDom = document.querySelector('#formulario button[type="submit"]');
const bntResetFormDom = document.querySelector('#formulario button[type="reset"]');
const spinner = document.querySelector('#spinner');
const email = {
    email: '',
    asunto: '',
    mensaje: ''
}


//metodos 
document.addEventListener('DOMContentLoaded', () => {
    console.log('contenido cargado correctamente');

    //selecciono los elementos de la interfaz

    emailInputDom.addEventListener('input', validateInput);
    asuntoInputDom.addEventListener('input', validateInput);
    msgInputDom.addEventListener('input', validateInput);
    formDom.addEventListener('submit', sendEmail);
    bntResetFormDom.addEventListener('click', function(e) {
        e.preventDefault();

        resetForm();
    });
});

//funciones

function validateInput(e){  
    if( e.target.value.trim() === '' ){
        showErrorAlert(`el campo ${e.target.id} es obligatorio`, e.target.parentElement);
        email[e.target.name] = '';
        findOutEmail();
        return;
    }
    if(e.target.id === 'email' && !validateEmail(e.target.value) ) {
        showErrorAlert('el email no es valido', e.target.parentElement);
        email[e.target.name] = '';
        findOutEmail();
        return;
    }
    clearAlertError(e.target.parentElement);

    //asignar los valores al objeto
    email[e.target.name] = e.target.value.trim().toLowerCase();

    //comprobamos el objeto de email
    findOutEmail();
}

function showErrorAlert(msg, reference){

    clearAlertError(reference);

    const error = document.createElement('p');
    error.textContent = msg;
    error.classList.add('bg-red-400', 'p-2', 'rounded-lg', 'mt-4', 'font-bold', 'text-white', 'text-center');
    reference.appendChild(error);
}

function clearAlertError(reference){
    //comprueba si ya existe la alerta
    const alert = reference.querySelector('.bg-red-400'); 
    if(alert){
        alert.remove();
    }
}

function validateEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const validate = regex.test(email);
    return validate;
}

function findOutEmail(){
    if( Object.values(email).includes('')) {
        bntSubmitFormDom.classList.add('opacity-50');
        bntSubmitFormDom.disabled = true;
        return;
    }
    bntSubmitFormDom.classList.remove('opacity-50');
    bntSubmitFormDom.disabled = false;
}

function sendEmail(){
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        
        //reiniciando el objeto
        resetForm();
        
        const alertSuccess = document.createElement('p');
        alertSuccess.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg',
        'mt-10','font-bold', 'text-sm', 'uppercase');
        alertSuccess.textContent = 'Correo enviado correctamente';
        
        formDom.appendChild(alertSuccess);

        setTimeout( () => {
            alertSuccess.remove();
        }, 3000);
    }, 10000);     
}


function resetForm(){
     //reiniciando el objeto
     email.email = '';
     email.asunto = '';
     email.mensaje = '';

     formDom.reset();

     //comprobamos campos nuevamente
     findOutEmail();
}