<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  props: {},
  emits: ["view-loaded"],
  setup(_, { emit }) {
    const canvasContainer = ref(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    let model = null;
    let animationFrame = null;

    const initScene = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (canvasContainer.value) {
        canvasContainer.value.appendChild(renderer.domElement);
      }

      // Add light to the scene
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 1).normalize();
      scene.add(light);

      // Load the GLB model
      const loader = new GLTFLoader();

      loader.load(
        "cat.glb",
        (gltf) => {
          model = gltf.scene;
          scene.add(model);
          animate();
        },
        undefined,
        (error) => {
          console.error("Error loading model:", error);
        }
      );
    };

    const onScroll = () => {
      const scrollY = window.scrollY;

      // Map scroll position to 3D model transformations
      if (model) {
        model.rotation.y = scrollY * 0.01; // Rotate based on scroll
        model.position.y = -scrollY * 0.005; // Move vertically based on scroll
      }
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    onMounted(() => {
      initScene();
      window.addEventListener("scroll", onScroll);
      emit("view-loaded");
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrame);
    });

    return {
      canvasContainer,
    };
  },
};
</script>

<style>
.canvas-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
