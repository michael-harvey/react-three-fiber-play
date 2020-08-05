import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

function Box(props) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "pink"}
      />
    </mesh>
  );
}

function Scene() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[10, 10, 10]} />
      <Box position={[0, -1.2, 1]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Box position={[0, 1.2, 1]} />
      <orbitControls args={[camera, domElement]} />
    </>
  );
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
