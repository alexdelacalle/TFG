import ControladorAdministrador from "../Controladores/ControladorAdministrador.js";


export default class VistaAdministrador {

    constructor() {
        this.controladorAdministrador = new ControladorAdministrador(this);
        if (!this.controladorAdministrador.validarUsuarioWriter()){
            window.location.href = '/HTML/index.html';
        
        }
        this.botonCrearEntidad = document.getElementById('crearEntidad');
        this.botonCrearPersona = document.getElementById('crearPersona');
        this.botonCrearProducto = document.getElementById('crearProducto');
        this.botonCrearUsuario = document.getElementById('crearUsuario');
        this.botonCrearAsociacion = document.getElementById('crearAsociacion');
        this.inicializar();
        
    }

    mostrarBannerAsociacion(){
        const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.style.display = 'flex';

            overlay.innerHTML = `
                <div class="banner">
                    <button class="cruz" id="cerrar-Banner">✖</button>
                    <div class="formulario" id="formulario-creacion">
                        <h2>Crear Asociacion</h2>
                        <form id="formElementos">
                            <div class="campo">
                                <label for="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" required>
                            </div>
                            <div class="campo">
                                <label for="fundacion">Fecha de Fundación:</label>
                                <input type="date" id="fechaNacimiento" name="fundacion" required>
                            </div>
                            <div class="campo">
                                <label for="vigencia">Fecha de Clausura:</label>
                                <input type="date" id="fechaFallecimiento" name="vigencia" required>
                            </div>
                            <div class="campo">
                                <label for="wiki">Wiki</label>
                                <input type="url" id="wiki" name="wiki" required>
                            </div>
                            <div class="campo">
                                <label for="imagen">Url imagen</label>
                                <input type="url" id="imagen" name="imagen" required>
                            </div>
                            <div class="middle-form-button-container">
                                <button id="middle-form-asociacion" class="middle-form" type="submit">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        document.body.appendChild(overlay);
        document.getElementById('cerrar-Banner').addEventListener('click', () => {
            overlay.style.display = 'none';
        })
        document.getElementById('middle-form-asociacion').addEventListener('click', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const fechaFallecimiento = document.getElementById('fechaFallecimiento').value;
            const wiki = document.getElementById('wiki').value;
            const imagen = document.getElementById('imagen').value;
            const itemName = 'asociacion';
            const item = [nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen];
            let respuesta = await this.controladorAdministrador.añadirItem(itemName, item);
            if (respuesta) {
                this.mostrarMensaje("Asociacion creada correctamente.");
                overlay.style.display = 'none';
            }
            else {
                this.mostrarMensaje("Error al crear la asociación.");
            }
        });
    }

    mostrarBannerProducto(){
        const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.style.display = 'flex';

            overlay.innerHTML = `
                <div class="banner">
                    <button class="cruz" id="cerrar-Banner">✖</button>
                    <div class="formulario" id="formulario-creacion">
                        <h2>Crear Producto</h2>
                        <form id="formElementos">
                            <div class="campo">
                                <label for="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" required>
                            </div>
                            <div class="campo">
                                <label for="fundacion">Fecha de Creacion:</label>
                                <input type="date" id="fechaNacimiento" name="fundacion" required>
                            </div>
                            <div class="campo">
                                <label for="vigencia">Fecha de Obsolescencia:</label>
                                <input type="date" id="fechaFallecimiento" name="vigencia" required>
                            </div>
                            <div class="campo">
                                <label for="wiki">Wiki</label>
                                <input type="url" id="wiki" name="wiki" required>
                            </div>
                            <div class="campo">
                                <label for="imagen">Url imagen</label>
                                <input type="url" id="imagen" name="imagen" required>
                            </div>
                            <div class="middle-form-button-container">
                                <button id="middle-form-producto" class="middle-form" type="submit">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        document.body.appendChild(overlay);
        document.getElementById('cerrar-Banner').addEventListener('click', () => {
            overlay.style.display = 'none';
        })
        document.getElementById('middle-form-producto').addEventListener('click', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const fechaNacimiento = this.convertirFecha(document.getElementById('fechaNacimiento').value);
            const fechaFallecimiento = this.convertirFecha(document.getElementById('fechaFallecimiento').value);
            const wiki = document.getElementById('wiki').value;
            const imagen = document.getElementById('imagen').value;
            const itemName = 'producto';
            const item = [nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen];
            let respuesta = await this.controladorAdministrador.añadirItem(itemName, item);
            if (respuesta) {
                this.mostrarMensaje("Producto creado correctamente.");
                overlay.style.display = 'none';
            }
            else {
                this.mostrarMensaje("Error al crear el producto.");
            }
        });
    }

    

    mostrarBannerEntidad(){
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.style.display = 'flex';

        overlay.innerHTML = `
            <div class="banner">
                <button class="cruz" id="cerrar-Banner">✖</button>
                <div class="formulario" id="formulario-creacion">
                    <h2>Crear Entidad</h2>
                    <form id="formElementos">
                        <div class="campo">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="campo">
                            <label for="fundacion">Fecha de Fundación:</label>
                            <input type="date" id="fechaNacimiento" name="fundacion" required>
                        </div>
                        <div class="campo">
                            <label for="vigencia">Fecha de Cierre:</label>
                            <input type="date" id="fechaFallecimiento" name="vigencia" required>
                        </div>
                        <div class="campo">
                            <label for="wiki">Wiki</label>
                            <input type="url" id="wiki" name="wiki" required>
                        </div>
                        <div class="campo">
                            <label for="imagen">Url imagen</label>
                            <input type="url" id="imagen" name="imagen" required>
                        </div>
                        <div class="middle-form-button-container">
                            <button id="middle-form-entidad" class="middle-form" type="submit">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.getElementById('cerrar-Banner').addEventListener('click', () => {
            overlay.style.display = 'none';
        })
        document.getElementById('middle-form-entidad').addEventListener('click', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const fechaFallecimiento = document.getElementById('fechaFallecimiento').value;
            const wiki = document.getElementById('wiki').value;
            const imagen = document.getElementById('imagen').value;
            const itemName = 'entidad';
            const item = [nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen];
            let respuesta = await this.controladorAdministrador.añadirItem(itemName, item);
            if (respuesta) {
                this.mostrarMensaje("Entidad creada correctamente.");
                overlay.style.display = 'none';
            }
            else {
                this.mostrarMensaje("Error al crear la entidad.");
            }
        });
    }


    

    mostrarBannerUsuario(){
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.style.display = 'flex';

        overlay.innerHTML = `
            <div class="banner">
                <button class="cruz" id="cerrar-Banner-usuario">✖</button>
                <div class="formulario" id="formulario-creacion-persona">
                    <h2>Crear Usuario</h2>
                    <form id="formElementos" >
                        <div class="campo">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="campo">
                                <label for="fundacion">Fecha de Nacimiento:</label>
                                <input type="date" id="fechaNacimiento" name="fundacion" required>
                        </div>
                        <div class="campo">
                            <label for="email">Email:</label>
                            <input type="text" id="email" name="email" required >
                        </div>
                        <div class="campo">
                            <label for="contrasenia-1">Contraseña:</label>
                            <input type="password" id="contrasenia-1" name="contrasenia-1" required>
                        </div>
                        <div class="campo">
                            <label for="contrasenia">Vuelve a escribir la contraseña</label>
                            <input type="password" id="contrasenia-2" name="contrasenia-2" required>
                        </div>
                        <div class="campo">
                            <label for="roles">Seleccionar role:</label>
                            <select id="roles" name="roles">
                                <option value="writer">Editor</option>
                                <option value="reader">Lector</option>
                                <option value="inactive">Inactivo</option>
                        </select>
                        </div>
                        <div class="middle-form-button-container">
                            <button id="middle-form-usuario" class="middle-form" type="submit">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.getElementById('cerrar-Banner-usuario').addEventListener('click', () => {
            overlay.remove()
        })
        document.getElementById('middle-form-usuario').addEventListener('click', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const email = document.getElementById('email').value;
            const contrasenia_1 = document.getElementById('contrasenia-1').value;
            const contrasenia_2 = document.getElementById('contrasenia-2').value;
            const role = document.getElementById('roles').value;
            const itemName = 'usuario';
            const item = [nombre, fechaNacimiento,email, contrasenia_1, contrasenia_2, role];
            let respuesta = await this.controladorAdministrador.añadirItem(itemName, item);
            if (respuesta) {
                this.mostrarMensaje("Usuario creado correctamente.");
                overlay.style.display = 'none';
            }
            else {
                this.mostrarMensaje("Error al crear el usuario.");
            }
        });
    }

    mostrarBannerPersona(){
        const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.style.display = 'flex';

            overlay.innerHTML = `
                <div class="banner">
                    <button class="cruz" id="cerrar-Banner-persona">✖</button>
                    <div class="formulario" id="formulario-creacion">
                        <h2>Crear Persona</h2>
                        <form id="formElementos">
                            <div class="campo">
                                <label for="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" required>
                            </div>
                            <div class="campo">
                                <label for="fundacion">Fecha de Nacimiento:</label>
                                <input type="date" id="fechaNacimiento" name="fundacion" required>
                            </div>
                            <div class="campo">
                                <label for="vigencia">Fecha de Fallecimiento:</label>
                                <input type="date" id="fechaFallecimiento" name="vigencia" required>
                            </div>
                            <div class="campo">
                                <label for="wiki">Wiki</label>
                                <input type="url" id="wiki" name="wiki" required>
                            </div>
                            <div class="campo">
                                <label for="imagen">Url imagen</label>
                                <input type="url" id="imagen" name="imagen" required>
                            </div>
                            <div class="middle-form-button-container">
                                <button id="middle-form-persona" class="middle-form" type="submit">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            document.getElementById('cerrar-Banner-persona').addEventListener('click', () => {
                overlay.style.display = 'none';
            })
            document.getElementById('middle-form-persona').addEventListener('click', async (event) => {
                event.preventDefault();
                const nombre = document.getElementById('nombre').value;
                const fechaNacimiento = document.getElementById('fechaNacimiento').value;
                const fechaFallecimiento = document.getElementById('fechaFallecimiento').value;
                const wiki = document.getElementById('wiki').value;
                const imagen = document.getElementById('imagen').value;
                const itemName = 'persona';
                const item = [nombre, fechaNacimiento, fechaFallecimiento, wiki, imagen];
                let respuesta = await this.controladorAdministrador.añadirItem(itemName, item);
                if (respuesta) {
                    this.mostrarMensaje("Persona creada correctamente.");
                    overlay.style.display = 'none';
                }
                else {
                    this.mostrarMensaje("Error al crear la persona.");
                }
            });
    }
        


    async inicializar() {
        

        let listaProductos = await this.controladorAdministrador.cargarProductos();
        let listaEntidades = await this.controladorAdministrador.cargarEntidades();
        let listaPersonas = await this.controladorAdministrador.cargarPersonas();
        let listaUsuarios = await this.controladorAdministrador.cargarUsuarios();
        let listaAsociaciones = await this.controladorAdministrador.cargarAsociaciones();
        this.actualizarListaProductos(listaProductos);
        this.actualizarListaEntidades(listaEntidades);
        this.actualizarListaPersonas(listaPersonas);
        this.actualizarListaUsuarios(listaUsuarios);
        this.actualizarListaAsociaciones(listaAsociaciones);
        await this.inicializarBotonesEditar();
        await this.inicializarBotonesEliminar();
        await this.inicializarBotonesCrear();
        
    }

    async inicializarBotonesCrear() {
        this.botonCrearUsuario.addEventListener('click', async (event) => {
            event.preventDefault();
            this.mostrarBannerUsuario(); 
            
        });

        this.botonCrearProducto.addEventListener('click', async (event) => {
            event.preventDefault(); 
            this.mostrarBannerProducto();
        });

        this.botonCrearEntidad.addEventListener('click', async (event) => {
            event.preventDefault(); 
            this.mostrarBannerEntidad();
        });
        this.botonCrearPersona.addEventListener('click', async (event) => {
            event.preventDefault(); 
            this.mostrarBannerPersona();
        });

        this.botonCrearAsociacion.addEventListener('click', async (event) => {
            event.preventDefault(); 
            this.mostrarBannerAsociacion();
        });
        
        

    }

    async inicializarBotonesEliminar(){
        document.querySelectorAll('[id^="btn-eliminar-usuario-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const item = partes[2];
                const id = partes[3];
                let respuesta = await this.controladorAdministrador.eliminarItem(id,item);
                if (respuesta) {
                    this.mostrarMensaje("Usuario eliminado correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al eliminar el usuario.");
                }
            });
        });

        document.querySelectorAll('[id^="btn-eliminar-producto-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const item = partes[2];
                const id = partes[3];
                let respuesta = await this.controladorAdministrador.eliminarItem(id,item);
                if (respuesta) {
                    this.mostrarMensaje("Producto eliminado correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al eliminar el producto.");
                }
            });
        });

        document.querySelectorAll('[id^="btn-eliminar-entidad-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const item = partes[2];
                const id = partes[3];
                let respuesta = await this.controladorAdministrador.eliminarItem(id,item);
                if (respuesta) {
                    this.mostrarMensaje("Entidad eliminada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al eliminar la entidad.");
                }
            });
        });

        document.querySelectorAll('[id^="btn-eliminar-persona-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const item = partes[2];
                const id = partes[3];
                let respuesta = await this.controladorAdministrador.eliminarItem(id,item);
                if (respuesta) {
                    this.mostrarMensaje("Persona eliminada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al eliminar a la persona.");
                }
            });
        });

        document.querySelectorAll('[id^="btn-eliminar-asociacion-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const item = partes[2];
                const id = partes[3];
                let respuesta = await this.controladorAdministrador.eliminarItem(id,item);
                if (respuesta) {
                    this.mostrarMensaje("Asociación eliminada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al eliminar la asociación.");
                }
            });
        });
    }

    async inicializarBotonesEditar() {

        document.querySelectorAll('[id^="btn-producto-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                const item = partes[1];
                let respuesta = await this.controladorAdministrador.editarItem(id, item, campo, nuevoValor);
                if (respuesta) {
                    this.mostrarMensaje("Producto editado correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar el usuario.");
                }
            });
        });

        document.querySelectorAll('[id^="btn-usuario-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                let respuesta = await this.controladorAdministrador.editarUsuario(id, campo, nuevoValor);
                if (respuesta) {
                    this.mostrarMensaje("Usuario editado correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar el usuario.");
                }
            });
        });
    
        document.querySelectorAll('[id^="btn-persona-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                const item = partes[1];
                console.log(campo, id, nuevoValor, item);

                let respuesta= await this.controladorAdministrador.editarItem(id, item, campo, nuevoValor); 
                if (respuesta) {
                    this.mostrarMensaje("Persona editada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar persona.");
                }
            });
        });
    
        document.querySelectorAll('[id^="btn-entidad-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                const item = partes[1];
                let respuesta= await this.controladorAdministrador.editarItem(id, item, campo, nuevoValor); 
                if (respuesta) {
                    this.mostrarMensaje("Entidad editada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar entidad.");
                }            
            });
        });

        document.querySelectorAll('[id^="btn-asociacion-editar-"]').forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault();
                const partes = boton.id.split('-');
                const campo = partes[3];
                const id = partes[4];
                const input = boton.previousElementSibling;
                const nuevoValor = input.value;
                const item = partes[1];
                let respuesta= await this.controladorAdministrador.editarItem(id, item, campo, nuevoValor); 
                if (respuesta) {
                    this.mostrarMensaje("Asociación editada correctamente.");
                }
                else {
                    this.mostrarMensaje("Error al editar la asocaición.");
                }            
            });
        });
    }
    

    actualizarListaUsuarios(listaUsuarios) {
        const contenedor = document.querySelector("#usuarios .elementos-lista");
        contenedor.innerHTML = ""; 
    
        const rolesDisponibles = [
            { value: "READER", texto: "Lector" },
            { value: "WRITER", texto: "Editor" },
            { value: "INACTIVE", texto: "Inactivo" }
        ];

    
        listaUsuarios.forEach(usuario => {
            const divUsuario = document.createElement("div");
            divUsuario.classList.add("elemento");
            const opcionesRoles = rolesDisponibles.map(rol => {
                const selected = rol.value === usuario.role ? 'selected' : '';
                return `<option value="${rol.value}" ${selected}>${rol.texto}</option>`;
            }).join("");
            divUsuario.innerHTML = `
                <div class="descripcion-usuarios">
                    <form class="form-linea-usuarios" id="form-id-${usuario.id}">
                        <label><strong>📌 ID de usuario:</strong>${usuario.id}</label>
                    </form>
                    <form class="form-linea-usuarios" id="form-nombre-${usuario.id}">
                        <label><strong>📌 Nombre de usuario:</strong></label>
                        <input type="text" name="username" value="${usuario.nombre}" />
                        <button id="btn-usuario-editar-nombre-${usuario.id}" type="submit">Actualizar</button>
                    </form>
                    <form class="form-linea-usuarios" id="form-fecha-${usuario.id}">
                        <label><strong>📅 Fecha de nacimiento:</strong></label>
                        <input type="date" id="fechaNacimiento-${usuario.id}" name="fechaNacimiento" value="${usuario.birthDate}" />
                        <button id="btn-usuario-editar-fecha-${usuario.id}" type="submit">Actualizar</button>
                    </form>
                    <form class="form-linea-usuarios" id="form-email-${usuario.id}">
                        <label><strong>📧 Correo electrónico:</strong></label>
                        <input type="email" name="email" value="${usuario.email}" />
                        <button id="btn-usuario-editar-email-${usuario.id}" type="submit">Actualizar</button>
                    </form>

                    <form class="form-linea-usuarios" id="form-contrasenia-${usuario.id}">
                        <label><strong>🔒 Contraseña:</strong></label>
                        <input type="password" name="password" value="${usuario.contrasenia}" />
                        <button id="btn-usuario-editar-contrasenia-${usuario.id}" type="submit">Actualizar</button>
                    </form>

                    <form class="form-linea-usuarios" id="form-role-${usuario.id}">
                        <label><strong>👥 Rol:</strong></label>
                        <select name="rol">
                            ${opcionesRoles}
                        </select>
                        <button id="btn-usuario-editar-role-${usuario.id}" type="submit">Actualizar</button>
                    </form>
                </div>
                <button id="btn-eliminar-usuario-${usuario.id}" type="submit">Eliminar usuario</button>
            `;

    
            contenedor.appendChild(divUsuario);
        });

       
    }
    


    actualizarListaProductos(listaProductos) {
        const contenedor = document.querySelector("#productos .elementos-lista");
        contenedor.innerHTML = ""; // Limpiar productos anteriores
    
        listaProductos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("elemento");
    
            divProducto.innerHTML = `
                <div class="descripcion-usuarios">

                    <form class="form-linea-usuarios">
                        <label><strong>📌 ID del producto:</strong>${producto.id}</label>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📧 Nombre del producto:</strong></label>
                        <input type="text" name="nombre" value="${producto.nombre}" />
                        <button id="btn-producto-editar-nombre-${producto.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de creación:</strong></label>
                        <input type="date" name="fecha_creacion" value="${this.convertirFecha(producto.cumpleanios)}" />
                        <button id="btn-producto-editar-cumpleanios-${producto.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de obsolescencia:</strong></label>
                        <input type="date" name="fecha_obsolescencia" value="${this.convertirFecha(producto.muerte)}" />
                        <button id="btn-producto-editar-muerte-${producto.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🖼️ URL de imagen:</strong></label>
                        <input type="text" name="url_imagen" value="${producto.imagen}" />
                        <button id="btn-producto-editar-imagen-${producto.id}" type="submit">Actualizar</button>
                    </form>

                    <form class="form-linea-usuarios">
                        <label><strong>📚 URL de la wiki:</strong></label>
                        <input type="text" name="url_wiki" value="${producto.wiki}" />
                        <button id="btn-producto-editar-wiki-${producto.id}" type="submit">Actualizar</button>
                    </form>

                    
                    <form class="form-linea-usuarios">
                        <label><strong>👥 Lista de personas:</strong></label>
                        <input type="text" name="personas" value="${producto.personas.join(", ")}" />
                        <button id="btn-producto-editar-personas-${producto.id}" type="submit">Actualizar</button>
                    </form>
                
                    <form class="form-linea-usuarios">
                        <label><strong>🏢 Lista de entidades:</strong></label>
                        <input type="text" name="entidades" value="${producto.entidades.join(", ")}" />
                        <button id="btn-producto-editar-entidades-${producto.id}" type="submit">Actualizar</button>
                    </form>
                    
                </div>

                <button type="submit" id="btn-eliminar-producto-${producto.id}">Eliminar Producto</button>
            `;

    
            contenedor.appendChild(divProducto);
        });
    }

    convertirFecha(fecha) {
        return fecha ? fecha.replaceAll('/', '-') : '';
    }



    actualizarListaPersonas(listaPersonas) {
        const contenedor = document.querySelector("#personas .elementos-lista");
        contenedor.innerHTML = ""; 
    
        listaPersonas.forEach(persona => {
            const divPersona = document.createElement("div");
            divPersona.classList.add("elemento");
    
            divPersona.innerHTML = `
                <div class="descripcion-usuarios">
                    <form class="form-linea-usuarios">
                        <label><strong>📌 ID de la persona:</strong> ${persona.id}</label>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📧 Nombre de la persona:</strong></label>
                        <input type="text" name="nombre" value="${persona.nombre}" />
                        <button id="btn-persona-editar-nombre-${persona.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de creación:</strong></label>
                        <input type="date" name="fecha_creacion" value="${this.convertirFecha(persona.cumpleanios)}" />
                        <button id="btn-persona-editar-cumpleanios-${persona.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de obsolescencia:</strong></label>
                        <input type="date" name="fecha_obsolescencia" value="${this.convertirFecha(persona.muerte)}" />
                        <button id="btn-persona-editar-muerte-${persona.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🖼️ URL de imagen:</strong></label>
                        <input type="text" name="url_imagen" value="${persona.imagen}" />
                        <button id="btn-persona-editar-imagen-${persona.id}"  type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📚 URL de la wiki:</strong></label>
                        <input type="text" name="url_wiki" value="${persona.wiki}" />
                        <button id="btn-persona-editar-wiki-${persona.id}" type="submit">Actualizar</button>
                    </form>
                    
                    <form class="form-linea-usuarios">
                        <label><strong>👥 Lista de productos:</strong></label>
                        <input type="text" name="productos" value="${persona.productos.join(", ")}" />
                        <button id="btn-persona-editar-productos-${persona.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🏢 Lista de entidades:</strong></label>
                        <input type="text" name="entidades" value="${persona.entidades.join(", ")}" />
                        <button id="btn-persona-editar-entidades-${persona.id}" type="submit">Actualizar</button>
                    </form>
                    
                </div>
    
                <button type="submit" id="btn-eliminar-persona-${persona.id}">Eliminar Persona </button>
            `;
    
            contenedor.appendChild(divPersona);
        });
    }

    mostrarMensaje(mensaje) {
        alert(mensaje);
    }


    actualizarListaEntidades(listaEntidades) {
        const contenedor = document.querySelector("#entidades .elementos-lista");
        contenedor.innerHTML = ""; 
        listaEntidades.forEach(entidad => {
            const divEntidad = document.createElement("div");
            divEntidad.classList.add("elemento");
            divEntidad.innerHTML = `
                <div class="descripcion-usuarios">
                    <form class="form-linea-usuarios">
                        <label><strong>📌 ID de la entidad:</strong> ${entidad.id}</label>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📧 Nombre de la entidad:</strong></label>
                        <input type="text" name="nombre" value="${entidad.nombre}" />
                        <button id="btn-entidad-editar-nombre-${entidad.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de fundacion:</strong></label>
                        <input type="date" name="fecha_creacion" value="${this.convertirFecha(entidad.cumpleanios)}" />
                        <button id="btn-entidad-editar-cumpleanios-${entidad.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de cierre :</strong></label>
                        <input type="date" name="fecha_obsolescencia" value="${this.convertirFecha(entidad.muerte)}" />
                        <button id="btn-entidad-editar-muerte-${entidad.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🖼️ URL de imagen:</strong></label>
                        <input type="text" name="url_imagen" value="${entidad.imagen}" />
                        <button id="btn-entidad-editar-imagen-${entidad.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📚 URL de la wiki:</strong></label>
                        <input type="text" name="url_wiki" value="${entidad.wiki}" />
                        <button id="btn-entidad-editar-wiki-${entidad.id}" type="submit">Actualizar</button>
                    </form>
                    
                    <form class="form-linea-usuarios">
                        <label><strong>👥 Lista de personas:</strong></label>
                        <input type="text" name="personas" value="${entidad.personas.join(", ")}" />
                        <button id="btn-entidad-editar-personas-${entidad.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🏢 Lista de productos:</strong></label>
                        <input type="text" name="entidades" value="${entidad.productos.join(", ")}" />
                        <button id="btn-entidad-editar-productos-${entidad.id}"type="submit">Actualizar</button>
                    </form>

                    <form class="form-linea-usuarios">
                        <label><strong>🏢 Lista de asociaciones:</strong></label>
                        <input type="text" name="asociaciones" value="${entidad.asociaciones.join(", ")}" />
                        <button id="btn-entidad-editar-asociaciones-${entidad.id}"type="submit">Actualizar</button>
                    </form>
                    
                </div>
    
                <button type="submit" id="btn-eliminar-entidad-${entidad.id}">Eliminar Entidad</button>
            `;
    
            contenedor.appendChild(divEntidad);
        });
    }


    actualizarListaAsociaciones(listaAsociaciones) {
        const contenedor = document.querySelector("#asociaciones .elementos-lista");
        contenedor.innerHTML = ""; 
        listaAsociaciones.forEach(asociacion => {
            const divAsociacion = document.createElement("div");
            divAsociacion.classList.add("elemento");
            divAsociacion.innerHTML = `
                <div class="descripcion-usuarios">
                    <form class="form-linea-usuarios">
                        <label><strong>📌 ID de la asociacion:</strong> ${asociacion.id}</label>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📧 Nombre de la asociacion:</strong></label>
                        <input type="text" name="nombre" value="${asociacion.nombre}" />
                        <button id="btn-asociacion-editar-nombre-${asociacion.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de fundacion:</strong></label>
                        <input type="date" name="fecha_creacion" value="${this.convertirFecha(asociacion.cumpleanios)}" />
                        <button id="btn-asociacion-editar-cumpleanios-${asociacion.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📅 Fecha de cierre :</strong></label>
                        <input type="date" name="fecha_obsolescencia" value="${this.convertirFecha(asociacion.muerte)}" />
                        <button id="btn-asociacion-editar-muerte-${asociacion.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>🖼️ URL de imagen:</strong></label>
                        <input type="text" name="url_imagen" value="${asociacion.imagen}" />
                        <button id="btn-asociacion-editar-imagen-${asociacion.id}" type="submit">Actualizar</button>
                    </form>
    
                    <form class="form-linea-usuarios">
                        <label><strong>📚 URL de la wiki:</strong></label>
                        <input type="text" name="url_wiki" value="${asociacion.wiki}" />
                        <button id="btn-asociacion-editar-wiki-${asociacion.id}" type="submit">Actualizar</button>
                    </form>
                    
                    <form class="form-linea-usuarios">
                        <label><strong>👥 Lista de entidades:</strong></label>
                        <input type="text" name="entidades" value="${asociacion.entidades.join(", ")}" />
                        <button id="btn-asociacion-editar-entidades-${asociacion.id}" type="submit">Actualizar</button>
                    </form>

                    
    
                    
                </div>
    
                <button type="submit" id="btn-eliminar-asociacion-${asociacion.id}">Eliminar Asociación</button>
            `;
    
            contenedor.appendChild(divAsociacion);
        });
    }

    
    

}

window.addEventListener('DOMContentLoaded', () => {
    new VistaAdministrador();
});


    
