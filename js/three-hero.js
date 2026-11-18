/**
 * ====================================================================
 * THREE.JS 3D GLASS / CHROME PURPLE TORUS KNOT
 * ====================================================================
 * Interactive, glossy 3D abstract shape at the bottom of the hero.
 * Features transmission glass optics, dynamic point lighting,
 * smooth floating physics, and mouse tilt interactivity.
 */

(function () {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  // Check WebGL support
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable() || typeof THREE === 'undefined') {
    renderCssFallback();
    return;
  }

  let scene, camera, renderer, knot, innerRings, lights = [];
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let animationFrameId;

  function init() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 520;

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -0.2, 5.2);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Geometry & Material (Glass / Chrome Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.42, 180, 36, 2, 3);
    
    // MeshPhysicalMaterial gives glossy transmission, clearcoat and glass refraction
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#9333ea'),
      emissive: new THREE.Color('#3b0764'),
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.18,
      transmission: 0.72,
      thickness: 1.8,
      ior: 1.54,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.92
    });

    knot = new THREE.Mesh(geometry, material);
    knot.position.set(0, -0.6, 0); // Positioned lower so it's partly cropped at hero bottom
    scene.add(knot);

    // 5. Subtle orbiting glow ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    innerRings = new THREE.Mesh(ringGeo, ringMat);
    innerRings.rotation.x = Math.PI / 3;
    innerRings.position.set(0, -0.6, 0);
    scene.add(innerRings);

    // 6. Lighting setup
    const ambientLight = new THREE.AmbientLight(0x2e1065, 2.0);
    scene.add(ambientLight);

    // Violet top-left key light
    const keyLight = new THREE.PointLight(0xc084fc, 4.5, 20);
    keyLight.position.set(-3.5, 3.0, 3.5);
    scene.add(keyLight);
    lights.push(keyLight);

    // Indigo / Cyan bottom-right fill light
    const fillLight = new THREE.PointLight(0x6366f1, 4.0, 20);
    fillLight.position.set(3.5, -2.5, 2.5);
    scene.add(fillLight);
    lights.push(fillLight);

    // Back rim light (fuchsia specular reflection)
    const rimLight = new THREE.PointLight(0xf472b6, 3.0, 15);
    rimLight.position.set(0, 2.5, -3.0);
    scene.add(rimLight);
    lights.push(rimLight);

    // 7. Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animate
    animate(0);
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 520;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0008;
    mouseY = (event.clientY - windowHalfY) * 0.0008;
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - windowHalfX) * 0.0008;
      mouseY = (event.touches[0].clientY - windowHalfY) * 0.0008;
    }
  }

  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    const time = timestamp * 0.001;

    // Smooth mouse follow (lerp)
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    if (knot) {
      // Slow elegant rotation
      knot.rotation.x = time * 0.35 + targetY;
      knot.rotation.y = time * 0.45 + targetX;
      knot.rotation.z = Math.sin(time * 0.2) * 0.2;

      // Soft hovering floating motion
      knot.position.y = -0.6 + Math.sin(time * 1.2) * 0.12;
    }

    if (innerRings) {
      innerRings.rotation.z = time * 0.2;
      innerRings.position.y = -0.6 + Math.sin(time * 1.2) * 0.12;
    }

    renderer.render(scene, camera);
  }

  function renderCssFallback() {
    container.innerHTML = `
      <div class="relative w-full h-full flex items-end justify-center pb-0 pointer-events-none">
        <div class="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/40 via-violet-500/30 to-fuchsia-400/40 blur-3xl transform translate-y-1/3 animate-pulse"></div>
        <img src="assets/project-3.svg" class="w-64 sm:w-80 opacity-80 filter drop-shadow-[0_0_35px_rgba(168,85,247,0.5)] transform translate-y-12 animate-float" alt="3D Glass Shape" />
      </div>
    `;
  }

  // Load when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
