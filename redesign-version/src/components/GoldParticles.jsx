// MILLA ABOGADOS — 160 floating gold dust particles with 3D drift.
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GoldParticles({ count = 160 }) {
  const pointsRef = useRef();
  const { positions, scales, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 2;
      pos[i * 3 + 2] = r * Math.cos(phi);
      scl[i] = Math.random() * 0.5 + 0.5;
      phs[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, scales: scl, phases: phs };
  }, [count]);

  // Radial glow texture for particles
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,241,180,1)');
    gradient.addColorStop(0.3, 'rgba(231,198,111,0.8)');
    gradient.addColorStop(0.7, 'rgba(197,150,50,0.1)');
    gradient.addColorStop(1, 'rgba(197,150,50,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      const pos = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(clock.getElapsedTime() * 0.5 + phases[i]) * 0.003;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.18} map={texture} color="#e6bd5d" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}
