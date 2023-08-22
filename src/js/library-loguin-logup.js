// FUNCIONES PARA USUARIO
const userControlUno = (value) => {
    let user = value;
    user = user.toUpperCase()
    const spanAlert = document.getElementById ("errorUser") 
    if (user.length < 4) {
        spanAlert == null && alerta ("errorUser", 1, `El nombre debe tener por lo menos 4 caracteres`);
        return (" ");
    } else  {
        spanAlert != null && spanAlert.remove();        
        return (user);
    };
};
const userControlDos = (user) => {
    let usercheck = directorio.map (function (objeto) {
        return (objeto.nombre);
    })
    const spanAlert = document.getElementById ("errorUser") 
    if (usercheck.includes(user)) {
        spanAlert == null && alerta ("errorUser", 1, `Este usuario ya esta registrado. Pruebe ingresar otro.`);
        return (" ");
    } else {
        spanAlert != null && spanAlert.remove();
        return (user);
    }
};
const registrarUser = (value) => {    
    let usuario = " ";
    usuario = userControlUno(value);
    if (usuario != " ") {
        usuario = userControlDos(usuario);
    }
    return (usuario);
};

// FUNCIONES PARA MAIL
const controlMail = (mail) => {
    const spanAlert = document.getElementById ("errorMail") 
    if (mail.includes("@") && mail.includes(".com") && mail.length > 3) {
        spanAlert != null && spanAlert.remove();
        return (mail);
    } else {
        spanAlert == null && alerta ("errorMail", 0,`Correo invalido. Recuerde ingresar la dirección completa.`);
        return (" ");
    }
};
const controlMailDos = (mail) => {
    let mailcheck = directorio.map (function (objeto) {
        return (objeto.correo);
    })
    const spanAlert = document.getElementById ("errorMail") 
    if (mailcheck.includes(mail)) {
        spanAlert == null && alerta ("errorMail", 0, `Este correo ya esta registrado. Pruebe ingresar otro.`);
        return (" ");
    } else {
        spanAlert != null && spanAlert.remove();
        return (mail);
    }
};
const registrarMail = (value) => {
    correoElectronico = " ";
    correoElectronico = controlMail(value);
        if (correoElectronico != " ") {
            correoElectronico = controlMailDos (correoElectronico);
        }     
    return (correoElectronico);
};

// FUNCIONES PARA CONTRASEÑA 
const controlPassUno = (pass1) => {
    const spanAlert = document.getElementById ("errorPass");
    if (pass1.length <= 5 )  {
        spanAlert == null && alerta ("errorPass", 3, `Ingrese una contraseña de más de 5 caracteres.`);
        return (" ");
    } else {
        spanAlert != null && spanAlert.remove();
       return (pass1);
    };
};
const registrarContraseña = (passorginal, passCheck) => {
    pass1 = controlPassUno (passorginal);
    const spanAlert = document.getElementById ("errorPassChek");
    if (pass1 != " ") {
        spanAlert != null && spanAlert.remove();
        if (pass1 === passCheck) {
            spanAlert != null && spanAlert.remove();
            return (pass1);
        } else{
            spanAlert == null && alerta ("errorPassChek", 4, `Contraseñas diferentes, revise las contraseñas ingresadas.`);
            return (" ");
        };
    } else {
        spanAlert == null && alerta ("errorPassChek", 4, `Las contraseñas ingresadas no cumplen con los requisitos.`);

        return (" ");
    };
};

// FUNCIONES DE REGISTRO EN SESION.JSON
const sesionSave = (clave, valor) => {
    let directorioJSON = JSON.stringify (valor);
    sessionStorage.setItem (clave, directorioJSON);
};
const sesionLoad = (clave) => {
    let arrayData = sessionStorage.getItem (clave);
    let directorioJSON = JSON.parse(arrayData);
    if (directorioJSON != null) {
        return (directorioJSON);
    } else {
        return (directorio);
    };    
};

// FUNCION DE REGISTRO.
const registrarPersona = () => {
    // Recuperar inputs
    const pass1 = document.getElementById ("contraseña");
    const passcheck = document.getElementById ("confirmarContraseña");
    const mail = document.getElementById ("email");
    const user = document.getElementById ("nombreYApellido");
    const apodo = document.getElementById ("apodo");

    // Recuperando directorio de la sesion.
    directorio = sesionLoad ("directory");

    // Ejecución de funciones de la biblioteca
    let prim = registrarMail(mail.value);
    let seg = registrarUser(user.value);
    let terc = apodo.value;
    let cuart = registrarContraseña (pass1.value, passcheck.value);

    if (prim != " " && seg != " " && terc != " " && cuart != " ") {

        // Generar usuario
        directorio.push(new Persona(prim, seg, terc, cuart));

        // Guardar usuario.
        sesionSave ("directory", directorio);
        
        //Enviar correo
        enviarCorreo ();

        // Mensaje de bienvenida.
        const ventana = document.getElementById  ("banner");
        ventana == null && windowPopUp ("bienvenida");

        // Cerrar formulario 
        crearFormulario ("loguin")
    } else {
        console.log (`No se registro un nuevo usuario. ${prim}, ${seg}, ${terc}, ${cuart}`);
    };
};

// FUNCIONES DE VERIFICACIÓN DE USUARIO
const verfyMail = () => {
    // Variables de la funcion
    const passInput = document.getElementById ("correoIn");
    const spanAlert = document.getElementById ("mailFake")
    let indice = "";
    let correos = directorio.map (function (objeto) {
        return (objeto.correo); 
    })

    // Validación
    if (correos.includes(passInput.value)) {
        directorio.forEach ((objeto, index) => {
            objeto.correo == passInput.value && (indice = parseInt(index));
        })
        spanAlert != null && spanAlert.remove();
        return (indice);
    } else {
        spanAlert == null && alerta ("mailFake", 0, `El correo ingresado no figura en la base de datos`);
        return (-1);
    }
};
const verfyPass = (index) => {
   // Variables de la funcion.
   const passInput = document.getElementById ("contraseñaIn");
   const spanAlert = document.getElementById ("passFake");

   // Validación
   if (index >= 0) {
        spanAlert != null && spanAlert.remove();
        if (passInput.value == directorio[index].contrasena) {
            spanAlert != null && spanAlert.remove();
            return (index);
        } else {
            spanAlert == null && alerta ("passFake", 1, `Contraseña incorrecta.`);
            return (-1);
        } 
    } else {
        spanAlert == null && alerta ("passFake", 1, `Para chequear la contraseña tenes que ingresar un correo valido.`);
        return (-1);
    };
};

// Loguin/out
const logIn = () => {
    directorio = sesionLoad ("directory");
    let data = " ";
    let target = verfyMail ();
    target= verfyPass (target);
    
    //Recuperar datos del usuario
    target >= 0 && (data = new Persona(directorio[target].correo, directorio[target].nombre, directorio[target].apodo, null));

    //Sesionar datos y cambiar dom.
    if (data != " ") {
        //Gestion de sesion
        const condition = sesionLoad ("usuarioLogueado");
        condition != directorio && sessionStorage.removeItem ("usuarioLogueado");

        sesionSave ("usuarioLogueado", data);

        //Gestionar DOM
        if (screen.width <= 1100 || screen.height <= 576) {
            windowPopUp ("pantallaChica");
         } else {
            CrearConsola (); 
        }
    };
};

const logOut = () => {
    game = "";
    mainBox.className = "container"
    mainBox.innerHTML = 
    `<h1>EL MUNDO DE AVENTURAS DE VIOLETA</h1>`;
    crearFormulario ("loguin", false);
};