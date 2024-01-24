import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Spiral = (props) => {

    const { scrollY } = props;
    const spiralRef = useRef();
    // Number of cubes you want along the spiral
    const [scrollPosition, setScrollPosition] = useState(0);

    const rTop = 1.4;
    const rBtm = 1.4;
    const R = 20; // radius of the spiral
    const T = 3.5; // twists of the spiral
    const heightSegments = 600;
    const radialSegments = 32;
    const slope = 80;
    let s = 0;
    const geometry = new THREE.CylinderGeometry( rTop, rBtm, T * Math.PI * 2, radialSegments, heightSegments, true );
    const position = geometry.attributes.position;
    geometry.translate( R,  Math.PI /2, 0 );
    const v = new THREE.Vector3( );
    const w = new THREE.Vector3( );

    for( let i = 0 ; i < position.count; i++ ) {
        s = i % ( radialSegments + 1 ) === 0 ? s + radialSegments + 1 : s; 
        v.fromBufferAttribute( position, i );	
        position.setXYZ( i,  Math.cos( v.y ) * v.x,  Math.sin( v.y ) * v.x, v.z + slope * s / heightSegments / radialSegments );
        
    }

    v.fromBufferAttribute( position, 0 );
    w.fromBufferAttribute( position,  position.count - 1 );
    geometry.translate( 0, 0, - ( w.z - v.z ) / 2 );
    geometry.computeVertexNormals( );

    // Scroll event listener
    useEffect(() => {
        // console.log("CONTROL")
        // Access the spiralRef.current and apply your logic here
        if (spiralRef.current) {
            // Calculate rotation based on scroll direction and reference position
            const rotationSpeed = 0.1;
            const scrollDirection = scrollY >= scrollPosition ? 1 : -1;
            // console.log('scrollDirection: ', scrollDirection);
            spiralRef.current.rotation.z += rotationSpeed * scrollDirection;

            setScrollPosition(scrollY);
        }
        // console.log("CONTROL OUT")
        console.log("CONTROL OUT")
        console.log(spiralRef.current.position);
    }, [scrollY]);

return (
    <mesh {...props} ref={spiralRef} rotation={[Math.PI /2, 0, 0]} geometry={geometry}>
        <meshNormalMaterial side={THREE.DoubleSide} wireframe={false} />
    </mesh>
);
};

export default Spiral;
