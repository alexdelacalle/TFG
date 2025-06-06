import ControladorProducto from '../Controladores/ControladorProducto.js'
import ProductoFactory from '../Factoría/FactoríaProducto.js'
export default class VistaProducto{
    constructor(){
        this.controladorProducto= new ControladorProducto(this)
        this.inicializar()
    }

    async inicializar(){
        let id = this.obtenerId()
        let producto = await this.controladorProducto.getProductoById(id)
        await this.mostrarProducto(producto)

    }

    obtenerId(){
        const params = new URLSearchParams(window.location.search);
        return params.get("id")
    }

    async mostrarProducto(producto){
        let productoAdaptado = ProductoFactory.desdeJson(producto.data.product)
        if(productoAdaptado){
            document.querySelector('h1').innerHTML= 'Información del producto'
            document.querySelector("#producto img").src = `${productoAdaptado.imagen}`;
            document.querySelector("#producto .descripcion ul").innerHTML = `
            <li><strong>📌 Nombre:</strong> <span>${productoAdaptado.nombre}</span></li>
            <li><strong>📅 Fecha de creación:</strong> <span>${productoAdaptado.cumpleanios}</span></li>
            <li><strong>⏳ Fecha de obsolescencia:</strong> <span>${productoAdaptado.muerte}</span></li>
            <li><strong>🌐 Wiki:</strong> <a href="${productoAdaptado.wiki}" target="_blank">Ver en Wikipedia</a></li>                                                                                                       `;

           

            var listaPersonas = document.querySelector("#personas .elementos-lista");

            if (listaPersonas.children.length === 0) {
                listaPersonas.innerHTML = "";
            }

            if (productoAdaptado.personas.length==0){
                var divPersonas = document.createElement("div");
                divPersonas.classList.add("elemento");
                divPersonas.innerHTML = `
                    <p><strong> No hay personas asociados al programa ${productoAdaptado.nombre}</p>`
            } else{
                let personas = await this.controladorProducto.getPersonasFromProducto(productoAdaptado.id);

                if (personas && personas.persons && personas.persons.length > 0) {
                    personas.persons.forEach(element => {
                        console.log(element);
                        var divPersonas = document.createElement("div");
                        divPersonas.classList.add("elemento");
                        divPersonas.innerHTML = `
                            <img src="${element.person.imageUrl}" alt="Foto">
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
            
            var listaEntidades = document.querySelector("#entidades .elementos-lista");

            if (listaEntidades.children.length === 0) {
                listaEntidades.innerHTML = "";
            }
            if (productoAdaptado.entidades.length==0){
                var divEntidades = document.createElement("div");
                divEntidades.classList.add("elemento");
                divEntidades.innerHTML = `
                    <p> No hay empresa asociadada al producto ${productoAdaptado.nombre}</p>`
                listaEntidades.appendChild(divEntidades);

            } else {

                let entidades = await this.controladorProducto.getEntidadesFromProducto(productoAdaptado.id)
                entidades.entities.forEach(element => {
                    var divEntidades = document.createElement("div");
                    divEntidades.classList.add("elemento");
                    
                    divEntidades.innerHTML = `
                        <img src="${element.entity.imageUrl}" alt="Foto">
                        <p><strong>📌 Nombre:</strong> <span>${element.entity.name}</span></p>
                        <p><strong>📅 Fundación:</strong> <span>${element.entity.birthDate}</span></p>
                        <p><strong>⏳ Vigencia:</strong> <span>${element.entity.deathDate}</span></p>
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
    new VistaProducto();
});