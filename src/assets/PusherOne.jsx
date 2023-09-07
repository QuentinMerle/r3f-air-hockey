import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useStore } from "../store";
import { execute } from "../utils";

const PusherOne = ({ nodes, materials, positionPusher }) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const pusher = useRef();
  const pusherOne = useRef();
  const isGift = useStore((state) => state.gift);
  const addGift = useStore((state) => state.getGift);
  const usedGift = useStore((state) => state.removeGift);

  const useGift = () => {
    if (!isGift) return null;
    addGift(false);
    usedGift();
    execute();
  };

  useFrame((state, delta) => {
    // const { mouse } = state;

    const { forwardOne, backwardOne, leftwardOne, rightwardOne, launch } =
      getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.8 * delta;

    if (forwardOne) {
      impulse.z -= impulseStrength;
    }

    if (rightwardOne) {
      impulse.x += impulseStrength;
    }

    if (backwardOne) {
      impulse.z += impulseStrength;
    }

    if (leftwardOne) {
      impulse.x -= impulseStrength;
    }

    if (launch) {
      useGift();
    }

    pusherOne.current.applyImpulse(impulse);

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
        ref={pusherOne}
        name={"pusher"}
        canSleep={false}
        colliders="hull"
        restitution={0.2}
        lockRotations={true}
        friction={0}
        linearDamping={0.5}
        scale={(1, 1, 1)}
        angularDamping={0.5}>
        <mesh geometry={nodes.pusher.geometry} position={positionPusher}>
          <meshStandardMaterial color="#ff0000" metalness={1} roughness={1} />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default PusherOne;
