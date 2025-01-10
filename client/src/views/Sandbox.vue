<template>
  <div class="fib-svg-container">
    <svg
      ref="recs"
      class="card2"
      xmlns="http://www.w3.org/2000/svg" 
    >
      <rect 
        v-for="(rect, index) in rectangles" 
        :key="'rect-' + index" 
        :x="rect.x" 
        :y="rect.y" 
        :width="rect.size" 
        :height="rect.size" 
        :fill="rect.color" 
        :stroke="rect.borderColor" 
        :stroke-width="rect.borderWidth"
        :class="{ animated: isAnimating }" 
        :style="{ animationDelay: `${index * animationDelay}ms` }">
      </rect>
      <text 
        v-for="(rect, index) in visibleRectangles" 
        :key="'text-' + index"
        :x="rect.x + rect.size / 2" 
        :y="rect.y + rect.size / 2" 
        :fill="textColor" 
        :text-anchor="'middle'" 
        :dominant-baseline="'middle'" 
        :font-size="rect.size > 20 ? '12px' : '8px'">
        {{ rect.size }}
      </text>
      <path 
        v-if="spiralPath" 
        id="spiral" 
        :d="spiralPath" 
        fill="none" 
        stroke="black" 
        stroke-width="2"
        :style="{ visibility: isSpiralVisible ? 'visible' : 'hidden' }" 
        stroke-dasharray="0" 
        stroke-dashoffset="0" />
    </svg>
  </div>
</template>


<script>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import { useEventStore } from "@/stores/eventStore";

export default {
  name: "Sandbox",
  setup(_, { emit }) {
    const eventStore = useEventStore();
    const rectangles = ref([]);
    const spiralPath = ref("");
    const visibleRectangles = computed(() => rectangles.value.filter(rect => rect.textVisible));
    const isSpiralVisible = ref(false);
    const animationDelay = ref(100);
    const fibBtn = ref(null);
    const recs = ref(null);
    const isAnimating = ref(false);


    const fibonacci = (n) => {
      let [size, x, y] = [1, (recs.value) ? recs.Width : (window.innerWidth - 100) * 0.3333
        , (recs.value) ? recs.Height : (window.innerHeight - 100) * 0.6666];

      let fibs = [{ id: 0, size, x, y, cx: x + size / 2, cy: y + size / 2 }];

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
        fibs.push({ id: i, size, x, y, cx: x + size / 2, cy: y + size / 2 });
        size += fibs[i - 1].size;
      }

      return fibs;
    };


    const t = ref(null);

    const drawFibonacciGoldenRatio = () => {
      isAnimating.value = false;
      isSpiralVisible.value = false;
      const colors = ['#B1D4E0', '#2E8BC0', '#0C2D48', '#145DA0', '#CFEAF3'];

      rectangles.value = [];

      nextTick(() => {
        const fibs = fibonacci(19);
        rectangles.value = fibs.map((rect, index) => ({
          x: rect.x,
          y: rect.y,
          size: rect.size,
          color: colors[rect.id % 5],
          borderWidth: 0.5,
          borderColor: "black",
          textVisible: false, // Initially hidden
        }));

        // Show text after animation
        rectangles.value.forEach((rect, index) => {
          setTimeout(() => {
            rect.textVisible = true;
          }, index * animationDelay.value + 500); // Add delay for visibility
        });

        spiralPath.value = generateSpiralPath(fibs);
        isAnimating.value = true;

        const totalAnimationTime = rectangles.value.length * animationDelay.value;
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
      const length = (spiral && spiral.getTotalLength) ? spiral.getTotalLength() : 0;
      if (spiral && length > 0) {
        spiral.style.strokeDasharray = length;
        spiral.style.strokeDashoffset = length;
        spiral.style.transition = "stroke-dashoffset 2s ease-in-out";
        spiral.style.strokeDashoffset = "0";
      }
    };

    const stopAnimation = () => {
      clearInterval(t.value);
      if (fibBtn.value) fibBtn.value.onClick = drawFibonacciGoldenRatio;
      isAnimating.value = false;
      isSpiralVisible.value = false;
      rectangles.value = [];
    };

    const onResize = () => {
      stopAnimation();
      drawFibonacciGoldenRatio();
    };

    onMounted(() => {
      emit('view-loaded');
      drawFibonacciGoldenRatio();

      window.addEventListener('resize', onResize);
      watch(
        () => eventStore.events["toggle-colors"],
        (newValue) => {
          if (newValue !== undefined) {
            toggleColors(newValue);
          }
        }
      );
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    return {
      rectangles,
      spiralPath,
      isAnimating,
      isSpiralVisible,
      animationDelay,
      drawFibonacciGoldenRatio,
      visibleRectangles
    };
  },
};
</script>

<style scoped>
.fib-svg-container {
  width: 100vw;
  height: calc(100vh - 60px);
  touch-action: pan-x pan-y; /* Allow only panning but no pinch zoom */
}

svg {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
</style>
