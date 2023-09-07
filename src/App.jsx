import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Leva } from "leva";
import { useControls } from "leva";
import GlobalStyle from "./GlobalStyle";
import Experience from "./Experience";
import Hud from "./Hud";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Hud />
      <KeyboardControls
        map={[
          { name: "forwardOne", keys: ["ArrowUp"] },
          { name: "backwardOne", keys: ["ArrowDown"] },
          { name: "leftwardOne", keys: ["ArrowLeft"] },
          { name: "rightwardOne", keys: ["ArrowRight"] },
          { name: "forwardTwo", keys: ["KeyW"] },
          { name: "backwardTwo", keys: ["KeyS"] },
          { name: "leftwardTwo", keys: ["KeyA"] },
          { name: "rightwardTwo", keys: ["KeyD"] },
          { name: "launch", keys: ["Space"] },
        ]}>
        <Leva collapsed />
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [0, 5, 6],
          }}>
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

export default App;
