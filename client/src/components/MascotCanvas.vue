<template>
    <three-canvas :antialias="true" @mousemove="onMouseMove" ref="canvas">
      <!-- Add a perspective camera -->
      <three-perspective-camera :position="{ z: 5 }" />
  
      <!-- Add lights -->
      <three-ambient-light :intensity="0.8" />
      <three-directional-light :position="{ x: 0, y: 5, z: 5 }" :intensity="0.5" />
  
      <!-- The mascot mesh -->
      <three-mesh :position="mascotPosition" ref="mascot">
        <!-- Add geometry and material for the mascot -->
        <three-box-geometry :args="[1, 1, 1]" /> <!-- Replace this with actual mascot geometry -->
        <three-mesh-standard-material :color="'#44a'" />
      </three-mesh>
    </three-canvas>
  </template>
  
  <script>
  import { reactive, ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const mascotPosition = reactive({ x: 0, y: 0, z: 0 });
  
      // Function to handle mouse movements
      const onMouseMove = (event) => {
        const { innerWidth: width, innerHeight: height } = window;
  
        // Normalize mouse coordinates to [-1, 1]
        const mouseX = (event.clientX / width) * 2 - 1;
        const mouseY = -(event.clientY / height) * 2 + 1;
  
        // Update mascot position (adjust scaling for effect)
        mascotPosition.x = mouseX * 2;
        mascotPosition.y = mouseY * 2;
      };
  
      return {
        mascotPosition,
        onMouseMove,
      };
    },
  };
  </script>
  
  <style>
  /* Style for the canvas container */
  three-canvas {
    width: 100%;
    height: 100vh;
    display: block;
  }
  </style>
  