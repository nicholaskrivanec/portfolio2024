<template>
  <div class="dots" id="dots">
    <div class="canvas">
      <canvas ref="canvas1" class="canvas-1"></canvas>
      <canvas ref="canvas2" class="canvas-2"></canvas>
    </div>
    <span class="title-header"><slot>{{ title }}</slot></span>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, h } from 'vue';
export default {
  name: "Dots",
  props: {
    title: { type: String, required: false }
  },
  setup(props) {
    const colors = ["#51a2e9", "#2ecc71", "#e74c3c", "#ff4d5a"];
    const canvas1 = ref(null);
    const canvas2 = ref(null);
    const ctx1 = ref(null);
    const ctx2 = ref(null);
    const width = computed(() => window.innerWidth - 15);
    const height = computed(() => window.innerHeight);
    const title = ref(props.title);
    const dots = ref([]);
    const isLeftMouseDown = ref(false);
    const isRightMouseDown = ref(false);
    const speedLimit = ref(1); // Default speed limit
    const level = ref(0);
    const physics = { 
      mass: [100, 200, 400]
      ,speed: [1, 5, 25]
      ,gravity: [1, 8, 64]
      ,radius: [200, 300, 450]
    };

    const cursorDot = ref({ 
      x: 0
      ,y: 0
      ,radius: 4
      ,color: "#ffffff"
      ,lineColor: "rgba(255, 255, 255, 0.4)"
      ,visible: false
    });

    const getDistance = (x1, y1, x2, y2) =>{
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    const resizeCanvas = () => {
      const w = window.innerWidth - 15;
      const h = window.innerHeight;

      if (canvas1.value && canvas2.value) {
        canvas1.value.width = canvas2.value.width = w;
        canvas1.value.height = canvas2.value.height = h; 
      }

      const expectedDots = Math.floor((w/125) * (h/125));
      const currentCount = dots.value.length;

      if (currentCount < expectedDots) {
        dots.value.forEach(dot => {
          dot.x = Math.random() * w;
          dot.y = Math.random() * h;
        });

        for (let i = currentCount; i < expectedDots; i++) {
          const r = Math.random() * 2 + 1; // Random radius
          const angle = Math.random() * 2 * Math.PI; // Random angle in radians
          const speed = Math.random() * physics.speed[level.value]; // Random speed up to speedLimit

          // Random velocities based on angle and speed
          const dx = speed * Math.cos(angle);
          const dy = speed * Math.sin(angle);

          dots.value.push({
            x: Math.random() * w, // Random initial x position
            y: Math.random() * h, // Random initial y position
            radius: r,
            dx, 
            dy, 
            color: colors[Math.floor(Math.random() * colors.length)], // Random color
            lineColor: "#ffffff",
            mass: r * 2,
            line: 150,
            visible: true,
          });
        }
       }else if (currentCount > expectedDots) {
         dots.value.splice(expectedDots);
         dots.value.forEach(dot => {
          dot.x = Math.random() * w;
          dot.y = Math.random() * h;
        });
       }

      speedLimit.value = (w > h) ? h / w : w / h;
    };

    const drawDots = (ctx) => {
      ctx.clearRect(0, 0, width.value, height.value);
      for (const dot of dots.value) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      // Draw cursor dot
      if (cursorDot.value.visible) {
        ctx.beginPath();
        ctx.arc(cursorDot.value.x, cursorDot.value.y, cursorDot.value.radius, 0, Math.PI * 2);
        ctx.fillStyle = cursorDot.value.color;
        ctx.fill();
      }
    };

    const updateDots = () => {
      for (const dot of dots.value) {
        // Gravitate toward cursor if mouse is down
        const d = getDistance(cursorDot.value.x, cursorDot.value.y, dot.x, dot.y);

        if (d > 1 && cursorDot.value.visible && (isRightMouseDown.value || isLeftMouseDown.value) ) {
          const fg = ((dot.mass * physics.mass[level.value]) / (d * d)) * physics.gravity[level.value];
          dot.dx += (cursorDot.value.x < dot.x) ? -fg : fg;
          dot.dy += (cursorDot.value.y < dot.y) ? -fg : fg;
          dot.randomized = false; // Reset flag since mouse is down
        }

        // When mouse is released, assign random directions and speeds only once
        if (!isRightMouseDown.value && !isLeftMouseDown.value && !dot.randomized && d <= 10) {
          dot.randomized = true; // Mark as randomized
          const angle = Math.random() * 2 * Math.PI; // Random angle
          const speed = Math.random() * speedLimit.value; // Random speed
          dot.dx = speed * Math.cos(angle); // Random x velocity
          dot.dy = speed * Math.sin(angle); // Random y velocity
        }

        // Limit speed
        const speed = Math.sqrt(dot.dx * dot.dx + dot.dy * dot.dy);
        if (speed > physics.speed[level.value]) {
          dot.dx = (dot.dx / speed) * physics.speed[level.value];
          dot.dy = (dot.dy / speed) * physics.speed[level.value];
        }

        // Move dots at their velocity
        dot.x += dot.dx;
        dot.y += dot.dy;

        // Bounce off walls
        const w = window.innerWidth - 15;
        const h = window.innerHeight;

        if (dot.x < 0 || dot.x > w) dot.dx *= -1;
        if (dot.y < 0 || dot.y > h) dot.dy *= -1;
      }
    };


    const connectDots = (ctx) => {
      for (let i = 0; i < dots.value.length; i++) {
        for (let j = i + 1; j < dots.value.length; j++) {
          const dx = dots.value[i].x - dots.value[j].x;
          const dy = dots.value[i].y - dots.value[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(dots.value[i].x, dots.value[i].y);
            ctx.lineTo(dots.value[j].x, dots.value[j].y);
            ctx.strokeStyle = "rgba(81, 162, 233, 0.2)";
            ctx.stroke();
          }
        }

        // Connect cursor dot to others
        if (cursorDot.value.visible){
          const dx = dots.value[i].x - cursorDot.value.x;
          const dy = dots.value[i].y - cursorDot.value.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < physics.radius[level.value]){
            ctx.beginPath();
            ctx.moveTo(dots.value[i].x, dots.value[i].y);
            ctx.lineTo(cursorDot.value.x, cursorDot.value.y);
            ctx.strokeStyle = "rgba(81, 162, 233, 0.6)";
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx1.value = canvas1.value?.getContext("2d");
      ctx2.value = canvas2.value?.getContext("2d");
      
      if (ctx1.value && ctx2.value) {
        drawDots(ctx1.value);
        drawDots(ctx2.value);
        updateDots();
        connectDots(ctx1.value);
        connectDots(ctx2.value);
      }
      requestAnimationFrame(render);
    };

    const onMouseDown = (e) => {
      if (e.button === 0) isLeftMouseDown.value = true;
      else if (e.button === 2) isRightMouseDown.value = true;
      else return;

      if(level.value <=2) level.value++;
    };

    const onMouseUp = (e) => {
      if (e.button === 0 && isLeftMouseDown.value) isLeftMouseDown.value = false;
      else if (e.button === 2 && isRightMouseDown.value) isRightMouseDown.value = false;
      else return;

      if (level.value > 0) level.value--;
    };

    const onMouseMove = (e) => {
      cursorDot.value.x = e.offsetX;
      cursorDot.value.y = e.offsetY;
      cursorDot.value.visible = true;
    };

    const onMouseLeave = () => {
      isLeftMouseDown.value = false;
      isRightMouseDown.value = false;
      cursorDot.value.visible = false; // Hide the cursor dot when the mouse leaves the canvas 
      level.value = 0;
    };
    
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const contextMenu = (e) => {
      e.preventDefault();
    };

    onMounted(() => {
      resizeCanvas();

      if (canvas1.value) {
        canvas1.value.addEventListener("pointermove", onMouseMove);
        canvas1.value.addEventListener("mouseleave", onMouseLeave);
        canvas1.value.addEventListener("mousedown", onMouseDown);
        canvas1.value.addEventListener("mouseup", onMouseUp);
        canvas1.value.addEventListener('contextmenu', contextMenu, {passive: false});
        canvas1.value.addEventListener('wheel', preventZoom, {passive: false});
      } if (canvas2.value) {
        canvas2.value.addEventListener("pointermove", onMouseMove);
        canvas2.value.addEventListener("mouseleave", onMouseLeave);
        canvas2.value.addEventListener("mousedown", onMouseDown);
        canvas2.value.addEventListener("mouseup", onMouseUp);
        canvas2.value.addEventListener('contextmenu', contextMenu, {passive: false});
        canvas2.value.addEventListener('contextmenu', preventZoom, {passive: false});
      }
      window.addEventListener("resize", resizeCanvas); 
      render();
    });

    onBeforeUnmount(() => {
      if (canvas1.value) {
        canvas1.value.removeEventListener("mousemove", onMouseMove);
        canvas1.value.removeEventListener("mouseleave", onMouseLeave);
        canvas1.value.removeEventListener("mousedown", onMouseDown);
        canvas1.value.removeEventListener("mouseup", onMouseUp);
        canvas1.value.removeEventListener('contextmenu', contextMenu);
        canvas1.value.removeEventListener('wheel', preventZoom);
      }
      if (canvas2.value){
        canvas2.value.removeEventListener("mousemove", onMouseMove);
        canvas2.value.removeEventListener("mouseleave", onMouseLeave);
        canvas2.value.removeEventListener("mousedown", onMouseDown);
        canvas2.value.removeEventListener("mouseup", onMouseUp);
        canvas2.value.removeEventListener('contextmenu', contextMenu);
        canvas2.value.removeEventListener('wheel', preventZoom);
      }
      window.removeEventListener("resize", resizeCanvas);
    });

    return {
      canvas1,
      canvas2,
      title
    };
  }
}
</script>

<style>

.dots {
  width: 100%;
  background: #020f19;
}
.canvas{
    position: relative;
    left: 0;
    opacity: 1;
    z-index: 0;
}
.canvas-1{
  display: block;
  position:absolute;
  width:100%;
}
.canvas-2 {
  display: block;
  position:fixed;
  position:absolute;
  width:100%;
}
.title-header {
    font-size: 30px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    position: relative;
    top: 0;
    user-select: none;
    align-self: center;
    justify-self: center;
    display: flex;
    line-height: normal;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
    z-index: 999;
    row-gap:20px;
    pointer-events: none;
    color: var(--tiffany-blue);
}
</style>