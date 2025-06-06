import ControladorUsuario from '../Controladores/ControladorUsuario.js';
import ControladorAdministrador from '../Controladores/ControladorAdministrador.js';

export default class VistaUsuario {
    constructor() {
        
        this.controladorUsuario = new ControladorUsuario(this);
        this.controladorAdministrador = new ControladorAdministrador(this);
        this.controladorAdministrador = new ControladorAdministrador(this);
        if (!this.controladorAdministrador.validarUsuarioReader()){
            window.location.href = '/HTML/index.html';
        
        }
        this.inicializar();
        

    }



    async inicializar() {
        let idUsuario = this.getParametrosUrl();
        let respuesta = await this.controladorUsuario.getUsuarioById(idUsuario);
        
        let usuario = respuesta?.user;
        if (usuario) {
            this.cargarUsuario(usuario);
            await this.inicializarBotonesEditar();
        } else {
            this.mostrarMensaje("No se encontró el usuario.");
        }
    
    }

    getParametrosUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        return id;
    }

    mostrarMensaje(mensaje) {
        alert(mensaje);
    }


    async inicializarBotonesEditar() {
        

        document.querySelectorAll('[id^="btn-usuario-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                let respuesta = await this.controladorAdministrador.editarUsuario(id, campo, nuevoValor);
                if (respuesta) {
                    this.mostrarMensaje("Usuario editado correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar el usuario.");
                }
            });
        });
    

    }
        


    cargarUsuario(usuario) {
        const contenedor = document.querySelector("#usuario .descripcion");
        contenedor.innerHTML = ""; 
    
    
    
        contenedor.innerHTML = `
            <form class="form-linea">
                <label><strong>📌 Nombre de usuario:</strong></label>
                <a>${usuario.username}</a>
            </form>

            <form class="form-linea">
                <label><strong>📅 Fecha de nacimiento:</strong></label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" value="${this.convertirFecha(usuario.birthDate)}" />
                <button id="btn-usuario-editar-fecha-${usuario.id}" type="submit">Actualizar</button>
            </form>
    
            <form class="form-linea">
                <label><strong>📧 Correo electrónico:</strong></label>
                <input type="email" name="email" value="${usuario.email}" />
                <button id="btn-usuario-editar-email-${usuario.id}" type="submit">Actualizar</button>
            </form>
    
            <form class="form-linea">
                <label><strong>🔒 Contraseña:</strong></label>
                <input type="password" name="password" value="${usuario.password}" />
                <button id="btn-usuario-editar-contrasenia-${usuario.id}" type="submit">Actualizar</button>
            </form>
    
            <form class="form-linea">
                <label><strong>👥 Rol:</strong></label>
                <label><strong> ${usuario.role}</strong></label>

                
            </form>
        `;
    }

    convertirFecha(fecha) {
        return fecha ? fecha.replaceAll('/', '-') : '';
    }
    
}




window.addEventListener('DOMContentLoaded', () => {
    new VistaUsuario();
});