class API {
    constructor() {
        this.baseURL = 'http://localhost:8085/api/v1';
    }

    // ------------------ PERSONAS ------------------
    async getPersonas() {
        try {
            const response = await axios.get(`${this.baseURL}/persons`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener personas desde la API:", error);
            return JSON.parse(localStorage.getItem("personas")) || [];
        }
    }
    

    async getPersonaById(id) {
        try {
            const response = await axios.get(`${this.baseURL}/persons/${id}`);
            return response;
        } catch (error) {
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async postPersona(persona) {
        const params = new URLSearchParams();

        params.append('name', persona.nombre);
        params.append('birthDate', persona.cumpleanios);
        params.append('deathDate', persona.muerte);
        params.append('wikiUrl', persona.wiki);
        params.append('imageUrl', persona.imagen);
        params.append('entities', persona.entidades.join(','));        
        params.append('products', persona.productos.join(',')); 

        try {
            const response = await axios.post(
                `${this.baseURL}/persons`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );

            return response.data; 
        } catch (error) {
            console.error("Error al crear la persona:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async getProductosFromPersona(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/persons/${id}/products`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async getEntidadesFromPersona(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/persons/${id}/entities`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }


    async deletePersona(id) {
        
        try {
            const response = await axios.delete(
                `${this.baseURL}/persons/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al borrar la persona:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async getPersonaByNombre(nombre) {
        try {
            const response = await axios.get(`${this.baseURL}/persons/personname/${nombre}`);
            if (response.status == 204) {   
                return true
            }
            return false;  
        } catch (error) {
            if (error.response && error.response.status == 404) {
                return false;  // Producto no encontrado
            }
            return false;  // Devuelve un array vacío en caso de error
        }
    }

    async putPersona(id, campo, valor) {

        const params = new URLSearchParams();

        params.append(campo, valor);
          
        const response = await this.getPersonaById(id);
        const etag = response.headers.get("etag");
        try {
            const response = await axios.put(
                `${this.baseURL}/persons/${id}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`,
                        'If-Match': etag 
                    }
                }
            );
            if (response.status == 209) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }
    }

    async putItemToPersona(id, items, item1, item2, valores) {
        try {
            const response = await this.getPersonaById(id);
            const etag = response.headers.get("etag");

            if (typeof valores === "string") {
                valores = valores
                    .split(",")
                    .map(s => parseInt(s.trim()))
                    .filter(n => !isNaN(n));
            }
            const datosActuales = response.data[item1][item2] ?? [];
            const actuales = Array.isArray(datosActuales) ? datosActuales : Array.from(datosActuales);
    
            const acciones = [];
    
            valores.forEach(idValor => {
                if (!actuales.includes(idValor)) {
                    acciones.push({ accion: "add", id: idValor });
                }
            });
    
            actuales.forEach(idActual => {
                if (!valores.includes(idActual)) {
                    acciones.push({ accion: "rem", id: idActual });
                }
            });
    
            if (acciones.length === 0) {
                console.log("🔍 No hay cambios para aplicar.");
                return true;
            }
    
            for (const accion of acciones) {
                const params = new URLSearchParams();
                params.append(item2, accion.id);
    
                const putResponse = await axios.put(
                    `${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`,
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${this.getToken()}`,
                            'If-Match': etag
                        }
                    }
                );
    
                if (putResponse.status !== 209) {
                    console.warn(`⚠️ PUT ${accion.accion} falló para el ID ${accion.id}`);
                    return false;
                }
            }
    
            return true;
    
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }
        }
    }




    // ------------------ ENTIDADES ------------------
    async getEntidades() {
        try {
            const response = await axios.get(`${this.baseURL}/entities`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener entidades desde la API:", error);
            return JSON.parse(localStorage.getItem("entidades")) || [];
        }
    }
    

    async getEntidadById(id) {
        try {
            const response = await axios.get(`${this.baseURL}/entities/${id}`);
            return response;
        } catch (error) {
            const entidades = JSON.parse(localStorage.getItem("entidades")) || [];
            return entidades.find(p => p.id == id) || null;
        }
    }

    async getEntidadByNombre(nombre) {
        try {
            const response = await axios.get(
                `${this.baseURL}/entities/entityName/${nombre}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;  
        } catch (error) {
            if (error.response && error.response.status == 404) {
                return false;  
            }
            return true;  
        }
    }

    async postEntidad(entidad) {
        const params = new URLSearchParams();

        params.append('name', entidad.nombre);
        params.append('birthDate', entidad.cumpleanios);
        params.append('deathDate', entidad.muerte);
        params.append('wikiUrl', entidad.wiki);
        params.append('imageUrl', entidad.imagen);
        params.append('persons', entidad.personas.join(','));        
        params.append('products', entidad.productos.join(',')); 

        try {
            const response = await axios.post(
                `${this.baseURL}/entities`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );

            return response.data; 
        } catch (error) {
            console.error("Error al crear la persona:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async putItemToEntidad(id, items, item1, item2, valores) {
        try {
            const response = await this.getEntidadById(id);
            const etag = response.headers.get("etag");

            if (typeof valores === "string") {
                valores = valores
                    .split(",")
                    .map(s => parseInt(s.trim()))
                    .filter(n => !isNaN(n));
            }
            const datosActuales = response.data[item1][item2] ?? [];
            const actuales = Array.isArray(datosActuales) ? datosActuales : Array.from(datosActuales);
    
            const acciones = [];
    
            valores.forEach(idValor => {
                if (!actuales.includes(idValor)) {
                    acciones.push({ accion: "add", id: idValor });
                }
            });
    
            actuales.forEach(idActual => {
                if (!valores.includes(idActual)) {
                    acciones.push({ accion: "rem", id: idActual });
                }
            });
    
            if (acciones.length === 0) {
                console.log("🔍 No hay cambios para aplicar.");
                return true;
            }
    
            for (const accion of acciones) {
                const params = new URLSearchParams();
                params.append(item2, accion.id);
    
                const putResponse = await axios.put(
                    `${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`,
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${this.getToken()}`,
                            'If-Match': etag
                        }
                    }
                );
    
                if (putResponse.status !== 209) {
                    console.warn(`⚠️ PUT ${accion.accion} falló para el ID ${accion.id}`);
                    return false;
                }
            }
    
            return true;
    
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }
        }
    }

    async deleteEntidad(id) {
        
        try {
            const response = await axios.delete(
                `${this.baseURL}/entities/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al borrar la persona:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async putEntidad(id, campo, valor) {

        const params = new URLSearchParams();

        params.append(campo, valor);
          
        const response = await this.getEntidadById(id);
        const etag = response.headers.get("etag");
        try {
            const response = await axios.put(
                `${this.baseURL}/entities/${id}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`,
                        'If-Match': etag 
                    }
                }
            );
            if (response.status == 209) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }
    }

    async getProductosFromEntidad(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/entities/${id}/products`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async getPersonasFromEntidad(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/entities/${id}/persons`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async getAsociacionesFromEntidad(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/entities/${id}/asociaciones`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    


    // ------------------ PRODUCTOS ------------------
    async getProductos() {
        try {
            const response = await axios.get(`${this.baseURL}/products`);
            return response.data;  // Retorna el array de productos.
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];  // Devuelve un array vacío en caso de error.
        }
    }
    

    async getProductoById(id) {
        try {
            const response = await axios.get(`${this.baseURL}/products/${id}`);
            return response;
        } catch (error) {
            const productos = JSON.parse(localStorage.getItem("productos")) || [];
            return productos.find(p => p.id == id) || null;
        }
    }

    async getProductoByNombre(nombre) {
        try {
            const response = await axios.get(`${this.baseURL}/products/productname/${nombre}`);
            if (response.status == 204) {   
                return true
            }
            return false;  
        } catch (error) {
            if (error.response && error.response.status == 404) {
                return false;  // Producto no encontrado
            }
            return false;  // Devuelve un array vacío en caso de error
        }
    }
    async postProducto(producto) {
        const params = new URLSearchParams();
        console.log(producto)
        params.append('name', producto.nombre);
        params.append('birthDate', producto.cumpleanios);
        params.append('deathDate', producto.muerte);
        params.append('wikiUrl', producto.wiki);
        params.append('imageUrl', producto.imagen);
        params.append('persons', producto.personas.join(','));        
        params.append('entities', producto.entidades.join(',')); 

        try {
            const response = await axios.post(
                `${this.baseURL}/products`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 201) {
                return true
            }
            return false; 
        } catch (error) {
            console.error("Error al crear el producto:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async deleteProducto(id) {
        
        try {
            const response = await axios.delete(
                `${this.baseURL}/products/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al borrar el producto:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async putProducto(id, campo, valor) {

        const params = new URLSearchParams();

        params.append(campo, valor);
          
        const response = await this.getProductoById(id);
        const etag = response.headers.get("etag");
        try {
            const response = await axios.put(
                `${this.baseURL}/products/${id}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`,
                        'If-Match': etag 
                    }
                }
            );
            if (response.status == 209) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }
    }


    async getPersonasFromProducto(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/products/${id}/persons`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async getEntidadesFromProducto(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/products/${id}/entities`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async putItemToProducto(id, items, item1, item2, valores) {
        try {
            const response = await this.getProductoById(id);
            const etag = response.headers.get("etag");

            if (typeof valores === "string") {
                valores = valores
                    .split(",")
                    .map(s => parseInt(s.trim()))
                    .filter(n => !isNaN(n));
            }
            const datosActuales = response.data[item1][item2] ?? [];
            const actuales = Array.isArray(datosActuales) ? datosActuales : Array.from(datosActuales);
    
            const acciones = [];
    
            valores.forEach(idValor => {
                if (!actuales.includes(idValor)) {
                    acciones.push({ accion: "add", id: idValor });
                }
            });
    
            actuales.forEach(idActual => {
                if (!valores.includes(idActual)) {
                    acciones.push({ accion: "rem", id: idActual });
                }
            });
    
            if (acciones.length === 0) {
                console.log("🔍 No hay cambios para aplicar.");
                return true;
            }
    
            for (const accion of acciones) {
                const params = new URLSearchParams();
                params.append(item2, accion.id);
                console.log(`${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`)
                const putResponse = await axios.put(
                    `${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`,
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${this.getToken()}`,
                            'If-Match': etag
                        }
                    }
                );
    
                if (putResponse.status !== 209) {
                    console.warn(`⚠️ PUT ${accion.accion} falló para el ID ${accion.id}`);
                    return false;
                }
            }
    
            return true;
    
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }
        }
    }
    

    // ------------------ USUARIOS ------------------
    async getUsuarios() {

        try{
            const response = await axios.get(
                `${this.baseURL}/users`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            return response.data;
        }catch(error){
            console.error("Error al obtener usuarios desde la API:", error);
            return JSON.parse(localStorage.getItem("usuarios")) || [];

        }
    }


    async login(nombre, contrasenia) {
        const params = new URLSearchParams();
        params.append('username', nombre);
        params.append('password', contrasenia);
    
        try {
            const response = await axios.post(
                `${this.baseURL.replace("/api/v1", "")}/access_token`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.status == 200){
                const token = response.data.access_token;
                localStorage.setItem("token", token);
        
                return {
                    success: true,
                    
                };
            }
    
            
    
        } catch (error) {
            console.error("Error en login:", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }
        }
    }
    
    getToken() {
        return localStorage.getItem("token") || null;
    }


    deleteToken() {
        localStorage.removeItem("token");
    }


    async deleteUsuario(id) {
        
        try {
            const response = await axios.delete(
                `${this.baseURL}/users/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al borrar al usuario:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async putUsuario(id, campo, valor) {

        const params = new URLSearchParams();

        params.append(campo, valor);
          
        const response = await this.getUsuarioById(id);
        const etag = response.headers.get("etag");
        try {
            const response = await axios.put(
                `${this.baseURL}/users/${id}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`,
                        'If-Match': etag 
                    }
                }
            );
            if (response.status == 209) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar al usuario:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async getUsuarioById(id) {
        try {
            const response = await axios.get(
                `${this.baseURL}/users/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            return response;
        } catch (error) {
            alert(error)
        }
    }

    async getUsuarioByNombre(nombre) {
        try {
            const response = await axios.get(`${this.baseURL}/users/username/${nombre}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });
            if (response.status == 204) {
                return true; 
            }
            return false; 
        } catch (error) {
            if (error.response && error.response.status == 404) {
                return false; 
            }
            console.error("Error inesperado:", error);
            return true; 
        }
    }
    

    async postUsuario(usuario) {
        const params = new URLSearchParams();
        console.log(usuario)
        params.append('username', usuario.nombre);
        params.append('birthDate', usuario.birthDate ? usuario.birthDate : "0000-01-01");
        params.append('password', usuario.contrasenia);
        params.append("email", usuario.email);
        params.append("role", usuario.role ? usuario.role : "INACTIVE");
        console.log(params.values())
        try {
            const response = await axios.post(
                `${this.baseURL}/users`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.status == 201){
                return true
            }

            return false; 
        } catch (error) {
            console.error("Error al crear al usuario:", error.response.data);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }


    async getAsociaciones() {
        try {
            const response = await axios.get(`${this.baseURL}/asociaciones`);
            return response.data;  
        } catch (error) {
            console.error('Error al obtener las asociaciones:', error);
            return [];  
        }
    }
    

    async getAsociacionById(id) {
        try {
            const response = await axios.get(`${this.baseURL}/asociaciones/${id}`);
            return response;
        } catch (error) {
            const asociaciones = JSON.parse(localStorage.getItem("asociaciones")) || [];
            return asociaciones.find(p => p.id == id) || null;
        }
    }

    async getAsociacionByNombre(nombre) {
        try {
            const response = await axios.get(`${this.baseURL}/asociaciones/asociacionname/${nombre}`);
            if (response.status == 204) {   
                return true
            }
            return false;  
        } catch (error) {
            if (error.response && error.response.status == 404) {
                return false;  
            }
            return false;  
        }
    }
    async postAsociacion(asociacion) {
        const params = new URLSearchParams();

        params.append('name', asociacion.nombre);
        params.append('birthDate', asociacion.cumpleanios);
        params.append('deathDate', asociacion.muerte);
        params.append('wikiUrl', asociacion.wiki);
        params.append('imageUrl', asociacion.imagen);
        params.append('entities', asociacion.entidades.join(',')); 

        try {
            const response = await axios.post(
                `${this.baseURL}/asociaciones`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 201) {
                return true
            }
            return false; 
        } catch (error) {
            console.error("Error al crear la asociacion:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async deleteAsociacion(id) {
        
        try {
            const response = await axios.delete(
                `${this.baseURL}/asociaciones/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
            );
            if (response.status == 204) {   
                return true
            }
            return false;
        } catch (error) {
            console.error("Error al borrar la asociacion:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }

        
    }

    async putAsociacion(id, campo, valor) {

        const params = new URLSearchParams();

        params.append(campo, valor);
          
        const response = await this.getAsociacionById(id);
        const etag = response.headers.get("etag");
        try {
            const response = await axios.put(
                `${this.baseURL}/asociaciones/${id}`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`,
                        'If-Match': etag 
                    }
                }
            );
            if (response.status == 209) {   
                return true
            }
            return false;
        } catch (error) {

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }

        }
    }



    async getEntidadesFromAsociacion(id){
        try {
            const response = await axios.get(
                `${this.baseURL}/asociaciones/${id}/entities`,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                }
                
            );
            if (response.status==200){
                return response.data;

            }
        } catch (error) {
            console.log(error)
            const personas = JSON.parse(localStorage.getItem("personas")) || [];
            return personas.find(p => p.id == id) || null;
        }
    }

    async putEntidadToAsociacion(id, items, item1, item2, valores) {
        try {
            const response = await this.getAsociacionById(id);
            const etag = response.headers.get("etag");

            if (typeof valores === "string") {
                valores = valores
                    .split(",")
                    .map(s => parseInt(s.trim()))
                    .filter(n => !isNaN(n));
            }
            const datosActuales = response.data[item1][item2] ?? [];
            const actuales = Array.isArray(datosActuales) ? datosActuales : Array.from(datosActuales);
    
            const acciones = [];
    
            valores.forEach(idValor => {
                if (!actuales.includes(idValor)) {
                    acciones.push({ accion: "add", id: idValor });
                }
            });
    
            actuales.forEach(idActual => {
                if (!valores.includes(idActual)) {
                    acciones.push({ accion: "rem", id: idActual });
                }
            });
    
            if (acciones.length === 0) {
                console.log("🔍 No hay cambios para aplicar.");
                return true;
            }
    
            for (const accion of acciones) {
                const params = new URLSearchParams();
                params.append(item2, accion.id);
                console.log(`${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`)
                const putResponse = await axios.put(
                    `${this.baseURL}/${items}/${id}/${item2}/${accion.accion}/${accion.id}`,
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${this.getToken()}`,
                            'If-Match': etag
                        }
                    }
                );
    
                if (putResponse.status !== 209) {
                    console.warn(`⚠️ PUT ${accion.accion} falló para el ID ${accion.id}`);
                    return false;
                }
            }
    
            return true;
    
        } catch (error) {
            console.error("Error al actualizar la asociación:", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.error_description || 'Error en las credenciales'
                };
            } else if (error.request) {
                return {
                    success: false,
                    status: 0,
                    message: "Servidor no responde"
                };
            } else {
                return {
                    success: false,
                    status: -1,
                    message: "Error desconocido"
                };
            }
        }
    }
    


}

export default API;
