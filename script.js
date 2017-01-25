// Code goes here

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 800 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom,

    barHeight = 25,
    barWidth = width * .3;

var i = 0,
    duration = 750,
    root;
var chart = d3.bullet().width(barWidth).height(barHeight);

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("flare.json", function(error, flare) {
  if (error) throw error;

  root = flare;
  root.x0 = height / 2;
  root.y0 = 0;

 function expand(d){   
    var children = (d.children)?d.children:d._children;
    if (d._children) {        
        d.children = d._children;
        d._children = null;       
    }
    if(children)
      children.forEach(expand);
}

  root.children.forEach(expand);
  update(root);
});

d3.select(self.frameElement).style("height", "800px");





function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  // nodeEnter.append("circle")
  //     .attr("r", 1e-6)
  //     .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });


 



nodeEnter.append('svg')
	.data([
  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue1","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue2","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"red"},
  {"title":"Revenue3","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue4","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue5","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue6","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"grey"},
  {"title":"Revenue7","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue8","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"redNI"},
  {"title":"Revenue9","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue10","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"green"},
  {"title":"Revenue11","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"red"},
  {"title":"Revenue12","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"red"},
  {"title":"Revenue13","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"red"},
  {"title":"Revenue14","subtitle":"US$, in thousands","ranges":[150,300],"measures":[75,150],"markers":[75],"status":"red"}
 
  ])
   .attr("class", function(d){
	  if(d.status=='red') {return "bulletred";} 
	  else if(d.status=='grey') {return "bullet";} 
	  	  else if(d.status=='redNI') {return "bulletredNI";} 

	  
	  else {return "bulletgreen";}})
    .attr("y", -barHeight / 2)
	 .attr("height", function(d) { return barHeight; })
     .attr("width", function(d) { return barWidth; })
	  .call(chart)
	  .on("click", click);
  
	



  nodeEnter.append("text")
      .attr("y", -15)
      .attr("x", 5)

      .attr("dy", ".105em")
      .text(function(d) { return d.name; });
    //  .style("fill-opacity", 1e-5);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  // nodeUpdate.select("circle")
  //     .attr("r", 4.5)
  //     .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
let nodeHeight = 20,
    nodeWidth = 150;
    
/*function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

nodeHeight = 40, nodeWidth = 150;
    
nodeUpdate.selectAll("text").call(wrap,nodeWidth);
    
nodeUpdate.select('rect')
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('y', -(nodeHeight / 2))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });  */
    
nodeUpdate.select('rect')
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('y', -(nodeHeight / 2))
    .attr('width', function(d){
      var textElement = d3.select(this.parentNode).select("text").node();
      var bbox = textElement.getBBox();
      var width = bbox.width;
      return width*2;
    })
    .attr('height', nodeHeight)
    .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });  

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  // nodeExit.select("circle")
  //     .attr("r", 1e-6);
nodeExit.select('rect')
    .attr('width', 1e-5)
    .attr('height', 1e-5);  

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}