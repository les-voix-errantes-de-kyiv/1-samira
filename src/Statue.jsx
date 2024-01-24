import React, { useRef, useEffect, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const Statue = () => {
  const modelRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load('/src/assets/models/Test07.glb', (gltf) => {

        console.log('Model Loaded:', gltf.scene);

        gltf.scene.scale.set(.5, .5, .5);
        gltf.scene.position.set(0, 0, 0);

        console.log('Model Dimensions:', gltf.scene.scale);

      modelRef.current = gltf.scene;

    }, undefined, (error) => {
      console.error(error);
    });
  }, []); // Assurez-vous de ne charger le modèle qu'une seule fois au montage du composant

  useFrame(() => {
    // Code à exécuter à chaque frame (rafraîchissement de la scène)
    // Vous pouvez ajouter des animations ou des mises à jour ici
    //console.log(modelRef.current.position);
  });

  return (
    modelRef.current ? <primitive object={modelRef.current} /> : null
  );
};

export default Statue;
