window.addEventListener('load', function() {
    $('#params').load('/snippets/params.html', function() {
        $('#elections').change(function() {
            getCountyResultsByState()
        });
        $('#states').change(function() {
            getCounties()
            getCountyResultsByState()
        });
        getElections();
        getStates();
        
    })           
});