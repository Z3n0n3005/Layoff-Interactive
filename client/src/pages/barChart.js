import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import "./styles.css";
import {useNavigate} from "react-router-dom";

const BarChart = () => {
    const navigate = useNavigate();
    const ref = useRef();
    const [database, setDatabase] = useState();
    const [time, setTime] = useState(1)


    const [svg, setSvg] = useState()
    const [rect, setRect] = useState()
    const [text, setText] = useState()

    const [xAxis, setXAxis] = useState()
    const [yAxis, setYAxis] = useState()
    const [label, setLabel] = useState()

    const margin = {top: 30, right: 40, bottom: 120, left: 60},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom
    const timeline = ["2020/12","2021/3","2021/6","2021/9","2021/12","2022/3","2022/6","2022/9","2022/12","2023/3"]
    const init = () => {
        let u = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
        let x = d3.scaleBand()
            .range([ 0, width ])
            .padding(0.2)
            .domain(['Mining and logging', 'Construction', 'Manufacturing', 'Durable goods manufacturing', 'Nondurable goods manufacturing', 'Trade, transportation, and utilities', 'Wholesale trade', 'Retail trade', 'Transportation, warehousing, and utilities', 'Information', 'Financial activities', 'Finance and insurance', 'Real estate and rental and leasing', 'Professional and business services', 'Education and health services', 'Educational services', 'Health care and social assistance', 'Leisure and hospitality', 'Arts, entertainment, and recreation', 'Accommodation and food services', 'Other services', 'Government', 'Federal'])
        setXAxis(u.append("g")
            .attr("transform", `translate(0, ${height})`)
            .attr("class", "myXaxis")
            .style("text-anchor", "end")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end"))
        setYAxis(u.append("g")
            .attr("class", "myYaxis")
        )
        setLabel(u.append("text")
                .attr("x", width/4 * 3)
                .attr("y", margin.top)
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .text("Industry Layoffs")
            +
            u.append("text")
                .attr("transform", "translate(" + (width + 10) + " ," + (height+20) + ")")
                .style("text-anchor", "middle")
                .text("Industry")
            +
            u.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -margin.left / 2)
                .style("text-anchor", "middle")
                .text("Number (Million)")
        )
        setRect(u.append("g"))
        setText(u.append("g"))
        setSvg(u)
    }
    useEffect(() => {
        fetch('http://localhost:8080/api/industryData/')
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
            .then(() => {
                init();
            })
            .catch(err => console.log(err))

    },[])

    useEffect(() => {
            if(svg != undefined) draw()        }
        , [svg, time])
    const draw = () => {
        d3.selectAll(".click")
            .on("click", function(){
                navigate("/page-2")
            })
        let data = []
        data = database.filter(d => d["Time"] == timeline[time])
        data.shift()
        data.shift()
        let x = d3.scaleBand()
            .range([ 0, width ])
            .padding(0.2)
            .domain(data.map(d => d["Industry"]))
        let y = d3.scaleLinear()
            .range([ height, 0])
            .domain([0, d3.max(data, d => d["NumberOfLayOff"])])
        let yTemp = yAxis
        yTemp.transition().duration(500).call(d3.axisLeft(y))
        setYAxis(yTemp)

        let u = rect
        u
            .selectAll("rect")
            .data(data)
            .join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d["Industry"]))
            .attr("y", d => y(d["NumberOfLayOff"]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d["NumberOfLayOff"]))
            .attr("class", d => {
                if(d.Industry == "Information")
                    return "click"
                return ""
        })
            .attr("fill", function(d) {
                if(d.Industry == "Information")
                    return "#be3455"
                return "rgb(45, 75, " + Math.round(d["NumberOfLayOff"] / d3.max(data, d => d['NumberOfLayOff']) * 100) + ")";
            })

        setRect(u)

        let v = text
        v
            .selectAll("text")
            .data(data)
            .join("text")
            .transition()
            .duration(1000)
            .attr("x", d => x(d["Industry"]))
            .attr("y", d => y(d["NumberOfLayOff"]))
            .text(d => d["NumberOfLayOff"])
            .attr("fill", function(d) {
                return "rgb(45, 75, " + Math.round(d["NumberOfLayOff"] / d3.max(data, d => d['NumberOfLayOff']) * 100) + ")";
            })
        setText(v)

    }
    return (
        <div>
            <button className="rightButton smallButton" onClick={() => setTime(Math.max(1,time-1))}>&larr;</button>
            <button className="rightButton smallButton" onClick={() => setTime(Math.min(8,time+1))}>&rarr;</button>
            <svg
                ref={ref}
            />
            <pre>{timeline[time]}</pre>
        </div>
    )
}
export default BarChart;