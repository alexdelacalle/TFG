import Padre from './Padre.js'

export default class Asociacion extends Padre{

    constructor(id, nombre, cumpleanios, muerte, wiki,imagen, entidades =[]){ 
        super(id,nombre, cumpleanios, muerte, wiki,imagen)

        this.entidades = Array.isArray(entidades) ? entidades : [];

    }

}