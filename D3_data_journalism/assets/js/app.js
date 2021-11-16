/* 

* Create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
* Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. 
* Pull in the data from data.csv by using the d3.csv function.

* Include state abbreviations in the circles.
* Create and situate your axes and labels to the left and bottom of the chart.
*/

// RESPONSIVE RELOAD WRAPPER
function makeResponsive() {

    // SETTING DIMENSIONS AND MAKING PLOT AREA RESPONSIVE
    var svgArea = d3.select("body").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();}

    var svgWidth = window.innerWidth - 300;
    var svgHeight = window.innerHeight - 300;

    var margin = {
        top: 50, 
        right: 100, 
        bottom: 80, 
        left: 80};

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;



    // APPEND SVG ELEMENT TO "SCATTER" DIV
    var svg = d3.select("#scatter")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
            

    // READ THE DATA.CSV IN WITH D3.CSV
    d3.csv("assets/js/data.csv").then(function(mainData){

        // ADD X AXIS
        var x = d3.scaleLinear()
        .domain([0, 30])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // ADD Y AXIS
        var y = d3.scaleLinear()
        .domain([0, 26])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // ADD TOOLTIP
        var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return `<h2 class='tip'>${d.state}</h2><p class='tip'>Poverty Rate</p><br><p class='data'>${d.poverty}%</p><p class='tip'>Lacking Healthcare</p><p class='data'>${d.healthcare}%</p>`; });
        svg.call(tool_tip);

        // CREATE DATA POINTS/ CIRCLES FOR EACH STATE
        var circlesGroup = chartGroup.selectAll("Circle")
        .data(mainData)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.poverty); } )
            .attr("cy", function (d) { return y(d.healthcare); } )
        .attr("r", "13")
        .attr("fill", "#273E47")
        .attr("opacity", "0.9")
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);

        // ADD STATE ABBREVIATION LABELS TO CIRCLES
        var circleLabels = chartGroup.selectAll(null).data(mainData).enter().append("text");

        circleLabels
        .attr("x", function(d) {
            return x(d.poverty);
        })
        .attr("y", function(d) {
            return y(d.healthcare);
        })
        .text(function(d) {
            return d.abbr;
        })
        .attr("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("transform", "translate(0, 2.8)")
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


        // ADD AXIS LABELS
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 65)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisLabel")
        .text("Lacking Healthcare (%)");

        chartGroup.append("text")
        .attr("transform", `translate(${width/2.5}, ${height + margin.bottom - 70})`)
        .attr("class", "axisLabel")
        .text("Poverty (%)");

    });
};

// CALL RESPONSIVE FUNCTION ON PAGE LOAD
makeResponsive();
