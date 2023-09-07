import React, { useRef, useState, useEffect } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { randFloat } from "three/src/math/MathUtils";
import { random } from "../utils";
import { useStore } from "../store";

const Bonus = ({ nodes, material }) => {
  const position = { x: -0.02, z: 2.3 };
  const xPos = randFloat(-2, 2);
  const zPos = randFloat(-1.4, 1.4);

  const icecube = useRef();
  const gift = useRef();

  const [giftIntersecting, setGiftIntersecting] = useState(false);
  const isGift = useStore((state) => state.gift);
  const addGift = useStore((state) => state.getGift);
  const [springs, api] = useSpring(() => ({
    scale: -1,
    config: (key) => {
      switch (key) {
        case "scale":
          return {
            mass: 2,
            friction: 6,
          };
        default:
          return {};
      }
    },
  }));

  const getGift = (payload) => {
    addGift(true);
    random();
    api.start({
      scale: -1,
    });
  };

  useEffect(() => {
    if (isGift) {
      api.start({
        scale: 1,
      });
    }
  }, [isGift]);

  useFrame((state, delta) => {
    icecube.current.rotation.y += 0.34 * delta;
  });

  return (
    <>
      <animated.group
        ref={gift}
        scale-y={springs.scale}
        position={[xPos, isGift ? 0 : -0.5, zPos]}>
        <mesh
          ref={icecube}
          castShadow
          geometry={nodes.icecube.geometry}
          position={[position.x, 0.34, position.z]}>
          <MeshTransmissionMaterial
            transmission={1}
            roughness={0.3}
            thickness={0.1}
            ior={1.5}
            distortion={0}
            distortionScale={0.3}
            attenuationDistance={0.5}
            attenuationColor={"#ffffff"}
            color={"#b9e8ea"}
            background={"#ffffff"}
            transmissionSampler={false}
          />
        </mesh>
        <mesh
          geometry={nodes["question-bottom"].geometry}
          position={[position.x, 0.2, position.z]}>
          <meshBasicMaterial color={"blue"} />
        </mesh>
        <mesh
          geometry={nodes["question-top"].geometry}
          position={[-0.05 + position.x, 0.51, position.z]}>
          <meshBasicMaterial color={"blue"} />
        </mesh>
      </animated.group>
      <RigidBody type="fixed">
        <CuboidCollider
          sensor
          position={[xPos, isGift ? 0.34 : -0.5, zPos + 2.3]}
          args={[0.2, 0.2, 0.2]}
          onIntersectionEnter={(payload) => {
            getGift(payload);
          }}
        />
      </RigidBody>
    </>
  );
};

export default Bonus;
