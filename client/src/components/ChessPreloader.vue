<template>
	<div id="chess-preloader">
	  <svg
		:width="boardSize"
		:height="boardSize"
		viewBox="0 0 400 400"
		xmlns="http://www.w3.org/2000/svg"
	  >
		<!-- Draw chessboard -->
		<rect
		  v-for="(square, index) in squares"
		  :key="index"
		  :x="square.position.x"
		  :y="square.position.y"
		  :width="squareSize"
		  :height="squareSize"
		  :fill="square.fill"
		/>
		<!-- Queens with animations -->
		<g v-for="(queen, index) in queens" :key="index">
		  <image
			:href="queen.image"
			:width="squareSize"
			:height="squareSize"
		  >
			<animateMotion
			  :dur="queen.duration + 's'"
			  repeatCount="indefinite"
			  keyTimes="0;0.25;0.5;0.75;1"
			  values="0;0.25;0.5;0.75;1"
			>
			  <mpath :href="'#path' + index" />
			</animateMotion>
		  </image>
		  <!-- Define the path for the animation -->
		  <path
			:id="'path' + index"
			:d="queen.path"
			fill="none"
			stroke="transparent"
		  />
		</g>
	  </svg>
	</div>
  </template>
  
  <script>
  import WhiteQueen from "@/assets/WhiteQueen.png";
  import BlackQueen from "@/assets/BlackQueen.png";
  
  export default {
	data() {
	  const squareSize = 50;
	  const boardSize = squareSize * 8;
  
	  // Generate squares dynamically
	  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	  const squares = [];
  
	  for (let rank = 8; rank >= 1; rank--) {
		for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
		  const file = files[fileIndex];
		  squares.push({
			square: `${file}${rank}`, // Example: a8, b8
			rank,
			file,
			position: {
			  x: fileIndex * squareSize,
			  y: (8 - rank) * squareSize, // SVG y-coordinates start at the top
			},
			fill: (fileIndex + rank) % 2 === 0 ? "PapayaWhip" : "SkyBlue",
		  });
		}
	  }
  
	  // Helper function to get a square's position
	  const getSquarePosition = (squareName) => {
		const square = squares.find((sq) => sq.square === squareName);
		return square ? square.position : { x: 0, y: 0 };
	  };
  
	  // Define queen paths based on square names (from FXMLSplashScreenController.java)
	  const queenPaths = [
		["a5", "d8", "h4", "e1"], // Queen 0
		["b3", "c2", "g6", "f7"], // Queen 1
		["c1", "h6", "f8", "a3"], // Queen 2
		["d7", "g4", "e2", "b5"], // Queen 3
		["e2", "b5", "d7", "g4"], // Queen 4
		["f8", "a3", "c1", "h6"], // Queen 5
		["g6", "f7", "b3", "c2"], // Queen 6
		["h4", "e1", "a5", "d8"], // Queen 7
	  ];
  
	  // Define queen durations based on FXMLSplashScreenController.java
	  const queenDurations = [6, 4, 6, 4, 4, 6, 4, 6];
  
	  // Generate SVG paths dynamically
	  const svgPaths = queenPaths.map((pathSquares) => {
		const positions = pathSquares.map(getSquarePosition);
		const d = positions
		  .map((pos, idx) =>
			idx === 0 ? `M${pos.x},${pos.y}` : `L${pos.x},${pos.y}`
		  )
		  .join(" ");
		return `${d} Z`; // Close the path
	  });
  
	  // Assign queen images based on the specified order
	  const getQueenImage = (index) => {
		switch (index) {
		  case 0:
		  case 2:
		  case 5:
		  case 7:
			return WhiteQueen;
		  case 1:
		  case 3:
		  case 4:
		  case 6:
			return BlackQueen;
		  default:
			return WhiteQueen;
		}
	  };
  
	  // Generate queen objects with animation data
	  const queens = queenPaths.map((_, index) => ({
		image: getQueenImage(index), // Assign image dynamically
		duration: queenDurations[index], // Assign duration dynamically
		path: svgPaths[index],
	  }));
  
	  return {
		boardSize,
		squareSize,
		squares,
		queens,
	  };
	},
  };
  </script>
  
  <style scoped>
  svg {
	display: block;
	margin: auto;
  }
  
  #chess-preloader {
    position: fixed;
    top: calc(50vh - 200px);
    left: calc(50vw - 200px);
    opacity: 0.5;
    z-index: 999;
}
  </style>
  