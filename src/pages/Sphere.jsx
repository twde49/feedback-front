import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Charger une vidéo comme texture
const video = document.createElement('video');
video.src = './public/video.mp4'; // Remplace par le chemin de ta vidéo
video.loop = true; // Faire en sorte que la vidéo boucle
video.muted = true; // Mute la vidéo
video.play(); // Démarre la vidéo

const videoTexture = new THREE.VideoTexture(video); // Convertir la vidéo en texture
videoTexture.minFilter = THREE.LinearFilter; // Ajustement des filtres
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// Création d'une sphère avec la vidéo appliquée comme texture
const sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture, // Appliquer la vidéo comme texture
  side: THREE.BackSide, // Permet de voir l'intérieur de la sphère
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Cube au centre de la scène
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Créer des objets parents pour la caméra
const cameraGroup = new THREE.Group(); // Gère les rotations gauche/droite
const verticalGroup = new THREE.Group(); // Gère les rotations haut/bas
verticalGroup.add(camera);
cameraGroup.add(verticalGroup);
scene.add(cameraGroup);

camera.position.z = 5;

// Variables pour contrôler les mouvements de la caméra
let rotationX = 0; // Rotation haut/bas
let rotationY = 0; // Rotation gauche/droite
const rotationSpeed = 0.02; // Vitesse de rotation

// Écouteur pour capturer les mouvements de souris
window.addEventListener('mousemove', (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normaliser entre -1 et 1
  const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

  rotationY = -mouseX * Math.PI; // Gauche/droite inversé
  rotationX = -mouseY * Math.PI * 0.5; // Haut/bas reste le même
});

// Fonction d'animation
function animate() {
  // Appliquer les rotations au groupe
  cameraGroup.rotation.y = rotationY; // Gauche/droite
  verticalGroup.rotation.x = rotationX; // Haut/bas

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

export default animate;
