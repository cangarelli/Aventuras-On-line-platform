// Contol de loguin
const isLogued = () => {
    const userLogued = sesionLoad("usuarioLogueado");
    if (mainBox.className == "container" && userLogued.correo != null) {
        // Gestion de llave
        const llave = document.getElementById ("log")
        llave.id = "logOut"
        
        // Gestion de contenedor padre
        mainBox.className == "container" && changeClass ({nodo: mainBox, classremove: "container", classadd: "consolContainer"});
        crearConsola ();
    };
};
isLogued();

//  NAV BAR - ESCUCHA DE EVENTOS Y CONTROL ONLINE
menuNavBar.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "log":
            changeClass ({nodo: mainBox, classremove: "container", classadd: "logContainer"});
            crearFormulario ("loguin");
            break;
        case "logOut":
            logOut ();
            break;
        case "about":
            windowPopUp ("about");
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
        case "password":
            controlPassUno (e.target.value);
            break;
        case "confirmarContraseña":
            pass1 = document.getElementById ("password") 
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
});
