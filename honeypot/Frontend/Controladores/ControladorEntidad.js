import EntidadFactory from "../Factoría/FactoríaEntidad.js";
import API from "../Servicios/Api.js";
export default class ControladorEntidad {
    constructor(vistaEntidad){
        this.vistaEntidad=vistaEntidad
        this.api= new API()
        
    }
    async getListaEntidades() {
        const resultado = await this.api.getEntidades();
        const entidades = resultado.entities || []; 
        const entidadMapeada = entidades.map(e => e.entity);

        const entidadesAdaptadas = entidadMapeada.map(e =>
            EntidadFactory.desdeJson(e)
        );

    
        return entidadesAdaptadas;
    }

    

    async agregarEntidad(nombre, fechaCreacion, fechaCierre, wiki, imagen, personas, productos) {
       if (await this.getEntidadByNombre(nombre)) {
            this.vistaEntidad.mostrarMensaje('La entidad ya existe');
            return false;
        }
        personas = Array.isArray(personas) ? personas : [];
        productos = Array.isArray(productos) ? productos : [];

        
        const nuevaEntidad = EntidadFactory.crearEntidad(0,nombre, fechaCreacion, fechaCierre, wiki, imagen, personas, productos);

        return await this.api.postEntidad(nuevaEntidad)

        
    }

    async getEntidadByNombre(nombre){
        return await this.api.getEntidadByNombre(nombre)
    }

    async eliminarEntidad(id) {
        return await this.api.deleteEntidad(id)
    }

    async getEntidadById(id){
        return await this.api.getEntidadById(id) 
        
    }

    editarEntidad(id, nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen, personas) {
        let entidades = this.getListaEntidades(); 
        let entidadIndex = this.getEntidadById(id);
    
        if (entidadIndex !== null) {
            entidades[entidadIndex].nombre = nombre;
            entidades[entidadIndex].cumpleanios  = fechaNacimiento;
            entidades[entidadIndex].muerte  = fechaFallecimiento;
            entidades[entidadIndex].wiki = wiki;
            entidades[entidadIndex].imagen = imagen  
            entidades[entidadIndex].personas = personas 
    
            this.guardarEntidades(entidades);
            this.vistaEntidad.actualizarCarrusel(entidades)
        } else {
            console.error('Entidad no encontrada');
        }
    }

    async getPersonasFromEntidad(id){
        return await this.api.getPersonasFromEntidad(id)
    }

    async getProductosFromEntidad(id){
        return await this.api.getProductosFromEntidad(id)
    }

    async getAsociacionesFromEntidad(id){
        return await this.api.getAsociacionesFromEntidad(id)
    }
    
}