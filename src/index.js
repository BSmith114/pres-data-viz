var elex = require('./elections/electionResults')

window.addEventListener('load', function() {
    $('#params').load('/snippets/params.html', function() {
        $('#elections').change(function() {
            elex.getStateResults()
        });
        $('#states').change(function() {
            elex.getCounties()        
        });
        elex.getElections();
        elex.getStates();
    });           
});