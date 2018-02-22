function getElections(callback) {
    let elections = $('#elections')
    elections.empty()
    $.get('/api/get-elections', function(data) {
        data.forEach(function(year) {
            elections.append($('<option>').text(year))
        })
        if (callback) {
            callback()
        }
    })
}  

function getStates(callback) {
    let states = $('#states')
    states.empty()
    $.get('/api/get-states', function(data) {
        let i = 0
        data.forEach(function(state) {
            i++
            states.append($('<option>', {
                text: state,
                value: i
            })) //.text(state))
        })
        getStateResults();
        getCounties();
    })
}

function getCounties() {
    let stateSel = $('#states')
    let counties = $('#counties')
    let state = $('#states option:selected').text()
    counties.empty()
    $.get('/api/get-counties?state=' + encodeURI(state), function(data) {
        data.forEach(function(county) {
            counties.append($('<option>').text(county))
        })
        // getCountyResultsByState()
    })
}

function getStateResults(election) {

    // get values from selections for params
    election = election || $('#elections option:selected').text()
    
    // // load html results table snippet 
    $('#state-results').load('/snippets/state-results-table.html', function() {

        $('#vote-by-state-header').text(election + ' state results')

        // empties the table 
        let tbl = $('#state-results-table > tbody')
        tbl.empty()

        $.post('/api/get-state-results', {election: election}, function(data) {
            let i = 0
            data.forEach(function(result) {
                i++
                let row = $('<tr>', {
                    id: result.state.toLowerCase() + '-results',
                    class: "county",
                    "data-state": result.state,
                    "data-election": election,
                    "data-value": i,
                    css: {
                        cursor: "pointer"
                    }
                })                
                row.append($('<td>', {
                        text: result.state
                }))
                row.append($('<td>', {
                    text: parseInt(result.democrat).toLocaleString(), 
                    css: {
                        backgroundColor: result.democrat > result.republican ? "#9cc0e3" : ""
                    }
                }))
                row.append($('<td>', {
                    text: parseInt(result.republican).toLocaleString(),
                    css: {
                        backgroundColor: result.democrat < result.republican ? "#e99d98": ""
                    }
                }))            
                row.append($('<td>', {
                    text: parseInt(result.other).toLocaleString() 
                }))
                row.click( function() {
                    let el = $(this).get(0);
                    // console.log(el.dataset.election)
                    barPlot(el.dataset.election, el.dataset.state);
                    $('#states').val(el.dataset.value)
                    getCounties()
                })
                $('#state-results-table > tbody').append(row)                
            })
        })
    })
}

function getCountyResultsByState(election, state) {
    // get values from selections for params
    election = election || $('#elections option:selected').text()
    state = state ||  $('#states option:selected').text()

    // load html results table snippet 
    $('#county-results').load('/snippets/results-table.html')

    // empties the table 
    let tbl = $('#results-table > tbody')
    tbl.empty()

    // posts data
    $.post('/api/get-state-results-by-county', {state: state, election: election}, function(data) {
        data.forEach(function(result) {
            let row = $('<tr>')
                // .append($('<td>').text(result.county))
                .append($('<td>', {
                    text: result.county
                }))
                .append($('<td>')
                    .css("background-color", result.democrat > result.republican ? "#9cc0e3" : "")
                    .text(parseInt(result.democrat).toLocaleString()))     
                .append($('<td>')
                    .css("background-color", result.democrat < result.republican ? "#e99d98": "")
                    .text(parseInt(result.republican).toLocaleString()))
                .append($('<td>').text(parseInt(result.other).toLocaleString()))
            $('#results-table > tbody').append(row)
        })
    })
}

