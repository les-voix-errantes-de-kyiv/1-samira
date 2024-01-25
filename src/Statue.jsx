
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Statue(props) {
  const { nodes, materials } = useGLTF("./assets/models/ExportFinal.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Remesh01.geometry}
        material={materials["Snow Mountain"]}
        position={[0.032, 32.381, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Socle.geometry}
        material={materials["Snow Mountain 01"]}
        position={[-0.009, 30.526, -0.1]}
        scale={1.056}
      />
    </group>
  );
}

useGLTF.preload("/ExportFinal.glb");
