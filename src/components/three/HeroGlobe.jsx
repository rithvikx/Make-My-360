import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HeroGlobe — Premium rotating wireframe globe with dual orbital rings,
 * glowing core, and animated particle dots orbiting the surface.
 */
export default function HeroGlobe() {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow Y-axis rotation + gentle X breathing
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }

    // Orbital ring 1 — forward spin
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.007;
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.12;
    }

    // Orbital ring 2 — counter-spin, different axis tilt
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.005;
      ring2Ref.current.rotation.y = Math.sin(t * 0.35) * 0.18;
    }

    // Glowing core pulse
    if (coreRef.current) {
      const pulse = 0.85 + Math.sin(t * 2.2) * 0.15;
      coreRef.current.material.emissiveIntensity = 2.5 * pulse;
      coreRef.current.scale.setScalar(pulse);
    }

    // Very slow whole-group drift
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#00E0FF" distance={12} decay={2} />
      <pointLight position={[-3, -2, -2]} intensity={1} color="#7C5CFF" distance={9} decay={2} />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#ffffff" distance={8} decay={2} />

      {/* Inner dark sphere (gives wireframe depth) */}
      <mesh>
        <icosahedronGeometry args={[1.36, 1]} />
        <meshStandardMaterial
          color="#06070A"
          transparent
          opacity={0.92}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Main wireframe icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshStandardMaterial
          color="#00E0FF"
          wireframe
          transparent
          opacity={0.55}
          emissive="#00E0FF"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Subtle outer glow shell (very transparent; adds atmosphere) */}
      <mesh>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshStandardMaterial
          color="#00E0FF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          emissive="#00E0FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbital ring 1 — cyan, equatorial */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.009, 8, 90]} />
        <meshStandardMaterial
          color="#00E0FF"
          emissive="#00E0FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Orbital ring 2 — purple, tilted 45° */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.45, 0.006, 8, 110]} />
        <meshStandardMaterial
          color="#7C5CFF"
          emissive="#7C5CFF"
          emissiveIntensity={0.9}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Glowing core dot */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#00E0FF"
          emissive="#00E0FF"
          emissiveIntensity={2.5}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}
