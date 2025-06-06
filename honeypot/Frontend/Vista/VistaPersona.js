import ControladorPersona from '../Controladores/ControladorPersona.js'
import PersonaFactory from '../Factoría/FactoríaPersona.js'
export default class VistaPersona {

    constructor(){
        this.controladorPersona= new ControladorPersona(this)
        this.inicializar()
    }

    async inicializar(){
        let id = this.obtenerId()
        let persona = await this.controladorPersona.getPersonaById(id)
        await this.mostrarPersona(persona)

    }

    obtenerId(){
        const params = new URLSearchParams(window.location.search);
        return params.get("id")
    }

    async mostrarPersona(persona){
        let personaAdaptada = PersonaFactory.desdeJson(persona.data.person)
        if(personaAdaptada){
            document.querySelector('h1').innerHTML= 'Información de la persona'
            document.querySelector("#persona img").src = `${personaAdaptada.imagen}`;
            document.querySelector("#persona .descripcion ul").innerHTML = `
            <li><strong>📌 Nombre:</strong> <span>${personaAdaptada.nombre}</span></li>
            <li><strong>📅 Cumpleaños:</strong> <span>${personaAdaptada.cumpleanios}</span></li>
            <li><strong>⏳ Fallecimiento:</strong> <span>${personaAdaptada.muerte}</span></li>
            <li><strong>🌐 Wiki:</strong> <a href="${personaAdaptada.wiki}" target="_blank">Ver en Wikipedia</a></li>                                                                                                       `;

           

            var listaProductos = document.querySelector("#productos .elementos-lista");

            if (listaProductos.children.length === 0) {
                listaProductos.innerHTML = "";
            }

            if (personaAdaptada.productos.length==0){
                var divProductos = document.createElement("div");
                divProductos.classList.add("elemento");
                divProductos.innerHTML = `
                    <p><strong> No hay productos asociados al programa ${personaAdaptada.nombre}</p>`
            } else{
                let productos = await this.controladorPersona.getProductosFromPersona(personaAdaptada.id);

                if (productos && productos.products && productos.products.length > 0) {
                    productos.products.forEach(element => {
                        
                        var divProductos = document.createElement("div");
                        divProductos.classList.add("elemento");
                        divProductos.innerHTML = `
                            <img src=${element.product.imageUrl} alt="Foto">
                            <p><strong>📌 Nombre:</strong> <span>${element.product.name}</span></p>
                            <p><strong>📅 Fecha de creación:</strong> <span> ${element.product.birthDate}</span></p>
                            <p><strong>⏳ Fecha de obsolescencia:</strong> <span>${element.product.deathDate}</span></p>
                            <p><strong>🌐 Wiki:</strong> <a href="${element.product.wikiUrl}">Ver en Wikipedia</a></p>
                        `;

                        
                        const listaProductos = document.querySelector("#productos .elementos-lista"); // Asegúrate de tener el ID correcto
                        if (listaProductos) {
                            listaProductos.appendChild(divProductos);
                        } else {
                            console.log("Contenedor no encontrado");
                        }
                    });
                } else {
                    console.log("No se encontraron productos.");
                }


            }
            
            var listaEntidades = document.querySelector("#entidades .elementos-lista");

            if (listaEntidades.children.length === 0) {
                listaEntidades.innerHTML = "";
            }
            if (personaAdaptada.entidades.length==0){
                var divEntidades = document.createElement("div");
                divEntidades.classList.add("elemento");
                divEntidades.innerHTML = `
                    <p> No hay empresa asociadada a la persona ${personaAdaptada.nombre}</p>`
                listaEntidades.appendChild(divEntidades);

            } else {

                let entidades = await this.controladorPersona.getEntidadesFromPersona(personaAdaptada.id)
                entidades.entities.forEach(element => {
                    console.log(element)
                    var divEntidades = document.createElement("div");
                    divEntidades.classList.add("elemento");
                    divEntidades.innerHTML = `
                        <img src="${element.entity.imageUrl}" alt="Foto">
                        <p><strong>📌 Nombre:</strong> <span>${element.entity.name}</span></p>
                        <p><strong>📅 Fundación:</strong> <span>${element.entity.birthDay}</span></p>
                        <p><strong>⏳ Vigencia:</strong> <span>${element.entity.deathDay}</span></p>
                        <p><strong>🌐 Wiki:</strong> <a href="${element.entity.wikiUrl}">Ver en Wikipedia</a></p>
                    `;
                
                    listaEntidades.appendChild(divEntidades);
                });

                
            }

                
        }
    }
    

    enviarMensaje(mensaje) {
        alert(mensaje); 
    }

    
    
}

window.addEventListener('DOMContentLoaded', () => {
    new VistaPersona();
});