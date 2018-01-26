function scatterPlot() {

    $('#plt').empty()
    
    var w = 550;
    var h = 550;
    padding = 50;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ;

    var dataset = [];

    for (var i = 0; i < 20; i++) {
        var xNumber = (Math.random() * 200) - 100;
        var yNumber = (Math.random() * 200) - 100;
        dataset.push([xNumber, yNumber]);
    }

    var xScale = d3.scale.linear()
        .domain([-100, 100])
        .range([padding, w - padding * 2]);
    
    var yScale = d3.scale.linear()
        .domain([-100, 100])
        .range([h - padding, padding]);
        
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10)

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10)

    var scatterplot = d3.select("#plt")
        .append("svg")
        .attr("height", h)
        .attr("width", w)
        

    scatterplot.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        }) 
        .attr("r", 3)

    scatterplot.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + ((h/2) ) + ")")
        .call(xAxis);


    scatterplot.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + ((w/2) -25 ) + ",0)")
        .call(yAxis);

}

function barPlot() {
    // empties current chart
    let plt = $('#plt').empty()
    plt.empty()

    // get values from selections for params
    let election = $('#elections option:selected').text()
    let state = $('#states option:selected').text()

    // posts data
    $.post('/api/get-state-results-by-county', {state: state, election: election}, function(data) {
        let w = 500
        let h = data.length * 21
        let p = 1

        var plt = d3.select("#plt")
            .append("svg")
            .attr("height", h)
            .attr("width", w)

        plt.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return d.democrat_margin_percent < 0 ? w / 2 + (parseFloat(d.democrat_margin_percent) * 200) : w / 2 
            })
            .attr("y", function(d, i) {
                return i * 20
            })
            .attr("height", function(d, i) {
                return 20
            } )
            .attr("width", function(d) { 
                return Math.abs(parseFloat(d.democrat_margin_percent) * 200)
            })
            .attr("class", function(d) {
                return d.democrat_margin_percent > 0 ? "barplot-dem-county-win" : "barplot-gop-county-win"
            })        
    })
}