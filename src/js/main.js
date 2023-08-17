// ESCUCHA DE EVENTOS Y CONTROL ONLINE
cuerpo[0].addEventListener("change", (e) => { 
    directorio = sesionLoad ("directory");
    switch (e.target.id) {
        case "email":
            registrarMail (e.target.value);
        break;
        case "nombreYApellido":
            registrarUser (e.target.value);
            break;
        case "apodo":
            break;
        case "contraseña":
            controlPassUno (e.target.value);
            break;
        case "confirmarContraseña":
            pass1 = document.getElementById ("contraseña") 
            registrarContraseña(pass1.value,e.target.value);
            break;
    };
});
cuerpo[0].addEventListener("click", (e) => {
    switch (e.target.value) {
        case "Registrarme":
            crearFormulario ("crearCuenta");
            break;
        case "Volver":
            crearFormulario ("loguin")
            break;
        case "Iniciar sesión":
            logIn();
            break;
        case "Crear cuenta":
            registrarPersona (); 
            break;
        case "Ver agenda":
            verAgenda();
            break; 
        case "salir": 
            let select = document.getElementById ("banner");
            select.remove();
            break;
    };
    switch (e.target.id) {
        case "exit":
            logOut ();
            break;
        case "about":
            makeItHapend ();
            break;    
    }
});
