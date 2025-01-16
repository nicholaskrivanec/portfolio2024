<template>
  <div class="controls">
    <div class="control">
      <label for="fov">fov:</label>
      <input id="fov" type="range" min="0" max="100" v-model="fov" />
      <span class="cntrl-val">{{ fov }}</span>
    </div>
    <div class="control">
      <label for="near">near:</label>
      <span class="cntrl-val">{{ near }}</span>
      <input id="near" type="range" min="0" max="1" step="0.01" v-model="near" />
    </div>
    <div class="control">
      <label for="far">far:</label>
      <span class="cntrl-val">{{ far }}</span>
      <input id="far" type="range" min="0" max="100" v-model="far" />
    </div>
    <div class="control">
      <label for="z">z:</label>
      <span class="cntrl-val">{{ z }}</span>
      <input id="z" type="range" min="0" max="100" v-model="z" />
    </div>
    <div class="control">
      <label for="lightcolor">light color:</label>
      <span class="cntrl-val">{{ lightColor }}</span>
      <input id="lightcolor" type="color" v-model="lightColor" />
    </div>
    <div class="control">
      <label for="file">file:</label>
      <input id="file" type="text" v-model="file" />
    </div>
  </div>

  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  name: "CatWalk",
  props: {},
  emits: ["view-loaded"],
  setup(_, { emit }) {
    const canvasContainer = ref(null);

    const _def_cam = {
      fov: 45,
      near: 0.1,
      far: 100,
      z: 5
    }

    const cam = ref({ ..._def_cam });

    const fov = ref(45);
    const near = ref(0.1);
    const far = ref(100);
    const z = ref(5);
    const file = ref("cat.glb");
    const lightColor = ref("#ffffff");

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 10, 20);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const light = new THREE.DirectionalLight(0xffffff, 1);

    let model = null;
    let animationFrame = null;

    const initScene = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.position.z = z.value;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      if (canvasContainer.value) {
        canvasContainer.value.appendChild(renderer.domElement);
      }

      light.position.set(0, 1, 1).normalize();
      light.color.set(lightColor.value);
      scene.add(light);

      const loader = new GLTFLoader();
      loader.load(
        file.value,
        (gltf) => {
          model = gltf.scene;
          scene.add(model);
          animate();
        },
        undefined,
        (error) => {
          console.error(`Error loading model: ${file.value}`, error);
        }
      );
    };

    const onScroll = () => {
      if (model) {
        model.rotation.y += 0.01;
        model.position.y -= 0.01;
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    onMounted(() => {
      emit("view-loaded");
      initScene();
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onResize);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrame);
    });

    watch([fov, near, far, z], () => {
      camera.fov = fov.value;
      camera.near = near.value;
      camera.far = far.value;
      camera.position.z = z.value;
      camera.updateProjectionMatrix();
    });

    watch(lightColor, (newColor) => {
      light.color.set(newColor);
    });

    return {
      canvasContainer,
      fov,
      near,
      far,
      z,
      file,
      lightColor,
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
.controls {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 8px;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  row-gap: 1px;
  background-color: #00000000;
}
.control label{
  width: 100px;
  color: #ffffff;
}
input[type=range] {
    appearance: none;
    -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
    background: var(--tiffany-blue);
    border-radius: 20px;
    height: 4px;
}
input[type=range]:hover::-webkit-slider-runnable-track {
    background: var(--tiffany-blue);
    outline-color:var(--deep-dark-blue);
    outline-width:0.72px;
    outline-style:groove;
}
input[type=range]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    height: 8px;
    width: 2px;
    border-radius: 2px;
    background: var(--foam-teal);
}
input[type=range]:hover::-webkit-slider-thumb {
    background: var(--foam-mint);
    outline-color:var(--deep-dark-blue);
    outline-width:0.72px;
    outline-style:groove;
}
</style>
