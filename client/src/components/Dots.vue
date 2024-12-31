<template>
  <div class="dots" id="dots">
    <div class="canvas">
      <canvas ref="connectingDotsCanvas" class="connecting-dots"></canvas>
      <canvas ref="connectingDotsCanvas2" class="canvas-2"></canvas>
    </div>
    <span class="title-header"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "Dots",
  mounted() {
    const canvas1 = this.$refs.connectingDotsCanvas;
    const canvas2 = this.$refs.connectingDotsCanvas2;
    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    let width = (canvas1.width = canvas2.width = window.innerWidth);
    let height = (canvas1.height = canvas2.height = window.innerHeight);

    const dots = [];
    const colors = ["#51a2e9", "#2ecc71", "#e74c3c", "#ff4d5a"];
    //"rgb(81, 162, 233)", "rgb(81, 162, 233)", "rgb(81, 162, 233)", "rgb(81, 162, 233)", "rgb(255, 77, 90)"
    //"#51a2e9", "#ff4d5a"
    const cursorDot = { x: 0, y: 0, radius: 1, color: "#ffffff" };

    function resizeCanvas() {
      width = canvas1.width = canvas2.width = window.innerWidth;
      height = canvas1.height = canvas2.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    function createDots() {
      for (let i = 0; i < 100; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() *4  + 1,
          dx: Math.random() * 1.1 - 1,
          dy: Math.random() * 1.1 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function drawDots(ctx) {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      // Draw cursor dot
      ctx.beginPath();
      ctx.arc(cursorDot.x, cursorDot.y, cursorDot.radius, 0, Math.PI * 2);
      ctx.fillStyle = cursorDot.color;
      ctx.fill();
    }

    function updateDots() {
      for (const dot of dots) {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;
      }
    }

    function connectDots(ctx) {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = "rgba(81, 162, 233, 0.2)";
            ctx.stroke();
          }
        }

        // Connect cursor dot to others
        const dx = dots[i].x - cursorDot.x;
        const dy = dots[i].y - cursorDot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(cursorDot.x, cursorDot.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.stroke();
        }
      }
    }

    function animate() {
      drawDots(ctx1);
      drawDots(ctx2);
      updateDots();
      connectDots(ctx1);
      connectDots(ctx2);
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", (e) => {
      cursorDot.x = e.clientX;
      cursorDot.y = e.clientY;
    });

    createDots();
    animate();
  },
};
</script>

<style>

.dots {
  width: 100%;
  background: var(--primary-background);
}
.canvas{
    position: relative;
    left: 0;
    opacity: 1;
    z-index: 0;
}
.connecting-dots {
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 100vh;
    position: relative;
    z-index: 999;
    top: 0;
    user-select: none;
}

</style>
