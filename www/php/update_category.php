<?php 
//include the information needed for the connection to MySQL data base server. 
// we store here username, database and password 
include('dbconfig.php');
 
//ob_start(); 
//var_dump($_POST);
//$postContent = ob_get_clean();
//error_log("update_record: ".$postContent);

$db = new PDO("mysql:host=$dbhost;dbname=$database;charset=utf8mb4", $dbuser, $dbpassword);

if ($_POST['oper'] == 'add')
{
    $sql = 
    'INSERT INTO CATEGORY (NAME, DESCRIPTION)'.
    ' VALUES(:category, :description)';
    
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->bindValue(':category', $_POST['category']);
    
    if ($_POST['description'] == '')
    {
        $sth->bindValue(':description', null);
    }
    else
    {
        $sth->bindValue(':description', $_POST['description']);
    }
    
    $sth->execute();
}
else if ($_POST['oper'] == 'del')
{
    $sql = 'DELETE FROM CATEGORY WHERE ID = :id';
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->execute(array(':id' => $_POST['id']));
}
if ($_POST['oper'] == 'edit')
{
    $sql = 
    'UPDATE CATEGORY SET'.
    ' NAME=:category, DESCRIPTION=:description'.
    ' WHERE ID=:id';
    
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->bindValue(':category', $_POST['category']);
    
    if ($_POST['description'] == '')
    {
        $sth->bindValue(':description', null);
    }
    else
    {
        $sth->bindValue(':description', $_POST['description']);
    }
    
    $sth->bindValue(':id', $_POST['id']);
    $sth->execute();
}

?>
