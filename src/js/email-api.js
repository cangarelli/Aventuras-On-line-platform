const enviarCorreo = () => {
    (function() {
        emailjs.init('iIbYjQIaVTd-Tz7SC');
    })();
    
    let parametros = {
        user: document.getElementById ("apodo").value , 
        mail: document.getElementById ("email").value ,
        contraseña: document.getElementById ("contraseña").value ,
    };
    const serviceID = "servicio-de-contacto";
    const templateID = "Nueva-cuenta";

    emailjs.send(serviceID, templateID, parametros)
        .then((response) => {console.log('SUCCESS!', response.status, response.text)})
        .catch((error) => {console.log('FAILED...', error)});
};
