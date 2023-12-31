// Accesorios globales
const changeClass = ({nodo, classremove, classadd}) => {
  nodo.classList.remove (classremove);
  nodo.classList.add (classadd);
};
const changeId = (actualId, newId) => {
  const llave = document.getElementById (actualId);
  llave.id = newId;
};

const infoWindow = (father, type) =>{
  const window = document.createElement ("section");
  window.id = "windowPopUp";
  window.className = type;
  father.appendChild (window);
};

const contentWriter = (father, message) =>{
  switch (message) {
    case "bienvenida":
      const bienvenida = document.createElement ("p");
      bienvenida.innerHTML = `Bienvenido ${directorio[parseInt(directorio.length-1)].apodo}. Ya registramos sus datos.`;
      father.appendChild (bienvenida);
      break;
    case "pantallaChica":
      const valor = sesionLoad("usuarioLogueado");
      
      const welcome = document.createElement ("h2"); 
      welcome.innerHTML = `¡¡BIENVENIDO ${valor[0].apodo.toUpperCase()}!!`;
      father.appendChild (welcome);
      const lamentaciones = document.createElement ("p");
      lamentaciones.innerHTML = `La consola esta disponible en pantallas que puedan soportar una resolución minima de 1100 x 576. Ingrese desde otro dispositivo`;
      father.appendChild (lamentaciones);  
    break;
    case "about":
      father.width = 5000;
      const content = document.createElement ("article");
      content.className = "consola__window--content";
      content.innerHTML = `<h2>CONCEPTO</h2>
      <p>Hay diferentes formas de aventurarse. El juego propone dos.</p>
      <p>La modalidad travesía invita a perseguir una meta gráfica y concreta para hacer carrera. Llegar antes es importante para ganarle al resto. </p>
      <p>La modalidad petirrojo ofrece la posibilidad de afrontar un dilema adolescente. Tenes que elegir entre varias metas y poner el foco en las experiencias y las interacciones. ¿De qué manera vas a elegir vivir la aventura? ¿Vas a correr hasta el final o vas a detenerte para experimentar y compartir vivencias y aprendizajes? ¿Como sos? ¿Como queres ser?. </p>
      <p>La dinámica del juego propone explorar aspectos, temáticas y situaciones típicas del desarrollo de las personas a lo largo de la infancia y la adolescencia. Resolviendo las diferentes consignas profundizaran en el conocimiento de sí mismos. También podrán desarrollar experiencias de dominio y maestría en el ámbito de lo corporal, la imaginación, el pensamiento y la socialización. Tendrán varias oportunidades para tomar decisiones importantes y para autodefinirse. Todos caminos destinados al fortalecimiento del sí mismo y la autoestima.</p>
      <p>Las emociones son nuestra brújula para brindarnos lo que necesitamos en cada situación. Resolviendo consignas podrán explorar, definir y reflexionar sobre sus vivencias emocionales. Encaminarse a reconocer, apropiarse y modular la expresión de las emociones de una manera adaptativa compartiendo con otros.</p>
      <p>Algunas consignas los invitaran a buscarle sentido a las cosas más cotidianas y otras no tanto. Seran Ocasiones para expresar sus ideas, desarrollar el pensamiento crítico y reflexionar sobre diferentes aspectos de la vida.</p>    
      <p>Habra oportunidades y desafíos para Conocer el propio cuerpo y experimentar con sus posibilidades. Abrirse para ser y expresarse a través del cuerpo, liberarlo, es Una manera de habitarse. </p>   
      <p>Para Violeta aventurarse es también reconectar consigo misma y tomar posición para vivir.</p>`;
      father.appendChild (content);
      break;
    };

};

const colocarPîn = (father, clase) =>{
  const decoracion = document.createElement ("img");
  decoracion.className = clase;
  decoracion.src = "./src/assets/png/Pin.png";
  father.appendChild (decoracion);
};

const closeButton = (father) => {
  const boton = document.createElement ("button");
  boton.value = "salir";
  boton.innerHTML = `OK`;
  father.appendChild (boton);
};

//  FUNCIONES DE MENSAJE.
const windowPopUp = (message, type) =>{
  // CREAR BANNER
  infoWindow (mainBox, type);
  const select = document.getElementById ("windowPopUp");
  
  //DECORANDING
  colocarPîn (select, `${type}__pin`);

  // MENSAJES POSIBLES
  contentWriter (select, message);
  
  // Boton de cierre.
  closeButton (select);
};
const alerta = (id, location, mensaje) =>{
    const spanAlert = document.createElement ("span");
    spanAlert.className = "alert"; 
    spanAlert.id = id;
    spanAlert.innerHTML = mensaje;
    grilla[location].appendChild (spanAlert);
};

// Formularios desde el DOM.
const crearFormulario = (finalidad) => { 
  // Limpieza
    mainBox.innerHTML= ``;

  // Nuevo formulario
  const formulario = document.createElement ("form");
  formulario.className = "logContainer__form";
  formulario.action ="php";
  formulario.method ="post";
  formulario.enctype ="text/plain";
  // Condicion.
  if (finalidad == "crearCuenta") {
    formulario.id = "newUser";
    formulario.innerHTML = 
    `<h1>CREA TU CUENTA Y VOLVETE PARTE DEL MUNDO DE VIOLETA</h1>
    <div class="logContainer__form--div">
      <label for="email">Correo Electronico:</label> 
      <input type="email" placeholder="Inclui el @" id="email"/>
    </div>
    <div class="logContainer__form--div">
      <label for="nombreYApellido">Nombre y apeliido:</label>
      <input type="text" placeholder="Nombre y apellido" id="nombreYApellido" />
    </div>
    <div class="logContainer__form--div">
      <label for="Apodo">Nombre de jugador:</label>
      <input type="text" placeholder="Tu apodo en el juego" id="apodo" />
    </div>
    <div class="logContainer__form--div">
      <label for="password">Contraseña:</label>
      <input type="password" placeholder="TOP SECRET" id="password"/>
    </div>
    <div class="logContainer__form--div">
      <label for="confirmarContraseña">Connfirmar contraseña:</label>
      <input type="password" placeholder="Confirm - VERY TOP SECRET" id="confirmarContraseña" />
    </div>
    <section class="logContainer__form--fin">
      <input type="button" value="Volver" />
      <input type="submit" value="Crear cuenta" />
    </section>`;
  } else if (finalidad == "loguin") {
    formulario.innerHTML = 
    `<h1>LOGUEATE Y EMPEZA TU AVENTURA.</h1>   
    <div class="logContainer__form--div">
      <label for="correoIn">Correo Electronico</label>
      <input type="text" placeholder="Inclui el @" id="correoIn" />
    </div>
    <div class="logContainer__form--div">
      <label for="contraseñaIn">Contraseña</label>
      <input type="password" placeholder="top secret" name="" id="contraseñaIn" />
    </div>
    <section class="logContainer__form--fin">
      <input type="button" value="Registrarme" />
      <input type="button" value="Iniciar sesión" />
    </section>`;
  };
  mainBox.appendChild (formulario);
};
