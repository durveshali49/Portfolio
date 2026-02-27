export function initApp() {

    // --- 1. Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, .magnetic, .achievement-row, .expertise-item');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // --- 2. Magnetic Elements ---
    const magnetics = document.querySelectorAll('.magnetic, .magnetic-btn');
    magnetics.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const boundingRect = elem.getBoundingClientRect();
            const x = e.clientX - boundingRect.left - boundingRect.width / 2;
            const y = e.clientY - boundingRect.top - boundingRect.height / 2;

            gsap.to(elem, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.8,
                ease: "power3.out"
            });
        });
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- 3. GSAP Interactions & Scroll Reveal ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Load Sequence
    gsap.to('.loader', {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.2, // Shortened delay
        onComplete: () => {
            document.body.classList.remove('loading');
            ScrollTrigger.refresh();

            // Hero Title Entrance
            gsap.from('.hero-title', {
                y: 100,
                opacity: 0,
                stagger: 0.15,
                duration: 1.5,
                ease: "power4.out"
            });
            gsap.from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.4,
                ease: "power3.out"
            });
            gsap.from('.nav', {
                y: -50,
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: "power3.out"
            });
        }
    });

    // Elegant text splitting for About Section
    const splitTextForAnimation = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return [];
        const text = el.innerHTML;
        // Basic split by words maintaining span tags
        // Normally specialized plug-ins do this, but we'll use a simple CSS trick
        el.style.opacity = 1;
        return el;
    };

    // Scroll Animations
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.from(label, {
            scrollTrigger: {
                trigger: label,
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.fromTo('.about-text',
        { y: 80, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.about',
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out"
        }
    );

    gsap.fromTo('.expertise-item',
        { y: 60, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.expertise',
                start: "top 80%"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    gsap.fromTo('.achievement-row',
        { x: -40, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.achievements',
                start: "top 85%"
            },
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }
    );


    // --- 4. ADVANCED THREE.JS SCENE (Organic Fluid Particle Wave) ---
    const initThreeJS = () => {
        const canvas = document.getElementById('webgl');
        const scene = new THREE.Scene();

        // Deep atmosphere fog matching the background
        scene.fog = new THREE.FogExp2(0x050505, 0.0008);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        camera.position.y = 300;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Geometry setup for wave
        const SEPARATION = 45, AMOUNTX = 120, AMOUNTY = 120;
        const numParticles = AMOUNTX * AMOUNTY;
        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0, j = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                positions[i + 1] = 0;
                positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scales[j] = 1;
                i += 3;
                j++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        // Custom Shader Material for glowing organic dots
        const material = new THREE.ShaderMaterial({
            uniforms: {
                // High contrast neon color for the wave
                color: { value: new THREE.Color(0xccff00) },
            },
            vertexShader: `
                attribute float scale;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    // Dynamically size dots based on depth
                    gl_PointSize = scale * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                void main() {
                    // Create soft circular particles instead of harsh squares
                    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.45) discard;
                    gl_FragColor = vec4(color, 0.6);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        // Slightly tilt the wave to flow nicely in background
        particles.rotation.x = -Math.PI / 8;
        scene.add(particles);

        // Interactive Parallax setup
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        let scrollY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;
        });

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        const simplex = new SimplexNoise();
        let timeCount = 0;

        // Render Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Smooth parallax camera movement based on mouse
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;

            // Camera diving effect on scroll
            camera.position.z = 1000 - (scrollY * 0.4);
            camera.position.y = 300 + (scrollY * 0.2);
            camera.lookAt(scene.position);

            const poss = particles.geometry.attributes.position.array;
            const scas = particles.geometry.attributes.scale.array;

            let i = 0, j = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    // Utilize 3D simplex noise to create a highly organic, non-repeating wave
                    const noise = simplex.noise3D(ix * 0.04, iy * 0.04, timeCount * 0.015);

                    poss[i + 1] = noise * 120; // Y amplitude

                    // Increase scale of dots when they peak
                    scas[j] = (noise + 1.2) * 2.5;

                    i += 3;
                    j++;
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.scale.needsUpdate = true;

            timeCount += 0.5;

            renderer.render(scene, camera);
        };

        animate();

        // Responsive handling
        window.addEventListener('resize', () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    // Lazy load the noise library, then init ThreeJS scene
    if (typeof SimplexNoise === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js";
        script.onload = initThreeJS;
        document.head.appendChild(script);
    } else {
        initThreeJS();
    }

}
