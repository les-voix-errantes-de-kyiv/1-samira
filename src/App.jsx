
import * as THREE from 'three'
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, _roots, useFrame } from '@react-three/fiber'
import {  ScrollControls, useScroll } from '@react-three/drei';
// import { easing , geometry} from 'maath'

// Components
import Card from './Card.jsx';
import Statue from './Statue';
import TextCard from './TextCard.jsx';
import Overlay from './Overlay.jsx'; // Make sure to adjust the path based on your project structure

let cardOpacity = false
let traveling = false;
let music = false;
var audio = new Audio('./assets/music/Alambari.mp3');


// App
function App() {
  console.log("1 "+cardOpacity)
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const handleExploreClick = () => {
    console.log('clicked');
    cardOpacity = true
    console.log("2 "+cardOpacity)
    var div = document.querySelector("div.canvas-container > div:last-child > div:last-child div")
    div.scrollTop = 4180;
    setOverlayVisible(false);
  };

  const handleMusicBtn = () => {

    const musicState = document.getElementById("sound-state")

    if(music){music = false; musicState.innerHTML = "OFF";}else{music = true; musicState.innerHTML = "ON";}

    console.log('clicked music : '+music);

    if(music){
      // Jouer la musique
      audio.play();

      // Vous pouvez également ajouter des événements, par exemple pour arrêter la musique après qu'elle a été jouée
      audio.addEventListener('ended', function() {
        console.log('La musique est terminée');
        audio.play();
      });
    }else{
      audio.pause();
    }

  };

  const handleScrollOffsetChange = (newScrollOffset) => {
    if(!traveling && newScrollOffset > 0){
      traveling = true
    }
    if(newScrollOffset == 0 && traveling){
      console.log("hey "+newScrollOffset)
      setOverlayVisible(true);
      traveling = false
    }
    // gère l'apparition du menu hud quand user remonte tout en haut
  };

  return (
    <div className="app">
      <Overlay isVisible={isOverlayVisible} handleExploreClick={handleExploreClick} handleMusicBtn={handleMusicBtn} />
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 2, 40], rotation:[15,0,0], fov: 15 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} decay={0} intensity={2} />
          <pointLight position={[-10, -10, -10]} decay={1} intensity={1} />
          <ScrollControls pages={12} >
            <Rig rotation={[0, Math.PI, 0]} onScrollOffsetChange={handleScrollOffsetChange}>
              <Cards cardOpacity={cardOpacity} />
            </Rig>
            <Axis rotation={[0, 0, 0]} scale={[]}>
              <Statue position={[0,-0.7,0]} />
            </Axis>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
    

  );
}

export default App;

// Rig is the parent of the cards component that makes them turn
function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    let scrollSpeed = 4.8;

    //console.log(scroll.offset)

    //if(scroll.offset <= 0.14553762968512687){ //stoppe le scroll à la fin du carousel

      ref.current.rotation.y = -scroll.offset * (Math.PI * 4) * 1.002 * scrollSpeed - 5 // Rotate contents
      ref.current.position.y = scroll.offset * (Math.PI * 3) * scrollSpeed - 5.8 // Move contents
      state.events.update() // Raycasts every frame rather than on pointer-move

      props.onScrollOffsetChange(scroll.offset);

    //}

  })
  return <group ref={ref} {...props} />
}

// Statue is the main object
function Axis(props) {
  const ref = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI ) * 1.002 // Rotate contents

    if(scroll.offset > 0.12811978616869774){ //offset de la page ou on nous enmène quand on clique sur explore
      ref.current.scale.set(0.8 + scroll.offset * 0.7, 0.8 + scroll.offset * 0.7, 0.8 + scroll.offset * 0.7) 
    }else{
      ref.current.scale.set(1.3 - scroll.offset * 3.2, 1.3 - scroll.offset * 3.2, 1.3 - scroll.offset * 3.2) 
    }


    state.events.update() // Raycasts every frame rather than on pointer-move
    state.camera.lookAt(0, 0, 20) // Look at center
  })
  return <group ref={ref} {...props} />
}

function Cards(cardOpacity) {
  let sense = -1; // 1 or -1 to set x value
  let senseZ = 1; // 1 or -1 tp set z value
  let loopPoint = 1; // 
  let pic_between_text_gap = 0.15;
  const numberOfCards = 29; // Total number of cards minus 1 to start from 0
  let lastPosition = 0;

  const cardPosition = (i, lastPosition, sense, senseZ) => {
    const step = 1.17;
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
    return position;
  };

  return Array.from({ length: numberOfCards +1 , sense, senseZ }, (_, i) => {
    if(loopPoint == 1){ sense *= -1; }else if (loopPoint == -1){ senseZ *= -1; }
    // We switch loopPoint to adjust the axis we are based on(x or z axis)
    loopPoint *= -1;

    // 
    const position = cardPosition(i, lastPosition, sense, senseZ); // Call the function to get the position
    lastPosition = position.y;
  
    const cardUrl = `/img${i + 1}_.png`;
    const textUrl = `/img${i + 1}_txt.png`;
    console.log(cardUrl)
    // For text, you can set a default text or modify it based on your requirements
    return (
      <group key={i}>
        <Card
          key={i}
          url={cardUrl}
          cardOpacity={cardOpacity}
          position={[position.x, position.y, position.z]}
          rotation={[0,  position.rotationY, 0]}
        />
        <TextCard
          url={textUrl}
          cardOpacity={cardOpacity}
          position={[position.xText, position.yText, position.zText]}
          rotation={[0, position.rotationY + Math.PI, 0]}
          />
      </group>
    );

  });
  
}