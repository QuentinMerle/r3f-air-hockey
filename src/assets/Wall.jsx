import React from "react";
import { RigidBody } from "@react-three/rapier";

const Wall = ({ nodes }) => {
  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={0}>
      <mesh geometry={nodes.geometry} position={[0.02, 0, 0]}>
        <meshBasicMaterial color={"#ffffff"} />
      </mesh>
    </RigidBody>
  );
};

export default Wall;
