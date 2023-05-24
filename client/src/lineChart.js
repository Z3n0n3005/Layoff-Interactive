import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
const LineChart = () => {
    const ref = useRef();
    const [database, setDatabase] = useState()
    const [run, setRun] = useState(false)
    const [data, setData] = useState()

    const margin = {top: 60, right: 40, bottom: 120, left: 60},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom
    const timeline = ["2020/12","2021/3","2021/6","2021/9","2021/12","2022/3","2022/6","2022/9","2022/12","2023/3"]
    const parseTime = d3.timeParse("%Y/%m/%d")
    const id = "ZoomLineChart"

    const init = () => {
        setRun(true)
    }
    useEffect(() => {
        fetch('http://localhost:8080/industryData/getAll')
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                throw res
            })
            .then(res => {
                console.log(res)
                setDatabase(res)
                return res
            })
            .then(res => {
                setData(res.filter(d => d["Industry"] == "Information"))
                return res
            })
            .then(() => {
                init()
            })
            .catch(err => console.log(err))

    },[])

    useEffect(() => {
            if(run == true)draw()
        }
        , [run])
    const draw = () => {
        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .select("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        svg.append("text")
            .attr("x", width / 4 * 3)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Tech Layoffs")
        svg.append("text")
            .attr("transform", "translate(" + (width + 10) + " ," + (height+20) + ")")
            .style("text-anchor", "middle")
            .text("Time")
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left / 2)
            .style("text-anchor", "middle")
            .text("Number (Million)")
        var x = d3.scaleTime()
            .range([ 0, width ])
            .domain(d3.extent(timeline, function(d) { return parseTime(d + "/1"); }))
        var xAxis = svg.select(".myXaxis")
            .attr("transform", `translate(0, ${height})`)
            .style("text-anchor", "end")
            .call(d3.axisBottom(x).ticks(d3.timeYear))
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d["NumberOfLayOff"])])
            .range([ height, 0 ])

        var yAxis = svg
            .select('.myYaxis')
            .call(d3.axisLeft(y))
        console.log(data)
        var line = svg.select('.line')
        line
            .select("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#4e62e0")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x(function(d) { return x(parseTime(d["Time"] + "/1")) })
                .y(function(d) { return y(d["NumberOfLayOff"]) })
            )
        const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
            .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function
        line
            .select(".brush")
            .call(brush)
        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event,d) {

            // What are the selected boundaries?
            var extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if(!extent){
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain([ 4,8])
            }else{
                x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
                line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and line position
            xAxis.call(d3.axisBottom(x))
            line
                .select('path')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function(d) { return x(parseTime(d["Time"] + "/1")) })
                    .y(function(d) { return y(d["NumberOfLayOff"]) })
                )
        }
        svg.on("dblclick",function(){
            x.domain(d3.extent(timeline, function(d) { return parseTime(d + "/1"); }))
            xAxis.transition().call(d3.axisBottom(x).ticks(d3.timeYear))

            line
                .select("path")
                .datum(data)
                .transition()
                .attr("d", d3.line()
                    .x(function(d) { return x(parseTime(d["Time"] + "/1")) })
                    .y(function(d) { return y(d["NumberOfLayOff"]) })
                )
        });
    }
    return (
        <div>
            <svg ref={ref}>
                <g>
                    <defs>
                        <clipPath id={id}>
                            <rect x="0" y="0" width={width} height={height} />
                        </clipPath>
                    </defs>
                    <g className="line" clipPath={`url(#${id})`}>
                        <path></path>
                        <g className="brush"></g>
                    </g>
                    <g className="myXaxis"/>
                    <g className="myYaxis"/>
                </g>
            </svg>
        </div>
    )
}
export default LineChart;