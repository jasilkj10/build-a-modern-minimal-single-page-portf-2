/**
 * ====================================================================
 * THREE.JS 3D GLASS / CHROME PURPLE TORUS KNOT
 * ====================================================================
 * Interactive, glossy 3D abstract shape at the bottom of the hero.
 * Features:
 * - Dynamic procedural reflection environment for realistic glass/chrome sheen
 * - MeshPhysicalMaterial with transmission, clearcoat, and deep violet refraction
 * - Multi-colored studio lighting (lavender, electric purple, indigo, fuchsia)
 * - Orbiting glowing glass rings and floating atmospheric starlight particles
 * - Mouse-driven parallax tilt + click/touch drag-to-spin physics with damping
 * - Zero external texture dependencies, 60fps high performance
 * - Graceful animated CSS/SVG fallback if WebGL is unavailable
 * ====================================================================
 */

(function () {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  // WebGL Availability Check
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

  let scene, camera, renderer, knot, ring1, ring2, particles;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let animationFrameId;

  // Drag-to-spin interactivity
  let isDragging = false;
  let prevMouseX = 0, prevMouseY = 0;
  let dragVelocityX = 0, dragVelocityY = 0;
  let dragRotationX = 0, dragRotationY = 0;

  /**
   * Generates a procedural equirectangular reflection map
   * Creates lustrous studio specular highlights without external images
   */
  function createGradientEnvironment(webglRenderer) {
    try {
      const pmremGenerator = new THREE.PMREMGenerator(webglRenderer);
      pmremGenerator.compileEquirectangularShader();

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Base background: Deep cosmic navy and dark violet
      const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      baseGrad.addColorStop(0, '#04020a');
      baseGrad.addColorStop(0.35, '#16092e');
      baseGrad.addColorStop(0.7, '#240b47');
      baseGrad.addColorStop(1, '#05030f');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Studio light reflection spots (specular gleams)
      function drawGleam(x, y, radius, color) {
        const radial = ctx.createRadialGradient(x, y, 0, x, y, radius);
        radial.addColorStop(0, color);
        radial.addColorStop(0.4, color.replace(/[\d\.]+\)$/, '0.4)'));
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      drawGleam(240, 140, 180, 'rgba(255, 255, 255, 0.95)'); // Top white key glint
      drawGleam(450, 120, 220, 'rgba(233, 213, 255, 0.9)');  // Lavender soft glow
      drawGleam(800, 180, 240, 'rgba(192, 132, 252, 0.85)'); // Radiant violet
      drawGleam(120, 380, 200, 'rgba(99, 102, 241, 0.75)');  // Indigo fill reflection
      drawGleam(680, 360, 210, 'rgba(236, 72, 153, 0.65)');  // Fuchsia rim reflection

      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();
      return envMap;
    } catch (err) {
      console.warn('Could not generate PMREM envMap, using fallback lighting', err);
      return null;
    }
  }

  function init() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -0.15, 5.3);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Procedural Studio Environment Map
    const envMap = createGradientEnvironment(renderer);
    if (envMap) {
      scene.environment = envMap;
    }

    // 5. Geometry & Glass/Chrome Torus Knot Mesh
    // TorusKnotGeometry: radius 1.45, tube 0.44, tubularSegments 200, radialSegments 40, p=2, q=3
    const geometry = new THREE.TorusKnotGeometry(1.45, 0.42, 220, 42, 2, 3);

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#9333ea'),         // Rich royal purple
      emissive: new THREE.Color('#3b0764'),      // Deep internal violet glow
      emissiveIntensity: 0.35,
      roughness: 0.08,                          // Glass-like smooth surface
      metalness: 0.22,                          // Chrome iridescent sheen
      transmission: 0.68,                       // Optical glass transmission
      thickness: 2.2,                           // Refraction depth
      ior: 1.54,                                // Crown glass index of refraction
      reflectivity: 0.95,                       // Specular reflectivity
      clearcoat: 1.0,                           // Lacquer clearcoat for high gloss
      clearcoatRoughness: 0.06,                 // Sharp mirror highlights
      transparent: true,
      opacity: 0.94
    });

    knot = new THREE.Mesh(geometry, material);
    knot.position.set(0, -0.65, 0); // Positioned low so it's partly cropped at hero bottom
    scene.add(knot);

    // 6. Orbiting Glowing Glass Accent Rings
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.022, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.set(0, -0.65, 0);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.position.set(0, -0.65, 0);
    scene.add(ring2);

    // 7. Atmospheric Starlight Particle Cloud
    const particleCount = 65;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorLavender = new THREE.Color(0xe9d5ff);
    const colorPurple = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;

      const pick = Math.random();
      const c = pick < 0.5 ? colorLavender : pick < 0.85 ? colorPurple : colorCyan;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 8. Multi-point Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x1a0736, 3.0);
    scene.add(ambientLight);

    // Key front light: Lavender / White
    const keyLight = new THREE.PointLight(0xf5d0fe, 5.0, 25);
    keyLight.position.set(-3.5, 3.2, 4.0);
    scene.add(keyLight);

    // Electric Purple fill light from bottom right
    const fillLight = new THREE.PointLight(0xa855f7, 4.5, 25);
    fillLight.position.set(4.0, -2.5, 3.0);
    scene.add(fillLight);

    // Neon Indigo rim light
    const rimLightIndigo = new THREE.PointLight(0x6366f1, 4.5, 20);
    rimLightIndigo.position.set(-4.0, -2.0, -2.5);
    scene.add(rimLightIndigo);

    // Fuchsia specular backlight
    const rimLightPink = new THREE.PointLight(0xf472b6, 4.0, 18);
    rimLightPink.position.set(0, 3.5, -3.5);
    scene.add(rimLightPink);

    // 9. Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Drag-to-spin controls on the 3D container
    container.addEventListener('mousedown', onPointerDown, false);
    window.addEventListener('mouseup', onPointerUp, false);
    window.addEventListener('mousemove', onPointerMove, false);

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchend', onTouchEnd, false);
    window.addEventListener('touchmove', onTouchMoveEvent, { passive: false });

    // Start render loop
    animate(0);
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 480;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onDocumentMouseMove(event) {
    if (isDragging) return;
    mouseX = (event.clientX - windowHalfX) * 0.0006;
    mouseY = (event.clientY - windowHalfY) * 0.0006;
  }

  // Pointer drag interactions
  function onPointerDown(event) {
    isDragging = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
    dragVelocityX = 0;
    dragVelocityY = 0;
  }

  function onPointerMove(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;
    dragVelocityX = deltaX * 0.005;
    dragVelocityY = deltaY * 0.005;
    dragRotationY += dragVelocityX;
    dragRotationX += dragVelocityY;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  function onPointerUp() {
    isDragging = false;
  }

  function onTouchStart(event) {
    if (event.touches.length === 1) {
      isDragging = true;
      prevMouseX = event.touches[0].clientX;
      prevMouseY = event.touches[0].clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    }
  }

  function onTouchMoveEvent(event) {
    if (!isDragging || event.touches.length !== 1) return;
    const deltaX = event.touches[0].clientX - prevMouseX;
    const deltaY = event.touches[0].clientY - prevMouseY;
    dragVelocityX = deltaX * 0.006;
    dragVelocityY = deltaY * 0.006;
    dragRotationY += dragVelocityX;
    dragRotationX += dragVelocityY;
    prevMouseX = event.touches[0].clientX;
    prevMouseY = event.touches[0].clientY;
    mouseX = (event.touches[0].clientX - windowHalfX) * 0.0006;
    mouseY = (event.touches[0].clientY - windowHalfY) * 0.0006;
  }

  function onTouchEnd() {
    isDragging = false;
  }

  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    const time = timestamp * 0.001;

    // Smooth mouse parallax lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Drag inertia damping
    if (!isDragging) {
      dragVelocityX *= 0.94;
      dragVelocityY *= 0.94;
      dragRotationY += dragVelocityX;
      dragRotationX += dragVelocityY;
    }

    if (knot) {
      // Rotation: base slow elegant spin + drag rotation + mouse tilt
      knot.rotation.x = time * 0.28 + targetY + dragRotationX;
      knot.rotation.y = time * 0.38 + targetX + dragRotationY;
      knot.rotation.z = Math.sin(time * 0.25) * 0.2;

      // Soft hovering floating motion in vertical axis
      knot.position.y = -0.65 + Math.sin(time * 1.3) * 0.12;
    }

    if (ring1) {
      ring1.rotation.z = time * 0.2 + dragRotationY * 0.5;
      ring1.position.y = -0.65 + Math.sin(time * 1.3) * 0.12;
    }

    if (ring2) {
      ring2.rotation.z = -time * 0.16 + dragRotationX * 0.5;
      ring2.position.y = -0.65 + Math.sin(time * 1.3) * 0.12;
    }

    if (particles) {
      particles.rotation.y = time * 0.05;
      particles.rotation.x = Math.sin(time * 0.08) * 0.1;
    }

    renderer.render(scene, camera);
  }

  function renderCssFallback() {
    container.innerHTML = `
      <div class="relative w-full h-full flex items-end justify-center pb-0 pointer-events-none">
        <div class="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/40 via-violet-500/30 to-fuchsia-400/40 blur-3xl transform translate-y-1/3 animate-pulse"></div>
        <img src="assets/project-3.svg" class="w-72 sm:w-88 opacity-85 filter drop-shadow-[0_0_40px_rgba(168,85,247,0.5)] transform translate-y-14 animate-float" alt="3D Glass Shape" />
      </div>
    `;
  }

  // Lifecycle initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
