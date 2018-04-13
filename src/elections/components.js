Vue.component('row', {
    props: ['result'],
    template: `    
        <tr>
            <td> {{ result.state }} </td>
            <td> {{ result.democrat }} </td>
            <td> {{ result.republican }} </td>
            <td> {{ result.other }} </td>
        </tr>    
    `
  })

var resultsTableVm = new Vue({
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
    resultsTableVm.results = stateResults
})
