document.addEventListener("DOMContentLoaded", function () {
    const inputTarea = document.getElementById("nuevaTarea");
    const btnAgregar = document.querySelector("#btnAgregar"); 
    const listaTareas = document.getElementById("listaTareas");

    if (!btnAgregar || !inputTarea || !listaTareas) {
        console.error("Error: No se encontraron los elementos en el DOM.");
        return;
    }
    let tareas = [];

    // Obtener tareas desde el servidor
    function obtenerTareas() {
        fetch("tareas.php?nocache=" + new Date().getTime()) // Evita que se use caché
            .then(response => response.json())
            .then(data => {
                console.log("Tareas obtenidas del servidor:", data); // 👀 Verifica si la tarea aparece aquí
                tareas = data; 
                renderTareas();
            })
            .catch(error => console.error("Error al obtener las tareas:", error));
    }    

    function guardarTarea(texto) {
        console.log("Enviando tarea:", texto);
        fetch("tareas.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ descripcion: texto }) // Enviamos solo la descripción
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            obtenerTareas(); // Refrescar la lista después de agregar
        })
        .catch(error => console.error("Error al guardar la tarea:", error));
    }

    function eliminarTarea(id) {
        fetch("tareas.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(() => obtenerTareas()) // Actualiza la lista después de eliminar
        .catch(error => console.error("Error al eliminar la tarea:", error));
    }

    function editarTarea(id, nuevoTexto) {
        fetch("tareas.php", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, descripcion: nuevoTexto })
        })
        .then(response => response.json())
        .then(() => obtenerTareas()) // Refresca la lista de tareas
        .catch(error => console.error("Error al editar la tarea:", error));
    }

    function completarTarea(id, estadoActual) {
        fetch("tareas.php", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, completada: estadoActual ? "0" : "1" }) // Cambia el estado
        })
        .then(response => response.json())
        .then(() => obtenerTareas()) // Recarga las tareas actualizadas
        .catch(error => console.error("Error al completar la tarea:", error));
    }    
   

    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto === "") return;
        guardarTarea(texto);
        inputTarea.value = ""; // Limpia el input después de enviar la tarea
    }

    function renderTareas() {
        console.log("Renderizando tareas:", tareas);
        listaTareas.innerHTML = "";
    
        tareas.forEach((tarea) => {
            const item = document.createElement("li");
            item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
            const textoTarea = document.createElement("span");
            textoTarea.textContent = tarea.descripcion;
    
            // ✅ Convierte "1"/"0" a booleano correctamente
            const completada = tarea.completada === "1" || tarea.completada === 1;
            textoTarea.style.textDecoration = completada ? "line-through" : "none";
    
            // Botón Editar ✏️
            const btnEditar = document.createElement("button");
            btnEditar.innerHTML = "✏️";
            btnEditar.classList.add("btn-edit");
            btnEditar.addEventListener("click", function () {
                const nuevoTexto = prompt("Editar tarea:", tarea.descripcion);
                if (nuevoTexto) {
                    editarTarea(tarea.id, nuevoTexto);
                }
            });
    
            // Botón Eliminar ❌
            const btnEliminar = document.createElement("button");
            btnEliminar.innerHTML = "❌";
            btnEliminar.classList.add("btn-delete");
            btnEliminar.addEventListener("click", function () {
                eliminarTarea(tarea.id);
            });
    
            // Botón Completar ✔️
            const btnCompletar = document.createElement("button");
            btnCompletar.innerHTML = "✔️";
            btnCompletar.classList.add("btn-completar");
            btnCompletar.addEventListener("click", function () {
                completarTarea(tarea.id, completada);
            });
    
            // Contenedor de botones
            const contenedorBotones = document.createElement("div");
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);
            contenedorBotones.appendChild(btnCompletar);
    
            item.appendChild(textoTarea);
            item.appendChild(contenedorBotones);
            listaTareas.appendChild(item);
        });
    }    
    

    // Cargar las tareas cuando la página se inicia
    obtenerTareas();

    // Agregar evento al botón
    btnAgregar.addEventListener("click", agregarTarea);
});
