import Persona from "../Modelo/Persona.js";

export default class PersonaFactory {
    static crearPersona(id,nombre, cumpleanios, muerte, wiki, imagen, entidades, productos ) {
        return new Persona(id, nombre, cumpleanios, muerte, wiki, imagen, entidades, productos);
    }

    static desdeJson(json) {
            return new Persona(
                json.id,
                json.name,
                json.birthDate,
                json.deathDate,
                json.wikiUrl,
                json.imageUrl || '../images/descarga__5.png',
                json.entities || [],
                json.products || []
            );
        }
}