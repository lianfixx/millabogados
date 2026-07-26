// MILLA ABOGADOS — "Equilibrio 01": escultura 3D con PBR marble & gold + 360° cursor parallax.
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EquilibrioSculpture({ mouseSensitivity = 1.2 }) {
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, mouse.x * 0.5 * mouseSensitivity, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, mouse.y * 0.3 * mouseSensitivity, 3, delta);
    }
  });

  // Ivory marble PBR material
  const marbleMat = new THREE.MeshPhysicalMaterial({
    color: '#fffdf7', roughness: 0.35, metalness: 0.05,
    clearcoat: 0.1, clearcoatRoughness: 0.4
  });

  // Polished gold PBR material
  const goldMat = new THREE.MeshPhysicalMaterial({
    color: '#c5942e', roughness: 0.15, metalness: 0.95,
    clearcoat: 0.05, emissive: '#8d5d16', emissiveIntensity: 0.2
  });

  return (
    <group ref={groupRef}>
      {/* Base platform — marble */}
      <mesh position={[0, -3.5, 0]} rotation={[0, Math.PI / 6, 0]} material={marbleMat} castShadow receiveShadow>
        <cylinderGeometry args={[4.5, 5, 0.6, 6]} />
      </mesh>
      {/* Back slab — marble */}
      <mesh position={[-1.8, 1.5, -2]} rotation={[0.1, -0.25, 0.1]} material={marbleMat} castShadow receiveShadow>
        <boxGeometry args={[2.5, 9, 1.2]} />
      </mesh>
      {/* Left gold blade */}
      <mesh position={[-1, 0, 1]} rotation={[-0.15, 0.5, 0.15]} material={goldMat} castShadow receiveShadow>
        <boxGeometry args={[0.15, 7, 3]} />
      </mesh>
      {/* Right gold blade */}
      <mesh position={[1.5, 0.5, 2]} rotation={[0.1, -0.4, -0.15]} material={goldMat} castShadow receiveShadow>
        <boxGeometry args={[0.15, 6, 2.5]} />
      </mesh>
      {/* Spire — marble */}
      <mesh position={[2.2, 1.8, -1.5]} rotation={[-0.05, 0.1, -0.05]} material={marbleMat} castShadow receiveShadow>
        <boxGeometry args={[1, 8.5, 1]} />
      </mesh>
      {/* Gold rings */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMat}>
        <torusGeometry args={[2.8, 0.15, 16, 32]} />
      </mesh>
    </group>
  );
}
