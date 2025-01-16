import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const exampleList = {
    pointLightShadowMap: {
      name: "LightBall Shadow Map",
      title: "THREE.PointLight Shadow Map",
      init: (scene, camera, renderer, displayError) => {
        let controls, stats, pointLight, pointLight2, pointLight3;
  
        try {
          // Camera Setup
          camera.fov = 45;
          camera.aspect = window.innerWidth / (window.innerHeight-60);
          camera.near = 1;
          camera.far = 1000;
          camera.updateProjectionMatrix();
          camera.position.set(0, 10, 40);
  
          scene.add(new THREE.AmbientLight(0x111122, 3)); // Scene Setup
  
          // Function to create a point light
          function createLight(color) {
            const intensity = 200;
  
            const light = new THREE.PointLight(color, intensity, 20);
            light.castShadow = true;
            light.shadow.bias = -0.005;
  
            let geometry = new THREE.SphereGeometry(0.3, 12, 6);
            let material = new THREE.MeshBasicMaterial({ color: color });
            material.color.multiplyScalar(intensity);
            let sphere = new THREE.Mesh(geometry, material);
            light.add(sphere);
  
            const texture = new THREE.CanvasTexture(generateTexture());
            texture.magFilter = THREE.NearestFilter;
            texture.wrapT = THREE.RepeatWrapping;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.set(1, 4.5);
  
            geometry = new THREE.SphereGeometry(2, 12, 6);
            material = new THREE.MeshPhongMaterial({
              side: THREE.DoubleSide,
              alphaMap: texture,
              alphaTest: 0.5,
            });
  
            sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            light.add(sphere);
  
            return light;
          }
  
          // Generate texture
          function generateTexture() {
            const canvas = document.createElement("canvas");
            canvas.width = 2;
            canvas.height = 2;
  
            const context = canvas.getContext("2d");
            context.fillStyle = "white";
            context.fillRect(0, 1, 2, 1);
  
            return canvas;
          }
  
          // Create Lights
          pointLight = createLight(0x6e00ec);
          scene.add(pointLight);
  
          pointLight2 = createLight(0x92cfcd);
          scene.add(pointLight2);
  
          pointLight3 = createLight(0x0101ff);
          scene.add(pointLight3);
          
  
          // Add Room
          const geometry = new THREE.BoxGeometry(30, 30, 30);
          const material = new THREE.MeshPhongMaterial({
            color: 0x00c9e8,
            shininess: 10,
            specular: 0x111111,
            side: THREE.BackSide,
          });
  
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.y = 10;
          mesh.receiveShadow = true;
          scene.add(mesh);
  
          // Renderer Setup
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.BasicShadowMap;
  
          // Orbit Controls
          controls = new OrbitControls(camera, renderer.domElement);
          controls.target.set(0, 10, 0);
          controls.update();
  
          // Stats
          stats = {
            update: () => {}, // Placeholder for stats integration if required
          };
  
          // Animate function
          function animate() {
            const time = performance.now() * 0.001;
            pointLight.position.x = Math.sin(time * 0.6) * 9;
            pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
            pointLight.position.z = Math.sin(time * 0.8) * 9;
            pointLight.rotation.x = time;
            pointLight.rotation.z = time;
            const shiftedTime = time + 10000;
  
            pointLight2.position.x = Math.sin(shiftedTime * 0.6) * 9;
            pointLight2.position.y = Math.sin(shiftedTime * 0.7) * 9 + 6;
            pointLight2.position.z = Math.sin(shiftedTime * 0.8) * 9;
            pointLight2.rotation.x = shiftedTime;
            pointLight2.rotation.z = shiftedTime;
  
            const time3 = shiftedTime + 10000;
            pointLight3.position.y = Math.sin(time3 * 0.7) * 9 + 6;
  
            renderer.render(scene, camera);
            stats.update();
  
            requestAnimationFrame(animate);
          }
  
          animate();
        } catch (error) {
          // Clean up on error
          if (controls) controls.dispose();
          if (pointLight) scene.remove(pointLight);
          if (pointLight2) scene.remove(pointLight2);
          displayError(`Failed to initialize PointLight ShadowMap Example: ${error.message}`);
          console.error(error);
        }
      },
    },

    basic: {
      name: 'Basic Cube',
      init: (scene, camera, renderer, displayError) => {
        let controls, plane, cube, light, texture;
        try {
          // Orbit Controls
          controls = new OrbitControls(camera, renderer.domElement);
          controls.target.set(0, 0, 0);
          controls.update();

          // Plane
          const planeSize = 40;
          const loader = new THREE.TextureLoader();

          // Use onError to handle texture loading failures
          texture = loader.load(
            'https://threejs.org/manual/examples/resources/images/checker.png',
            undefined,
            undefined,
            (error) => {
              throw new Error('Texture loading failed');
            }
          );

          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.magFilter = THREE.NearestFilter;
          const repeats = planeSize / 2;
          texture.repeat.set(repeats, repeats);

          const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
          const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });
          plane = new THREE.Mesh(planeGeo, planeMat);
          plane.rotation.x = Math.PI * -0.5;
          scene.add(plane);

          // Cube
          const cubeGeo = new THREE.BoxGeometry(4, 4, 4);
          const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
          cube = new THREE.Mesh(cubeGeo, cubeMat);
          cube.position.set(5, 2, 0);
          scene.add(cube);

          // Light
          light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(10, 10, 10);
          scene.add(light);
        } catch (error) {
          // Clean up on error
          if (controls) controls.dispose();
          if (plane) scene.remove(plane);
          if (cube) scene.remove(cube);
          if (light) scene.remove(light);
          if (texture) texture.dispose();
          displayError('Failed to initialize the Basic Example: ' + error.message);
          console.error(error);
        }
      },
    },
};

