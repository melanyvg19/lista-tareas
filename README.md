Lista de Tareas

Instalación:

1. Clonar el repositorio

git clone (https://github.com/melanyvg19/lista-tareas.git)
cd listadetareas

2. Configurar la base de datos

Importar la base de datos desde lista_tareas_db.sql en phpMyAdmin.

Asegúrate de que los datos de conexión en conexion.db.php sean correctos:

$host = "localhost";
$user = "root";
$password = "";
$dbname = "lista_tareas_db";

3. Ejecutar el proyecto en XAMPP

Mueve la carpeta listadetareas a C:\xampp\htdocs.

Inicia Apache y MySQL en XAMPP.

Abre el navegador y accede a:

http://localhost/listadetareas/

📜 Características

Agregar tareas 

Editar tareas ✏️

Eliminar tareas ❌

Completar tareas ✔️

Tecnologías utilizadas

PHP

MySQL

JavaScript

Bootstrap

Autor:

Desarrollado por Melany Valle

