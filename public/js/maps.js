

function buildMap() {

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

    d3.json('../data/states.json', function(json) {
        var svg = d3.select("#national-map")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 " + diminesions.width + " " + diminesions.height)


        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)        
        }
    ) 
}