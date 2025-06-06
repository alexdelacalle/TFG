import API from "../Servicios/Api.js";
import ControladorProducto from "./ControladorProducto.js";
import ControladorEntidad from "./ControladorEntidad.js";
import ControladorPersona from "./ControladorPersona.js";
import ControladorAsociacion from "./ControladorAsociacion.js";
export default class App{
    constructor(vistaApp){
        this.vistaApp=vistaApp
        this.API= new API()
        this.controladorEntidad = new ControladorEntidad(this.vistaApp)
        this.controladorProducto = new ControladorProducto(this.vistaApp)
        this.controladorPersona = new ControladorPersona(this.vistaApp);
        this.controladorAsociacion = new ControladorAsociacion(this.vistaApp);
        
    }

    validarUsuario() {
        const token = this.API.getToken();
    
        if (!token) {
            return false;
        }
    
        try {
            
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Date.now() / 1000;
    
            if ((payload.exp && payload.exp < now) || (!payload.scopes.includes("writer")) && (!payload.scopes.includes("reader"))) {
                this.API.deleteToken();
                return false;
            }
    
            return true;
        } catch (e) {
            this.API.deleteToken();
            return false;
        }
    }

    async login(nombre, contrasenia) {
        const response = await this.API.login(nombre, contrasenia);
    
        if (response.success) {
            
            return { success: true };
        }
    
        return {
            success: false,
            message: response.message || 'Error desconocido'
        };
    }

    logout() {
        this.API.deleteToken()
        this.vistaApp.cambiarLogoSesion();
        this.vistaApp.visualizarDetalles();
    }

    getUsuarioActual() {
        return this.API.getToken() || null;
    }

    getUsuarioByNombre(nombre) {
        return this.API.getUsuarioByNombre(nombre)
    }

    async registro(nombre, email, contrasenia) {
        const respuesta = await this.API.getUsuarioByNombre(nombre);
        console.log(respuesta);
        if (!respuesta) {
            let nuevoUsuario = { nombre, email, contrasenia };
            if (await this.API.postUsuario(nuevoUsuario))
                return true;
        }
        this.vistaApp.enviarMensaje(`El usuario ${nombre} ya existe`);
        return false;
    }

    getRoles() {
        const token = this.getUsuarioActual();
    
        if (!token) return null;
    
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(payload);
    
            return payload.scopes || null;
        } catch (e) {
            console.error("Error decoding token:", e);
            return null;
        }
    }
    
    

    getIdUsuario() {
        const token = this.getUsuarioActual();
    
        if (!token) return null;
    
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(payload);
    
            return payload.uid || null;
        } catch (e) {
            console.error("Error decoding token:", e);
            return null;
        }
    }
    

    async getListaEntidades() {
        return await this.controladorEntidad.getListaEntidades()
    }
    async getListaProductos() {
        return await this.controladorProducto.getListaProductos()
    }
    async getListaPersonas() {
        return await this.controladorPersona.getListaPersonas()
    }

    async getListaAsociaciones() {
        return await this.controladorAsociacion.getListaAsociaciones()
    }




    

    





}