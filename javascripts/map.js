var width = 1200,
height = 500,
centered;

var projection = d3.geo.kavrayskiy7()
.scale(200)
.translate([900 / 2, height / 2]);

var path = d3.geo.path()
.projection(projection);

var svg = d3.select("body").append("svg")
.attr("width", 900)
.attr("height", height);





var map_color = d3.scale.linear()
.domain([0,0.65, 1])
.range(["yellow","orange", "red"]);

var map_color_rev = d3.scale.linear()
.domain([0,0.5, 1.0])
.range(["yellow","orange", "red"]);


var g = svg.append("g");

var opt = 0;

var data = d3.range(10);

var c_value;

var total_value;
var mapdata;

d3.csv("data/health.csv", function(error, data) {
       
       
       
       
       data.forEach(function(d) {
                    d.Total_lives_touched_health = +d.Total_lives_touched_health;
                    
                     });

       
       total_value = d3.mean(data, function(n) { return n.Total_lives_touched_health;});
       
       d3.json("json/world.json", function(error, world) {
               mapdata = topojson.feature(world, world.objects.countries).features
               g.append("g")
               .attr("id", "countries")
               .selectAll("path")
               .data(topojson.feature(world, world.objects.countries).features)
               .enter().append("path")
               .attr("d", path)
               .style("fill",function(d){
                      
                      var local_value = 0.0;
                      var count = 0;
                      data.forEach(function(m){
                                   
                                   if(m.Country == d.properties.name) {
                                   
                                   local_value = local_value + m.Total_lives_touched_health;
                                   count++;
                                   }
                                   
                                   });
                      
                      if(local_value == 0) {
                      
                      return "grey";
                      
                      } else {
                      //98,251,152
                      
                      var num = (local_value/count)/total_value;
                      
                      return map_color(num);
                      }
                      })
               .on("click", function(d){
                   clicked(d,d.properties.name)
                   });
               
               function clicked(d,cname) {
               var x, y, k;
               var text;
               if (d && centered !== d) {
               svg.selectAll(".total").remove();
               svg.selectAll(".cname").remove();
               
               var centroid = path.centroid(d);
               x = centroid[0];
               y = centroid[1];
               k = 4;
               centered = d;
               
                text = svg.append("text")
               .attr("class","cname")
               .style("text-anchor", "middle")
               .text("Country: "+ cname)
               .style("font-size","20px")
               .attr("font-family","serif")
               .attr("x",650)
               .attr("y",300)
               .attr("font-weight","bold");
               
               text = svg.append("text")
               .attr("class","total")
               .style("text-anchor", "middle")
               .text(function(d){
                     var local_value = 0;
                     
                     data.forEach(function(m){
                                  
                                  if(m.Country == cname) {
                                  local_value = local_value + m.Total_lives_touched_health;
                                  }
                                  });
                     
                     
                     return "Total lives touched(Health care): " + local_value;
                     
                     })
               .style("font-size","20px")
               .attr("font-family","serif")
               .attr("x",700)
               .attr("y",400)
               .attr("font-weight","bold");
               
               } else {
               x = 450;
               y = height / 2;
               k = 1;
               svg.selectAll(".total").remove();
               svg.selectAll(".cname").remove();
               centered = null;
               
               }
               
               g.selectAll("path")
               .classed("active", centered && function(d) { return d === centered; });
               
               
               g.transition()
               .duration(750)
               .attr("transform", "translate(" + 450 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
               .style("stroke-width", 1.5 / k + "px");
               }
               
               });
       });





var gradient = svg.append("linearGradient")
.attr("y1", 10)
.attr("y2", 150)
.attr("x1", "0")
.attr("x2", "0")
.attr("id", "gradient")
.attr("gradientUnits", "userSpaceOnUse");

gradient.append("stop")
.attr("offset", "0")
.attr("stop-color", "red");

gradient.append("stop")
.attr("offset", "0.8")
.attr("stop-color", "yellow");

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x", 30)
.attr("y", 10)
.attr("width", 20)
.attr("height", 120)
.attr("fill", "url(#gradient)");

svg.append("text")
.attr("class","bar")
.attr("dy", ".5em")
.attr("x",80)
.attr("y",10)
.text("High")
.attr("font-family","serif")
.attr("text-anchor","middle")
.attr("font-weight","bold");

svg.append("text")
.attr("class","bar")
.attr("dy", ".5em")
.attr("x",80)
.attr("y",130)
.text("Low")
.attr("font-family","serif")
.attr("text-anchor","middle")
.attr("font-weight","bold");


d3.select(self.frameElement).style("height", height + "px");
       
       
       
