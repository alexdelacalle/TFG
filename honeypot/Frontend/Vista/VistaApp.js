import App from "../Controladores/App.js"
import ControladorUsuario from "../Controladores/ControladorUsuario.js"
import Carrusel from "../Utils/Carrusel.js"
export default class VistaApp {
    constructor() {
        this.controladorUsuario = new ControladorUsuario(this);
        this.app = new App(this);
        this.#seleccionarElementosDOM();
        this.#asociarEventos();
        this.carrusel = new Carrusel();
        this.inicializar()
    }

    async inicializar() {

        await this.inicializarCarruseles(); 
        this.cargarOpcionesUsuario(); 

    }

    #seleccionarElementosDOM() {
        const $ = (selector) => document.querySelector(selector);

        this.overlay = document.querySelector(".overlay");
        this.botonCerrar = $("#cerrarLogin");
        this.botonLogin = $("#login-bottom");
        this.botonLogout = $("#logout-bottom");
        this.botonPerfil = $("#perfil-bottom");
        this.botonCambiarFormularioRegistro = $("#cambiar-formulario-registro");
        this.botonCambiarFormularioLogin = $("#cambiar-formulario-login");
        this.botonPanelControl = $("#ver-panel");
        this.botonIniciarSesion = $("#login .form-btn");
        this.botonRegistrarse = $("#registro .form-btn");
        this.dropdownMenu = $("#dropdown-menu");
        this.botonVerPerfil = document.querySelector("#ver-perfil");
        
    }

    async inicializarCarruseles() {
        const carruselPersonas = document.getElementById("carrusel1");
        const carruselProductos = document.getElementById("carrusel2");
        const carruselEntidades = document.getElementById("carrusel3");
        const carruselAsociaciones = document.getElementById("carrusel4");

        const personas = await this.app.getListaPersonas();
        const entidades = await this.app.getListaEntidades();
        const productos = await this.app.getListaProductos();
        const asociaciones = await this.app.getListaAsociaciones();
        this.agregarItemCarrusel(carruselPersonas, personas, 'persona');
        this.agregarItemCarrusel(carruselEntidades, entidades, 'entidad');
        this.agregarItemCarrusel(carruselProductos, productos, 'producto');
        this.agregarItemCarrusel(carruselAsociaciones, asociaciones, 'asociacion');

    }

    agregarItemCarrusel(carrusel, items, objeto) {
        if (carrusel.children.length === 0) {
            carrusel.innerHTML = "";
        }
        items.forEach(item => {
            
        const slide = document.createElement("div");
        slide.classList.add("slide");
        
        slide.innerHTML = `
            <h1>${item.nombre}</h1>
            <img src="${item.imagen}" alt="Imagen">
            <div class="slide-content">
                <a href="./${objeto}.html?id=${item.id}" class="ver-mas">Ver más</a>
                
            </div>
        `;
        carrusel.appendChild(slide);
        });
    }

    

    
    
    #asociarEventos() {
        this.botonLogin?.addEventListener("click", () => this.mostrarLogin());
        this.botonCerrar?.addEventListener("click", () => this.cerrarLogin());
        this.botonIniciarSesion?.addEventListener("click", () => this.iniciarSesion());
        this.botonRegistrarse?.addEventListener("click", () => this.registrarse());
        this.botonCambiarFormularioRegistro?.addEventListener("click", () => this.mostrarRegistro());
        this.botonCambiarFormularioLogin?.addEventListener("click", () => this.mostrarLogin());

        this.botonLogout?.addEventListener("click", () => {
            this.app.logout();
            this.cambiarLogoSesion();
            this.ocultarDetalles();
        });

        this.botonPerfil.addEventListener("click", () => {
            this.dropdownMenu.style.display = 
                this.dropdownMenu.style.display == "block" ? "none" : "block";
            
        });

        this.botonVerPerfil?.addEventListener("click", () => {
            let id = this.app.getIdUsuario();
            console.log(id)
            if (!id) {
                this.enviarMensaje("No se encontró el ID del usuario.");
                return;
            }
            window.location.href = `/HTML/perfil.html?id=${id}`; 
        });

        this.botonPanelControl?.addEventListener("click", () => {
            window.location.href = "/HTML/dashboard.html";
        });
    }

    
    visualizarDetalles() {
        document.querySelectorAll(".ver-mas").forEach(boton => {
            boton.style.display =  "block";
        })
    }

    ocultarDetalles(){
        document.querySelectorAll(".slide-content a").forEach(boton => {
            boton.style.display =  "none";
        })
    }

    
    async iniciarSesion() {
        const nombre = document.getElementById("usuario-login").value;
        const contrasenia = document.getElementById("contrasena-login").value;

        const resultado = await this.app.login(nombre, contrasenia);
        if (resultado.success) {

            this.cerrarLogin();
            this.cargarOpcionesUsuario();
        } else {
            this.enviarMensaje(resultado.message);
        }
    }

    async registrarse() {
        const nombre = document.getElementById("usuario-registro").value;
        const contrasenia = document.getElementById("contrasena-registro").value;
        const confirmar = document.getElementById("confirmar-contrasena").value;
        const email = document.getElementById("email-registro").value;

        if (contrasenia !== confirmar) {
            this.enviarMensaje("Las contraseñas no coinciden.");
            return;
        }

        const creado = await this.app.registro(nombre, email, contrasenia);
        if (creado) {
           
            this.enviarMensaje("Usuario registrado correctamente. Hable con el administrador para aumentar sus privilegios, e inicie sesión");
            this.cargarOpcionesUsuario();
            this.cerrarLogin();
            
        } else {
            this.enviarMensaje(`El usuario ${nombre} ya existe.`);
        }
    }

    #verificarUsuarioDisponible() {
        const input = document.getElementById("usuario-registro");
        if (!input) return;
    
        let mensaje = document.getElementById("mensaje-usuario");
        if (!mensaje) {
            mensaje = document.createElement("span");
            mensaje.id = "mensaje-usuario";
            mensaje.style.marginLeft = "10px";
            mensaje.style.fontSize = "0.9em";
            input.parentNode.insertBefore(mensaje, input.nextSibling);
        }
    
        if (input.dataset.listenerAgregado === "true") return;
    
        let temporizador = null;
    
        input.addEventListener("input", () => {
            clearTimeout(temporizador);
            const nombre = input.value.trim();
    
            if (nombre.length < 3) {
                mensaje.textContent = "";
                return;
            }
    
            temporizador = setTimeout(async () => {
                const existe = await this.app.getUsuarioByNombre(nombre);
                if (existe) {
                    mensaje.textContent = "El nombre de usuario ya existe.";
                    mensaje.style.color = "red";
                } else {
                    mensaje.textContent = "Nombre de usuario disponible.";
                    mensaje.style.color = "green";
                }
            }, 600);
        });
    
        input.dataset.listenerAgregado = "true";
    }
    
    cargarOpcionesUsuario() {
        const usuario = this.app.validarUsuario();
        if (usuario) {
            this.cambiarLogoSesion();
            const roles = this.app.getRoles()
            if (roles[0] == "reader"){
                this.visualizarDetalles()
                if (roles[1] == "writer"){
                    this.habilitarBotonWriter()
                }
            }
        }
    }

    habilitarBotonWriter(){
        document.getElementById("ver-panel").style.display="block"
    }

    cambiarLogoSesion() {
        const usuario = this.app.getUsuarioActual();

        if (usuario) {
            this.botonPerfil.style.display = "flex";
            this.botonLogin.style.display = "none";
        } else {
            this.botonPerfil.style.display = "none";
            this.dropdownMenu.style.display = "none";
            this.botonLogin.style.display = "flex";
        }
    }

    enviarMensaje(msg) {
        alert(msg);
    }

    // === Formularios ===
    mostrarLogin() {
        this.overlay.style.display = "flex";
        this.mostrarLoginForm();
    }

    cerrarLogin() {
        this.overlay.style.display = "none";
    }

    mostrarRegistro() {
        this.#alternarFormularios("registro");
        this.#verificarUsuarioDisponible(); 
    }

    mostrarLoginForm() {
        this.#alternarFormularios("login");
    }

    #alternarFormularios(activo) {
        const login = document.getElementById("login");
        const registro = document.getElementById("registro");

        if (activo === "login") {
            login.style.opacity = "1";
            login.style.pointerEvents = "auto";
            registro.style.opacity = "0";
            registro.style.pointerEvents = "none";
        } else {
            registro.style.opacity = "1";
            registro.style.pointerEvents = "auto";
            login.style.opacity = "0";
            login.style.pointerEvents = "none";
        }
    }

    
}



window.addEventListener('DOMContentLoaded', () => {
    new VistaApp();
});