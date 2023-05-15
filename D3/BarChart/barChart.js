// d3.csv("").then(data => {
// });
let database = []
let yearSelected = 2020;
const yearMin = 2020;
const yearMax = 2023
database.push({'Industry': 'A', "number-layoff": 10, "year": 2020})
database.push({'Industry': 'B', "number-layoff": 432, "year": 2020})
database.push({'Industry': 'C', "number-layoff": 1200, "year": 2020})
database.push({'Industry': 'D', "number-layoff": 654, "year": 2020})

database.push({'Industry': 'A', "number-layoff": 100, "year": 2021})
database.push({'Industry': 'B', "number-layoff": 50, "year": 2021})
database.push({'Industry': 'C', "number-layoff": 1650, "year": 2021})
database.push({'Industry': 'D', "number-layoff": 354, "year": 2021})

let data

let margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svgBar = d3.select("#barchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
let xAxis = svgBar.append("g")
    .attr("transform", "translate(0," + height + ")")

let y = d3.scaleLinear()
    .range([ height, 0]);
let yAxis = svgBar.append("g")
    .attr("class", "myYaxis")


function update(){
    data = database.filter(d => d["year"] == yearSelected)

    x.domain(data.map(d => d["Industry"]))
    xAxis.call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    y.domain([0,d3.max(data, d => d["number-layoff"])])
    yAxis.transition()
        .duration(1000)
        .call(d3.axisLeft(y));

    let u = svgBar.selectAll("rect")
        .data(data)
    u
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", d => x(d["Industry"]))
        .attr("y", d => y(d["number-layoff"]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d["number-layoff"]))
        .attr("fill", function(d) {
            return "rgb(96, 96, " + Math.round(d["number-layoff"] / d3.max(data, d => d['number-layoff']) * 100) + ")";
        })


}
function increaseYear(){
    yearSelected++;
    if(yearSelected > yearMax) yearSelected = yearMax;
    update()
}
function decreaseYear(){
    yearSelected--;
    if(yearSelected < yearMin) yearSelected = yearMin;
    update()
}
update()
