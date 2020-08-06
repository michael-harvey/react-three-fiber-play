import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

function Box(props) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    const rot = props.speed * 0.01;
    mesh.current.rotation.x += rot;
    mesh.current.rotation.y += rot;
  });

  return (
    <>
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
    </>
  );
}

function BouncyBox() {
  const [active, setActive] = useState(0);

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
  return (
    <a.mesh
      rotation-y={rotation}
      scale-x={scale}
      scale-z={scale}
      onClick={() => setActive(Number(!active))}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
    </a.mesh>
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
      <Box position={[0, -1.2, 1]} speed={1} />
      <Box position={[-1.2, 0, 0]} speed={2} />
      <Box position={[1.2, 0, 0]} speed={3} />
      <Box position={[0, 1.2, 1]} speed={4} />
      <OrbitControls args={[camera, domElement]} />
      <BouncyBox />
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
