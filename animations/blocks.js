$(document).ready(function() {
	
	
		var blocks = {};
		blocks.width = $("#vis_container").innerWidth();
		blocks.height = $("#vis_container").innerHeight();
		blocks.margin = {"top": 0, "left": 0, "right": 0, "bottom": 50};
		blocks.blockCount = 10;
		blocks.blockSize = blocks.width/blocks.blockCount;
			
		blocks.color = d3.scaleOrdinal(d3.schemeCategory10);
		
		// Empty the current visualization
		$("#vis_container").empty();
		
		blocks.svg = d3.select("#vis_container").append("svg")
			.attr("width", blocks.width)
			.attr("height", blocks.height)
			.style("background-color","#FFFFFF");
		
		blocks.background = blocks.svg.append("rect")
			.attr("x",0)
			.attr("y",0)
			.attr("width",blocks.width)
			.attr("height",blocks.height)
			.attr("fill","#FFFFFF")
			.attr("opacity",0.2);
			
		blocks.xScale = d3.scaleLinear()
			.domain([1,10])
			.range([blocks.margin.left, blocks.width - blocks.blockSize]);

		blocks.timeOut = 250;
		blocks.colorIndex = 0;

		function blocks_tick() {
			blocks.colorIndex++;
			

			if(blocks.svg.selectAll(".block").nodes().length == 0) {

				for(var i = 1; i <= blocks.blockCount; i++) {
					var thisCount = i;
					var block = blocks.svg.append("rect")
						.datum({i: i})
						.attr("class","block")
						.attr("x", blocks.xScale(i))
						.attr("y", 0)
						.attr("width",blocks.blockSize)
						.attr("height",blocks.blockSize)
						.attr("fill", blocks.color(blocks.colorIndex))
						.attr("stroke","#FFFFFF")
						.attr("stroke-width",2)
						.attr("opacity",0)
						.attr("transform","translate(0," + blocks.margin.top + ")")
						.transition()
							.duration(500)
							.delay(i*500)
							.attr("opacity",1)
						.transition()
						.duration(500)
						.attr("transform", "translate(0," + (blocks.height - blocks.margin.bottom) + ")")
						.on("end", function(d) {
							if(d.i == blocks.blockCount) {
								setTimeout(blocks_tick,blocks.timeOut);				
							}
						
						});

				}
				
			} else {
				blocks.background.transition()
					.duration(10000)
					.attr("fill",blocks.color(blocks.colorIndex));
			
				blocks.svg.selectAll(".block")
					.transition()
						.duration(function(d) { return (blocks.blockCount - d.i) * 200; })
						.ease(d3.easeLinear)
						.attr("transform",function(d) {
							return "translate(" + (blocks.xScale(blocks.blockCount) - blocks.xScale(d.i)) + "," + (blocks.height - blocks.margin.bottom) + ")";
						})
					.transition()
						.duration(500)
						.ease(d3.easeLinear)
						.attr("transform", function(d) {
							return "translate(" + (blocks.xScale(blocks.blockCount) - blocks.xScale(d.i)) + "," + (blocks.margin.top) + ")";
						})
					.transition()
						.duration(function(d) { return 200; })
						.ease(d3.easeLinear)
						.attr("transform", function(d) {
							return "translate(0," + blocks.margin.top + ")";
						}).on("end", function(d) {
							if(d.i == 1) {
								blocks.svg.selectAll(".block").transition()
									.duration(500)
									.delay(function(e) { return e.i*500; })
									.attr("fill",blocks.color(blocks.colorIndex))
									.attr("transform", "translate(0," + (blocks.height - blocks.margin.bottom) + ")")
									.on("end", function(e) {
										if(e.i == blocks.blockCount) {
											setTimeout(blocks_tick,blocks.timeOut);				
										}
						
									});
							
							}
						});
												
			}

		}
		
		setTimeout(blocks_tick, 0);

}); // end $(document).ready()