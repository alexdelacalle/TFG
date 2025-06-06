export default class Carrusel{

    constructor(){
        this.indicesCarruseles = {
            carrusel1: 0,
            carrusel2: 0,
            carrusel3: 0,
            carrusel4: 0
        };


        this.botonPrevio1 = document.getElementById('prev-1')
        this.botonPrevio2 = document.getElementById('prev-2')
        this.botonPrevio3 = document.getElementById('prev-3')
        this.botonPrevio4 = document.getElementById('prev-4')

        this.botonSiguiente1 = document.getElementById('next-1')
        this.botonSiguiente2 = document.getElementById('next-2')
        this.botonSiguiente3 = document.getElementById('next-3')
        this.botonSiguiente4 = document.getElementById('next-4')

        this.botonPrevio1.addEventListener('click', () => this.cambiarImagen(-1, 'carrusel1'));
        this.botonSiguiente1.addEventListener('click', () => this.cambiarImagen(1, 'carrusel1'));

        this.botonPrevio2.addEventListener('click', () => this.cambiarImagen(-1, 'carrusel2'));
        this.botonSiguiente2.addEventListener('click', () => this.cambiarImagen(1, 'carrusel2'));

        this.botonPrevio3.addEventListener('click', () => this.cambiarImagen(-1, 'carrusel3'));
        this.botonSiguiente3.addEventListener('click', () => this.cambiarImagen(1, 'carrusel3'));

        this.botonPrevio4.addEventListener('click', () => this.cambiarImagen(-1, 'carrusel4'));
        this.botonSiguiente4.addEventListener('click', () => this.cambiarImagen(1, 'carrusel4'));


    }
 
    
    cambiarImagen(direccion, idCarrusel) {
        const carrusel = document.getElementById(idCarrusel);
        const slides = carrusel.getElementsByClassName("slide");
        const totalSlides = slides.length-1;
    
        this.indicesCarruseles[idCarrusel] += direccion;
    
        if (this.indicesCarruseles[idCarrusel] < 0) {
            this.indicesCarruseles[idCarrusel] = totalSlides - 1;
        }
    
        if (this.indicesCarruseles[idCarrusel] >= totalSlides) {
            this.indicesCarruseles[idCarrusel] = 0;
        }
    
        carrusel.style.transform = `translateX(${-this.indicesCarruseles[idCarrusel] * 50}%)`;
    }


}

