var elex = require('./elections/electionResults')

window.addEventListener('load', function() {
    let election = window.location.href.split('/').pop()
    console.log(election)
    elex.buildElectoralMap(election)
});           
