
import * as THREE from 'three'
import './App.css';
import Spiral from './Spiral.jsx';
import Statue from './Statue';
import React, { useEffect, useState } from 'react';
import { Canvas, useFrame , useThree} from '@react-three/fiber'

import Card from './Card.jsx';
import { Image, Environment, ScrollControls, useScroll, useTexture, OrbitControls } from '@react-three/drei';
import { easing , geometry} from 'maath'

function App() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
    };

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 40], fov: 15 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} decay={0} intensity={2} />
        <pointLight position={[-10, -10, -10]} decay={1} intensity={1} />
        <Spiral position={[0, 0, 0]} scale={[0.055, 0.055, 0.055]} scrollY={scrollY}  />
        {/* <Rig rotation={[0, 0, 0.15]}> */}
        <Cards />
        {/* </Rig> */}
        {/* <OrbitControls /> */}
        <gridHelper args={[10, 10]} />
        <Statue />

      </Canvas>
    </div>
  );
}

export default App;

function Camera() {
  const { camera } = useThree();
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  return null;
}

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.z = -scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
  })
  return <group ref={ref} {...props} />
}



function Cards() {
  const turns = 3; // twists of the spiral
  const slope = 80;
  const heightSegments = 600;
  const radialSegments = 32;
  const R = 20; // radius of the spiral
  const numberOfCards = 9;
  var objPerTurn = 3;
  var angleStep = (Math.PI * 2) / objPerTurn;
  var heightStep = 12;


  const cardPosition = (i) => {
    const position = new THREE.Vector3();
    const angle = (i / numberOfCards) * Math.PI * 4;
    var angleStep = (Math.PI * 2) / objPerTurn;
    const radius = R;
    const height = (slope * i / radialSegments);
    position.x = (Math.cos(angleStep * i) * radius ) * 0.1;
    position.y = -(heightStep * i - 0.5) * 0.1;
    position.z = (Math.sin(angleStep * i) * radius / 2 ) * -0.1;
    console.log("position: " + i, position);
    return position;
  };

  return Array.from({ length: numberOfCards }, (_, i) => {
    const position = cardPosition(i); // Call the function to get the position
    return (
      <Card
        key={i}
        url={`/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[position.x, position.y, position.z]}
        text={`Card ${i}`}
      />
    );
  });
}
