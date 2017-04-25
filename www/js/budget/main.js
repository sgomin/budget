
function checkRecord(postdata, formid)
{
    var expense = postdata['expense'];
    var income = postdata['income'];
    
    if (!expense && !income)
    {
       return [false, 'Отсутствует сумма'];
    }
    
    if (expense && expense <= 0)
    {
        return [false, 'Неверная сумма расхода'];
    }
    
    if (income && income <= 0)
    {
        return [false, 'Неверная сумма дохода'];
    }
    
    return [true];
}

$(function () {
    $( "#tabs" ).tabs({
        heightStyle: "content"
    });

    initOperations();
    initCategories();    
});
