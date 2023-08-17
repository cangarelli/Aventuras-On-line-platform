//  FUNCIONES DE MENSAJE
const cartel = async (mensaje) =>{
    // CREAR BANNER
    const banner = document.createElement ("section");
    banner.className = "cartelito";
    banner.id = "banner";
    cuerpo[0].appendChild(banner);
    const select = document.getElementById ("banner");
    
    //ACA PUSE EL FETCH.
    let fuente = []

    await fetch (`../assets/almacen.json`)
        .then (response => response.json())
        .catch((error) => {
            console.log('Ocurrió un error:', error)
          })
        .then  (almacen => {
            console.log (almacen)
            fuente.push (...almacen) 
            console.log (`${fuente[0].dir}`)
            const decoracion = document.createElement ("img");
            decoracion.className = "pin";
            decoracion.src = fuente[0].dir;
            select.appendChild (decoracion);});
    
    // MENSAJES POSIBLES
    if (mensaje == "bienvenida") {
        const bienvenida = document.createElement ("p");
        bienvenida.innerHTML = `Bienvenido ${directorio[parseInt(directorio.length-1)].apodo}. Ya registramos sus datos.`;
        select.appendChild (bienvenida);
    } else if (mensaje == "pantallaChica") {
        const valor = sesionLoad("usuarioLogueado");
    
        const bienvenida = document.createElement ("h2");
        bienvenida.innerHTML = `¡¡BIENVENIDO ${valor.apodo.toUpperCase()}!!`;
        select.appendChild (bienvenida);
        const lamentaciones = document.createElement ("span");
        lamentaciones.innerHTML = `La consola esta disponible en pantallas que puedan soportar una resolución minima de 1100 x 576. Ingrese desde otro dispositivo`;
        select.appendChild (lamentaciones);
    
        sessionStorage.removeItem ("usuarioLogueado");
    }else {
        // ACTUALIZAR DIRECTORIO
        directorio = sesionLoad ("directory");
        //CREAR MENSAJE
        for (const renglon of mensaje) {
            const agenda = document.createElement ("p");
            agenda.innerHTML = `${renglon}`;
            select.appendChild (agenda);
        };
    }
    // Boton de cierre.
    const boton = document.createElement ("button");
    boton.value = "salir";
    boton.innerHTML = `OK`;
    select.appendChild (boton);
};
const alerta = (id, location, mensaje) =>{
    const spanAlert = document.createElement ("span");
    spanAlert.className = "alert"; 
    spanAlert.id = id;
    spanAlert.innerHTML = mensaje;
    grilla[location].appendChild (spanAlert);
};

// Formularios desde el DOM
const crearFormulario = (finalidad, limpieza) => {
    // Limpieza
    if (limpieza != false) {
        const aBorrar = document.getElementsByTagName ("form")
        aBorrar[0].remove();
    }

    // Nuevo formulario
    const formulario = document.createElement ("form");
    formulario.className = "crearCuenta__form";
    formulario.action ="php";
    formulario.method ="post";
    formulario.enctype ="text/plain";
    // Condicion.
    if (finalidad == "crearCuenta") {0
        formulario.id = "newUser";
        formulario.innerHTML = 
    `<div class="crearCuenta__form--div">
    <label for="email">Correo Electronico:</label> 
    <input type="email" placeholder="Inclui el @" id="email"/>
  </div>
  <div class="crearCuenta__form--div">
    <label for="nombreYApellido">Nombre y apeliido:</label>
    <input type="text" placeholder="Nombre y apellido" id="nombreYApellido" />
  </div>
  <div class="crearCuenta__form--div">
    <label for="Apodo">Nombre de jugador:</label>
    <input type="text" placeholder="Tu apodo en el juego" id="apodo" />
  </div>
  <div class="crearCuenta__form--div">
    <label for="contraseña">Contraseña:</label>
    <input type="password" placeholder="TOP SECRET" id="contraseña"/>
  </div>
  <div class="crearCuenta__form--div">
    <label for="confirmarContraseña">Connfirmar contraseña:</label>
    <input type="password" placeholder="Confirm - VERY TOP SECRET" id="confirmarContraseña" />
  </div>
  <section class="crearCuenta__form--fin">
    <input class="imputButton" type="button" value="Volver" />
    <input class="imputButton" type="submit" value="Crear cuenta" />
    <input class="imputButton" id="borrable" type="button" value="Ver agenda" />
  </section>`;
    } else if (finalidad == "loguin") {
        formulario.innerHTML = 
        `<h2>LOGUEATE Y EMPEZA TU AVENTURA.</h2>   
        <div class="crearCuenta__form--div">
            <label for="correoIn">Correo Electronico</label>
            <input type="text" placeholder="Inclui el @" id="correoIn" />
        </div>
        <div class="crearCuenta__form--div">
           <label for="contraseñaIn">Contraseña</label>
           <input type="password" placeholder="top secret" name="" id="contraseñaIn" />
        </div>
        <section class="crearCuenta__form--fin">
          <input type="button" value="Registrarme" />
          <input type="button" value="Iniciar sesión" />
      </section>`;
    }
    cuerpo[0].appendChild (formulario);
};

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
        ventana == null && cartel ("bienvenida");

        // Cerrar formulario 
        crearFormulario ("loguin")
    } else {
        console.log (`No se registro un nuevo usuario. ${prim}, ${seg}, ${terc}, ${cuart}`);
    };
};

// FUNCIÓN DE CONTROL
const verAgenda = () => {
    let agenda = [];
    agenda.push("La siguiente es una lista de los usuarios registrados hasta la fecha en el directorio de la aplicación:");
    directorio = sesionLoad ("directory");
    directorio.forEach(objeto => {
        agenda.push(`${objeto.nombre} tiene por correo: ${objeto.correo}. Le decimos ${objeto.apodo} y su contraseña ya es top secret, very secreta. No la revelaremos.`);
    });
    const ventana = document.getElementById  ("banner");
    ventana == null && cartel (agenda);
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
            cartel ("pantallaChica");
         } else {
            CrearConsola (); 
        }

    };
};

const logOut = () => {
    game = "";
    cuerpo[0].className = "crearCuenta"
    cuerpo[0].innerHTML = 
    `<h1>CURSO DE JAVASCRIPT.</h1>
    <h2>Garelli Carlos Andrés | Proyecto final</h2>`;
    crearFormulario ("loguin", false);
};