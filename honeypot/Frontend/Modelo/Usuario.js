export default class Usuario {
    constructor(id, nombre, birthDate, email, contrasenia, role) {
        this.id = id;
        this.nombre = nombre;
        this.birthDate = birthDate;
        this.email = email;
        this.contrasenia= contrasenia;
        this.role = role;
    }

    getNombre(){
        return this.nombre;
    }

    getContrasenia(){
        return this.contrasenia;
    }

    getEmail(){
        return this.email;
    }
    setNombre(nombre){
        this.nombre = nombre;
    }
    setContrasenia(contrasenia){
        this.contrasenia = contrasenia;
    }
    setEmail(email){
        this.email = email;
    }

    toJson() {
        return {
            username: this.nombre,
            email: this.email,
            password: this.contrasenia
        };
    }


}
