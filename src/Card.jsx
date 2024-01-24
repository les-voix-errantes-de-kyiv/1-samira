import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';
import { Image } from '@react-three/drei';
import './Util';

export default function Card({ url, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
  });
  
  const materialProps = {
    transparent: true,
    opacity: 1, // Adjust the opacity as needed
  };



  return (
      <Image ref={ref} url={url}  side={THREE.DoubleSide} 
      onPointerOver={pointerOver} onPointerOut={pointerOut}
      materialProps = {materialProps}{...props}>
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>      
  );
}
