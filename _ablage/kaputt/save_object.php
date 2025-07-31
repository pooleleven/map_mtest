<?php
require_once("global_vars.inc.php");
header('Content-Type: application/json');

// JSON einlesen
$input = json_decode(file_get_contents("php://input"), true);

// Sicherheitsprüfung
if (!isset($input['id'], $input['name'], $input['latitude'], $input['longitude'])) {
    echo json_encode(['success' => false, 'error' => 'Ungültige oder unvollständige Daten.']);
    exit;
}

$id = (int) $input['id'];
$name = $conn->real_escape_string($input['name']);
$desc = isset($input['description']) ? $conn->real_escape_string($input['description']) : null;
$lat = (float) $input['latitude'];
$lon = (float) $input['longitude'];

// Entscheide: Update oder Insert
if ($id > 0) {
    // UPDATE
    $sql = "UPDATE objects SET name='$name', description=" . ($desc !== null ? "'$desc'" : "NULL") . ",
            latitude=$lat, longitude=$lon, updated_at=NOW() WHERE id=$id";
} else {
    // INSERT
    $sql = "INSERT INTO objects (name, description, latitude, longitude) VALUES (
        '$name', " . ($desc !== null ? "'$desc'" : "NULL") . ", $lat, $lon)";
}

if ($conn->query($sql)) {
    echo json_encode(['success' => true, 'id' => $id > 0 ? $id : $conn->insert_id]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}
