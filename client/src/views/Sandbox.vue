<template>
  <menu-bar @toggle-colors="toggleColors"/>
  <span v-if="showColors" ><nav-bar></nav-bar></span>
  
  <div class="fib-svg-container">
    <ul class="inline-list">
      <li v-for="(rect, index) in rectangles" :key="index">{{ rect.size }}</li>
    </ul>
    <svg :width="svgWidth" :height="svgHeight" xmlns="http://www.w3.org/2000/svg">
      <rect
        v-for="(rect, index) in rectangles"
        :key="index"
        :x="rect.x"
        :y="rect.y"
        :width="rect.size"
        :height="rect.size"
        :fill="rect.color"
        :stroke="rect.borderColor"
        :stroke-width="rect.borderWidth"
        :class="{ animated: isAnimating }"
        :style="{ animationDelay: `${index * animationDelay}ms`}">
      </rect>

      <path
        v-if="spiralPath"
        id="spiral"
        :d="spiralPath"
        fill="none"
        stroke="black"
        stroke-width="0.5"
        :style="{ visibility: isSpiralVisible ? 'visible' : 'hidden' }"
        stroke-dasharray="0"
        stroke-dashoffset="0"
      />
    </svg>

    <button @click="drawFibonacciGoldenRatio">Draw Fibonacci Pattern</button>
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  name: "Sandbox",
  data() {
    return {
      svgWidth: window.innerWidth * 0.8, // 80% of window width
      svgHeight: window.innerHeight * 0.8, // 80% of window height
      rectangles: [], // Rectangles data
      spiralPath: "", // Spiral path
      isAnimating: false, // Rectangle animation state
      isSpiralVisible: false, // Controls spiral visibility
      animationDelay: 250, // Delay between rectangle animations in ms
      showColors: localStorage.getItem("colorMode") === "enabled"
    };
  },
  methods: {
    toggleColors(data){
      this.showColors = data;
      localStorage.setItem("colorMode", data ? "enabled" : "disabled");
    },
    updateSVGSize() {
      this.svgWidth = window.innerWidth * 0.8;
      this.svgHeight = window.innerHeight * 0.8;
    },
    fibonacci(n) {
      let [size, x, y] = [1, this.svgWidth * 0.3333, this.svgHeight * 0.6666];
      let fibs = [{ size, x, y, cx: x + size / 2, cy: y + size / 2 }];

      for (let i = 1; i < n; i++) {
        switch (i % 4) {
          case 0:
            x -= size;
            y -= fibs[i - 2].size;
            break; // Left
          case 1:
            y -= size;
            break; // Up
          case 2:
            x += fibs[i - 1].size;
            break; // Right
          case 3:
            x -= fibs[i - 2].size;
            y += fibs[i - 1].size;
            break; // Down
        }
        fibs.push({ size, x, y, cx: x + size / 2, cy: y + size / 2 });
        size += fibs[i - 1].size;
      }

      return fibs;
    },
    drawFibonacciGoldenRatio() {
      this.isAnimating = false;
      this.isSpiralVisible = false;
      this.rectangles = [];

      nextTick(() => {
        const fibs = this.fibonacci(19);
        this.rectangles = fibs.map((rect) => ({
          x: rect.x,
          y: rect.y,
          size: rect.size,
          color: `hsl(${Math.random() * 360}, 60%, 60%)`,
          borderWidth: 0.5,
          borderColor: "black",
        }));
        this.spiralPath = this.generateSpiralPath(fibs);
        this.isAnimating = true;

        // Wait for rectangle animations to complete before animating the spiral
        const totalAnimationTime = this.rectangles.length * this.animationDelay + 500; // Add buffer
        setTimeout(() => {
          this.isSpiralVisible = true; // Show spiral
          this.animateSpiral();
        }, totalAnimationTime);
      });
    },
    generateSpiralPath(fibSequence) {
      let path = "";
      fibSequence.forEach((sqr, index) => {

        const radius = sqr.size; 
        const largeArcFlag = 0; // Always use a small arc
        let sweepFlag = 1; // Clockwise direction

        let startX, startY, endX, endY;

        switch (index % 4) {
          case 0:
            [startX, startY] = [sqr.x + sqr.size, sqr.y + sqr.size];
            [endX, endY] = [sqr.x, sqr.y];
            break;
          case 1:
            [startX, startY] = [sqr.x, sqr.y + sqr.size];
            [endX, endY] = [sqr.x + sqr.size, sqr.y];
            break;
          case 2:
            [startX, startY] = [sqr.x, sqr.y];
            [endX, endY] = [sqr.x + sqr.size, sqr.y + sqr.size];
            break;
          case 3:
            [startX, startY] = [sqr.x + sqr.size, sqr.y];
            [endX, endY] = [sqr.x, sqr.y + sqr.size];
            break;
        }

        path += `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} `;
      });

      return path.trim();
    },
    animateSpiral() {
      const spiral = document.getElementById("spiral");
      const length = spiral.getTotalLength();
      spiral.style.strokeDasharray = length;
      spiral.style.strokeDashoffset = length;
      spiral.style.transition = "stroke-dashoffset 2s ease-in-out";
      spiral.style.strokeDashoffset = "0";
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateSVGSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSVGSize);
  },
};
</script>

<style scoped>
.fib-svg-container {
  display: block;
  width: 100%;
  margin: 20px auto;
  text-align: center;
}

svg {
  display: block;
  margin: auto;
  background-color: white;
  border: 1px solid black;
}

rect.animated {
  animation: fade-in 0.5s ease-in-out forwards;
  opacity: 0;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
