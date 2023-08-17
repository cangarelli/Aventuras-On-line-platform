//  FUNCIONES DE MENSAJE
const cartel = (mensaje) =>{
    // CREAR BANNER
    const banner = document.createElement ("section");
    banner.className = "cartelito";
    banner.id = "banner";
    cuerpo[0].appendChild(banner);
    const select = document.getElementById ("banner");
    
    //DECORANDING
    const decoracion = document.createElement ("img");
    decoracion.className = "pin";
    decoracion.src = fuente[0].dir;
    select.appendChild (decoracion);
    
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
    formulario.className = "container__form";
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
