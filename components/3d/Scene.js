'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Stars,
  Float,
} from '@react-three/drei';

function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5;
  });

  return (
    <Float
      speed={1.5} 
      rotationIntensity={1.5} 
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.5}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

function CyberRing({ position, rotation }) {
  const ringRef = useRef();

  useFrame((state) => {
    ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={ringRef} position={position} rotation={rotation}>
      <torusGeometry args={[2, 0.2, 16, 100]} />
      <meshStandardMaterial
        color="#4F46E5"
        wireframe
        emissive="#4F46E5"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      <AnimatedSphere position={[-3, 0, 0]} color="#06b6d4" speed={0.8} />
      <AnimatedSphere position={[3, 0, 0]} color="#a855f7" speed={1.2} />
      <CyberRing position={[0, 0, -2]} rotation={[Math.PI / 4, 0, 0]} />
      
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
} 