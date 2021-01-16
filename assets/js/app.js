// @TODO: YOUR CODE HERE!

// Data Columns
//id, state, abbr(state), poverty
//povertyMoe, age, ageMoe, income
//incomeMoe, healthcare, healthcareLow
//healthcareHigh, obesity, obesityLow,
//obesityHigh, smokes, smokesLow, smokesHigh
// -0.385218228


// Figure out how to run this with  
// `python -m http.server` //
// SVG  Dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 30,
    right: 40,
    bottom: 60,
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
        .domain(d3.extent(data, d => d.age))
        .range([0, svgWidth]);

    // Create Scale for Y Coordinate
    var yScale = d3.scaleLinear()
        //.domain([d3.max(data, d => d.smokes), d3.min(data, d => d.smokes)])
        //.domain([d3.max(data, d => d.smokes), d3.min(data, d => d.smokes)])
        .domain(d3.extent(data, d => d.smokes))
        .range([svgHeight, 0]);

    // Create Axis Functions
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Append Axis to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .call(yAxis);
});
// Create the plot
// Situate axes and labels to the left and bottom of chart

// Populate the plot (with state abbreviations in circle)

// maybe (mouseover event to increase size of dot)

// Optional Assignment: Look at final class assignment

