<?php
require_once("global_vars.inc.php");
header('Content-Type: application/json');

if (!isset($_GET['app'])) {
    http_response_code(400);
    echo json_encode(["error" => "Fehlender Parameter: app"]);
    exit;
}

$app = $_GET['app'];

switch ($app) {
    case 'objects':
    case 'map':  // map und objects greifen auf dieselbe Tabelle zu
        $sql = "SELECT id, name, description, latitude, longitude FROM objects ORDER BY id DESC";
        $result = $conn->query($sql);
        if (!$result) {
            http_response_code(500);
            echo json_encode(["error" => "SQL-Fehler: " . $conn->error]);
            exit;
        }
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        exit;

    default:
        http_response_code(400);
        echo json_encode(["error" => "Unbekannter App-Typ: $app"]);
        exit;
}

?>