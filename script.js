document.addEventListener("DOMContentLoaded", function () {
    const inputTarea = document.getElementById("nuevaTarea");
    const btnAgregar = document.querySelector("#btnAgregar"); 
    const listaTareas = document.getElementById("listaTareas");

    if (!btnAgregar || !inputTarea || !listaTareas) {
        console.error("Error: No se encontraron los elementos en el DOM.");
        return;
    }
    let tareas = [];


    function obtenerTareas() {
        fetch("tareas.php?nocache=" + new Date().getTime()) // evita que se use caché
            .then(response => response.json())
            .then(data => {
                console.log("Tareas obtenidas del servidor:", data); 
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
            body: JSON.stringify({ descripcion: texto }) // enviamos solo la descripción
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            obtenerTareas(); 
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
        .then(() => obtenerTareas()) // actualiza la lista después de eliminar
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
        .then(() => obtenerTareas()) 
        .catch(error => console.error("Error al editar la tarea:", error));
    }

    function completarTarea(id, estadoActual) {
        fetch("tareas.php", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, completada: estadoActual ? "0" : "1" }) 
        })
        .then(response => response.json())
        .then(() => obtenerTareas())
        .catch(error => console.error("Error al completar la tarea:", error));
    }    
   

    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto === "") return;
        guardarTarea(texto);
        inputTarea.value = ""; 
    }

    function renderTareas() {
        console.log("Renderizando tareas:", tareas);
        listaTareas.innerHTML = "";
    
        tareas.forEach((tarea) => {
            const item = document.createElement("li");
            item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
            const textoTarea = document.createElement("span");
            textoTarea.textContent = tarea.descripcion;

            const completada = tarea.completada === "1" || tarea.completada === 1;
            textoTarea.style.textDecoration = completada ? "line-through" : "none";
    
            const btnEditar = document.createElement("button");
            btnEditar.innerHTML = "✏️";
            btnEditar.classList.add("btn-edit");
            btnEditar.addEventListener("click", function () {
                const nuevoTexto = prompt("Editar tarea:", tarea.descripcion);
                if (nuevoTexto) {
                    editarTarea(tarea.id, nuevoTexto);
                }
            });
    
            const btnEliminar = document.createElement("button");
            btnEliminar.innerHTML = "❌";
            btnEliminar.classList.add("btn-delete");
            btnEliminar.addEventListener("click", function () {
                eliminarTarea(tarea.id);
            });
    
            const btnCompletar = document.createElement("button");
            btnCompletar.innerHTML = "✔️";
            btnCompletar.classList.add("btn-completar");
            btnCompletar.addEventListener("click", function () {
                completarTarea(tarea.id, completada);
            });
    
            // contenedor de botones
            const contenedorBotones = document.createElement("div");
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);
            contenedorBotones.appendChild(btnCompletar);
    
            item.appendChild(textoTarea);
            item.appendChild(contenedorBotones);
            listaTareas.appendChild(item);
        });
    }    
    
    obtenerTareas();

    btnAgregar.addEventListener("click", agregarTarea);
});
