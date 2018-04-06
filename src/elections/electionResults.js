var maps = require('./maps')

var self = module.exports = {

    buildElectoralMap: function (election) {

        // get values from selections for params
        election = election || $('#elections option:selected').text()
        
        // build state electoral map 
        let eMap = new maps.electoralMap(election);
        eMap.buildMap('/api/get-state-results?election=' + election, eMap.stateGeoJson, eMap.stateMap)

    }
}