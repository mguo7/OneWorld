/**
 * Created by Peter on 14-4-7.
 */

var barsort = 0;
var barvar = "Children_health";
var barname = "Children_health";
var reigon = "All";

function barChart() {
    
    
    var margin = {top: 20, right: 150, bottom: 300, left: 100},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    
    var formatPercent = d3.format(".0%");
    
    var xValue = function (d) {
        barvar = document.getElementById("barSelect")
        .options[barSelect.selectedIndex].value;
        
     /**   if(barvar=="NUM1") {
        
            return d.SERVICE1;
        
        } else if (barvar=="NUM1") {
        
            return d.SERVER2;
        } **/
        
            return d.PARTNER_NAME;
    }, // data -> value
    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
    xMap = function (d) {
        return xScale(xValue(d));
    }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    
    var yValue = function (d) {
        return d[barvar];
    }, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function (d) {
        return yScale(yValue(d));
    }, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    
    var svg = d3.select("#svgtd").append("svg")
    .attr("id", "mainsvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    d3.csv("data/health.csv", type, function (error, data) {
           
           
           var bardata = [];
           
           
           data.forEach(function(d){
                        
                        
                        if(reigon=="All") {
                        
                        bardata.push({PARTNER_NAME:d.PARTNER_NAME,Total_lives_overall:d.Total_lives_overall,Total_lives_touched_health:d.Total_lives_touched_health,NUM1:d.NUM1,NUM2:d.NUM2,SERVICE1:d.SERVICE1,SERVICE2:d.SERVICE2,Children_health:d.Children_health,Adults_health:d.Adults_health,Children_overall:d.Children_overall,Adults_overall:d.Adults_overall})
                        
                        } else {
                        
                        if(d.REGION == reigon){
                        
                        bardata.push({PARTNER_NAME:d.PARTNER_NAME,Total_lives_overall:d.Total_lives_overall,Total_lives_touched_health:d.Total_lives_touched_health,NUM1:d.NUM1,NUM2:d.NUM2,SERVICE1:d.SERVICE1,SERVICE2:d.SERVICE2,Children_health:d.Children_health,Adults_health:d.Adults_health,Children_overall:d.Children_overall,Adults_overall:d.Adults_overall})
                        } // d.REIGON
                        
                        } // else
                        
                        })
           
           if (barsort == 1) {
           data.sort(function (a, b) {
                     return b[barvar] - a[barvar];
                     });
           }
           else if (barsort == 2) {
           console.log("true")
           data.sort(function (a, b) {
                     return a[barvar] - b[barvar];
                     });
           }
           // ensures data from csv is interpreted as int
           data.forEach(function (d) {
                        d.Total_lives_overall = +d.Total_lives_overall;
                        d.Children_overall = +d.Children_overall;
                        d.Adults_overall = +d.Adults_overall;
                        d.Total_lives_touched_health = +d.Total_lives_touched_health;
                        d.Children_health = +d.Children_health;
                        d.Adults_health = +d.Adults_health;
                        d.NUM1 = +d.NUM1;
                        d.NUM2 = +d.NUM2;
                        });
           
           xScale.domain(data.map(xValue));
           yScale.domain([0, d3.max(data, yValue)]);
           
           svg.append("g")
           .attr("class", "barx axis")
           .attr("transform", "translate(0," + 381 + ")")
           .call(xAxis)
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("transform", "rotate(-145) translate(0, -18)");
           
           
           svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text(function (d) {
                 return barname;
                 });
           
           
           svg.selectAll(".bar")
           .data(bardata)
           .enter().append("rect")
           .transition().duration(500)
           .attr("class", function (d) {
                 //            console.log()
                 if (partnernames.length == 0) {
                 return "bar";
                 }
                 else {
                 var spcolor = 0;
                 partnernames.forEach(function (n) {
                                     if (d.PARTNER_NAME == n) {
                                     spcolor = 1;
                                     }
                                     })
                 if (spcolor == 1) {
                 return "bar";
                 }
                 else {
                 return "transparentBar";
                 }
                 }
                 })
           .attr("fill", function(d){
                 if(d.control == 1)
                 return "#0099CC";
                 else
                 return "#FF3300";
                 })
           .attr("x", xMap)
           .attr("width", xScale.rangeBand)
           .attr("y", yMap)
           .attr("height", function (d) {
                 return height - yMap(d);
                 });
           
           });
    
    
    
    
    function type(d) {
        d.Total_lives_overall = +d.Total_lives_overall;
        d.Children_overall = +d.Children_overall;
        d.Adults_overall = +d.Adults_overall;
        d.Total_lives_touched_health = +d.Total_lives_touched_health;
        d.Children_health = +d.Children_health;
        d.Adults_health = +d.Adults_health;
        d.NUM1 = +d.NUM1;
        d.NUM2 = +d.NUM2;
        return d;
    }
    
    
    

}


function barform() {
    var text = '<form>' +
    '<select id="barSelect" onchange="barChooseCategory()">' +
    '<option value="Children_health" selected>Children_health</option>'+
    '<option value="Adults_health">Adults_health</option>'+
    '<option value="Total_lives_touched_health">Total_lives_touched_health</option>'+
    '<option value="Children_overall">Children_overall</option>'+
    '<option value="Adults_overall">Adults_overall</option>'+
    '<option value="Total_lives_overall">Total_lives_touched_overall</option>'+
    '<option value="NUM1">SERVER1</option>'+
    '<option value="NUM2">SERVER2</option>'+
    '</select>' +
    '<input type="button" name="button" value="sort" onclick="sortBars()"/>' +
    '<input type="button" name="button" value="reset" onclick="resetBars()"/>' +
    '<label><input id="barselection" type="radio" name="dataset" value="All" onclick="selectregion()" checked> All</label>' +
    '<label><input id="barselection" type="radio" name="dataset" value="Americas" onclick="selectregion()"> Americas</label>' +
    '<label><input id="barselection" type="radio" name="dataset" value="Africa" onclick="selectregion()"> Africa</label>' +
    '<label><input id="barselection" type="radio" name="dataset" value="Asia" onclick="selectregion()"> Asia</label>' +
    '</form>';
    document.getElementById("selection").innerHTML = text;
}


function barChooseCategory() {
    barvar = document.getElementById("barSelect")
    .options[barSelect.selectedIndex].value;
    barname = document.getElementById("barSelect")
    .options[barSelect.selectedIndex].text;
    d3.select("#mainsvg").remove();
    barChart();
}

function resetBars() {
    barsort = 0;
    d3.select("#mainsvg").remove();
    barChart();
}

function sortBars() {
    
    
    if (barsort == 0 || barsort == 2) {
        barsort = 1;
    }
    else {
        barsort = 2;
    }
    d3.select("#mainsvg").remove();
    barChart();
}

function selectregion() {
    d3.selectAll("#barselection")
    .on("change", change);
    
    function change() {
        reigon = this.value;
    }
    
    d3.select("#mainsvg").remove();
    barChart();

}
