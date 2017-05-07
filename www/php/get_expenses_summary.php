<?php 
//include the information needed for the connection to MySQL data base server. 
// we store here username, database and password 
include('dbconfig.php');
 
$from = $_GET['from']; 
$to = $_GET['to']; 
 
// connect to the MySQL database server 
$db = new PDO("mysql:host=$dbhost;dbname=$database;charset=utf8mb4", $dbuser, $dbpassword); 
 
// the actual query for the grid data 
$SQL = 
"SELECT CATEGORY, SUM(EXPENSE) EXPENSE
FROM V_OPERATION
WHERE EXPENSE IS NOT NULL
  AND DATE BETWEEN '$from' AND '$to'
GROUP BY CATEGORY
ORDER BY EXPENSE DESC"; 
$result = $db->query( $SQL ); 
 
// we should set the appropriate header information. Do not forget this.
header("Content-type: application/json;charset=utf-8");
 
$s = "";
 
// be sure to put text data in CDATA
while($row = $result->fetch(PDO::FETCH_ASSOC)) 
{
    if ($s != '')
    {
        $s .= ",";
    }
    
    $s .= '["'. $row['CATEGORY'].'", '. $row['EXPENSE']."]";
}
 
echo "[".$s."]";
?>
