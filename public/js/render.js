window.addEventListener('load', function() {
    $('#params').load('/snippets/params.html', function() {
        $('#elections').change(function() {
            getStateResults()
            getCountyResultsByState()
            barPlot()
        });
        $('#states').change(function() {
            getCounties()
            getCountyResultsByState()
            barPlot();            
        });
        getElections();
        getStates();
        
    })           
});