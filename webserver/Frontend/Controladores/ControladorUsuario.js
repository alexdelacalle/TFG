import FactoríaUsuario from '../Factoría/FactoríaUsuario.js';
import Usuario from "../Modelo/Usuario.js";
import API from '../Servicios/Api.js';

export default class ControladorUsuario {
    constructor(vistaUsuario) {
        this.vistaUsuario = vistaUsuario;
        this.api = new API()
    }

    async getListaUsuarios() {
        const resultado = await this.api.getUsuarios();
        console.log(resultado)
        const usuarios = resultado.users || []; 
        const usuarioMapeado = usuarios.map(e => e.user);

        const usuariosAdaptados = usuarioMapeado.map(e =>
            FactoríaUsuario.crearUsuarioDesdeJson(e)
        );

    
        return usuariosAdaptados;
    }

    

    async getUsuarioByNombre(nombre){
        return await this.api.getUsuarioByNombre(nombre)
    }

    async agregarUsuario(nombre, birthDate, email, contrasenia, role) {
        if (await this.getUsuarioByNombre(nombre)) {
            this.vistaUsuario.mostrarMensaje('El usuario ya existe');
            return false;
        }
        
        const nuevoUsuario = FactoríaUsuario.crearusuario(0, nombre, birthDate, email, contrasenia, role);

        return await this.api.postUsuario(nuevoUsuario)
    }

    async getUsuarioById(id) {
        let response = await this.api.getUsuarioById(id)
        return response.data
    }

    async eliminarUsuario(id){
        return await this.api.deleteUsuario(id)
    }    
}
