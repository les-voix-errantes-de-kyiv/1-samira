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
        position={[0.032, 1.817, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Socle001.geometry}
        material={materials["Material.002"]}
        position={[-0.009, 0.166, -0.1]}
        rotation={[0, -0.462, 0]}
        scale={1.056}
      />
    </group>
  );
}

useGLTF.preload("/ExportFinal.glb");