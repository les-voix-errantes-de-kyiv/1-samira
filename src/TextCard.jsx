import React, { useRef } from 'react';
import { Text3D, Text } from '@react-three/drei';

export default function TextCard({ text, ...props }) {
const fontUrl = '/font.json';
  return (
    <Text3D font={fontUrl} 
        size={.4}
        letterSpacing={-0.025}>
        {text}
        <meshPhysicalMaterial  />
    </Text3D>
    // <Text font={fontUrl} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
    //     {text}
    //     </Text>
    // <mesh >
    //     <boxGeometry args={[1, 1, 1]} />
    //     <meshNormalMaterial  />
    // </mesh>
  );
}
