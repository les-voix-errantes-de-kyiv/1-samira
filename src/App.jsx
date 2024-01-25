
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

function App() {

  return (
    <div className="canvas-container">

    <div className="hud-cust" id="hudcust" >

      <div className="hud-title">Samira's journey</div>
      <div className="hud-why">Why ?</div>
      <div className="hud-langs"></div>
      <div className="explore-block">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima exercitationem, sunt ad odit suscipit cum commodi earum dolore, libero esse autem corrupti quidem accusantium. Sit eius voluptates pariatur aut!</p>
        <div className="explore-btn">EXPLORE</div>
      </div>

    </div>

      <Canvas camera={{ position: [0, 2, 40], rotation:[15,0,0], fov: 15 }}>

        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} decay={0} intensity={2} />
        <pointLight position={[-10, -10, -10]} decay={1} intensity={1} />
        <ScrollControls pages={12}  >
          <Rig rotation={[0, Math.PI, 0]}>
            {/*<Spiral rotation={[0, Math.PI  , 0] }position={[0, 0, 0]} scale={[0.055, 0.055, 0.055]} scrollY={scrollY}  />*/}
            <Cards />
          </Rig>
          <Axis rotation={[0, 0, 0]}>
            <Statue position={[0,-0.7,0]} />
          </Axis>
          {/* <gridHelper args={[10, 10]} /> */}
        </ScrollControls>
        
         {/* <OrbitControls />  */}
      </Canvas>
    </div>

    

  );
}

export default App;

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 4) * 1.002 * 6 // Rotate contents
    ref.current.position.y = scroll.offset * (Math.PI * 3) * 6// Move contents
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
  let sense = -1; // 1 or -1 to set x value
  let senseZ = 1; // 1 or -1 tp set z value
  let loopPoint = 1;// 
  let pic_between_text_gap = 0.15;

  const numberOfCards = 29;
  var objPerTurn = 2;
  let lastPosition = 0;

  const cardPosition = (i, lastPosition, sense, senseZ) => {
    const step = 1.15;
    const position = new THREE.Vector3();
    const radius = 2; // radius of the spiral

    if(loopPoint == 1){
      // We set z to zero and we play with x-axis
      position.x =  radius * sense ;
      position.z = 0 ;

      position.xText =  radius * sense + (pic_between_text_gap * sense) ;
      position.zText = 0 ;


      if(sense == 1){ position.rotationY = Math.PI/2 + Math.PI }else if(sense == -1){ position.rotationY = Math.PI/2 }

    }else if (loopPoint == -1){
      // We set x to zero and we play with z-axis
      position.x =  0 ;
      position.z = radius * senseZ ;

      position.xText =  0 ;
      position.zText = radius * senseZ + (pic_between_text_gap * senseZ) ;

      if(senseZ == 1){ position.rotationY = Math.PI*2 + Math.PI }else if(senseZ == -1){ position.rotationY = Math.PI*2 }

    }
    position.y = -(i * step + 1) + 2.5// y is always negative (decreasing)
    position.yText = -(i * step + 1) + 2.5
    // console.log("position: " + i, position);
    return position;
  };

  return Array.from({ length: numberOfCards  , sense, senseZ }, (_, i) => {
    console.log('i: ', i)
    if(loopPoint == 1){ sense *= -1; }else if (loopPoint == -1){ senseZ *= -1; }
    // We switch loopPoint to adjust the axis we are based on(x or z axis)
    loopPoint *= -1;

    // 
    const position = cardPosition(i, lastPosition, sense, senseZ); // Call the function to get the position
    lastPosition = position.y;
    if (i % 2 === 0 ){
      // console.log('Position Image Card: ', position)
    } else {
      console.log('Position Text Card: ', position)
    }
  
    const cardUrl = `/img${i + 1}_.png`;
    const textUrl = `/img${i + 1}_txt.png`;
    // For text, you can set a default text or modify it based on your requirements
    return (
      // <group key={i}>
      //   <Card
      //       url= {i % 2 === 0 ? cardUrl : textUrl}
      //       position= {[position.x, position.y, position.z]}
      //       rotation={i % 2 === 0 ? [0, position.rotationY, 0] : [0, Math.PI / 2, 0 ]}
      //     />
          
      // </group>
      <group key={i}>
        {/* {i % 2 === 0 ? ( // Check if i is even
          <Card
            url={cardUrl}
            position={[position.x, position.y, position.z]}
            rotation={[0, position.rotationY, 0]}
            text={`Card ${i}`}
          />
        ) : ( // i is odd
          <TextCard
          url={textUrl}
          position={[position.x, position.y, position.z]}
          rotation={[0, position.rotationY, 0]}
          />
        )} */}
        <Card
          key={i}
          url={cardUrl}
          position={[position.x, position.y, position.z]}
          rotation={[0,  position.rotationY, 0]}
        />
        <TextCard
          url={textUrl}
          position={[position.xText, position.yText, position.zText]}
          rotation={[0, position.rotationY + Math.PI, 0]}
          />
      </group>
    );

  });
  
}