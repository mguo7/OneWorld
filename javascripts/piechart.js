var svg;

var data;

var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var radius = Math.min(width, height) / 3;


var pie = d3.layout.pie()
    .value(function (d) {
        return d.Total_lives_touched_health;
    })
    .sort(null);

var arc = d3.svg.arc()
    .outerRadius(radius - 20);

//0:revenue
//1:tuition
//2:total enrollment
//3:all employees

var opt = 0;

var pie_color = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"];

//add the tooltip area to the webpage
var tooltip = d3.select("#main").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



function pieform(){
    var text = '<form>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="Total_lives_touched_health" checked> Total_lives_touched_health</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="NUM1"> SERVER1</label>' +
        '<label><input id="pieselection" type="radio" name="dataset" value="NUM2"> SERVER2</label>' +
        '</form>'
    document.getElementById("selection").innerHTML=text;
}



function createPieSvg() {
    svg = d3.select("#svgtd").append("svg")
        .attr("id", "mainsvg")
        .attr("width", 800)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(" + 800 / 2 + "," + 500 / 2 + ")");
}

function piechart(){


    pieform();
    createPieSvg();
    d3.csv("data/health.csv", type, function(error, data) {
    var csvdata = [];
       
           if(partnernames.length > 9) {
           
           partnernames.pop(partnernames[10])
           }
    
    partnernames.forEach(function(m){
                        
                        data.forEach(function(d){
                                     
                                     if(d.PARTNER_NAME == m){
                                     
                                     csvdata.push({PARTNER_NAME:d.PARTNER_NAME,Total_lives_overall:d.Total_lives_overall,Total_lives_touched_health:d.Total_lives_touched_health,NUM1:d.NUM1,NUM2:d.NUM2,SERVICE1:d.SERVICE1,SERVICE2:d.SERVICE2,Children_health:d.Children_health,Adults_health:d.Adults_health,Children_overall:d.Children_overall,Adults_overall:d.Adults_overall})
                                     }
                                     
                                })
                        
                        
                        });
           svg.selectAll(".title").remove();
 
           if (partnernames[0] == null){
           
            text = svg.append("text")
           .attr("class","title")
           .style("text-anchor", "middle")
           .text("Please select an Partner.")
           .style("font-size","30px")
           .attr("font-family","serif")
           .attr("x",weight/2)
           .attr("y",height/2)
           .attr("font-weight","bold");
           
           }
           
           
        var group1 = svg.append("g").classed("group1", true)

        var blocks = group1.selectAll("g").data(partnernames)
            .enter()
            .append("g")
            .attr("transform", function(d,i){
                  
                  
                    return get_location(d,i)
                  
           });
           var rects = blocks.append("rect")
           .attr({
                 "x": 140,
                 "y": 0,
                 "width": 30,
                 "height": 30,
                 "rx": 5,
                 "ry": 5
                 })
           .style("fill", function(d,i){return  pie_color[i]});

 
        var text_content = blocks.append("text").data(partnernames)
            .attr({x:173, y:14})
            .style({
                "fill": "#232323",
                "stroke-width": 0 + "px",
                "font-size": 0.8 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif"
            })
            .text(function(d){return d})

        var path = svg.datum(csvdata).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function(d, i) { return pie_color[i];})
            .attr("d", arc)
            .each(function(d) { this._current = d; }) // store the initial angles
            .on("mouseenter", function(d){

                text = svg.append("text")
                    .attr("class","detail")
                    .attr("transform", arc.centroid(d))
                    .attr("dy", ".5em")
                    .style("text-anchor", "middle")
                    .text(d.data.PARTNER_NAME)
                    .style("font-size","15px")
                    .attr("font-family","serif")
                    .attr("y",height/2-80)
                    .attr("font-weight","bold");

                if(opt==0){
                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text(d.data.Total_lives_touched_health+" people")
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("font-weight","bold");
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.Total_lives_touched_health/d3.sum(csvdata, function(d) { return d.Total_lives_touched; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");
                
                
                }
                if(opt==1){
                
                
                project = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-420)
                .text(d.data.SERVICE1)
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("font-weight","bold");
                
                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text(d.data.NUM1+" people")
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("font-weight","bold");
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.NUM1/d3.sum(csvdata, function(d) { return d.NUM1; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");

                }
                
                if(opt==2){
                
                project = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-420)
                .text(d.data.SERVICE2)
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("font-weight","bold");

                    value = svg.append("text")
                        .attr("class","detail")
                        .attr("transform", arc.centroid(d))
                        .attr("dy", ".5em")
                        .style("text-anchor", "middle")
                        .attr("y",height/2-400)
                        .text(d.data.NUM2+" people")
                        .style("font-size","15px")
                        .attr("font-family","serif")
                        .attr("text-anchor","middle")
                        .attr("font-weight","bold");
                
                
                per = svg.append("text")
                .attr("class","detail")
                .attr("transform", arc.centroid(d))
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .attr("y",height/2-380)
                .text(d3.round(100*(d.data.NUM2/d3.sum(csvdata, function(d) { return d.NUM2; })))+"%")
                .style("font-size","15px")
                .attr("font-family","serif")
                .attr("text-anchor","middle")
                .attr("font-weight","bold");
                
                
                }


            })
            .on("mouseout",function(d){
                svg.selectAll(".detail").remove()
                project.remove();
                text.remove();
                value.remove();
                per.remove();
            });


        path.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.PARTNER_NAME; });



        d3.selectAll("#pieselection")
            .on("change", change);

        function change() {
            var value = this.value;
            if(value == "Total_lives_touched_health"){ opt = 0}
            if(value == "NUM1"){ opt = 1}
            if(value == "NUM2"){ opt = 2}
           

            pie.value(function(d) { return d[value]; }); // change the value function
            path = path.data(pie); // compute the new angles
            path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
           
        }
    });
}



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

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}


function get_location(d,i){
    var x = -500;
    var y = -200 + (48 * i);
    return "translate(" + [x, y] + ")";
}