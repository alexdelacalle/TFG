import ControladorAsociacion from '../Controladores/ControladorAsociacion.js'
import AsociacionFactory from '../Factoría/FactoríaAsociacion.js'
export default class VistaAsociacion {

    constructor(){
        this.controladorAsociacion= new ControladorAsociacion(this)
        this.inicializar()
    }

    async inicializar(){
        let id = this.obtenerId()
        let asociacion = await this.controladorAsociacion.getAsociacionById(id)
        await this.mostrarAsociacion(asociacion)

    }

    obtenerId(){
        const params = new URLSearchParams(window.location.search);
        return params.get("id")
    }

    async mostrarAsociacion(asociacion){
        let asociacionAdaptada = AsociacionFactory.desdeJson(asociacion.data.asociacion)
        if(asociacionAdaptada){
            document.querySelector('h1').innerHTML= 'Información de la asociacion'
            document.querySelector("#asociacion img").src = `${asociacionAdaptada.imagen}`;
            document.querySelector("#asociacion .descripcion ul").innerHTML = `
            <li><strong>📌 Nombre:</strong> <span>${asociacionAdaptada.nombre}</span></li>
            <li><strong>📅 Fundación:</strong> <span>${asociacionAdaptada.cumpleanios}</span></li>
            <li><strong>⏳ Vigencia:</strong> <span>${asociacionAdaptada.muerte}</span></li>
            <li><strong>🌐 Wiki:</strong> <a href="${asociacionAdaptada.wiki}" target="_blank">Ver en Wikipedia</a></li>                                                                                                       `;

            
            var listaEntidades = document.querySelector("#entidades .elementos-lista");

            if (listaEntidades.children.length === 0) {
                listaEntidades.innerHTML = "";
            }
            if (asociacionAdaptada.entidades.length==0){
                var divEntidades = document.createElement("div");
                divEntidades.classList.add("elemento");
                divEntidades.innerHTML = `
                    <p> No hay empresa asociadada a la asociacion ${asociacionAdaptada.nombre}</p>`
                listaEntidades.appendChild(divEntidades);

            } else {

                let entidades = await this.controladorAsociacion.getEntidadesFromAsociacion(asociacionAdaptada.id)
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
    new VistaAsociacion();
});