import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Image } from '@react-three/drei';
import './Util';

export default function Card({ url, ...props }) {
    const ref = useRef();
    
    const materialProps = {
        transparent: true,
        opacity: 1, // Adjust the opacity as needed
    };

    return (
            <Image ref={ref} url={url}  side={THREE.DoubleSide} 
            materialProps = {materialProps}{...props}>
                <bentPlaneGeometry args={[0.1, 1.5, 1, 40, 20]} />
            </Image>      
    );
}
