import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Environment, Stars, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaWrench } from 'react-icons/fa';

// 3D Eyes Component
const Eye = ({ position }) => {
    const groupRef = useRef();
    const pupilRef = useRef();
    const topEyelidRef = useRef();
    const bottomEyelidRef = useRef();

    // Initial position for the pupil target
    const pupilTarget = useRef(new THREE.Vector2(0, 0));

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const { pointer } = state;

        let blinkProgress = 0;
        const blinkCycle = t % 5; // blink every 5 seconds
        if (blinkCycle < 0.15) {
            blinkProgress = Math.sin((blinkCycle / 0.15) * Math.PI); // 0 to 1 to 0
        } else if (blinkCycle > 2 && blinkCycle < 2.3) {
            // slow double blink
            blinkProgress = Math.sin(((blinkCycle - 2) / 0.3) * Math.PI);
        }

        // clamp blinkProgress
        blinkProgress = Math.max(0, Math.min(1, blinkProgress));

        if (topEyelidRef.current) {
            topEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
                -Math.PI / 2.2, // open (tucked back)
                0.2,            // closed (past middle)
                blinkProgress
            );
        }

        if (bottomEyelidRef.current) {
            bottomEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
                Math.PI + Math.PI / 2.2, // open
                Math.PI - 0.2,           // closed
                blinkProgress
            );
        }

        if (pupilRef.current) {
            // Update target smoothly
            pupilTarget.current.x = THREE.MathUtils.lerp(pupilTarget.current.x, pointer.x, 0.1);
            pupilTarget.current.y = THREE.MathUtils.lerp(pupilTarget.current.y, pointer.y, 0.1);

            const lookX = pupilTarget.current.x * 0.8;
            const lookY = pupilTarget.current.y * 0.8;
            const distanceSq = lookX ** 2 + lookY ** 2;
            // The Z needs to represent a correct sphere surface mapping
            const lookZ = Math.sqrt(Math.max(0, 1 - distanceSq));

            // Distance from center of eye to center of iris = 0.75 to sink it in
            pupilRef.current.position.set(lookX * 0.75, lookY * 0.75, lookZ * 0.75);

            // Align local Z axis to point outward
            const dir = new THREE.Vector3(lookX, lookY, lookZ).normalize();
            pupilRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
        }

        if (groupRef.current) {
            // slight overall movement to look more alive
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.3, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.3, 0.05);
        }
    });

    const eyelidColor = "#050510"; // very dark blue/black background match
    const scleraColor = "#f8fafc";
    const irisColor = "#ec4899"; // pink theme match

    return (
        <group position={position} ref={groupRef} scale={1.5}>
            {/* Sclera */}
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial color={scleraColor} roughness={0.2} metalness={0.1} />
            </mesh>

            {/* Pupil & Iris Group */}
            <group ref={pupilRef}>
                {/* Iris */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color={irisColor} roughness={0.3} metalness={0.4} />
                </mesh>
                {/* Pupil Center */}
                <mesh position={[0, 0, 0.25]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
                </mesh>
                {/* Specular */}
                <mesh position={[0.12, 0.12, 0.35]}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[-0.08, -0.08, 0.38]}>
                    <sphereGeometry args={[0.02, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Top Eyelid */}
            <mesh ref={topEyelidRef}>
                <sphereGeometry args={[1.02, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={eyelidColor} roughness={0.9} metalness={0.1} side={THREE.DoubleSide} />
            </mesh>

            {/* Bottom Eyelid */}
            <mesh ref={bottomEyelidRef}>
                <sphereGeometry args={[1.02, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={eyelidColor} roughness={0.9} metalness={0.1} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

const EyesBackground = () => {
    return (
        <group position={[0, 0, 0]}>
            <Eye position={[-2.2, 0, 0]} />
            <Eye position={[2.2, 0, 0]} />
        </group>
    );
};

const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={2} color="#ec4899" />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow color="#2563eb" />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <EyesBackground />
            <Environment preset="night" />
        </>
    );
};

function App() {
    return (
        <div className="app-container">
            {/* 3D Canvas Background fixed behind */}
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Scene />
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
            </div>

            {/* HTML Content Overlay */}
            <div className="content-layer">

                <nav>
                    <div className="logo">SHAIK DURVESHALI</div>
                    <div className="nav-links">
                        <a href="#home">Home</a>
                        <a href="#expertise">Expertise</a>
                        <a href="#contact">Contact</a>
                    </div>
                </nav>

                <section id="home" className="hero">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h1>
                            SOFTWARE<br />
                            <span>ENGINEER</span>
                        </h1>
                        <p>
                            Bridging the gap between complex backend architectures and intuitive frontend interfaces. High-end, premium digital experiences powered by Next.js, Node.js, and Three.js.
                        </p>
                        <div className="hero-buttons">
                            <a href="#expertise" className="btn primary">View Expertise</a>
                            <a href="#contact" className="btn secondary">Get in Touch</a>
                        </div>
                    </motion.div>
                </section>

                <section id="expertise">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        Capabilities
                    </motion.h2>

                    <div className="skills-grid">
                        {[
                            { title: "Frontend Engineering", icon: <FaCode size={24} color="#ec4899" />, desc: "Building fluid 3D experiences, animated interfaces, and accessible design systems using React, Next.js, and Three.js." },
                            { title: "Backend Architecture", icon: <FaServer size={24} color="#6d28d9" />, desc: "Designing robust, scalable RESTful APIs, serverless functions, and optimized database schemas with Node.js and PostgreSQL." },
                            { title: "AI & Cloud Integration", icon: <FaWrench size={24} color="#2563eb" />, desc: "Implementing intelligent features, deploying highly available services via AWS, Docker, and CI/CD pipelines." }
                        ].map((skill, i) => (
                            <motion.div
                                className="skill-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            >
                                <h3>{skill.icon} {skill.title}</h3>
                                <p>{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="contact" style={{ minHeight: '80vh', textAlign: 'center', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 6vw, 5rem)' }}>Let's Build Mvps</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px' }}>
                            Currently open for new opportunities to build premium web applications and scalable products.
                        </p>
                        <a href="mailto:shaikdurveshali49@gmail.com" className="btn primary" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem' }}>
                            hello@durveshali.com
                        </a>
                    </motion.div>
                </section>

                <footer>
                    <div className="logo" style={{ fontSize: '1.2rem' }}>SHAIK © 2026</div>
                    <div className="social-links">
                        <a href="https://github.com/durveshali49" target="_blank" rel="noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com/in/shaikdurveshali49" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        <a href="mailto:shaikdurveshali49@gmail.com"><FaEnvelope /></a>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default App;
