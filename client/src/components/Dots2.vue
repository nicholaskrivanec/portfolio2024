<template>
  <div class="dots" id="dots">
    <div class="canvas">
      <div class="physics">
        <div>m = {{ physics.m }}</div>
        <div>v = {{ physics.v }}</div>
        <div>g = {{ physics.g }}</div>
        <div>r = {{ physics.r }}</div>
        <div>n = {{ nodes }}</div>
      </div>
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
    <span class="title-header"><slot>{{ title }}</slot></span>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

export default {
  name: "Dots",
  setup() {
    const colors = ["#51a2e9", "#2ecc71", "#e74c3c", "#ff4d5a"];
    const canvas = ref(null);
    const ctx = ref(null);
    const dots = ref([]);
    const touches = ref(0);
    const boost = ref(0);
    const nodes = ref(0);

    const _physics = {
      m: 100,     //mass
      v: 1,       //velocity
      g: 2,       //force of gravity
      r: 200,     //connection radius or distance between dots
    }
    const multipliers = {
      m: 2, 
      v: 3, 
      g: 8, 
      r: 2
    }
    const physics = ref({..._physics});

    const c = ref({ 
      x: 0,
      y: 0,
      r: 6,
      m: 100,
      color: "#ffffff",
      lineColor: "rgba(255, 255, 255, 0.4)",
      visible: false,
      consumed: 0
    });


    // methods
    const resizeCanvas = () => {
      const w = window.innerWidth - 15;
      const h = window.innerHeight; 

      canvas.value.width = w;
      canvas.value.height = h;

      const td = Math.floor((w / 125) * (h / 125));
      const expected = (td > 200) ? 200 : (td < 50) ? 50 : td;

      if (nodes.value < expected) {
        dots.value.forEach(dot => {
          dot.x = Math.random() * w;
          dot.y = Math.random() * h;
        });

        for (let i = nodes.value; i < expected; i++) {
          const r = Math.random() * 4 + 1; // Random radius
          const angle = Math.random() * 2 * Math.PI; // Random angle in radians
          const speed = Math.random() * _physics.v; // Random speed up to base velocity

          const dx = speed * Math.cos(angle);
          const dy = speed * Math.sin(angle);

          dots.value.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r,
            dx, 
            dy, 
            color: colors[Math.floor(Math.random() * colors.length)],
            lineColor: "#ffffff",
            m: r * 2,
            line: 150,
            visible: true,
            randomized: true
          });
        }
      } else if (nodes.value > expected) {
        dots.value.splice(expected);
        dots.value.forEach(dot => {
          dot.x = Math.random() * w;
          dot.y = Math.random() * h;
        });
      }
      nodes.value = dots.value.length;
    };

    const drawDots = (ctx) => {
      ctx.clearRect(0, 0, window.innerWidth - 15, window.innerHeight);
      for (const d of dots.value) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
      }

      if (c.value.visible) {
        ctx.beginPath();
        ctx.arc(c.value.x, c.value.y, c.value.r, 0, Math.PI * 2);
        ctx.fillStyle = c.value.color;
        ctx.fill();
      }
    };

    const updatePhysics = () => {
      if (touches.value === boost.value) return false;

      if (!c.value.visible && boost.value !== 0) {
        resetPhysics();
        return true;
      }

      boost.value = touches.value;
      physics.value = {
        m: _physics.m * Math.pow(multipliers.m, boost.value),
        v: _physics.v * Math.pow(multipliers.v, boost.value),
        g: _physics.g * Math.pow(multipliers.g, boost.value),
        r: _physics.r * Math.pow(multipliers.r, boost.value)
      };

      return true;
    };

    const resetPhysics = () => {
      touches.value = 0;
      boost.value = 0;
      physics.value = { ..._physics };
    };
    
    const disperse = (dot) => {
      //if (c.value.consumed <= 0) return;
      //if (c.value.r <= 12) return; // Prevent invalid radius

      const angle = Math.random() * 2 * Math.PI; // Random direction
      const speed = typeof physics.value.v === 'number' ? Math.random() * physics.value.v : 1; // Validate speed
      
      // Assign velocities
      dot.dx = speed * Math.cos(angle);
      dot.dy = speed * Math.sin(angle);
      dot.randomized = true;
      // const radiusPortion = c.value.consumed > 0 ? (c.value.r - 12) / c.value.consumed : 0; // Avoid division by zero


      // Reduce cursor's radius and update dot radius
      // c.value.r -= radiusPortion; 
      // dot.r += radiusPortion;

      // Mark dot as dispersed
      //c.value.consumed--;

      // console.log( `Dot ${dot.r} dispersed from cursor ${c.value.r} with speed ${speed} and angle ${angle}
      //   ${dot.dx} ${dot.dy}
      //   ${dot.r} ${c.value.r} ${c.value.consumed}
      // `);
    };


    const gravitate = (dot) => {
      const r = Math.hypot(c.value.x - dot.x, c.value.y - dot.y);
      if (r < 1) return;
      const maxForce = 10; // Adjust as necessary
      const fg = Math.min(((dot.m * c.value.m) / (r * r)) * physics.value.g, maxForce) || 1;
      dot.dx += (c.value.x < dot.x) ? -fg : fg || 1;
      dot.dy += (c.value.y < dot.y) ? -fg : fg || 1;

      //cap speed at max velocity
      const speed = Math.sqrt( (dot.dx * dot.dx) + (dot.dy * dot.dy) );
      if (speed > physics.value.v && speed > 0) {
        dot.dx = (dot.dx / speed) * physics.value.v;
        dot.dy = (dot.dy / speed) * physics.value.v;
      }
    };

    const handleCollisions = (d) => {
      // Wall collisions
      const w = window.innerWidth - 15;
      const h = window.innerHeight;
      if (d.x < 0 || d.x > w) d.dx *= -1;
      if (d.y < 0 || d.y > h) d.dy *= -1;
      
      // Cursor collisions
      // const cursorX = c.value.x || 0;
      // const cursorY = c.value.y || 0;
      
      // const distance = Math.hypot(cursorX - d.x, cursorY - d.y);
      // if (distance < d.r + c.value.r && boost.value > 0 && !d.consumed) {
      //   const overlap = (d.r + c.value.r) - distance;
      //   d.r = Math.max(0, d.r - overlap); // Ensure radius doesn't go negative
      //   c.value.r += overlap;

      //   if (d.r <= 0) {
      //     d.consumed = true;
      //     c.value.consumed++;
      //   }
      // }
    };



    const move = (dot) => {
      dot.x += dot.dx;
      dot.y += dot.dy;
    };

    const updateDots = (ctx) => {
      updatePhysics();

      for (const d of dots.value) {
        if (boost.value >= 1 && c.value.visible && d.randomized) 
          gravitate(d, c.value);
        else if (boost.value === 0 && !d.randomized) 
          disperse(d); 

        move(d);
        handleCollisions(d, c.value);
        connectDots(d, ctx);
      }
    };

    const connectDots = (dot, ctx) => {
      if (dot.r <= 0 || !ctx) return;

      for (const d of dots.value) {
        if (d.r <= 0) continue;
        const distance = Math.hypot(d.x - dot.x, d.y - dot.y);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(d.x, d.y);
          ctx.strokeStyle = "rgba(81, 162, 233, 0.2)";
          ctx.stroke();
        }
      }
      if (c.value.visible) {
          const dist = Math.hypot(c.value.x - dot.x, c.value.y - dot.y);
          if ( dist <= physics.value.r) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(c.value.x, c.value.y);
            ctx.strokeStyle = "rgba(81, 162, 233, 0.6)";
            ctx.stroke();
          }
        }
    };

    const render = () => {
      if (canvas.value){
        ctx.value = canvas.value.getContext("2d");
      
        if (ctx.value) {
          drawDots(ctx.value);
          updateDots(ctx.value);
        }
        requestAnimationFrame(render);
      }
    };



    // Event Handler Methods
    const onPointerDown = () => {
      touches.value++;
    };

    const onPointerMove = (e) => {
      c.value.x = e.offsetX;
      c.value.y = e.offsetY;
      c.value.visible = true;
    };

    const onPointerUp = () => {
      touches.value = Math.max(0, touches.value - 1); // Decrement touches safely
      if (touches.value === 0) {
        resetPhysics();
      }
    };

    const onPointerCancel = () => {
      touches.value = 0;
      c.value.visible = false; // Hide the cursor dot when the mouse leaves the canvas 
    }

    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Prevent zooming
      }
    };

    const contextMenu = (e) => {
      e.preventDefault(); // Prevent right-click context menu
    };

    const canvasEvents = [
      { event: "pointermove", handler: onPointerMove},
      { event: "pointerdown", handler: onPointerDown, options: {passive:true} },
      { event: "pointerup", handler: onPointerUp, options: {passive:true} },
      { event: "pointercancel", handler: onPointerCancel, options: {passive:true}},
      { event: "wheel", handler: preventZoom, options: {passive:false} },
      { event: "contextmenu", handler: contextMenu, options: {passive:false} }
    ];



    onMounted(() => {
      if (canvas.value) {
        resizeCanvas();
        canvasEvents.forEach(({ event, handler, options }) => {
          canvas.value.addEventListener(event, handler, options || false);
        });
        window.addEventListener("resize", resizeCanvas);
        render();
      }
      else console.error('Canvas elements are not initialized.');

    });

    onBeforeUnmount(() => {
      if (canvas.value) {
        canvasEvents.forEach(({ event, handler }) => {
          canvas.value.removeEventListener(event, handler);
        });
      
        window.removeEventListener("resize", resizeCanvas);
      }
    });

    return {
      canvas,
      physics,
      nodes,
    };
  }
}
</script>


<style>

.dots {
  width: 100%;
  background: #020f19;
  position:relative;
}
canvas {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
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

.physics{
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  z-index: 999;
  flex-direction: column;
}
.physics div {
  color: #ffffff;
  font-size: 12px;
  margin: 2px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>