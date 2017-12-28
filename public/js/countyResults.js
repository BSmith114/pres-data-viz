function getElections(callback) {
    let elections = $('#elections')
    elections.empty()
    $.get('/api/get-elections', function(data) {
        data.forEach(function(year) {
            elections.append($('<option>').text(year))
        })
    })
    if (callback) {
        callback()
    }
}  

function getStates(callback) {
    let states = $('#states')
    states.empty()
    $.get('/api/get-states', function(data) {
        data.forEach(function(state) {
            states.append($('<option>').text(state))
        })
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
    })
}

function getCountyResultsByState() {
    // get values from selections for params
    let election = $('#elections option:selected').text()
    let state = $('#states option:selected').text()
    
    // load html results table snippet 
    $('#tbl').load('/snippets/results-table.html')

    // empties the table 
    let tbl = $('#results-table > tbody')
    tbl.empty()

    // posts data
    $.post('/api/get-state-results-by-county', {state: state, election: election}, function(data) {
        data.forEach(function(result) {
            let row = $('<tr>')
                .append($('<td>').text(result.county))
                .append($('<td>').text(parseInt(result.democrat).toLocaleString() + '\n' + result.democrat_percent + '%'))
                .append($('<td>').text(parseInt(result.republican).toLocaleString() + '\n' + result.republican_percent + '%'))
                .append($('<td>').text(parseInt(result.other).toLocaleString()+ '\n' + result.other_percent + '%'))
            $('#results-table > tbody').append(row)
        })
    })
}

