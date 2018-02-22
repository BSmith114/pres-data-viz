

function buildMap() {

    var path = d3.geoPath().projection(d3.geoAlbersUsa());

    d3.json('../data/states.json', function(json) {
        var svg = d3.select("#map")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 500)

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)        
        }
    ) 
}