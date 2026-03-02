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


    // --- 4. ADVANCED THREE.JS SCENE (Fresh 3D Geometry) ---
    const initThreeJS = () => {
        const canvas = document.getElementById('webgl');
        const scene = new THREE.Scene();

        scene.fog = new THREE.FogExp2(0x050505, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 800;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const objectGroup = new THREE.Group();
        scene.add(objectGroup);

        // Core Torus Knot
        const tkGeometry = new THREE.TorusKnotGeometry(120, 35, 200, 32);
        const tkMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xccff00,
            metalness: 0.1,
            roughness: 0.1,
            transparent: true,
            opacity: 0.85,
            clearcoat: 1.0,
            clearcoatRoughness: 0.2
        });
        const torusKnot = new THREE.Mesh(tkGeometry, tkMaterial);
        objectGroup.add(torusKnot);

        // Solid Core shape
        const coreGeom = new THREE.IcosahedronGeometry(75, 0);
        const coreMat = new THREE.MeshPhysicalMaterial({
            color: 0x222222,
            metalness: 0.8,
            roughness: 0.4,
            clearcoat: 1.0
        });
        const coreShape = new THREE.Mesh(coreGeom, coreMat);
        objectGroup.add(coreShape);

        // Floating Dust
        const particleCount = 600;
        const pGeometry = new THREE.BufferGeometry();
        const pPositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            pPositions[i] = (Math.random() - 0.5) * 2000;
        }
        pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            opacity: 0.4
        });
        const particles = new THREE.Points(pGeometry, pMaterial);
        objectGroup.add(particles);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xccff00, 2, 1200);
        pointLight1.position.set(300, 300, 200);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00ccff, 2, 1200);
        pointLight2.position.set(-300, -300, 200);
        scene.add(pointLight2);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        let scrollY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - windowHalfX);
            mouseY = (e.clientY - windowHalfY);
        });

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            objectGroup.rotation.y += 0.05 * (targetX - objectGroup.rotation.y);
            objectGroup.rotation.x += 0.05 * (targetY - objectGroup.rotation.x);

            torusKnot.rotation.y = elapsedTime * 0.2;
            torusKnot.rotation.x = elapsedTime * 0.1;

            coreShape.rotation.y = -elapsedTime * 0.3;
            coreShape.rotation.x = elapsedTime * 0.2;

            particles.rotation.y = elapsedTime * 0.05;

            camera.position.z = 800 - (scrollY * 0.3);
            camera.position.y = -(scrollY * 0.2);
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

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
