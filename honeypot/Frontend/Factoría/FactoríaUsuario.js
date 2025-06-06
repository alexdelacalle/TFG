import Usuario from "../Modelo/Usuario.js";

export default class UsuarioFactory {
    static crearusuario(id,nombre, birthDate, email, contrasenia, role) {
        return new Usuario(id,nombre, birthDate, email, contrasenia, role);
    }
    static crearUsuarioDesdeJson(json) {
        return new Usuario(json.id, json.username, json.birthDate ,json.email, json.password, json.role);
    }
}
