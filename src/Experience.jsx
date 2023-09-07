import { Suspense } from "react";
import { OrbitControls, Environment, Lightformer } from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { BackSide } from "three";
import Placeholder from "./Placeholder";
import { AirHockey } from "./AirHockey";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <OrbitControls makeDefault />

      <spotLight
        position={[8, 15, 4]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={0.8}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} />

      <Suspense fallback={<Placeholder position-y={0.5} scale={[5, 1, 7]} />}>
        <AirHockey position-z={-1} />
      </Suspense>

      <Environment background>
        <Lightformer
          form="ring"
          color="blue"
          intensity={1}
          scale={10}
          position={[-4, 4, -2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[4, 4, 2]}
          target={[0, 0, 0]}
        />

        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={BackSide}>
            <Color color="#444" alpha={1} mode="normal" />
            <Depth
              colorA="blue"
              colorB="black"
              alpha={0.5}
              mode="normal"
              near={0}
              far={300}
              origin={[50, 50, 50]}
            />
          </LayerMaterial>
        </mesh>
      </Environment>
    </>
  );
}
