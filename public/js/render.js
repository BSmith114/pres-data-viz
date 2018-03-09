window.addEventListener('load', function() {
    $('#params').load('/snippets/params.html', function() {
        $('#elections').change(function() {
            getStateResults()
        });
        $('#states').change(function() {
            getCounties()        
        });
        getElections();
        getStates();
    });           
});