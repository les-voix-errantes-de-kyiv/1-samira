import React, { useRef, useEffect, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const Statue = () => {
  const modelRef = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load('/src/assets/models/Test07.glb', (gltf) => {

        console.log('Model Loaded:', gltf.scene);

        gltf.scene.scale.set(.8, .8, .8);
        gltf.scene.position.set(0, 0, 0);

        console.log('Model Dimensions:', gltf.scene.scale);
        console.log('Model Position:', gltf.scene.position);

        modelRef.current = gltf.scene;
        setModelLoaded(true);
        console.log('Finsh load:', gltf.scene.position);

    }, undefined, (error) => {
      console.error(error);
    });
  }, []); // Assurez-vous de ne charger le modèle qu'une seule fois au montage du composant

  useFrame(() => {
    // Code à exécuter à chaque frame (rafraîchissement de la scène)
    // Vous pouvez ajouter des animations ou des mises à jour ici
    // console.log(modelRef.current.position);
  });

  return (
    modelLoaded ? <primitive object={modelRef.current} /> : null
  );
};

export default Statue;
