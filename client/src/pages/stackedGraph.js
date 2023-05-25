import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'
const StackedGraph = ({ datasets, keys, colors }) => {
    const [data, setData] = useState();
    const [run, setRun] = useState(false)
    const ref = useRef();
    const timeline = ["2021/3","2021/6","2021/9","2021/12","2022/3","2022/6","2022/9","2022/12"]
    const margin = {top: 30, right: 40, bottom: 120, left: 60},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom

    const init = () => {
        if(datasets != "" && datasets != undefined) {
            setRun(true)
            var newArr = []
            for (let time of timeline) {
                let newData = {Time: time}
                var d = datasets.filter(d => d.Time == time)
                for (let dElement of d) {
                    newData[dElement["Company"]] = dElement["NumberOfLayOff"]
                }
                newArr.push(newData)
            }
            setData(newArr)
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
                .text("Top Company Layoff")
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
        }
    }
    useEffect(() => {
        init()

        }, [datasets])
    useEffect(() => {
        if(run == true) draw()
    }, [data, keys, colors])
    const draw = () => {

        const svg = d3.select(ref.current).select('g')

        const stackGenerator = d3.stack().keys(keys);
        const layers = stackGenerator(data);
        const extent = [
            0,
            d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1]))
        ];
        const y = d3.scaleLinear().domain(extent).range([height, 0]);

        const x = d3.scaleBand()
            .domain(data.map((d) => d.Time))
            .range([0, width])
            .padding(0.46);

        svg.select(".myXaxis")
            .attr("transform", `translate(0, ${height})`)
            .style("text-anchor", "end")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x))
        svg
            .select('.myYaxis')
            .call(d3.axisLeft(y))
        svg
            .selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("class", d => "layer myRect " + (d.key == "Better.com" ? "Better" : d.key))
            .attr("fill", (layer) => colors[layer.key])
            .selectAll("rect")
            .data((layer) => layer)
            .join("rect")
            .attr(
                "x",
                (sequence) => x(sequence.data.Time)
            )
            .attr("width", x.bandwidth())
            .attr("y", (sequence) => y(sequence[1]))
            .attr("height", (sequence) => y(sequence[0]) - y(sequence[1]))
            .attr("stroke", "grey")
            .on("mouseover", function (event,d) { // What happens when user hover a bar
                // what subgroup are we hovering?
                var subGroupName = d3.select(this.parentNode).datum().key
                subGroupName = subGroupName == "Better.com" ? "Better" : subGroupName
                // Reduce opacity of all rect to 0.2
                d3.selectAll(".myRect").style("opacity", 0.2)
                // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
                d3.selectAll("."+subGroupName).style("opacity",1)
            })
            .on("mouseleave", function (event,d) { // When user do not hover anymore

                // Back to normal opacity: 1
                d3.selectAll(".myRect")
                    .style("opacity",1)
            })

    }
    return (
            <svg ref={ref}>
                <g>
                    <g className="myXaxis"/>
                    <g className="myYaxis"/>
                </g>
            </svg>
    )
}
export default StackedGraph;