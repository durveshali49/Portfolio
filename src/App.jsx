import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Environment, Stars, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaWrench } from 'react-icons/fa';



const ModernBackground = () => {
    return (
        <group>
            {/* Pink Distorted Sphere */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Sphere args={[1.2, 64, 64]} position={[-3, 1, -2]}>
                    <MeshDistortMaterial
                        color="#ec4899"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
            {/* Purple Distorted Sphere */}
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                <Sphere args={[0.9, 64, 64]} position={[3, -1.5, -3]}>
                    <MeshDistortMaterial
                        color="#6d28d9"
                        attach="material"
                        distort={0.5}
                        speed={1.5}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </Sphere>
            </Float>
            {/* Blue Distorted Sphere */}
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[0.6, 64, 64]} position={[1, 2.5, -4]}>
                    <MeshDistortMaterial
                        color="#2563eb"
                        attach="material"
                        distort={0.3}
                        speed={3}
                        roughness={0.1}
                        metalness={1}
                    />
                </Sphere>
            </Float>
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
            <ModernBackground />
            <Environment preset="city" />
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
