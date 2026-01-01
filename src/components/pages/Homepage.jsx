import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #16161f;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-subtle: rgba(255, 255, 255, 0.06);
  }

  body {
    background: var(--bg-primary);
    font-family: 'Inter', sans-serif;
  }

  /* Hero Section */
  .hero-section {
    min-height: 100vh;
    background: var(--bg-primary);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 6rem 0 4rem;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  }

  .hero-glow-1 {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%);
    top: -200px;
    left: -100px;
    filter: blur(60px);
  }

  .hero-glow-2 {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
    bottom: -100px;
    right: -100px;
    filter: blur(60px);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-purple-light);
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 900;
    color: white;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
  }

  .hero-title .gradient-text {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light), #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.15rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 540px;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .btn-hero-primary {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-hero-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.5);
  }

  .btn-hero-secondary {
    padding: 1rem 2rem;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-hero-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .hero-stats {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .hero-stat {
    text-align: left;
  }

  .hero-stat-value {
    font-size: 2.25rem;
    font-weight: 800;
    color: white;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .hero-stat-value span {
    color: var(--accent-purple);
  }

  .hero-stat-label {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .hero-image {
    position: relative;
  }

  .hero-card {
    background: linear-gradient(135deg, rgba(26, 26, 40, 0.9), rgba(20, 20, 32, 0.8));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  }

  .hero-card-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2), transparent 60%);
    filter: blur(40px);
    z-index: -1;
  }

  /* Features Section */
  .features-section {
    background: var(--bg-primary);
    padding: 6rem 0;
    position: relative;
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-purple-light);
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: white;
    margin-bottom: 1rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 3rem;
  }

  .feature-card {
    background: linear-gradient(135deg, rgba(22, 22, 31, 0.9), rgba(18, 18, 26, 0.8));
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 2rem;
    height: 100%;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-purple), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    font-size: 1.5rem;
    color: var(--accent-purple-light);
  }

  .feature-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
  }

  .feature-description {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* How It Works Section */
  .how-section {
    background: linear-gradient(180deg, var(--bg-primary), var(--bg-secondary));
    padding: 6rem 0;
  }

  .step-card {
    text-align: center;
    position: relative;
  }

  .step-number {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: 800;
    color: white;
    margin: 0 auto 1.5rem;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    position: relative;
    z-index: 1;
  }

  .step-connector {
    position: absolute;
    top: 40px;
    left: calc(50% + 50px);
    width: calc(100% - 100px);
    height: 2px;
    background: linear-gradient(90deg, var(--accent-purple), rgba(139, 92, 246, 0.3));
  }

  .step-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
  }

  .step-description {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 280px;
    margin: 0 auto;
  }

  /* Jobs Section */
  .jobs-section {
    background: var(--bg-secondary);
    padding: 6rem 0;
  }

  .job-card {
    background: linear-gradient(135deg, rgba(22, 22, 31, 0.95), rgba(18, 18, 26, 0.9));
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 1.75rem;
    height: 100%;
    transition: all 0.3s ease;
  }

  .job-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .job-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .job-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .job-badge.primary {
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple-light);
  }

  .job-badge.secondary {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .job-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-purple-light);
  }

  .job-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .job-company {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
  }

  .job-description {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .job-salary {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--success-green);
    margin-bottom: 1rem;
  }

  .job-apply-btn {
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    color: var(--accent-purple-light);
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .job-apply-btn:hover {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-color: var(--accent-purple);
    color: white;
  }

  /* Testimonials Section */
  .testimonials-section {
    background: var(--bg-primary);
    padding: 6rem 0;
  }

  .testimonial-card {
    background: linear-gradient(135deg, rgba(22, 22, 31, 0.9), rgba(18, 18, 26, 0.8));
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 2rem;
    height: 100%;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-4px);
  }

  .testimonial-quote {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .testimonial-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent-purple);
  }

  .testimonial-name {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.15rem;
  }

  .testimonial-role {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .testimonial-rating {
    display: flex;
    gap: 0.25rem;
    color: var(--warning-yellow);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, var(--accent-purple-dark), #4c1d95);
    padding: 5rem 0;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: white;
    margin-bottom: 1rem;
  }

  .cta-subtitle {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-cta-primary {
    padding: 1rem 2.5rem;
    background: white;
    border: none;
    border-radius: 12px;
    color: var(--accent-purple-dark);
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .btn-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .btn-cta-secondary {
    padding: 1rem 2.5rem;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .btn-cta-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }
`;

const Homepage = () => {
  const features = [
    { icon: "bi-shield-check", title: "Secure Payments", description: "Enterprise-grade protection with escrow payments and fraud prevention." },
    { icon: "bi-lightning-charge", title: "Fast Matching", description: "AI-powered matching connects you with the perfect projects in seconds." },
    { icon: "bi-cpu", title: "Smart Tools", description: "Built-in time tracking, invoicing, and project management tools." },
    { icon: "bi-globe", title: "Global Network", description: "Access clients and talent from over 150 countries worldwide." },
    { icon: "bi-graph-up-arrow", title: "Career Growth", description: "Skill assessments, certifications, and learning resources." },
    { icon: "bi-headset", title: "24/7 Support", description: "Dedicated support team ready to help you succeed." },
  ];

  const steps = [
    { number: "1", title: "Create Profile", description: "Sign up and build your professional profile in minutes." },
    { number: "2", title: "Find Projects", description: "Browse thousands of projects that match your skills." },
    { number: "3", title: "Submit Proposals", description: "Send customized proposals to win projects you love." },
    { number: "4", title: "Get Paid", description: "Complete work and receive secure, on-time payments." },
  ];

  const jobs = [
    { title: "Senior AI Engineer", company: "TechCorp Solutions", location: "San Francisco, CA", type: ["Remote", "Full-time"], salary: "$150K - $180K", description: "Lead the development of next-gen AI algorithms and machine learning models.", icon: "bi-cpu" },
    { title: "UX/UI Designer", company: "DesignHub Inc.", location: "Austin, TX", type: ["Hybrid", "Contract"], salary: "$110K - $130K", description: "Create stunning interfaces with focus on user experience and accessibility.", icon: "bi-palette" },
    { title: "Blockchain Developer", company: "CryptoVentures", location: "New York, NY", type: ["On-site", "Full-time"], salary: "$140K - $170K", description: "Build secure and scalable blockchain solutions for enterprise clients.", icon: "bi-box" },
    { title: "Data Scientist", company: "DataDriven Co.", location: "Seattle, WA", type: ["Remote", "Full-time"], salary: "$130K - $160K", description: "Analyze complex datasets and build predictive models for business insights.", icon: "bi-bar-chart" },
  ];

  const testimonials = [
    { quote: "JustFaiTech transformed my freelance career. The platform's AI matching connected me with amazing clients, and I've tripled my income in just 6 months.", name: "Sarah Chen", role: "Full Stack Developer", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5 },
    { quote: "As a client, finding quality talent has never been easier. The vetting process ensures we only work with top professionals who deliver exceptional results.", name: "Michael Roberts", role: "Startup Founder", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
    { quote: "The secure payment system gives me peace of mind. I know I'll get paid for my work, and the milestone feature keeps projects on track.", name: "Emily Johnson", role: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <style>{customStyles}</style>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid" />
        <motion.div
          className="hero-glow-1"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-glow-2"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="hero-badge">
                  <i className="bi bi-lightning-charge-fill" />
                  #1 Freelance Platform in 2024
                </span>
                <h1 className="hero-title">
                  Find Amazing <span className="gradient-text">Freelance</span> Talent & Projects
                </h1>
                <p className="hero-subtitle">
                  Connect with top freelancers and clients worldwide. Build your career,
                  grow your business, and unlock endless opportunities on the most innovative platform.
                </p>
                <div className="hero-buttons">
                  <Link to="/signup">
                    <motion.button
                      className="btn-hero-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started Free
                      <i className="bi bi-arrow-right" />
                    </motion.button>
                  </Link>
                  <Link to="/Jobs">
                    <motion.button
                      className="btn-hero-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="bi bi-play-circle" />
                      Browse Jobs
                    </motion.button>
                  </Link>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <div className="hero-stat-value">48K<span>+</span></div>
                    <div className="hero-stat-label">Active Freelancers</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-value">$2.4M<span>+</span></div>
                    <div className="hero-stat-label">Paid Monthly</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-value">98<span>%</span></div>
                    <div className="hero-stat-label">Satisfaction Rate</div>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <motion.div
                className="hero-image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="hero-card-glow" />
                <div className="hero-card">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-briefcase-fill text-white fs-5" />
                    </div>
                    <div>
                      <h5 className="text-white mb-0 fw-bold">New Project Available</h5>
                      <small className="text-muted">Posted 2 minutes ago</small>
                    </div>
                  </div>
                  <h4 className="text-white fw-bold mb-2">React Developer Needed</h4>
                  <p className="text-muted mb-3">Build a modern dashboard with real-time data visualization...</p>
                  <div className="d-flex gap-2 mb-3">
                    <span className="job-badge primary">React</span>
                    <span className="job-badge primary">TypeScript</span>
                    <span className="job-badge secondary">Remote</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold" style={{ color: '#10b981' }}>$75 - $100/hr</span>
                    <button className="btn btn-sm" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '8px' }}>Apply Now</button>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">
              <i className="bi bi-stars" />
              Why Choose Us
            </span>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="section-subtitle">
              Powerful tools and features designed to help freelancers and clients achieve their goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col md={6} lg={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <div className="feature-card">
                      <div className="feature-icon">
                        <i className={`bi ${feature.icon}`} />
                      </div>
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">
              <i className="bi bi-rocket-takeoff" />
              Getting Started
            </span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">
              Get started in minutes with our simple, streamlined process.
            </p>
          </motion.div>

          <Row>
            {steps.map((step, index) => (
              <Col md={6} lg={3} key={index} className="mb-4 mb-lg-0">
                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {index < 3 && <div className="step-connector d-none d-lg-block" />}
                  <motion.div
                    className="step-number"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section">
        <Container>
          <motion.div
            className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="section-badge">
                <i className="bi bi-fire" />
                Hot Jobs
              </span>
              <h2 className="section-title mb-0">Featured <span className="gradient-text">Opportunities</span></h2>
            </div>
            <Link to="/Jobs">
              <motion.button
                className="btn-hero-secondary"
                whileHover={{ scale: 1.02 }}
              >
                View All Jobs
                <i className="bi bi-arrow-right" />
              </motion.button>
            </Link>
          </motion.div>

          <Row className="g-4">
            {jobs.map((job, index) => (
              <Col md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="job-card">
                    <div className="job-header">
                      <div className="job-badges">
                        {job.type.map((t, i) => (
                          <span key={i} className={`job-badge ${i === 0 ? 'secondary' : 'primary'}`}>{t}</span>
                        ))}
                      </div>
                      <div className="job-icon">
                        <i className={`bi ${job.icon}`} />
                      </div>
                    </div>
                    <h4 className="job-title">{job.title}</h4>
                    <p className="job-company">{job.company} • {job.location}</p>
                    <p className="job-description">{job.description}</p>
                    <p className="job-salary">{job.salary}</p>
                    <Link to="/Job/next">
                      <motion.button
                        className="job-apply-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">
              <i className="bi bi-chat-quote" />
              Testimonials
            </span>
            <h2 className="section-title">What Our <span className="gradient-text">Users Say</span></h2>
            <p className="section-subtitle">
              Join thousands of satisfied freelancers and clients who trust our platform.
            </p>
          </motion.div>

          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill" />
                      ))}
                    </div>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <div className="testimonial-author">
                      <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                      <div>
                        <h6 className="testimonial-name">{testimonial.name}</h6>
                        <p className="testimonial-role">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container className="position-relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-subtitle">
              Join over 48,000 freelancers who are already building their dream careers on JustFaiTech.
            </p>
            <div className="cta-buttons">
              <Link to="/signup">
                <motion.button
                  className="btn-cta-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Freelancing Today
                </motion.button>
              </Link>
              <Link to="/Jobs">
                <motion.button
                  className="btn-cta-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Projects
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
