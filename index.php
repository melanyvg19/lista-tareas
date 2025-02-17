<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas</title>
    <script src="./script.js" defer></script>
    <link rel="stylesheet" href="./styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Lista de tareas</h1>
        
        <div class="input-container">
            <input type="text" id="nuevaTarea" class="form-control" placeholder="Agrega una tarea">
            <button id="btnAgregar" class="btn btn-primary">Agregar</button>
        </div>
        
        <ul id="listaTareas" class="list-group mt-3"></ul>
    </div>

     
</body>
</html>
