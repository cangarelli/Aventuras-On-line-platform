//  NAV BAR - ESCUCHA DE EVENTOS Y CONTROL ONLINE
menuNavBar.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "log":
            crearFormulario ("loguin");
            break;
    
        case "logOut":
            logOut ();
            break;
    }
});
// MAIN ----- ESCUCHA DE EVENTOS Y CONTROL ONLINE
mainBox.addEventListener("change", (e) => { 
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
mainBox.addEventListener("click", (e) => {
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
        case "salir": 
            let select = document.getElementById ("windowPopUp");
            select.remove();
            break;
    };
    switch (e.target.id) {
        case "exit":
            logOut ();
            break;
        case "about":
            windowPopUp ("about");
            break;    
    }
});
