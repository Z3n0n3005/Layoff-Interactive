let database = [
    {"date": "2019-01-16", "number-layoff": 516},
    {"date": "2020-02-16", "number-layoff": 600},
    {"date": "2020-03-16", "number-layoff": 700},
    {"date": "2020-04-16", "number-layoff": 500},
    {"date": "2020-05-16", "number-layoff": 600},
    {"date": "2020-07-16", "number-layoff": 550},
    {"date": "2020-11-16", "number-layoff": 770},
    {"date": "2021-01-16", "number-layoff": 900},
    {"date": "2021-03-16", "number-layoff": 999},
    {"date": "2021-05-16", "number-layoff": 1000},
    {"date": "2021-07-16", "number-layoff": 1500},
    {"date": "2021-09-16", "number-layoff": 1980},
    {"date": "2021-11-16", "number-layoff": 2500},
    {"date": "2022-02-16", "number-layoff": 3000},
    {"date": "2022-04-16", "number-layoff": 2400},
    {"date": "2022-06-16", "number-layoff": 2000},
    {"date": "2022-08-16", "number-layoff": 1700},
    {"date": "2022-10-16", "number-layoff": 1200},
    {"date": "2023-01-16", "number-layoff": 160}
]
 data = []

let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svgLine = d3.select("#line-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let parseTime = d3.timeParse("%Y-%m-%d")
for (let databaseElement of database) {
    data.push({"date": parseTime(databaseElement["date"]),
        "number-layoff": databaseElement["number-layoff"]})
}

let x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d["date"]; }))
    .range([ 0, width ])
xAxis = svgLine.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(d3.timeYear));

let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["number-layoff"])])
    .range([ height, 0 ])
yAxis = svgLine.append("g")
    .call(d3.axisLeft(y))

// Add a clipPath: everything out of this area won't be drawn.
const clip = svgLine.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

// Create brushing
const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

// Create the line variable: where both the line and the brush take place
let line = svgLine.append('g')
    .attr("clip-path", "url(#clip)")

// Add the line
line.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#4e62e0")
    .attr("stroke-width", 2.5)
    .attr("d", d3.line()
        .x(function(d) { return x(d["date"]) })
        .y(function(d) { return y(d["number-layoff"]) })
    )

// Add the brushing
line
    .append("g")
    .attr("class", "brush")
    .call(brush);

let idleTimeout
function idled() { idleTimeout = null; }

function updateChart(event,d) {
    // What are the selected boundaries?
    extent = event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([4,8])
    }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and line position
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    line
        .select('.line')
        .transition()
        .duration(1000)
        .attr("d", d3.line()
                .x(function(d) { return x(d["date"]) })
                .y(function(d) { return y(d["number-layoff"]) })
        )
}

// If user double click, reinitialize the chart
svgLine.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d["date"]; }))
    xAxis.transition().call(d3.axisBottom(x).ticks(d3.timeYear))
    line
        .select('.line')
        .transition()
        .attr("d", d3.line()
                .x(function(d) { return x(d["date"]) })
                .y(function(d) { return y(d["number-layoff"]) })
        )
})
