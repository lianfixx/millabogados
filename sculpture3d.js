// Escultura 3D interactiva para MILLA ABOGADOS. Three.js con WebGL + fallback SVG.
export default async function init(containerElement) {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) { console.warn('WebGL not supported. Falling back to SVG.'); return () => {}; }
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let THREE;
  try { THREE = await import('https://unpkg.com/three@0.170.0/build/three.module.js'); }
  catch (err) { console.error('Failed to load Three.js, falling back to SVG', err); return () => {}; }

  const svg = containerElement.querySelector('svg');
  if (svg) { svg.style.transition = 'opacity 0.5s ease'; svg.style.opacity = '0'; setTimeout(() => { svg.style.display = 'none'; }, 500); }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, containerElement.clientWidth / containerElement.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 16);
  const renderer = new THREE.WebGLRenderer({ antialias: window.innerWidth > 768, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  Object.assign(renderer.domElement.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '2' });
  containerElement.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xfffdf7, 0.8); scene.add(ambientLight);
  const mainLight = new THREE.DirectionalLight(0xfff8d8, 1.5); mainLight.position.set(5, 10, 8); mainLight.castShadow = true; scene.add(mainLight);
  const fillLight = new THREE.DirectionalLight(0xc9bcaa, 0.6); fillLight.position.set(-8, -2, -4); scene.add(fillLight);
  const goldHighlight = new THREE.PointLight(0xe6bd5d, 2, 20); goldHighlight.position.set(0, 4, 2); scene.add(goldHighlight);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new THREE.Scene()).texture;

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xfffdf7, roughness: 0.85, metalness: 0.1 });
  const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xc5942e, roughness: 0.15, metalness: 0.95, emissive: 0x8d5d16, emissiveIntensity: 0.3 });
  const sculptureGroup = new THREE.Group(); scene.add(sculptureGroup);

  const createMesh = (geometry, material) => { const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = true; mesh.receiveShadow = true; return mesh; };
  const backGeo = new THREE.BoxGeometry(2.5, 9, 1.2); const backSlab = createMesh(backGeo, stoneMaterial); backSlab.position.set(-1.8, 1.5, -2); sculptureGroup.add(backSlab);
  const baseGeo = new THREE.CylinderGeometry(4.5, 5, 0.6, 6); const basePlatform = createMesh(baseGeo, stoneMaterial); basePlatform.position.set(0, -3.5, 0); sculptureGroup.add(basePlatform);
  const leftBladeGeo = new THREE.BoxGeometry(0.15, 7, 3); const leftBlade = createMesh(leftBladeGeo, goldMaterial); leftBlade.position.set(-1, 0, 1); sculptureGroup.add(leftBlade);
  const rightBladeGeo = new THREE.BoxGeometry(0.15, 6, 2.5); const rightBlade = createMesh(rightBladeGeo, goldMaterial); rightBlade.position.set(1.5, 0.5, 2); sculptureGroup.add(rightBlade);
  const spireGeo = new THREE.BoxGeometry(1, 8.5, 1); const spire = createMesh(spireGeo, stoneMaterial); spire.position.set(2.2, 1.8, -1.5); sculptureGroup.add(spire);
  const planeGeo = new THREE.PlaneGeometry(30, 30); const ground = new THREE.Mesh(planeGeo, new THREE.ShadowMaterial({ opacity: 0.15 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -3.8; ground.receiveShadow = true; scene.add(ground);

  const particlesCount = 70; const particlesGeo = new THREE.BufferGeometry(); const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount; i++) { const r = 4 + Math.random() * 5; const theta = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1); posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta); posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 2; posArray[i * 3 + 2] = r * Math.cos(phi); }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({ size: 0.18, color: 0xe6bd5d, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
  const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
  if (!prefersReducedMotion) scene.add(particlesMesh);

  let mouseX = 0, mouseY = 0, isVisible = true;
  const parts = [backSlab, basePlatform, leftBlade, rightBlade, spire];
  const initialTransforms = parts.map(p => ({ x: p.position.x, y: p.position.y, z: p.position.z, rx: p.rotation.x, ry: p.rotation.y, rz: p.rotation.z }));
  if (!prefersReducedMotion) { parts.forEach(p => { p.position.y -= 4; p.position.z -= 6; }); }

  const onMouseMove = (e) => { mouseX = (e.clientX / window.innerWidth) * 2 - 1; mouseY = -(e.clientY / window.innerHeight) * 2 + 1; };
  if (!prefersReducedMotion) { window.addEventListener('mousemove', onMouseMove, { passive: true }); }

  const observer = new IntersectionObserver((entries) => { isVisible = entries[0].isIntersecting; }); observer.observe(containerElement);
  const clock = new THREE.Clock(); let animationId;
  const animate = () => { animationId = requestAnimationFrame(animate); if (!isVisible) return; const time = clock.getElapsedTime(); if (!prefersReducedMotion) { sculptureGroup.rotation.y += (mouseX * 0.14 - sculptureGroup.rotation.y) * 0.05; sculptureGroup.rotation.x += (mouseY * 0.1 - sculptureGroup.rotation.x) * 0.05; particlesMesh.rotation.y = time * 0.04; } renderer.render(scene, camera); };
  animate();

  return () => { cancelAnimationFrame(animationId); window.removeEventListener('mousemove', onMouseMove); observer.disconnect(); renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); if (svg) { svg.style.display = ''; svg.style.opacity = '1'; } };
}
