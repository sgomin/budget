
function checkCategoryRecord(postdata, formid)
{
    var category = postdata['category'];
    
    if (!category)
    {
       return [false, 'Пустое имя категории'];
    }
    
    return [true];
}

function initCategories() {
    $("#categories").jqGrid({
        url: "php/get_categories.php",
        editurl: "php/update_category.php",
        datatype: "xml",
        mtype: "GET",
        colNames: ["Номер", "Категория", "Описание"],
        colModel: [
            { name: "id", hidden: true },
            { name: "category", width: 80, editable: true },
            { name: "description", width: 250, sortable: false, editable: true }
        ],
        pager: "#categories_pager",
        rowNum: 20,
        rowList: [10, 20, 30, 50],
        sortname: "id",
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        width: $( '#tab_operations' ).width(), 
        height: "100%"
    });
    
    jQuery("#categories").jqGrid('navGrid', '#categories_pager', {add: true, edit: false, del: true}, {}, 
        { closeAfterAdd: true, beforeSubmit: checkCategoryRecord });
    jQuery("#categories").jqGrid('inlineNav',"#categories_pager", {add: false, edit: true, del: false, 
        editParams: { beforeSubmit: checkCategoryRecord }});
}
