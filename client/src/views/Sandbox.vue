<template>
  <div>
    <nav-bar v-show="showColors" @reset-colors="resetColors"></nav-bar>

    <div class="fib-svg-container">
      <ul class="inline-list">
        <li v-for="(rect, index) in rectangles" :key="index">{{ rect.size }}</li>
      </ul>
      <button @click="drawFibonacciGoldenRatio" ref="fibBtn">Draw Fibonacci Pattern</button>
      <svg ref="recs" class="card2" xmlns="http://www.w3.org/2000/svg">

        
        <rect v-for="(rect, index) in rectangles" :key="index" :x="rect.x" :y="rect.y" :width="rect.size"
          :height="rect.size" :fill="rect.color" :stroke="rect.borderColor" :stroke-width="rect.borderWidth"
          :class="{ animated: isAnimating }" :style="{ animationDelay: `${index * animationDelay}ms` }">
        </rect>

        <path v-if="spiralPath" id="spiral" :d="spiralPath" fill="none" stroke="black" stroke-width="0.5"
          :style="{ visibility: isSpiralVisible ? 'visible' : 'hidden' }" stroke-dasharray="0" stroke-dashoffset="0" />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch, onDeactivated, onBeforeUnmount } from 'vue';
import { useEventStore } from "@/stores/eventStore";

export default {
  name: "Sandbox",
  setup(_, { emit }) {
    const eventStore = useEventStore();
    const rectangles = ref([]);
    const spiralPath = ref("");
    const isAnimating = ref(false);
    const isSpiralVisible = ref(false);
    const animationDelay = ref(250);
    const fibBtn = ref(null);
    const recs = ref(null);

    const fibonacci = (n) => {
      let [size, x, y] = [ 1, (recs.value) ? recs.Width : (window.innerWidth - 100) * 0.3333
        , (recs.value) ? recs.Height : (window.innerHeight - 100) * 0.6666];
      
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
    };


    const t = ref(null);


    
    const drawFibonacciGoldenRatio = () => {
      isAnimating.value = false;
      isSpiralVisible.value = false;
      rectangles.value = [];

      nextTick(() => {
        if (fibBtn.value) fibBtn.value.onClick = stopAnimation;

        const fibs = fibonacci(19);
        rectangles.value = fibs.map((rect) => ({
          x: rect.x,
          y: rect.y,
          size: rect.size,
          color: `hsl(${Math.random() * 360}, 60%, 60%)`,
          borderWidth: 0.5,
          borderColor: "black",
        }));
        spiralPath.value = generateSpiralPath(fibs);
        isAnimating.value = true;    
        const totalAnimationTime = rectangles.value.length * animationDelay.value + 500;
        t.value = setInterval(() => {
          isSpiralVisible.value = true;
          animateSpiral();
        }, totalAnimationTime);
        
      });
    };

    const generateSpiralPath = (fibSequence) => {
      let path = "";
      fibSequence.forEach((sqr, index) => {
        const radius = sqr.size;
        const largeArcFlag = 0;
        const sweepFlag = 1;

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
    };

    const animateSpiral = () => {
      const spiral = document.getElementById("spiral");
      const length = spiral.getTotalLength();
      spiral.style.strokeDasharray = length;
      spiral.style.strokeDashoffset = length;
      spiral.style.transition = "stroke-dashoffset 2s ease-in-out";
      spiral.style.strokeDashoffset = "0";
    };

    const stopAnimation = () =>{
      clearInterval(t.value);
      if(fibBtn.value) fibBtn.value.onClick = drawFibonacciGoldenRatio;
      isAnimating.value = false;
      isSpiralVisible.value = false;
      rectangles.value = [];
    };

    const showColors = ref(localStorage.getItem("colorMode") === "enabled");
    const toggleColors = (data) => {
      showColors.value = data;
    };

    const resetColors = () => {

    }

    onMounted(() => { 
      emit('view-loaded', { data: { includeColorSwitch: true, includeIconSwitch: false } });
      
      watch(
        () => eventStore.events["toggle-colors"],
          (newValue) => {
            if (newValue !== undefined) {
              toggleColors(newValue);
            }
        }
      );
    });


    return {
      rectangles,
      spiralPath,
      isAnimating,
      isSpiralVisible,
      animationDelay,
      showColors,
      toggleColors,
      drawFibonacciGoldenRatio,
    };
  },
};
</script>

<style scoped>
.fib-svg-container{
    width: calc(100% - 255px);
    height: calc(100% - 110px);
    position: absolute;
    top: 60px;
    left: 230px;
}
svg {
  position:relative;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: var(--tiffany-blue);
  border: 1px solid rgba(0, 0, 0, 0.467);
  border-radius: 8px;
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
    position: relative;
    top: 40px;
    left: 20px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    z-index: 100;
    height: 30px;
    background-color: #ffffffcc;
    opacity: .8;
    
}
button:hover {
  background-color: var(--hover-background);
  border: solid 2px var(--hover-text);
  box-shadow: 1px 2px 23px -3px #000000b5;
  opacity:1;
  transition: background-color 0.3s ease, border 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
}
.inline-list {
    position: fixed;
    list-style: none;
    padding: 0;
    margin: 0;
    top: 67px;
    z-index: 1000;
    left: 99px;
    font-weight: bold;
}
</style>
