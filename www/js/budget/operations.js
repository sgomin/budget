
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


function evalAmount(event)
{
  var expr = event.target.value;
  
  if (!expr)
  {
    return;
  }
  
  expr = expr.replace(/,/g , ".");
  
  if (/^([-+/*]\d+(\.\d+)?)*/.test(expr))
  {
    event.target.value = eval(expr);
  }
}

function onAmountKey(e)
{
    // backspace, delete, home, end, left, right
    if (e.which == 8 || e.which == 46 || e.which == 37 || e.which == 39 ||
        e.which == 35 || e.which == 36)
    {
        return true;
    }

    // enter, equal
    if (e.which == 13 || e.which == 61)
    {
        evalAmount(e);
        return false;
    }
    
    var chr = String.fromCharCode(e.which);
    
    if ("1234567890-+/*%() ,.".indexOf(chr) < 0)
    {
        return false;
    }
}

function initForm(formid)
{
    var expense = $("#expense", formid);
    var income  = $("#income", formid);
    
    expense.blur(evalAmount);
    expense.keypress(onAmountKey);
    income.blur(evalAmount);
    income.keypress(onAmountKey);
}


function initOperations() 
{    
    $("#operations").jqGrid(
    {
        url: "php/get_records.php",
        editurl: "php/update_record.php",
        datatype: "xml",
        mtype: "GET",
        colNames: ["Номер", "Дата", "Категория","Расход", "Доход", "Валюта", "Комментарий"],
        colModel: [
            { name: "id", width: 30, hidden: true },
            { name: "date", width: 50, sorttype: "date", editable: true,
              editoptions: {
                    size: 14, 
                    dataInit: function(el)
                    { 
                        $(el).datepicker( {dateFormat: 'yy-mm-dd'} ); 
                    },
                    defaultValue: function()
                    {
                        return new Date().toJSON().slice(0,10);
                    }
               },
              editrules: { required: true, date: true },
              formoptions: { rowpos: 2 }
            },
            { name: "category", width: 80, editable: true, edittype: "select", 
              editoptions: { dataUrl: "php/get_categories_select.php" },
              formoptions: { rowpos: 1 } 
            },
            { name: "expense", width: 50, align: "right", sorttype: "currency", editable: true, 
              editrules: { number: true },
              editoptions: {size: 7/*, NullIfEmpty: true*/ } 
            },
            { name: "income", width: 50, align: "right", sorttype: "currency", editable: true, 
              editrules: { number: true },
              editoptions: {size: 7/*, NullIfEmpty: true*/ }
            },
            { name: "currency", width: 30, align: "right", editable: true, 
              edittype: "select",
              editoptions: { dataUrl: "php/get_currencies.php" } 
            },
            { name: "comment", width: 250, sortable: false, editable: true, 
              editoptions: {
                    dataInit: function(el) { 
                        $(el).autocomplete({
                              source: "php/search_comment.php",
                              minLength: 2
                        }); 
                    }
               }
            }
        ],
        pager: "#operations_pager",
        rowNum: 20,
        rowList: [10, 20, 30, 50],
        sortname: "date",
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        width: $( '#tab_operations' ).width(), 
        height: "100%",
        /*caption: "Бюджет",
        onSelectRow: function(id) 
        { 
            if(id && id !== lastselID)
            { 
                var grid = jQuery('#operations');
                grid.jqGrid('restoreRow', lastselID); 
                grid.jqGrid('editRow', id, true); 
                lastselID=id; 
            } 
        }*/
    });
    
    jQuery("#operations").jqGrid('navGrid', '#operations_pager', {add: true, edit: false, del: true}, {}, 
        { closeAfterAdd: true, afterShowForm: initForm, beforeSubmit: checkRecord, zIndex:100 });
    jQuery("#operations").jqGrid('inlineNav',"#operations_pager", {add: false, edit: true, del: false, 
        editParams: { beforeSubmit: checkRecord }});
/*    jQuery("#operations").jqGrid('editGridRow', "new", 
        {
		    addCaption: "Add Record",
		    bSubmit: "Submit",
		    bCancel: "Cancel",
		    bClose: "Close",
		    bYes : "Yes",
		    bNo : "No",
		    bExit : "Cancel"
	    });*/
}
