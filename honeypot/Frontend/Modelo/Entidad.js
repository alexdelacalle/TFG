import Padre
 from './Padre.js';
export default class Entidad extends Padre{
    constructor(id, nombre, cumpleanios, muerte, wiki,imagen, personas =[], productos = [], asociaciones = []) {
        super(id, nombre, cumpleanios, muerte, wiki, imagen)
        this.personas = Array.isArray(personas) ? personas : [];
        this.productos = Array.isArray(productos) ? productos : [];
        this.asociaciones = Array.isArray(asociaciones) ? asociaciones : [];

    }

    
}