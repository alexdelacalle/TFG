import Asociacion from "../Modelo/Asociacion.js";

export default class AsociacionFactory {
    static crearAsociacion(id,nombre, cumpleanios, muerte, wiki, imagen, entidades ) {
        return new Asociacion(id, nombre, cumpleanios, muerte, wiki, imagen, entidades);
    }

    static desdeJson(json) {
            return new Asociacion(
                json.id,
                json.name,
                json.birthDate,
                json.deathDate,
                json.wikiUrl,
                json.imageUrl || '../images/descarga__5.png',
                json.entities || [],
            );
        }
}