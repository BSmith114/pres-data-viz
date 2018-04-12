var elex = require('./elections/electionResults')
require('./elections/components')

window.addEventListener('load', function () {
    let election = window.location.href.split('/').pop()
    elex.buildElectoralMap(election)
});


