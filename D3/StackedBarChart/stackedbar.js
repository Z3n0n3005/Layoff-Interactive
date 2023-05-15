let data = [
    {"company": "A", "number-layoff": 100, "year": 2020},
    {"company": "B", "number-layoff": 50, "year": 2020},
    {"company": "C", "number-layoff": 20, "year": 2020},
    {"company": "A", "number-layoff": 500, "year": 2021},
    {"company": "B", "number-layoff": 100, "year": 2021},
    {"company": "C", "number-layoff": 80, "year": 2021},
    {"company": "A", "number-layoff": 400, "year": 2022},
    {"company": "B", "number-layoff": 1000, "year": 2022},
    {"company": "C", "number-layoff": 1000, "year": 2022},
    {"company": "A", "number-layoff": 500, "year": 2023},
    {"company": "B", "number-layoff": 200, "year": 2023},
    {"company": "C", "number-layoff": 100, "year": 2023}
]

const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg = d3.select("#stacked-bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


const subgroups = ["A","B","C"]

const groups = data.map(d => (d.year))

const x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

const y = d3.scaleLinear()
    .domain([0, 3000])
    .range([ height, 0 ]);
svg.append("g")
    .call(d3.axisLeft(y));

const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'])

const format = d3.rollup(
    data,
    g => g[0]["number-layoff"],
    d => d.year,
    d => d.company
);

const stackFormat = Array.from(format, ([year, counts]) => {
    counts.set("year", year);
    counts.set("total", d3.sum(counts.values()));
    return Object.fromEntries(counts);
});

//stack the data? --> stack per subgroup
const stackedData = d3.stack()
    .keys(subgroups)
    .value((d, key) => d[key] ?? 0)
    (stackFormat)

svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d.data.year))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width",x.bandwidth())
