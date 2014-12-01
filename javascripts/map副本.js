var width = 960,
height = 500,
centered;

var projection = d3.geo.kavrayskiy7()
.scale(170)
.translate([width / 2, height / 2]);

var path = d3.geo.path()
.projection(projection);

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

svg.append("rect")
.attr("class", "background")
.attr("width", width)
.attr("height", height)
.on("click", clicked);

var g = svg.append("g");

d3.json("json/world.json", function(error, world) {
        g.append("g")
        .attr("id", "countries")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter().append("path")
        .attr("d", path)
        .on("click", clicked);
        
         });

function clicked(d) {
    var x, y, k;
    
    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }
    
    g.selectAll("path")
    .classed("active", centered && function(d) { return d === centered; });
    
    g.transition()
    .duration(750)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    .style("stroke-width", 1.5 / k + "px");
}

