import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Car() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Car body */}
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#001122"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1, -0.7, 0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[1, -0.7, 0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-1, -0.7, -0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[1, -0.7, -0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Headlights */}
      <mesh position={[1.5, 0.2, 0.4]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[1.5, 0.2, -0.4]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        color="#00D4FF"
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.5}
        color="#FF6B35"
      />
      <Car />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}