<?php
require_once("global_vars.inc.php");
header('Content-Type: application/json');

// Sicherheitscheck
if (!isset($conn)) {
    http_response_code(500);
    echo json_encode(["error" => "Keine gültige DB-Verbindung"]);
    exit;
}

// Alle Menüpunkte laden
$sql = "SELECT * FROM menu_items ORDER BY sort_order ASC";
$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "SQL-Fehler: " . $conn->error]);
    exit;
}
$items = $result->fetch_all(MYSQLI_ASSOC);

// Rekursive Funktion für verschachtelte Menüstruktur
function buildMenuTree(array $elements, $parentId = null): array {
    $branch = [];
    foreach ($elements as $element) {
        if ((string)$element['parent_id'] === (string)$parentId) {
            $children = buildMenuTree($elements, $element['id']);
            if ($children) {
                $element['children'] = $children;
            }
            $branch[] = $element;
        }
    }
    return $branch;
}

// Menü nach Position gruppieren
$menuTop = buildMenuTree(array_filter($items, fn($i) => $i['position'] == 1));
$menuBottom = buildMenuTree(array_filter($items, fn($i) => $i['position'] == 2));

// JSON ausgeben
echo json_encode([
    'top' => $menuTop,
    'bottom' => $menuBottom
]);
?>