module.exports = {

    electoralMap: function (election) {

        // sets election year
        this.election = election;

        // geoJSON locations
        this.stateGeoJson = '../data/states.json';
        this.countyGeoJson = '../data/counties.json';

        this.stateMap = function (error, results, states) {

            // $("#national-map").empty()

            var diminesions = {
                height: 500,
                width: 1000
            }

            var padding = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }

            // merge states json with results from api call
            for (var i = 0; i < states.features.length; i++) {
                for (var j = 0; j < results.length; j++) {
                    if (states.features[i].properties.NAME === results[j].state && results[j].republican > results[j].democrat) {
                        states.features[i].properties.winner = 'R'
                        break;
                    } else if (states.features[i].properties.NAME === results[j].state && results[j].republican < results[j].democrat) {
                        states.features[i].properties.winner = 'D'
                        break;
                    }
                }
            }

            var path = d3.geoPath().projection(d3.geoAlbersUsa());

            var svg = d3.select("#national-map")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("viewBox", "0 0 " + diminesions.width + " " + diminesions.height)

            svg.selectAll("path")
                .data(states.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("stroke", "black")
                .attr("fill", function (d) {
                    if (d.properties.winner === 'R') {
                        return "#e99d98"
                    } else if (d.properties.winner === 'D') {
                        return "#9cc0e3"
                    }
                })
        }

        this.buildMap = function (dataURL, mapURL, func) {
            d3.queue()
                .defer(d3.json, dataURL)
                .defer(d3.json, mapURL)
                .await(func);
        }
    }
}