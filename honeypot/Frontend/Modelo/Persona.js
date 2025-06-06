import Padre from './Padre.js'

export default class Persona extends Padre{

    constructor(id, nombre, cumpleanios, muerte, wiki,imagen, entidades =[], productos = []){ 
        super(id,nombre, cumpleanios, muerte, wiki,imagen)

        this.entidades = Array.isArray(entidades) ? entidades : [];
        this.productos = Array.isArray(productos) ? productos : [];

    }

}