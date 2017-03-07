<?php 

include('dbconfig.php');

// connect to the MySQL database server 
$db = new PDO("mysql:host=$dbhost;dbname=$database;charset=utf8mb4", $dbuser, $dbpassword); 
 
$SQL = "SELECT ID, NAME FROM CURRENCY ORDER BY ID"; 
$result = $db->query( $SQL ); 
 
// we should set the appropriate header information. Do not forget this.
header("Content-type: text/xml;charset=utf-8");
 
$s = "<select>";

while($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $s .= "<option value='". $row['ID'] ."'>". $row['NAME'] ."</option>";
}
$s .= "</select>"; 
 
echo $s;
?>
