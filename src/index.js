var elex = require('./elections/electionResults')

window.addEventListener('load', function () {
    let election = window.location.href.split('/').pop()
    elex.buildElectoralMap(election)
});

var vm = new Vue({
    el: '#app',
    data: {
        results: []
    }
})

fetch('/api/get-state-results?election=2000')
.then((response) => {
    return response.json()
})
.then((stateResults) => {
    console.log(stateResults)
    vm.results = stateResults
})

setTimeout(function() {
    fetch('/api/get-state-results?election=2004')
    .then((response) => {
        return response.json()
    })
    .then((stateResults) => {
        console.log(stateResults)
        vm.results = stateResults
    })
}, 3000)

