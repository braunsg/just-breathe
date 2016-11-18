<!--

#just-breathe
http://www.github.com/braunsg/just-breathe
Created by: Steven Braun
Last edited: 2016-11-18


This code is freely distributed under an MIT permissive license.

-->
<!DOCTYPE html>
<meta charset="utf-8">
<head>
	<meta property="og:title" content="Just Breathe" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Visual meditations to recenter and refocus breathing" />
	<meta property="og:image" content="http://www.stevengbraun.com/dev/just-breathe/inc/screenshot.jpg" />
	
	<title>Just Breathe</title>
	<style>
		@import 'https://fonts.googleapis.com/css?family=Catamaran:100,600|Noto+Sans:700';

		body {
			width: 100%;
			height: 100%;
			margin: 0px;
			padding: 0px;
		}
	
		#container {
			width: 100%;
			display: flex;
			flex-direction:column;
			align-items: center;
			box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
		
		}
	
		#body_wrapper {
			width: 50%;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0px;
			padding: 0px;
		}
	
		#header {
			position: relative;
			margin: 20px 0px 0px 0px;
			padding: 20px;
			text-align: left;
			font-family: "Noto Sans",sans-serif;
			font-size: 8em;
			font-weight: 700;
			line-height: 100%;
			letter-spacing: -8pt;
			cursor: default;
			box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
		}
	
		#vis_container {
			z-index: 100;
			position: relative;
			width: 500px;
			height: 500px;
			border: 1px solid #CECECE;
			background: #FCFCFC;
			box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
		}
	
	
		.content_container {
			position: relative;
			width: 100%;
			margin: 0px;
			padding: 40px;
			text-align:center;
			box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
		}
		
	
		.text {
			font-family: "Catamaran",sans-serif;
			font-size: 1.2em;	
			margin: 0px 0px 25px 0px;
			padding: 5px;
			cursor: default;
			text-align: center;
			background-color: rgba(255,255,255,0.8);
			box-sizing: border-box;
				-moz-box-sizing: border-box;
				-webkit-box-sizing: border-box;
		}
	
		a:link, a:visited {
			color: steelblue;
			text-decoration: none;
		}
	
		a:hover {
			text-decoration: underline;
		}
	
	
		#vis_options {
			width: 500px;
			display: flex;
			flex-direction: row;
		}		

		.vis_option {
			font-family: "Catamaran",sans-serif;
			font-size: 0.8em;
			line-height: 1.5em;
			margin: 0px 3px 0px 0px;
			padding: 5px;
			background-color: steelblue;
			color: #FFFFFF;
			cursor: pointer;
			box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				
		}
	
		.vis_option_selected {
			color: #F6C900;
		}
	
		.vis_option:hover {
			color: #F6C900;
		}
	
		.word {
			font-family: "Catamaran",sans-serif;
			font-size: 2.0em;
			text-anchor: middle;
		}

	</style>
	<script src="lib/d3.v4.js"></script>
	<script src="lib/jquery-3.0.0.min.js"></script>
	<script src="animations/arcs.js"></script>
	<script>
	$(document).ready(function() {
		$(".vis_option").click(function() {
			$(".vis_option").removeClass("vis_option_selected");
			$(this).addClass("vis_option_selected");
			var vis_option = $(this).attr("id");
			$.getScript("animations/" + vis_option + ".js");
		});	
	
	});
	</script>
</head>
<body>
<div id="container">
	<div id="body_wrapper">
		<div id="header">just<span style="color:steelblue;">breathe</span></div>
		<div id="vis_container">
		</div>
		<div id="vis_options">
			<div class="vis_option" id="cycles">Cycles</div>
			<div class="vis_option" id="blocks">Blocks</div>
			<div class="vis_option" id="encouragement">Encouragement</div>
			<div class="vis_option vis_option_selected" id="arcs">Arcs</div>			
		</div>
		<div class="content_container">
			<div class="text">
			Are you feeling stressed? That is okay. Use these visual meditations to help refocus your breathing and bring calm.<br>Breathe in and out with the animation.
			</div>
			<div class="text">This visualization was built in <a target="_blank" href="http://www.d3js.org">D3.js</a> by <a target="_blank" href="http://www.stevengbraun.com">Steven Braun</a>. The code for this project is freely available on <a target="_blank" href="http://www.github.com/braunsg/breathe">GitHub</a>.
			</div>

		</div>
	</div>
	
</div>
</body>
</html>