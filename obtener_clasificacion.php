// archivo: obtener_clasificacion.php
<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "clasificacion";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT nombre, puntaje FROM jugadores ORDER BY puntaje DESC";
$result = $conn->query($sql);

$jugadores = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $jugadores[] = $row;
    }
}

echo json_encode($jugadores);

$conn->close();
?>
