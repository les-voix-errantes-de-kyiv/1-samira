import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';
import { Image } from '@react-three/drei';
import './Util';

export default function Card({ url, cardOpacity, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  // useEffect(() => {
  //   // Ajustez la visibilité lorsque la variable isVisible change
  //   if (ref.current) {
  //     ref.current.visible = cardOpacity.cardOpacity;
  //   }
  // }, [cardOpacity]);

  // useEffect(() => {
  //   if (cardOpacity.cardOpacity) {
  //     easing.damp(ref.current.material, 'opacity', 1, 0.2);
  //     console.log("op:1")
  //   } else {
  //     easing.damp(ref.current.material, 'opacity', 0, 0.2);
  //     console.log("op:0")
  //   }
  // }, [cardOpacity]);

  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  useFrame((state, delta) => {
    easing.damp2(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    //easing.damp(ref.current.material, 'radius', hovered ? 0.1 : 0, 0.2, delta);
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
  });
  
  const materialProps = {
    transparent: true,
    opacity: cardOpacity, // Adjust the opacity as needed
  };

  return (
      <Image ref={ref} url={url}  side={THREE.DoubleSide} 
      onPointerOver={pointerOver} onPointerOut={pointerOut}
      materialProps = {materialProps}{...props}>
        <bentPlaneGeometry args={[0.1, 2, 1.2, 40, 20]} />
      </Image>      
  );
}
