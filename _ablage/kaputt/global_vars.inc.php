<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "map_mtest";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$INCLUDE_MAP = [
    1 => ['file' => 'standardcontent.inc.php', 'js' => null],
    2 => ['file' => 'appcontent_a.inc.php', 'js' => 'gridComponent'],
    3 => ['file' => 'appcontent_b.inc.php', 'js' => 'mapComponent']
];

?>