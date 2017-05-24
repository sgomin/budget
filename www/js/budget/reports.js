var dateFormat = "yy-mm-dd";

function getDate( element ) 
{
    var date;
      
    try 
    {
        date = $.datepicker.parseDate( dateFormat, element.value );
    } 
    catch( error ) 
    {
        date = null;
    }
 
    return date;
}


function initReports() 
{ 
    var from = $( "#from" ).datepicker(
        {
            dateFormat: dateFormat,
            defaultDate: "-1m",
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1
        })
        .on( "change", function() 
        {
            to.datepicker( "option", "minDate", getDate( this ) );
            update();
        });
        
    var to = $( "#to" ).datepicker(
        {
            dateFormat: dateFormat,
            changeMonth: true,
            changeYear: true,
            numberOfMonths: 1
        })
        .on( "change", function() 
        {
            from.datepicker( "option", "maxDate", getDate( this ) );
            update();
        });
        
    var date = new Date();

    date.setDate(0); // last day of previous month
    to.val(date.toISOString().slice(0, 10));
    date.setDate(1); // first day of previous month
    from.val(date.toISOString().slice(0, 10));
    
    var options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
            }
        },
        series: [{
            name: 'Расходы',
            data: []
        }]
    };
    
    function update()
    {
        var url = "php/get_expenses_summary.php?from=" + from.val() + "&to=" + to.val();

        $.getJSON(url,  function(data) 
        {
            options.series[0].data = data;
            Highcharts.chart('chart', options);
        });
    }
    
    update();
}
