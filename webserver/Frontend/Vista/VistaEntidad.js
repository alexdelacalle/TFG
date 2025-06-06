import ControladorEntidad from '../Controladores/ControladorEntidad.js'
import EntidadFactory from '../Factoría/FactoríaEntidad.js'
export default class VistaEntidad{
    constructor(){
         
        this.controladorEntidad= new ControladorEntidad(this)
        this.inicializar()

    }

    async inicializar(){
        let id = this.obtenerId()
        let entidad = await this.controladorEntidad.getEntidadById(id)
        await this.mostrarEntidad(entidad)
    
    }

    obtenerId(){
        const params = new URLSearchParams(window.location.search);
        return params.get("id")
    }

    async mostrarEntidad(entidad){
        let entidadAdaptado = EntidadFactory.desdeJson(entidad.data.entity)
        if(entidadAdaptado){
            document.querySelector('h1').innerHTML= 'Información de la entidad'
            document.querySelector("#entidad img").src = `${entidadAdaptado.imagen}`;
            document.querySelector("#entidad .descripcion ul").innerHTML = `
            <li><strong>📌 Nombre:</strong> <span>${entidadAdaptado.nombre}</span></li>
            <li><strong>📅 Fundación:</strong> <span>${entidadAdaptado.cumpleanios}</span></li>
            <li><strong>⏳ Fecha de cierre:</strong> <span>${entidadAdaptado.muerte}</span></li>
            <li><strong>🌐 Wiki:</strong> <a href="${entidadAdaptado.wiki}" target="_blank">Ver en Wikipedia</a></li>                                                                                                       `;

            

            var listaPersonas = document.querySelector("#personas .elementos-lista");

            if (listaPersonas.children.length === 0) {
                listaPersonas.innerHTML = "";
            }

            if (entidadAdaptado.personas.length==0){
                var divPersonas = document.createElement("div");
                divPersonas.classList.add("elemento");
                divPersonas.innerHTML = `
                    <p><strong> No hay personas asociados al programa ${entidadAdaptado.nombre}</p>`
            } else{
                let personas = await this.controladorEntidad.getPersonasFromEntidad(entidadAdaptado.id);

                if (personas && personas.persons && personas.persons.length > 0) {
                    personas.persons.forEach(element => {
                        
                        var divPersonas = document.createElement("div");
                        divPersonas.classList.add("elemento");
                        divPersonas.innerHTML = `
                            <img src="" alt="Foto">
                            <p><strong>📌 Nombre:</strong> <span>${element.person.name}</span></p>
                            <p><strong>📅 Fecha de nacimiento:</strong> <span>${element.person.birthDate}</span></p>
                            <p><strong>⏳ Fecha de falleciomiento:</strong> <span>${element.person.deathDate}</span></p>
                            <p><strong>🌐 Wiki:</strong> <a href="${element.person.wikiUrl}">Ver en Wikipedia</a></p>
                        `;

                        
                        const listaPersonas = document.querySelector("#personas .elementos-lista"); 
                        if (listaPersonas) {
                            listaPersonas.appendChild(divPersonas);
                        } else {
                            console.log("Contenedor no encontrado");
                        }
                    });
                } else {
                    console.log("No se encontraron personas.");
                }


            }
            
            var listaProductos = document.querySelector("#productos .elementos-lista");

            if (listaProductos.children.length === 0) {
                listaProductos.innerHTML = "";
            }
            if (entidadAdaptado.productos.length==0){
                var divProductos = document.createElement("div");
                divProductos.classList.add("elemento");
                divProductos.innerHTML = `
                    <p> No hay empresa asociadada a la entidad ${entidadAdaptado.nombre}</p>`
                    divProductos.appendChild(divProductos);

            } else {

                let productos = await this.controladorEntidad.getProductosFromEntidad(entidadAdaptado.id)
                productos.products.forEach(element => {
                    var divProductos = document.createElement("div");
                    divProductos.classList.add("elemento");
                    divProductos.innerHTML = `
                        <img src="${element.product.imageUrl}" alt="Foto">
                        <p><strong>📌 Nombre:</strong> <span>${element.product.name}</span></p>
                        <p><strong>📅 Fecha de creación:</strong> <span>${element.product.birthDate}</span></p>
                        <p><strong>⏳ Fecha de obsolescencia:</strong> <span>${element.product.deathDate}</span></p>
                        <p><strong>🌐 Wiki:</strong> <a href="${element.product.wikiUrl}">Ver en Wikipedia</a></p>
                    `;
                
                    listaProductos.appendChild(divProductos);
                });

                
            }

            var listaAsociaciones = document.querySelector("#asociaciones .elementos-lista");

            if (listaAsociaciones.children.length === 0) {
                listaAsociaciones.innerHTML = "";
            }

            if (entidadAdaptado.asociaciones.length==0){
                var divAsociaciones = document.createElement("div");
                divAsociaciones.classList.add("elemento");
                divAsociaciones.innerHTML = `
                    <p><strong> No hay asociaciones relacionadas a la entidad ${entidadAdaptado.nombre}</p>`
            } else{
                let asociaciones = await this.controladorEntidad.getAsociacionesFromEntidad(entidadAdaptado.id);

                if (asociaciones && asociaciones.asociaciones && asociaciones.asociaciones.length > 0) {
                    asociaciones.asociaciones.forEach(element => {
                        
                        var divAsociaciones = document.createElement("div");
                        divAsociaciones.classList.add("elemento");
                        divAsociaciones.innerHTML = `
                            <img src="${element.asociaciones.imageUrl}" alt="Foto">
                            <p><strong>📌 Nombre:</strong> <span>${element.asociaciones.name}</span></p>
                            <p><strong>📅 Fecha de nacimiento:</strong> <span>${element.asociaciones.birthDate}</span></p>
                            <p><strong>⏳ Fecha de falleciomiento:</strong> <span>${element.asociaciones.deathDate}</span></p>
                            <p><strong>🌐 Wiki:</strong> <a href="${element.asociaciones.wikiUrl}">Ver en Wikipedia</a></p>
                        `;

                        
                        const listaAsociaciones = document.querySelector("#asociaciones .elementos-lista"); 
                        if (listaAsociaciones) {
                            listaAsociaciones.appendChild(divAsociaciones);
                        } else {
                            console.log("Contenedor no encontrado");
                        }
                    });
                } else {
                    console.log("No se encontraron personas.");
                }


            }

                
        }
    }
    



    enviarMensaje(mensaje) {
        alert(mensaje); 
    }
    
        
        
}
    
window.addEventListener('DOMContentLoaded', () => {
    new VistaEntidad();
});