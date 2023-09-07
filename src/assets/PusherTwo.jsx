import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useStore } from "../store";

const PusherTwo = ({ nodes, materials, positionPusher }) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const pusher = useRef();
  const pusherTwo = useRef();
  const usedGift = useStore((state) => state.removeGift);

  const useGift = () => {
    usedGift();
  };

  useFrame((state, delta) => {
    // const { mouse } = state;

    const { forwardTwo, backwardTwo, leftwardTwo, rightwardTwo, launch } =
      getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.8 * delta;

    if (forwardTwo) {
      impulse.z -= impulseStrength;
    }

    if (rightwardTwo) {
      impulse.x += impulseStrength;
    }

    if (backwardTwo) {
      impulse.z += impulseStrength;
    }

    if (leftwardTwo) {
      impulse.x -= impulseStrength;
    }

    if (launch) {
      useGift();
    }

    pusherTwo.current.applyImpulse(impulse);

    // Cursor
    // const position = vec3(pusherPhysic.current.translation());

    // const x = (mouse.x * viewport.width) / 2;
    // const y = (mouse.y * viewport.height) / 2;

    // if (x > -2.5 && x < 3.2) {
    //   position.x = (mouse.x * viewport.width) / 2;
    // }

    // if (y > -2.5 && y < 1.5) {
    //   position.z = -(mouse.y * viewport.height) / 2;
    // }

    // pusherPhysic.current.setTranslation(position, true);
  });

  return (
    <group ref={pusher}>
      <RigidBody
        ref={pusherTwo}
        name={"pusher"}
        canSleep={false}
        colliders="hull"
        restitution={0.2}
        lockRotations={true}
        friction={0}
        linearDamping={0.5}
        angularDamping={0.5}>
        <mesh geometry={nodes.pusher.geometry} position={positionPusher}>
          <meshStandardMaterial color="#00d4ff" metalness={1} roughness={1} />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default PusherTwo;
