import PersonaFactory from '../Factoría/FactoríaPersona.js';
import API from '../Servicios/Api.js';
export default class ControladorPersona {
    constructor(vistaPersona) {
        this.vistaPersona = vistaPersona;
        this.api= new API()
    }

    async getListaPersonas() {
        const resultado = await this.api.getPersonas();
        const personas = resultado.persons || []; 
        const personaMapeada = personas.map(e => e.person);

        const personasAdaptadas = personaMapeada.map(e =>
            PersonaFactory.desdeJson(e)
        );

    
        return personasAdaptadas;    
    }

    

    async agregarPersona(nombre, cumpleanios, muerte, wiki, imagen, entidades, productos) {
        if (await this.getPersonaByNombre(nombre)) {
            this.vistaPersona.mostrarMensaje('La persona ya existe');
            return false;
        }
        entidades = Array.isArray(entidades) ? entidades : [];
        productos = Array.isArray(productos) ? productos : [];

        const nuevaPersona = PersonaFactory.crearPersona(0,nombre, cumpleanios, muerte, wiki, imagen, productos, entidades);

        return await this.api.postPersona(nuevaPersona)

    }

    async eliminarPersona(id) {
        this.api.deletePersona(id)
    }

    async getPersonaById(id){
        return this.api.getPersonaById(id)  
    }

    async getPersonaByNombre(nombre){
        return await this.api.getPersonaByNombre(nombre)
    }

    editarPersona(id, nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen) {
        let personas = this.getListaPersonas(); 
        let personaIndex = this.getPersonaById(id);
    
        if (personaIndex !== null) {
            personas[personaIndex].nombre = nombre;
            personas[personaIndex].cumpleanios  = fechaNacimiento;
            personas[personaIndex].muerte  = fechaFallecimiento;
            personas[personaIndex].wiki = wiki;
            personas[personaIndex].imagen = imagen;
    
            this.guardarPersonas(personas);
            this.vistaPersona.actualizarCarrusel(personas); 
        } else {
            console.error('Persona no encontrada');
        }
    }

    async getProductosFromPersona(id){
        return await this.api.getProductosFromPersona(id) || null
    }

    async getEntidadesFromPersona(id){
        return await this.api.getEntidadesFromPersona(id) || null

    }
    
}


