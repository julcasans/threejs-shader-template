import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

import GUI from 'lil-gui';
const gui = new GUI();

const canvas = document.querySelector('canvas.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, canvas);
orbit.enableDamping = true;

// Camera positioning
// camera.position.set(6, 8, 14);
camera.position.set(0.25, -0.25, 1);
orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const clock = new THREE.Clock();

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  //transparent: true,
  uniforms: {
    u_time: { value: 0 },
  },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Update material
  material.uniforms.u_time.value = elapsedTime;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
