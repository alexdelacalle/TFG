import ProductoFactory from '../Factoría/FactoríaProducto.js';
import API from '../Servicios/Api.js';
export default class ControladorProducto {

    constructor(vistaProducto) {
        this.vistaProducto = vistaProducto;
        this.api= new API()
    }
    async getListaProductos() {
        const resultado = await this.api.getProductos();
        const productos = resultado.products || []; 
        const productoMapeado = productos.map(e => e.product);

        const productosAdaptadas = productoMapeado.map(e =>
            ProductoFactory.desdeJson(e)
        );

        return productosAdaptadas;
    }
    

    async agregarProducto(nombre, fechaCreacion, vigenciaProducto, wiki, imagen, personas, entidades) {
        if (await this.getProductoByNombre(nombre)) {
            this.vistaProducto.mostrarMensaje('El producto ya existe');
            return false;
        }
        personas = Array.isArray(personas) ? personas : [];
        
        const nuevoProducto = ProductoFactory.crearProducto(0,nombre, fechaCreacion, vigenciaProducto, wiki, imagen, personas, entidades);

        return await this.api.postProducto(nuevoProducto)

    }


    async getProductoById(id){
        return await this.api.getProductoById(id)
        
    }

    async getProductoByNombre(nombre){
        return await this.api.getProductoByNombre(nombre)
    }

    editarProducto(id, nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen, personas, entidad) {
        let productos = this.getListaProductos();
        let productoIndex = this.getProductoById(id);
    
        if (productoIndex !== null) {
            productos[productoIndex].nombre = nombre;
            productos[productoIndex].cumpleanios  = fechaNacimiento;
            productos[productoIndex].muerte  = fechaFallecimiento;
            productos[productoIndex].wiki = wiki;
            productos[productoIndex].imagen = imagen;
            productos[productoIndex].personas = personas; 
            productos[productoIndex].entidad = entidad; 
    
            this.guardarProductos(productos); 
            this.vistaProducto.actualizarCarrusel(productos); 
        } else {
            console.error('Producto no encontrado');
        }
    }
    
    async getPersonasFromProducto(id){
        return await this.api.getPersonasFromProducto(id)
    }

    async getEntidadesFromProducto(id){
        return await this.api.getEntidadesFromProducto(id)
    }
    
}