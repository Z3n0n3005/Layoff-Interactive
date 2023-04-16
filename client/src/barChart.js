import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
const BarChart = () => {
    const ref = useRef();
    const [database, setDatabase] = useState([]);
    const [year, setYear] = useState(2021)

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
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
            if(database !== "") draw()
        }
        , [database, year])
    const draw = () => {
        const margin = {top: 60, right: 30, bottom: 30, left: 60},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        var svg = d3.select(ref.current)
        svg.selectAll("*").remove()
        svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var data = database.filter(d => d["Year"] == year)

        let x = d3.scaleBand()
            .range([ 0, width ])
            .padding(0.2)
            .domain(data.map(d => d["Quarter"])) // change to Industry
        let xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .transition()
            .duration(1000)

        let y = d3.scaleLinear()
            .range([ height, 0])
            .domain([0,d3.max(data, d => d["NumberOfLayOff"])])
        let yAxis = svg.append("g")
            .attr("class", "myYaxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));


        let u = svg.selectAll("rect")
            .data(data)
        u
            .join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d["Quarter"]))
            .attr("y", d => y(d["NumberOfLayOff"]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d["NumberOfLayOff"]))
            .attr("fill", function(d) {
                return "rgb(45, 75, " + Math.round(d["NumberOfLayOff"] / d3.max(data, d => d['NumberOfLayOff']) * 100) + ")";
            })

    }
    return (
        <div>
            <button onClick={() => setYear(year-1)}>-</button>
            <button onClick={() => setYear(year+1)}>+</button>
            <svg
                ref={ref}
            />
        </div>
    )
}
export default BarChart;