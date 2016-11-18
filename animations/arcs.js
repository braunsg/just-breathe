$(document).ready(function() {
	
	
		var arcs = {};
		
		arcs.width = $("#vis_container").innerWidth();
		arcs.height = $("#vis_container").innerHeight();
		arcs.margin = {"top": 50, "left": 50, "right": 50, "bottom": 50};

		arcs.color = d3.scaleOrdinal(d3.schemeCategory20);
		
		arcs.timeoutScale = d3.scaleLinear()
			.domain([0,100])
			.range([2000,1000]);
			
		// Empty the current visualization
		$("#vis_container").empty();
		
		arcs.svg = d3.select("#vis_container").append("svg")
			.attr("width", arcs.width)
			.attr("height", arcs.height)
				.append("g")
				.attr("transform","translate(" + arcs.width/2 + "," + arcs.height + ")");
		
		
		arcs.transitionCounter = 0;
		arcs.timeOut = 6000;
		arcs.colorIndex = 0;

		arcs.center = arcs.svg.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", 15)
			.attr("fill", "#CECECE");

		arcs.data = [{i: 1, innerRadius:25, outerRadius:50, startAngle: Math.PI * 3/2, endAngle: Math.PI*5/2},
					 {i: 2, innerRadius:75, outerRadius:100, startAngle: Math.PI * 3/2, endAngle: Math.PI*5/2},
					 {i: 3, innerRadius:125, outerRadius:150, startAngle: Math.PI * 3/2, endAngle: Math.PI*5/2},
					 {i: 4, innerRadius:175, outerRadius:200, startAngle: Math.PI * 3/2, endAngle: Math.PI*5/2},
					 {i: 5, innerRadius:225, outerRadius:250, startAngle: Math.PI * 3/2, endAngle: Math.PI*5/2}];
					 
		function arcs_tick() {

			arcs.svg.selectAll(".arc").remove();
			arcs.center.transition()
				.duration(arcs.timeOut)
				.ease(d3.easeCubic)
				.attr("r",250)
				.transition()
					.duration(arcs.timeOut)
					.ease(d3.easeCubicOut)
					.attr("r",15);
					
			
			arcs.arc = d3.arc()
				.padAngle(0.2)
				.padRadius(10);

			arcs.innerSignals = arcs.svg.selectAll(".arc")
				.data(arcs.data)
				.enter()
				.append("path")
					.attr("class","arc")
					.attr("d",arcs.arc)
					.attr("fill",arcs.color(arcs.colorIndex))
					.attr("opacity",0)
					.attr("transform","rotate(180)")							
					.transition()
						.duration(arcs.timeOut/4)
						.delay(function(d) { return (d.i-1)*1000; })
						.ease(d3.easeQuadInOut)
						.attr("opacity",1)
						.attr("transform","rotate(0)")
					.transition()
						.duration(arcs.timeOut/4)
						.delay(function(d) { return (5-d.i) * 2000; })
						.ease(d3.easeQuadInOut)
						.attr("transform","rotate(180)")
						.on("end", function(d) {
							console.log(d.i);
							if(d.i == 5) {
								setTimeout(arcs_tick,4000);
							}
						});
			
			arcs.colorIndex++;
			
		}
		
		setTimeout(arcs_tick, 0);

}); // end $(document).ready()