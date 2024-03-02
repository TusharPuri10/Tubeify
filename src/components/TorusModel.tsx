import * as THREE from "three";
import * as React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from '@react-three/drei'

function Torus({rotation}: {rotation: boolean}) {

  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) =>{ 
    if(rotation)  ref.current.rotation.z += 0.03;
    ref.current.rotation.x=2;
  });
  const gltf = useLoader(GLTFLoader, "/torus_explosion/scene.gltf");

  // Assuming you've identified the "MorphBake" animation
  const morphBakeAnimation = gltf.animations.find(
    (animation: { name: string; }) => animation.name === "MorphBake"
  );

  if (morphBakeAnimation) {
    // Create a mixer to play the animation
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(morphBakeAnimation);

    // Play the animation
    action.play();

    // Update the animation mixer in each frame
    useFrame((state, delta) => {
      mixer.update(delta);
    });
  }
  return (
    <mesh ref={ref}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export default function TorusExplosion({rotation} : {rotation: boolean}) {
  return (
    <Canvas
      style={{ height: "30rem", backgroundColor: "#000000" }} // Set background color to black
      camera={{ position: [0, -0.2, 4.2] }}
    >
      <OrbitControls />
      <directionalLight
        intensity={100}
        position={[5, 30, 15]} // Adjust position as needed
        color="red"
      />
      <pointLight
        intensity={80}
        position={[-2, 10, -10]} // Adjust position as needed
        color="blue"
      />
      <pointLight
        intensity={200}
        position={[1, 7, 0]} // Adjust position as needed
        color="white"
      />
      <Torus rotation={rotation}/>
    </Canvas>
  );
}
