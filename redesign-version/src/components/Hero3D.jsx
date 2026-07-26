// MILLA ABOGADOS — Hero section with R3F Canvas and 3D sculpture.
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EquilibrioSculpture } from './EquilibrioSculpture';
import { GoldParticles } from './GoldParticles';
import { PerspectiveCamera } from '@react-three/drei';

function Hero3DFallback() {
  return <div className="hero-fallback">Cargando experiencia 3D...</div>;
}

export function Hero3D() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Firma jurídica boutique</p>
          <h1 className="hero-title">Estrategia jurídica<span>con rigor, claridad</span><span>y visión.</span></h1>
          <p className="hero-description">Acompañamos a personas y organizaciones con atención cercana, análisis responsable y soluciones construidas para cada asunto.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#asesoria-virtual">Agendar consulta ↗</a>
            <a className="button button-secondary" href="#firma">Conocer la firma</a>
          </div>
        </div>
        <div className="hero-art">
          <Suspense fallback={<Hero3DFallback />}>
            <Canvas gl={{ antialias: true, alpha: true }} style={{ position: 'absolute', inset: 0 }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5.8]} fov={45} />
              <ambientLight intensity={0.8} color="#fffdf7" />
              <directionalLight position={[5, 10, 8]} intensity={1.5} color="#fff8d8" castShadow />
              <directionalLight position={[-8, -2, -4]} intensity={0.6} color="#c9bcaa" />
              <pointLight position={[0, 4, 2]} intensity={2} color="#e6bd5d" />
              <EquilibrioSculpture mouseSensitivity={1.2} />
              <GoldParticles count={160} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
