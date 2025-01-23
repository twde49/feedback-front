import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Sphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialiser la scène
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Charger une vidéo comme texture
    const video = document.createElement("video");
    video.src = "./public/video.mp4"; // Remplace par le chemin de ta vidéo
    video.loop = true;
    video.muted = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // Création d'une sphère avec la vidéo appliquée comme texture
    const sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Cube au centre de la scène
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Créer des groupes de caméra
    const cameraGroup = new THREE.Group();
    const verticalGroup = new THREE.Group();
    verticalGroup.add(camera);
    cameraGroup.add(verticalGroup);
    scene.add(cameraGroup);

    camera.position.z = 5;

    let rotationX = 0;
    let rotationY = 0;
    const rotationSpeed = 0.02;

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

      rotationY = -mouseX * Math.PI;
      rotationX = -mouseY * Math.PI * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Fonction d'animation
    const animate = () => {
      cameraGroup.rotation.y = rotationY;
      verticalGroup.rotation.x = rotationX;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Nettoyer lors du démontage du composant
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default Sphere;
