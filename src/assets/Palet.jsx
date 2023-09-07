import React, { useEffect, useState, useRef } from "react";
import { RigidBody, interactionGroups, vec3 } from "@react-three/rapier";
import { useStore } from "../store";

const Palet = ({ nodes }) => {
  const palet = useRef();
  const [clingSound] = useState(() => new Audio("./cling.mp3"));
  const reinit = useStore((state) => state.reinitPosition);
  const isReinit = useStore((state) => state.reinit);
  const initialPosition = vec3({ x: 0, y: 0.2, z: -1 });

  const collisionEnter = () => {
    clingSound.currentTime = 0;
    clingSound.play();
  };

  useEffect(() => {
    if (palet.current && isReinit === true) {
      const timer = setTimeout(() => {
        palet.current.setLinvel({ x: 0, y: 0, z: 0 });
        palet.current.setAngvel({ x: 0, y: 0, z: 0 });
        palet.current.setTranslation(initialPosition, true);
        reinit(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <RigidBody
      name="palet"
      ref={palet}
      restitution={0.6}
      friction={0}
      position={[0, 0.2, 0]}
      collisionGroups={interactionGroups(2, [1])}
      onCollisionEnter={collisionEnter}>
      <mesh geometry={nodes.palet.geometry}>
        <meshStandardMaterial color="#ff0000" metalness={1} roughness={1} />
      </mesh>
    </RigidBody>
  );
};

export default Palet;
