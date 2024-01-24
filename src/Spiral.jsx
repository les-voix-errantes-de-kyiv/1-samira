import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Spiral = (props) => {

    // const { scrollY } = props;
    const spiralRef = useRef();
    // Number of cubes you want along the spiral

    const rTop = .08;
    const rBtm = .04;
    const R = 20; // radius of the spiral
    const T = 2; // twists of the spiral
    const heightSegments = 1000;
    const radialSegments = 32;
    const slope = 80;
    let s = 0;
    const geometry = new THREE.CylinderGeometry( rTop, rBtm, T * Math.PI * 2, radialSegments, heightSegments, true );
    const position = geometry.attributes.position;
    geometry.translate( R,  Math.PI / 2, 0 );
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


return (
    <mesh {...props} ref={spiralRef} rotation={[Math.PI /2, 0, Math.PI /2]} geometry={geometry}>
        <meshNormalMaterial side={THREE.DoubleSide} wireframe={false} />
    </mesh>
);
};

export default Spiral;
