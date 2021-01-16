// @TODO: YOUR CODE HERE!

// Data Columns
//id, state, abbr(state), poverty
//povertyMoe, age, ageMoe, income
//incomeMoe, healthcare, healthcareLow
//healthcareHigh, obesity, obesityLow,
//obesityHigh, smokes, smokesLow, smokesHigh
// -0.385218228

// SVG  Dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// Plot Dimensions
var plotWidth = svgWidth - margin.left - margin.right;
var plotHeight = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append svg group that contains our chart
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

// CSV file path
var censusData = "/assets/data/data.csv"

// read in csv data
d3.csv(censusData).then(function(data) {

    // Declare the data as a numeral
    data.forEach(function(dataset) {
        console.log(dataset);
        dataset.smokes = +dataset.smokes;
        dataset.age = +dataset.age;
        console.log(dataset.smokes);
        console.log(dataset.age);
    });

    // Create Scale for X Coordinate
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.age) - 2, d3.max(data, d => d.age) + 2])
        //.domain(d3.extent(data, d => d.age))
        .range([0, plotWidth]);

    // Create Scale for Y Coordinate
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.smokes) - 2, d3.max(data, d => d.smokes) + 2])
        //.domain([d3.max(data, d => d.smokes), 0])
        //.domain(d3.extent(data, d => d.smokes))
        .range([plotHeight, 0]);

    // Create Axis Functions
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Append Axis to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .call(yAxis);

    // Add the data points to the chart
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", 15)
        .attr("opacity", 0.75);
    
    // Add State Abbreviations to the circles
    var stateText = chartGroup.selectAll("label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .attr("x", d => xScale(d.age))
        .attr("y", d => yScale(d.smokes))
        .text(d => d.abbr);

    
    // Append a div object to create tooltips and assign it to the d3-tip class
    var toolTip = d3.select("body").append("div")
        .attr("class", "d3-tip");


    // MouseOver - Show tooltip with info
    circlesGroup.on("mouseover", function(d) {
        toolTip.style("display", "block");
        toolTip.html(`State: ${d.state}<br>Age (Median): ${d.age}<br>Percentage of Smokers: ${d.smokes}%`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "py");
    });

    // MouseOut - Make tooltip invisible
    circlesGroup.on("mouseout", function(){
        toolTip.style("display", "none");
    });
    
    // Label both of the Axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (plotHeight / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .attr("class", "active")
        .text("Percentage of Smokers(%)");

    chartGroup.append("text")
        .attr("transform", `translate(${plotWidth / 2}, ${plotHeight + margin.top + 30})`)
        .attr("class", "aText")
        .attr("class", "active")
        .text("Age (Median)");
});


// Optional Assignment: Look at final class assignment

