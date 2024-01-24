
import * as THREE from 'three'
import './App.css';
import React, { useEffect, useState, useRef, us } from 'react';
import { Canvas, useFrame , useThree} from '@react-three/fiber'
import Card from './Card.jsx';
import { Image, Environment, ScrollControls, useScroll, useTexture, OrbitControls } from '@react-three/drei';
import { easing , geometry} from 'maath'
import Statue from './Statue';
import Spiral from './Spiral.jsx';


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
      <Canvas camera={{ position: [0, 2, 40], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} decay={0} intensity={2} />
        <pointLight position={[-10, -10, -10]} decay={1} intensity={1} />
        <ScrollControls pages={8} >
          <Rig rotation={[0, Math.PI, 0]}>
            <Spiral rotation={[0, Math.PI  , 0] }position={[0, 0, 0]} scale={[0.055, 0.055, 0.055]} scrollY={scrollY}  />
            <Cards />
          </Rig>
          <Axis rotation={[0, 0, 0]}>
            <Statue />
          </Axis>
          <gridHelper args={[10, 10]} />
        </ScrollControls>
        
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

export default App;

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 4) * 1.002 // Rotate contents
    ref.current.position.y = scroll.offset * (Math.PI * 3)// Move contents
    state.events.update() // Raycasts every frame rather than on pointer-move
  })
  return <group ref={ref} {...props} />
}
function Axis(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 4) * 1.002 // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    state.camera.lookAt(0, 0, 20) // Look at center
  })
  return <group ref={ref} {...props} />
}

function Cards() {
  const R = 25; // radius of the spiral
  const numberOfCards = 9;
  var objPerTurn = 3;

  const cardPosition = (i) => {
    const position = new THREE.Vector3();
    let angleStep = (Math.PI * 4) / objPerTurn;
    const radius = R;
    position.x = (Math.cos(angleStep * i) * radius ) * 0.1 - .8;
    position.y = -(Math.sin(angleStep * i ) * radius ) * 0.1;
    position.z = (Math.sin(angleStep * i) * radius / Math.PI / 2) * -0.1;
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
        rotation={[0,  (Math.PI *2), 0]}
      />
    );
  });
}
