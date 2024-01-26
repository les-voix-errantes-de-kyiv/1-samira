import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Image } from '@react-three/drei';
import './Util';

export default function Card({ url, ...props }) {
    const ref = useRef();
    const materialProps = {
        transparent: true,
        opacity: 1, // Adjust the opacity as needed
        blending: THREE.NormalBlending, // Prevents alpha fringing
    };
    return (
        <Image ref={ref} url={url} side={THREE.DoubleSide} {...materialProps} {...props}>
            <bentPlaneGeometry args={[0.0000001, 2, 1.2, 40, 20]} />
        </Image>      
    );
}
