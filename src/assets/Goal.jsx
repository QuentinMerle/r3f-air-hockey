import React, { useState, Suspense } from "react";
import { Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../store";

const Goal = ({
  nodes,
  materials,
  name,
  position,
  net,
  collider,
  rotationy,
}) => {
  const [intersecting, setIntersection] = useState(false);
  const scorePlayerOne = useStore((state) => state.playerOne);
  const scorePlayerTwo = useStore((state) => state.playerTwo);
  const goalValue = useStore((state) => state.scoreValue);
  const addScore = useStore((state) => state.increaseScore);
  const reinit = useStore((state) => state.reinitPosition);
  const addGift = useStore((state) => state.getGift);
  const endGame = useStore((state) => state.stopGame);

  const goal = (payload) => {
    if (payload.colliderObject.name == "palet") {
      addScore(payload.target.rigidBodyObject.name, goalValue);
      reinit(true);
      setIntersection(true);
      // if (scorePlayerOne > scorePlayerTwo + 2) {
      if (scorePlayerOne >= 1) {
        addGift(true);
      }
      endGame(payload.target.rigidBodyObject.name);
    }
  };

  return (
    <RigidBody
      name={name}
      type="fixed"
      colliders="trimesh"
      restitution={0.2}
      friction={0}>
      <mesh
        castShadow
        geometry={nodes.goal.geometry}
        material={materials.palet}
        position={position}
        rotation-y={rotationy}
      />
      <mesh
        castShadow
        geometry={nodes.net.geometry}
        position={net}
        rotation-y={rotationy}>
        <meshBasicMaterial color="white" />
      </mesh>
      <Suspense fallback={null}>
        {intersecting && (
          <Text
            color="red"
            position={[0, 1, 0]}
            font="./russo-one-v14-latin-regular.woff"
            fontSize={2}>
            GOAL!
          </Text>
        )}
      </Suspense>

      {/**
       * We create a collider and set it to be a 'sensor'
       * This enabled intersection events, and enables
       * colliders to pass through it.
       */}
      <CuboidCollider
        position={collider}
        args={[0.5, 0.2, 0.2]}
        sensor
        onIntersectionEnter={(payload) => goal(payload)}
        onIntersectionExit={() => setIntersection(false)}
      />
    </RigidBody>
  );
};

export default Goal;
