<?php
require_once("global_vars.inc.php");
header('Content-Type: application/json');

if (!isset($_GET['slug'])) {
    echo json_encode(['error' => 'Slug fehlt']);
    exit;
}

$slug = $_GET['slug'];

// Titel, Inhalt, include_id über Join holen
$sql = "
    SELECT s.titel, s.inhalt, m.include_id
    FROM seiten_inhalte s
    JOIN menu_items m ON s.slug = m.slug
    WHERE s.slug = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Seite nicht gefunden']);
    exit;
}

$row = $result->fetch_assoc();

$include_id = (int)$row['include_id'];
$include = $INCLUDE_MAP[$include_id] ?? ['file' => null, 'js' => null];

// Inhalt laden (nur bei Standardtemplate)
$content = $include['file'] === 'standardcontent.inc.php' ? $row['inhalt'] : '';

echo json_encode([
    'titel' => $row['titel'],
    'inhalt' => $content,
    'include_file' => $include['file'],
    'js_module' => $include['js']
]);