import './App.css';
import { Canvas } from '@react-three/fiber';
import Spiral from './Spiral.jsx';
import { OrbitControls } from '@react-three/drei';
import React, { useEffect, useState } from 'react';

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
      <Canvas>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} decay={0} intensity={2} />
        <pointLight position={[-10, -10, -10]} decay={1} intensity={1} />
        <Spiral position={[0, 0, 0]} scale={[0.055, 0.055, 0.055]} scrollY={scrollY}  />
        {/* <OrbitControls /> */}

      </Canvas>
    </div>
  );
}

export default App;
