import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Spiral = (props) => {

    const { scrollY } = props;
    const spiralRef = useRef();
    const cubesRef = useRef([])
    // Number of cubes you want along the spiral
    const numberOfCubes = 10;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [totalScrollDistance, setTotalScrollDistance] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(0);

    const [currentScrollDirection, setCurrentScrollDirection] = useState(1); // Initialize with a default value

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
        console.log("CONTROL")
        // Access the spiralRef.current and apply your logic here
        if (spiralRef.current) {
            // Calculate rotation based on scroll direction and reference position
            const rotationSpeed = 0.1;
            const scrollDirection = scrollY >= scrollPosition ? 1 : -1;
            console.log('scrollDirection: ', scrollDirection);
            spiralRef.current.rotation.z += rotationSpeed * scrollDirection;

            setScrollPosition(scrollY);
            const calculateCubePosition = (index) => {
                const position = new THREE.Vector3();
                const angle = (index / numberOfCubes) * Math.PI * 4; // Adjust this value for the desired separation
                const radius = R; // Use the same radius as the spiral
                console.log("Operators:  ", slope , index , heightSegments ,  radialSegments)
                const height = (slope * index / radialSegments); // Adjust this value based on your desired height offset
                console.log("height: ", height);
                position.x = radius * Math.cos(angle) - 0.5;
                position.y = radius * Math.sin(angle) - 0.5;
                position.z = -(height * Math.PI /2 ) - 0.5;

                return position;
            };
              
            // Place cubes along the height of the spiral
            for (let i = 0; i < numberOfCubes; i++) {
                const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
                );
            
                const cubePosition = calculateCubePosition(i);
                cube.position.set(cubePosition.x, cubePosition.y, cubePosition.z);
                console.log("cubePosition: ", cubePosition);
                cubesRef.current.push(cube);
                spiralRef.current.add(cube);
            }
            // setCurrentScrollDirection(scrollDirection);

        }
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
