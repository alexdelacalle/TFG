import Producto from "../Modelo/Producto.js";

export default class ProductoFactory {
    static crearProducto(id,nombre, cumpleanios, muerte, wiki, imagen, personas = [], entidades = []) {
        return new Producto(id,nombre, cumpleanios, muerte, wiki, imagen, personas, entidades, );
    }

    static desdeJson(json) {
        return new Producto(
            json.id,
            json.name,
            json.birthDate,
            json.deathDate,
            json.wikiUrl,
            json.imageUrl || '../images/descarga__5.png',
            json.persons || [],
            json.entities || [],
        );
    }
}
