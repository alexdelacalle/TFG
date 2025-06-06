import ControladorEntidad from "../Controladores/ControladorEntidad.js";
import ControladorPersona from "../Controladores/ControladorPersona.js";
import ControladorProducto from "../Controladores/ControladorProducto.js";
import ControladorUsuario from "../Controladores/ControladorUsuario.js";
import ControladorAsociacion from "../Controladores/ControladorAsociacion.js";
import API from "../Servicios/Api.js";
export default class ControladorAdministrador {

    constructor(vistaAdministrador) {
        this.vistaAdministrador = vistaAdministrador;
        this.API = new API();
        this.controladorEntidad = new ControladorEntidad(this.vistaAdministrador);
        this.controladorPersona = new ControladorPersona(this.vistaAdministrador);
        this.controladorProducto = new ControladorProducto(this.vistaAdministrador);
        this.controladorUsuario = new ControladorUsuario(this.vistaAdministrador);
        this.controladorAsociacion = new ControladorAsociacion(this.vistaAdministrador);
    }

    validarUsuarioWriter() {
        const token = this.API.getToken();
    
        if (!token) {
            return false;
        }
    
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Date.now() / 1000;
    
            if ((payload.exp && payload.exp < now) || !payload.scopes.includes("writer")) {
                this.API.deleteToken();
                return false;
            }
    
            return true;
        } catch (e) {
            this.API.deleteToken();
            return false;
        }
    }

    validarUsuarioReader() {
        const token = this.API.getToken();
    
        if (!token) {
            return false;
        }
    
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Date.now() / 1000;
    
            if ((payload.exp && payload.exp < now) || !payload.scopes.includes("reader")) {
                this.API.deleteToken();
                return false;
            }
    
            return true;
        } catch (e) {
            this.API.deleteToken();
            return false;
        }
    }

    

    async editarUsuario(id, campo, valor) {
        switch (campo) {
            case "nombre":
                return await this.API.putUsuario(id, 'username', valor)
                break;
            case "email":
                return await this.API.putUsuario(id, 'email', valor)
                break;
            case "contrasenia":
                return this.API.putUsuario(id, 'password', valor)
                break;
            case "fecha":
                return this.API.putUsuario(id, 'birthDate', valor)
            case "role":
                return this.API.putUsuario(id, 'role', valor)
                break;
            default:
                console.error("Tipo de item no válido");
        }
    }

    async editarItem(id, item, campo, valor) {

        switch (campo) {
            case "nombre":
                campo = "name"
                break;
            case "cumpleanios":
                campo = "birthDate"
                break;
            case "muerte" :
                campo = "deathDate"
                break;
            case "imagen":
                campo = "imageUrl"
                break;
            case "wiki":
                campo = "wikiUrl"
                break;
            case "entidades":
                campo = "entities"
                break;
            case "personas":
                campo = "persons"
                break;
            case "productos":
                campo = "products"
                break;
            case "asociaciones":
                campo = "asociaciones"
                break;
            default:
                console.error("Campo no válido");
                return;
        }

        switch (item) {
            case "producto":
                if (campo === "entities" || campo === "persons") {
                    return await this.API.putItemToProducto(id, "products", "product", campo, valor)
                }
                return await this.API.putProducto(id, campo, valor)
            case "entidad":
                if (campo === "products" || campo === "persons" || campo === "asociaciones") {
                    return await this.API.putItemToEntidad(id, "entities", "entity", campo, valor)
                }
                return await this.API.putEntidad(id, campo, valor)
            case "persona":
                if (campo === "entities" || campo === "products" ) {
                    return await this.API.putItemToPersona(id, "persons", "person", campo, valor)
                }
                return this.API.putPersona(id, campo, valor)
            case "asociacion":
                if (campo === "entities") {
                    return await this.API.putEntidadToAsociacion(id, "asociaciones", "asociacion", campo, valor)
                }
                return this.API.putAsociacion(id, campo, valor)
            default:
                console.error("Tipo de item no válido");
        }
    }


    async eliminarItem(id,item) {
        switch (item) {
            case "usuario":
                return await this.eliminarUsuario(id);
            case "producto":
                return await this.eliminarProducto(id);
            case "entidad":
                return await this.eliminarEntidad(id);
            case "persona":
                return await this.eliminarPersona(id);
            case "asociacion":
                return await this.eliminarAsociacion(id);
            default:
                console.error("Tipo de item no válido");
        }
    }

    async añadirItem(itemName, item) {
        switch (itemName) {
            case "usuario":
                return await this.controladorUsuario.agregarUsuario(...item);
                break;
            case "producto":
                return await this.controladorProducto.agregarProducto(...item);
                break;
            case "entidad":
                return await this.controladorEntidad.agregarEntidad(...item);
                break;
            case "persona":
                return await this.controladorPersona.agregarPersona(...item);
                break;
            case "asociacion":
                return await this.controladorAsociacion.agregarAsociacion(...item);
                break;
            default:
                console.error(`Tipo de item no válido: ${itemName} `);
        }
    }

    async eliminarUsuario(id){
        return await this.API.deleteUsuario(id)
    }

    async eliminarProducto(id){
        return await this.API.deleteProducto(id)
    }

    async eliminarPersona(id){
        return await this.API.deletePersona(id)
    }

    async eliminarEntidad(id){
        return await this.API.deleteEntidad(id)
    }

    async eliminarAsociacion(id){
        return await this.API.deleteAsociacion(id)
    }

    async cargarAsociaciones() {
        return await this.controladorAsociacion.getListaAsociaciones();   
    }

    async cargarProductos() {
        return await this.controladorProducto.getListaProductos();
    }

    async cargarEntidades() {
        return await this.controladorEntidad.getListaEntidades();
    }

    async cargarPersonas() {
        return await this.controladorPersona.getListaPersonas();
    }

    async cargarUsuarios() {
        return await this.controladorUsuario.getListaUsuarios();
    }
}