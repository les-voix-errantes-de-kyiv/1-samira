
import * as THREE from 'three'
import './App.css';
import React, { useEffect, useState, useRef, us } from 'react';
import { Canvas, _roots, useFrame , useThree} from '@react-three/fiber'
import Card from './Card.jsx';
import { Image, Environment, ScrollControls, useScroll, useTexture, OrbitControls } from '@react-three/drei';
import { easing , geometry} from 'maath'
import Statue from './Statue';
import TextCard from './TextCard.jsx';
import Spiral from './Spiral.jsx';

let sense = 1; // 1 or -1
let senseZ = -1; // 1 or -1
let loopPoint = 1;

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
            {/*<Spiral rotation={[0, Math.PI  , 0] }position={[0, 0, 0]} scale={[0.055, 0.055, 0.055]} scrollY={scrollY}  />*/}
            <Cards />
          </Rig>
          <Axis rotation={[0, 0, 0]}>
            <Statue />
          </Axis>
          {/* <gridHelper args={[10, 10]} /> */}
        </ScrollControls>
        
        { /*<OrbitControls />*/ }
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
    ref.current.rotation.y = -scroll.offset * (Math.PI ) * 1.002 // Rotate contents
    ref.current.scale.set(0.8 + scroll.offset * 0.7, 0.8 + scroll.offset * 0.7, 0.8 + scroll.offset * 0.7) 
    state.events.update() // Raycasts every frame rather than on pointer-move
    state.camera.lookAt(0, 0, 20) // Look at center
  })
  return <group ref={ref} {...props} />
}

function Cards() {
  const numberOfCards = 10;
  var objPerTurn = 2;
  let lastPosition = 0;

  const cardPosition = (i, lastPosition, sense, senseZ) => {
    const step = 1.15;
    const position = new THREE.Vector3();
    const radius = 1.5; // radius of the spiral

    // let angleStep = (Math.PI * 4) / objPerTurn;

    // position.x = (Math.cos(angleStep * i) * radius ) * 0.1 - .8;
    // position.y = lastPosition + Math.sin(angleStep * i) * radius * 0.1;
    // position.z = (Math.sin(angleStep * i) * radius) / (Math.PI * 2) * -0.1;

    if(loopPoint == 1){

      position.x =  radius * sense ;
      position.z = 0;

      if(sense == 1){ position.rotationY = Math.PI/2 + Math.PI }else if(sense == -1){ position.rotationY = Math.PI/2 }

    }else if (loopPoint == -1){

      position.x =  0 ;
      position.z = radius * senseZ ;

      if(senseZ == 1){ position.rotationY = Math.PI*2 + Math.PI }else if(senseZ == -1){ position.rotationY = Math.PI*2 }

    }

    position.y = -(i * step + 1) + 2.5// y is always negative (decreasing)


    // console.log("position: " + i, position);
    return position;
  };

  return Array.from({ length: numberOfCards, sense, senseZ }, (_, i) => {

    if(loopPoint == 1){ sense *= -1; }else if (loopPoint == -1){ senseZ *= -1; }
    loopPoint *= -1;

    console.log("sense "+sense)

    const position = cardPosition(i, lastPosition, sense, senseZ); // Call the function to get the position
    lastPosition = position.y;
    console.log("Card Position: " + i, position);
  
    const cardUrl = `/img${Math.floor(i % 10) + 1}_.png`;
    const textUrl = `/img1_txt.png`;
    if (!textUrl || !cardUrl) return null;
    return (
      <Card
        key={i}
        url={`/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[position.x, position.y, position.z]}
        text={`Card ${i}`}
        rotation={[0,  position.rotationY, 0]}
      />
    );
  });
  
}
