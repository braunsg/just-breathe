$(document).ready(function() {
	
		var cycles = {};
		
		cycles.width = $("#vis_container").innerWidth();
		cycles.height = $("#vis_container").innerHeight();
		cycles.margin = {"top": 50, "left": 50, "right": 50, "bottom": 50};


		cycles.pie = d3.pie()
			.sort(null)
			.value(function(d) { return 1; });

		cycles.colorScale = d3.scaleLinear()
			.domain([0,100])
			.range(["#6a7789","#CC0000"]);
			
		cycles.color = d3.scaleOrdinal(d3.schemeCategory20);
		
		cycles.timeoutScale = d3.scaleLinear()
			.domain([0,100])
			.range([2000,1000]);

		// Empty the current visualization
		$("#vis_container").empty();
		
		cycles.svg = d3.select("#vis_container").append("svg")
			.attr("width", cycles.width)
			.attr("height", cycles.height)
				.append("g")
				.attr("transform","translate(" + cycles.width/2 + "," + cycles.height/2 + ")");
		
		

		cycles.timeOut = 6000;
		cycles.colorIndex = 0;

		cycles.center = cycles.svg.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", 15)
			.attr("fill", cycles.color(cycles.colorIndex));

		function cycles_tick() {

			cycles.svg.selectAll(".innerSignal").remove();
			cycles.svg.selectAll(".outerSignal").remove();

			cycles.innerData = [];
			cycles.outerData = [];
			// Generate pseudodata
			for(var i = 0; i <= 23; i++) {
				cycles.innerData.push({x: i, value: Math.random()*75});
				cycles.outerData.push({x: i, value: Math.random()*125});
		
			}
	
			cycles.center.transition()
				.duration(cycles.timeOut/2)
				.attr("r",35)
				.attr("fill",cycles.color(cycles.colorIndex))
				.transition()
					.duration(cycles.timeOut/2)
					.attr("r",15);
					
			cycles.arc = d3.arc()
				.innerRadius(75)
				.outerRadius(76)
				.padAngle(0.2)
				.padRadius(10);
	
			cycles.arcs = cycles.pie(cycles.innerData);
			cycles.innerSignals = cycles.svg.selectAll(".innerSignal")
				.data(cycles.arcs)
				.enter()
				.append("path")
					.attr("class","innerSignal")
					.attr("d",cycles.arc)
					.attr("fill",cycles.color(cycles.colorIndex))
					.attr("opacity",0)
					.transition()
						.duration(cycles.timeOut/4)
						.delay(function(d,i) { return i*50; })
						.attr("d", d3.arc().innerRadius(75).outerRadius(function(d) { return 75+d.data.value+1; }).padAngle(0.2).padRadius(10))
						.attr("opacity",1)
						.transition()
							.duration(cycles.timeOut/4)
							.delay(cycles.timeOut/4 + 250)
							.attr("d", d3.arc().innerRadius(125).outerRadius(126).padAngle(0.2).padRadius(10))
							.attr("opacity",0);

			cycles.arc = d3.arc()
				.innerRadius(125)
				.outerRadius(126)
				.padAngle(0.2)
				.padRadius(10);

			cycles.arcs = cycles.pie(cycles.outerData);
			cycles.innerSignals = cycles.svg.selectAll(".outerSignal")
				.data(cycles.arcs)
				.enter()
				.append("path")
					.attr("class","outerSignal")
					.attr("d",cycles.arc)
					.attr("fill",cycles.color(cycles.colorIndex))
					.attr("opacity",0)
					.transition()
						.duration(cycles.timeOut/4)
						.delay(function(d,i) { return i*50; })
						.ease(d3.easeQuadInOut)
						.attr("d", d3.arc().innerRadius(125).outerRadius(function(d) { return 125+d.data.value+1; }).padAngle(0.2).padRadius(10))								
						.attr("opacity",1)
						.transition()
							.duration(cycles.timeOut/4)
							.delay(cycles.timeOut/4 + 250)
							.ease(d3.easeQuadInOut)
							.attr("d", d3.arc().innerRadius(125).outerRadius(126).padAngle(0.2).padRadius(10))
							.attr("opacity",0);
			
			cycles.colorIndex++;
			
			setTimeout(cycles_tick,cycles.timeOut);
		}
		
		setTimeout(cycles_tick, 0);

}); // end $(document).ready()