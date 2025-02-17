<?php
include "db/conexion.php";

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM tareas";
        $result = $conn->query($sql);
        $tareas = [];
        while ($row = $result->fetch_assoc()) {
            $tareas[] = $row;
        }
        echo json_encode($tareas);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
            error_log("Datos recibidos: " . json_encode($data)); // para ver que datos llegan
            
            if (!isset($data['descripcion']) || empty($data['descripcion'])) {
                echo json_encode(["error" => "La descripción no puede estar vacía"]);
                exit;
            }
        
            $descripcion = $conn->real_escape_string($data['descripcion']);
            $sql = "INSERT INTO tareas (descripcion) VALUES ('$descripcion')";
            
            if ($conn->query($sql)) {
                echo json_encode(["message" => "Tarea creada"]);
            } else {
                error_log("Error en la consulta: " . $conn->error);
                echo json_encode(["error" => "No se pudo insertar la tarea"]);
            }
         break;
        

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $descripcion = $data['descripcion'];
        $sql = "UPDATE tareas SET descripcion='$descripcion' WHERE id=$id";
        $conn->query($sql);
        echo json_encode(["message" => "Tarea actualizada"]);
        break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $sql = "DELETE FROM tareas WHERE id=$id";
        $conn->query($sql);
        echo json_encode(["message" => "Tarea eliminada"]);
        break;

    case "PATCH":
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $sql = "UPDATE tareas SET completada = NOT completada WHERE id=$id";
        $conn->query($sql);
        echo json_encode(["message" => "Tarea completada"]);
  
        break;
}
?>
