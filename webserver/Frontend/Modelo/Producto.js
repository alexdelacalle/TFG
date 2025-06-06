import Padre from './Padre.js';

export default class Producto extends Padre {
    constructor(id, nombre, cumpleanios, muerte, wiki, imagen, personas = [], entidades = []) {
        
        super(id, nombre, cumpleanios, muerte, wiki, imagen, personas, entidades);
        this.entidades = Array.isArray(entidades) ? entidades : [];
        this.personas = Array.isArray(personas) ? personas : [];

    }

    getListaPersonas() {
        return this.personas;
    }

    agregarPersona(persona) {
        this.personas.push(persona);
    }

    eliminarPersona(nombrePersona) {
        const index = this.personas.findIndex(persona => persona.getNombre() === nombrePersona);
        if (index !== -1) {
            this.personas.splice(index, 1);
            console.log(`${nombrePersona} ha sido eliminado.`);
        } else {
            console.log(`${nombrePersona} no encontrado.`);
        }
    }

    
}
