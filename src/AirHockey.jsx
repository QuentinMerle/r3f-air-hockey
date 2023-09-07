/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { Suspense } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  interactionGroups,
} from "@react-three/rapier";
import { BackSide } from "three";
import Wall from "./assets/Wall";
import PusherOne from "./assets/PusherOne";
import PusherTwo from "./assets/PusherTwo";
import Palet from "./assets/Palet";

const Goal = React.lazy(() => import("./assets/Goal"));
const Bonus = React.lazy(() => import("./assets/Bonus"));

export function AirHockey(props) {
  const { nodes, materials } = useGLTF("/air-hockey.glb");

  return (
    <Physics>
      {/* <Debug /> */}
      <group {...props} dispose={null}>
        <Wall nodes={nodes.wall} materials={materials.Material} />
        <mesh geometry={nodes.bande.geometry} position={[0.02, 0.01, 0]}>
          <meshBasicMaterial color={"#ffff00"} side={BackSide} />
        </mesh>
        {/* GROUND */}
        <RigidBody type="fixed" restitution={0.2} friction={0}>
          <CuboidCollider
            position={(0, 0, 0.01)}
            args={[3, 0.01, 4.5]}
            restitution={0.2}
            friction={0}
          />
        </RigidBody>
        {/* ICE */}
        <Suspense fallback={null}>
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[22, 13]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={2}
              depthScale={1}
              minDepthThreshold={0.9}
              color="#ffffff"
              metalness={0.4}
              roughness={1}
              mirror={0}
              kernelSize={3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Suspense>
        <PusherOne
          nodes={nodes}
          materials={materials}
          positionPusher={[0, 0.31, 1.5]}
        />
        <PusherTwo
          nodes={nodes}
          materials={materials}
          positionPusher={[0, 0.3, -1.5]}
        />
        <Palet nodes={nodes} />
        <Suspense fallback={null}>
          <Goal
            nodes={nodes}
            materials={materials}
            name={"playerTwo"}
            position={[0.01, 0.54, 3.18]}
            net={[-0.13, 0.23, 3.38]}
            collider={[0, 0.2, 3.4]}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Goal
            nodes={nodes}
            materials={materials}
            name={"playerOne"}
            position={[0.01, 0.54, -3.18]}
            net={[0.15, 0.23, -3.38]}
            collider={[0, 0.2, -3.4]}
            rotationy={Math.PI}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Bonus nodes={nodes} />
        </Suspense>
        {/* MIDDLE LINE */}
        <RigidBody
          type="fixed"
          restitution={0.2}
          friction={0}
          collisionGroups={interactionGroups(0, [0, 1])}>
          <CuboidCollider position={[0, 0.25, 0.02]} args={[3, 0.2, 0.03]} />
        </RigidBody>
        <mesh
          geometry={nodes.terrain.geometry}
          material={materials.Terrain}
          position={[0.02, 0, 0]}
        />
      </group>
    </Physics>
  );
}

useGLTF.preload("/air-hockey.glb");
