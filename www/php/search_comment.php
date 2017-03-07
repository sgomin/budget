<?php 

include('dbconfig.php');

$parts = explode(' ', $_GET['term']);
$p = count($parts);

// connect to the MySQL database server 
$db = new PDO("mysql:host=$dbhost;dbname=$database;charset=utf8mb4", $dbuser, $dbpassword); 
 
$SQL = "SELECT DISTINCT(comment) FROM OPERATION WHERE comment IS NOT NULL";
for($i = 0; $i < $p; $i++) {
  $SQL .= " AND comment LIKE ?";
  $parts[$i] = '%'.$parts[$i].'%';
}

$result = $db->prepare( $SQL );
$result->execute( $parts ); 
 
// we should set the appropriate header information. Do not forget this.
header("Content-type: text/json;charset=utf-8");
 
$a_json = array();
 
while($row = $result->fetch()) {
    array_push($a_json, $row['comment']);
}

print json_encode($a_json);
?>
