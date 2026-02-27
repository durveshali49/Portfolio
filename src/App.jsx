import { useEffect } from 'react';
import { initApp } from './script.js';

function App() {
  useEffect(() => {
    // Initialize animations and 3D scene
    initApp();
  }, []);

  return (
    <>
      

    {/*  Loader  */}
    <div className="loader">
        <h1 className="loader-text">INITIALIZING...</h1>
    </div>

    {/*  3D Canvas Background  */}
    <canvas id="webgl"></canvas>

    {/*  Custom Interaction Cursor  */}
    <div className="custom-cursor"></div>

    {/*  Minimalist Navigation  */}
    <nav className="nav">
        <div className="nav-logo magnetic">SD.</div>
        <div className="nav-links">
            <a href="#about" className="magnetic">About</a>
            <a href="#expertise" className="magnetic">Expertise</a>
            <a href="#achievements" className="magnetic">Achievements</a>
            <a href="#contact" className="magnetic">Contact</a>
        </div>
        <div className="nav-menu-btn magnetic">Menu</div>
    </nav>

    <div className="scroll-container">

        {/*  Hero Section  */}
        <header className="hero">
            <div className="hero-content">
                <div className="hero-title-wrap">
                    <h1 className="hero-title">SHAIK</h1>
                    <h1 className="hero-title outline">DURVESHALI</h1>
                </div>
                <div className="hero-subtitle">
                    <p>SOFTWARE ENGINEER &<br />CREATIVE DEVELOPER</p>
                    <div className="hero-scroll-indicator">
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </div>
        </header>

        {/*  About Section  */}
        <section id="about" className="about section">
            <div className="container">
                <h2 className="section-label">01 // ABOUT</h2>
                <div className="about-text-wrap">
                    <p className="about-text">
                        I bridge the gap between <span className="highlight">complex backend</span> architectures and <span
                            className="highlight">intuitive frontend</span> interfaces. A passionate engineer dedicated to
                        building scalable, high-performance solutions and pushing the boundaries of web experiences.
                    </p>
                </div>
            </div>
        </section>

        {/*  Expertise Section  */}
        <section id="expertise" className="expertise section">
            <div className="container">
                <h2 className="section-label">02 // EXPERTISE</h2>

                <div className="expertise-grid">
                    <div className="expertise-item">
                        <div className="expertise-header">
                            <h3>FRONTEND</h3>
                            <span className="icon">✧</span>
                        </div>
                        <p className="skill-list">React, Next.js, JavaScript, HTML5, flexbox CSS3, Tailwind CSS, Bootstrap
                        </p>
                    </div>

                    <div className="expertise-item">
                        <div className="expertise-header">
                            <h3>BACKEND</h3>
                            <span className="icon">✧</span>
                        </div>
                        <p className="skill-list">Node.js, Express.js, REST APIs, MongoDB, PostgreSQL</p>
                    </div>

                    <div className="expertise-item">
                        <div className="expertise-header">
                            <h3>AI & CLOUD</h3>
                            <span className="icon">✧</span>
                        </div>
                        <p className="skill-list">Machine Learning, Scikit-learn, AWS (EC2, S3), Docker, CI/CD</p>
                    </div>

                    <div className="expertise-item">
                        <div className="expertise-header">
                            <h3>TOOLS & OTHER</h3>
                            <span className="icon">✧</span>
                        </div>
                        <p className="skill-list">Git, GitHub, VS Code, Postman, Website SEO</p>
                    </div>
                </div>
            </div>
        </section>

        {/*  Achievements Section  */}
        <section id="achievements" className="achievements section">
            <div className="container">
                <h2 className="section-label">03 // ACHIEVEMENTS</h2>

                <div className="achievements-list">
                    <div className="achievement-row">
                        <div className="ach-year">CERTIFIED</div>
                        <div className="ach-title">MongoDB Associate Developer</div>
                        <div className="ach-desc">Official Certification</div>
                    </div>
                    <div className="achievement-row">
                        <div className="ach-year">FINALIST</div>
                        <div className="ach-title">SAP Hackfest</div>
                        <div className="ach-desc">Global Hackathon Status</div>
                    </div>
                    <div className="achievement-row">
                        <div className="ach-year">ENGINEER</div>
                        <div className="ach-title">Production-Grade Apps</div>
                        <div className="ach-desc">Professional Internship</div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Contact Section  */}
        <section id="contact" className="contact section">
            <div className="container">
                <h2 className="section-label">04 // CONNECT</h2>
                <div className="contact-wrap">
                    <h2 className="huge-text">LET'S WHISPER<br />TO THE MACHINES.</h2>
                    <p>I'm always interested in hearing about new projects and opportunities.</p>

                    <a href="mailto:shaikdurveshali49@gmail.com" className="magnetic-btn">
                        <div className="btn-text">shaikdurveshali49@gmail.com</div>
                    </a>
                </div>
            </div>
        </section>

        {/*  Footer  */}
        <footer className="footer">
            <div className="container footer-content">
                <p>© 2026 SHAIK DURVESHALI.</p>
                <div className="socials">
                    <a href="#" className="magnetic">GITHUB</a>
                    <a href="#" className="magnetic">LINKEDIN</a>
                </div>
            </div>
        </footer>

    </div>

    

    </>
  );
}

export default App;
