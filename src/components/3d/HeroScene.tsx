import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.6} />
    </Torus>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#f97316" />
        <GlowingSphere />
        <OrbitRing radius={2.8} speed={0.3} color="#06b6d4" />
        <OrbitRing radius={3.4} speed={-0.2} color="#f97316" />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
