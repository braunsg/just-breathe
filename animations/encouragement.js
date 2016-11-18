$(document).ready(function() {
	
	
		var encouragement = {};
		encouragement.width = $("#vis_container").innerWidth();
		encouragement.height = $("#vis_container").innerHeight();
		encouragement.margin = {"top":0,"left":50,"right":50,"bottom":0};
		
		encouragement.color = d3.scaleOrdinal(d3.schemeCategory10);
		
		// Empty the current visualization
		$("#vis_container").empty();
		
		encouragement.svg = d3.select("#vis_container").append("svg")
			.attr("width", encouragement.width)
			.attr("height", encouragement.height)
			.style("background-color","#FFFFFF");
		
		encouragement.background = encouragement.svg.append("rect")
			.attr("x",0)
			.attr("y",0)
			.attr("width",encouragement.width)
			.attr("height",encouragement.height)
			.attr("fill","#FFFFFF")
			.attr("opacity",0.2);

		encouragement.words = ["safe","calm","warm","secure","strong","whole","peace"];
							
		encouragement.xScale = d3.scaleLinear()
			.domain([0,5])
			.range([encouragement.margin.left, encouragement.width - encouragement.margin.right]);

		encouragement.marker = encouragement.svg.append("circle")
			.attr("cx", -50)
			.attr("cy", encouragement.height / 2 + 30)
			.attr("r",5)
			.attr("fill","#CECECE");
			
		encouragement.colorIndex = 0;
		encouragement.wordIndex = 0;
		function encouragement_tick() {
			encouragement.background.transition()
				.duration(5000)
				.attr("fill",encouragement.color(encouragement.colorIndex));
				
			var word = encouragement.words[encouragement.wordIndex];

			
			var word_split = word.split("");
			word_split.forEach(function(letter,i) {
				encouragement.marker.transition()
					.duration(500)
					.delay(i*1000)
					.attr("cx", encouragement.xScale(i));
				encouragement.svg.append("text")
					.attr("class","word")
					.attr("x",encouragement.xScale(i))
					.attr("y",encouragement.height/2)
					.attr("opacity",0)
					.text(letter)
					.transition()
						.duration(500)
						.delay(i*1000)
						.attr("opacity",1)
						.on("end", function() {
				
							if(i == word_split.length - 1) {
								if(encouragement.wordIndex + 1 == encouragement.words.length) {
									encouragement.wordIndex = 0;
								} else {
									encouragement.wordIndex++;
								}

								encouragement.svg.selectAll("text")
									.transition()
									.duration(1000)
									.attr("opacity",0)
									.remove();
									
								encouragement.colorIndex++;
								setTimeout(encouragement_tick,2000);						
							}
						});	
											
			});
			
			
		}
		
		setTimeout(encouragement_tick, 0);

}); // end $(document).ready()