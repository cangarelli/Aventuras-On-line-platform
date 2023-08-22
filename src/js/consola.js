// CONFIGURACIÓN DE CONSOLA
const config = {
    width: 1024,
    height: 576,
    parent: "game",
    transparent: true,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// CREAR CONSOLA
const CrearConsola = () => {
    const user = sesionLoad("usuarioLogueado");
    mainBox.className = "consola";
    mainBox.innerHTML = 
    `<div class= "consola__menu">
        <h2>¡¡BIENVENIDO ${user.apodo.toUpperCase()}!!</h2>
        <div>
            <img class="consola__menu--icon" id= "about" src="./src/assets/png/icon-about.png" alt="Acerca del juego" /> 
            <img class="consola__menu--icon" id= "exit" src="./src/assets/png/icon-key.png" alt="Desloguearme" />
        </div>
    </div>
    <div id="game"></div>`;
    game = new Phaser.Game (config);
};

// JUEGO EN CONSTRUCCION
function preload () {
    this.load.image("lamento", "./src/assets/png/lamentacion.png")
    this.load.image("engranaje", "./src/assets/png/config2.png")
};
function create () {
    this.e1 = this.add.image(config.width /2+ 50, config.height / 2 +10, "engranaje")
    this.e1.setRotation (35)
    this.e1.flipX = true;
    this.e2 = this.add.image(config.width /2 -60 , config.height / 2 , "engranaje")
    this.e2.flipX = true;
    this.ups = this.add.image(config.width/2, config.height /2 -100, "lamento")
    this.ups.setScale (0.5)
};
function update (time, delta) {
    this.e1.angle++;
    this.e2.angle--;
};  