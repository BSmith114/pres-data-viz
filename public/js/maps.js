// import { stat } from "fs";

var res = [{state:"Alabama"}, {state:"Arkansas"}]

function buildMap(results) {
    
    $("#national-map").empty()

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

    var path = d3.geoPath().projection(d3.geoAlbersUsa());

    d3.json('../data/states.json', function(states) {
        var svg = d3.select("#national-map")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 " + diminesions.width + " " + diminesions.height)
        
        for (var i = 0; i < states.features.length; i++) {
            for (var j = 0; j < results.length; j++) {
                if (states.features[i].properties.NAME === results[j].state && results[j].republican > results[j].democrat) {
                    states.features[i].properties.winner = 'R'
                }               
            }
        }


        svg.selectAll("path")
            .data(states.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", function(d) {
                if (d.properties.winner === 'R') {
                    return "#e99d98"
                }
                else return "#9cc0e3"
            })  
        }
    ) 
}