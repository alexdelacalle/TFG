import Entidad from "../Modelo/Entidad.js";

export default class EntidadFactory {
    static crearEntidad(id,nombre, cumpleanios, muerte, wiki,imagen, personas = [], productos = [], asociaciones = []) {
        return new Entidad(id, nombre, cumpleanios, muerte, wiki, imagen, personas, productos, asociaciones);
    }

    static desdeJson(json) {
        return new Entidad(
            json.id,
            json.name,
            json.birthDate,
            json.deathDate,
            json.wikiUrl,
            json.imageUrl || '../images/descarga__5.png',
            json.persons || [],
            json.products || [],
            json.asociaciones || [],
        );
    }
}
