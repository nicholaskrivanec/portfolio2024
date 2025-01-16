<template>
  <canvas ref="canvas" id="three-canvas"></canvas>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { exampleList } from '../utils/exampleMapping.js';
import { onMounted, ref, watch } from 'vue';

export default {
  name: "ThreeRenderer",
  props: {
    example: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref(null);

    const initializeScene = () => {
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
      renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight, false);
      const fov = 45;
      const aspect = canvas.value.clientWidth / canvas.value.clientHeight;
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 10, 20);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('black');

      // OrbitControls are now properly handled
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 5, 0);
      controls.update();

      // Clear existing scene objects
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Initialize the example
      const example = exampleList[props.example];
      if (example && example.init) {
        example.init(scene, camera, renderer); // Pass renderer to the example
      }

      const resizeRendererToDisplaySize = () => {
        const width = canvas.value.clientWidth;
        const height = canvas.value.clientHeight;
        const needResize = canvas.value.width !== width || canvas.value.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      };

      const render = () => {
        if (resizeRendererToDisplaySize()) {
          camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    watch(
      () => props.example,
      () => {
        initializeScene();
      }
    );

    onMounted(() => {
      initializeScene();
    });

    return {
      canvas,
    };
  },
};
</script>

<style>
#three-canvas {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
