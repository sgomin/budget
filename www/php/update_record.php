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
    'INSERT INTO OPERATION (DATE, CATEGORY_ID, EXPENSE, INCOME, TAGS_ID, COMMENT, CURRENCY_ID)'.
    ' VALUES(:date, :category, :expense, :income, null, :comment, :currency)';
    
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->bindValue(':date',        $_POST['date']);
    $sth->bindValue(':category',    $_POST['category']);
    
    if ($_POST['expense'] == '')
    {
        $sth->bindValue(':expense',    null);
    }
    else
    {
        $sth->bindValue(':expense',     $_POST['expense']);
    }
    
    if ($_POST['income'] == '')
    {
        $sth->bindValue(':income',    null);
    }
    else
    {
        $sth->bindValue(':income',     $_POST['income']);
    }
    
    $sth->bindValue(':comment',     $_POST['comment']);
    $sth->bindValue(':currency',    $_POST['currency']);
    $sth->execute();
}
else if ($_POST['oper'] == 'del')
{
    $sql = 'DELETE FROM OPERATION WHERE ID = :id';
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->execute(array(':id' => $_POST['id']));
}
if ($_POST['oper'] == 'edit')
{
    $sql = 
    'UPDATE OPERATION SET'.
    ' DATE=:date, CATEGORY_ID=:category, EXPENSE=:expense, INCOME=:income, COMMENT=:comment, CURRENCY_ID=:currency'.
    ' WHERE ID=:id';
    
//    error_log($sql);
    $sth = $db->prepare($sql);
    $sth->bindValue(':date',        $_POST['date']);
    $sth->bindValue(':category',    $_POST['category']);
    
    if ($_POST['expense'] == '')
    {
        $sth->bindValue(':expense',    null);
    }
    else
    {
        $sth->bindValue(':expense',     $_POST['expense']);
    }
    
    if ($_POST['income'] == '')
    {
        $sth->bindValue(':income',    null);
    }
    else
    {
        $sth->bindValue(':income',     $_POST['income']);
    }
    
    $sth->bindValue(':comment',     $_POST['comment']);
    $sth->bindValue(':currency',    $_POST['currency']);
    $sth->bindValue(':id',    $_POST['id']);
    $sth->execute();
}

?>
