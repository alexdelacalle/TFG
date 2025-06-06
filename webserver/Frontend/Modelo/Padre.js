export default class Padre{

    constructor(id,nombre, cumpleanios, muerte, wiki,imagen) {
        this.id=id;
        this.nombre = nombre;
        this.cumpleanios = cumpleanios;
        this.muerte = muerte;
        this.wiki = wiki;
        this.imagen=imagen;
    }

    getId(){
        return this.id;
    }
    
    getNombre() {
        return this.nombre;
    }

    getCumpleanios(){
        return this.cumpleanios;
    }

    getMuerte(){
        return this.muerte;
    }

    getWiki(){
        return this.wiki;
    }

    setNombre(nombre){
        this.nombre=nombre
    }

    setCumpleanios(cumpleanios){
        this.cumpleanios=cumpleanios;
    }

    setMuerte(muerte){
        this.muerte=muerte;
    }

    setWiki(wiki){
        this.wiki=wiki;
    }

    getImagen(){
        return this.imagen
    }

    setImagen(imagen){
        this.imagen=imagen
    }

}