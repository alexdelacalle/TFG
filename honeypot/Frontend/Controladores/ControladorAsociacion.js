import AsociacionFactory from '../Factoría/FactoríaAsociacion.js';
import API from '../Servicios/Api.js';
export default class ControladorAsociacion {
    constructor(vistaAsociacion) {
        this.vistaAsociacion = vistaAsociacion;
        this.api= new API()
    }

    async getListaAsociaciones() {
        const resultado = await this.api.getAsociaciones();
        const asociaciones = resultado.asociaciones || []; 
        const asociacionMapeada = asociaciones.map(e => e.asociacion);

        const asociacionesAdaptadas = asociacionMapeada.map(e =>
            AsociacionFactory.desdeJson(e)
        );

    
        return asociacionesAdaptadas;    
    }

    

    async agregarAsociacion(nombre, cumpleanios, muerte, wiki, imagen, entidades, productos) {
        if (await this.getAsociacionByNombre(nombre)) {
            this.vistaAsociacion.mostrarMensaje('La asociacion ya existe');
            return false;
        }
        entidades = Array.isArray(entidades) ? entidades : [];

        const nuevaAsociacion = AsociacionFactory.crearAsociacion(0,nombre, cumpleanios, muerte, wiki, imagen,entidades);

        return await this.api.postAsociacion(nuevaAsociacion)

    }

    async eliminarAsociacion(id) {
        this.api.deleteAsociacion(id)
    }

    async getAsociacionById(id){
        return this.api.getAsociacionById(id)  
    }

    async getAsociacionByNombre(nombre){
        return await this.api.getAsociacionByNombre(nombre)
    }

    editarAsociacion(id, nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen) {
        let asociaciones = this.getListaAsociaciones(); 
        let asociacionIndex = this.getAsociacionById(id);
    
        if (asociacionIndex !== null) {
            asociaciones[asociacionIndex].nombre = nombre;
            asociaciones[asociacionIndex].cumpleanios  = fechaNacimiento;
            asociaciones[asociacionIndex].muerte  = fechaFallecimiento;
            asociaciones[asociacionIndex].wiki = wiki;
            asociaciones[asociacionIndex].imagen = imagen;
    
            this.guardarAsociaciones(asociaciones);
            this.vistaAsociacion.actualizarCarrusel(asociaciones); 
        } else {
            console.error('Asociacion no encontrada');
        }
    }


    async getEntidadesFromAsociacion(id){
        return await this.api.getEntidadesFromAsociacion(id) || null

    }
    
}


