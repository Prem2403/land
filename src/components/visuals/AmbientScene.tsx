import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function OrbitalNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2;
    const radius = 2.4 + (index % 3) * 0.45;
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * 1.1, Math.sin(angle) * radius] as [number, number, number];
  }), []);
  const lines = useMemo(() => nodes.map((node, index) => ({
    points: [node, nodes[(index + 5) % nodes.length]] as [number, number, number][],
    opacity: 0.08 + (index % 4) * 0.025,
  })), [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2.8, 0.5, -2]}>
      {lines.map((line, index) => <Line key={index} points={line.points} color="#2E9B68" lineWidth={0.5} transparent opacity={line.opacity} />)}
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[index % 5 === 0 ? 0.06 : 0.035, 8, 8]} />
          <meshBasicMaterial color={index % 5 === 0 ? '#D97706' : '#2E9B68'} transparent opacity={0.45} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial color="#0B5D3B" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index++) {
      values[index * 3] = (Math.random() - 0.5) * 18;
      values[index * 3 + 1] = (Math.random() - 0.5) * 10;
      values[index * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.018;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={180} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#2E9B68" transparent opacity={0.32} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} color="#2E9B68" intensity={1.5} distance={10} />
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.25}>
        <OrbitalNetwork />
      </Float>
      <Dust />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.08} />
    </>
  );
}

export function AmbientScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9], fov: 44 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
