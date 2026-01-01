import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .landing-page {
    min-height: 100vh;
    background: #030305;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    color: #ffffff;
  }

  /* Background Effects */
  .bg-gradient {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15), transparent),
      radial-gradient(ellipse 60% 50% at 0% 50%, rgba(139, 92, 246, 0.08), transparent),
      radial-gradient(ellipse 60% 50% at 100% 50%, rgba(124, 58, 237, 0.08), transparent);
    pointer-events: none;
    z-index: 0;
  }

  .floating-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  .orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    top: -200px;
    right: -150px;
  }

  .orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    bottom: 20%;
    left: -150px;
  }

  .orb-3 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    top: 60%;
    right: 5%;
    opacity: 0.2;
  }

  /* Navigation */
  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1rem 2rem;
    transition: all 0.3s ease;
  }

  .nav-container.scrolled {
    background: rgba(3, 3, 5, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .brand-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: white;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
  }

  .brand-text {
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
  }

  .brand-text span {
    background: linear-gradient(135deg, #a78bfa, #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .nav-link {
    color: #a1a1aa;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: white;
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .btn-login {
    padding: 0.625rem 1.25rem;
    color: #a1a1aa;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .btn-login:hover {
    color: white;
  }

  .btn-cta {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
  }

  .btn-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
  }

  /* Hero Section */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rem 2rem 4rem;
    position: relative;
    z-index: 1;
  }

  .hero-content {
    max-width: 900px;
    text-align: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 100px;
    color: #a78bfa;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .hero-badge i {
    font-size: 0.9rem;
  }

  .hero-title {
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
  }

  .hero-title .gradient-text {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa, #c4b5fd, #8b5cf6);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 4s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #71717a;
    max-width: 600px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .btn-primary-lg {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 14px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
    transition: all 0.3s ease;
  }

  .btn-primary-lg:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.45);
  }

  .btn-secondary-lg {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    color: #a1a1aa;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-secondary-lg:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
    border-color: rgba(255, 255, 255, 0.12);
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 4rem;
  }

  .hero-stat {
    text-align: center;
  }

  .hero-stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #8b5cf6;
    margin-bottom: 0.25rem;
  }

  .hero-stat-label {
    font-size: 0.85rem;
    color: #71717a;
    font-weight: 500;
  }

  /* Section Styles */
  .section {
    padding: 6rem 2rem;
    position: relative;
    z-index: 1;
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.875rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 100px;
    color: #a78bfa;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #71717a;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Features Grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .feature-card {
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.8), rgba(10, 10, 18, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.4s ease;
  }

  .feature-card:hover {
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  .feature-icon {
    width: 64px;
    height: 64px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #a78bfa;
    font-size: 1.75rem;
  }

  .feature-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .feature-desc {
    font-size: 0.95rem;
    color: #71717a;
    line-height: 1.7;
  }

  /* How It Works */
  .steps-section {
    background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.03), transparent);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    position: relative;
  }

  .steps-grid::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.3), transparent);
  }

  .step-card {
    text-align: center;
    position: relative;
  }

  .step-number {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.5rem;
    font-weight: 800;
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
    position: relative;
    z-index: 1;
  }

  .step-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .step-desc {
    font-size: 0.9rem;
    color: #71717a;
    line-height: 1.6;
  }

  /* Testimonials */
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .testimonial-card {
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.8), rgba(10, 10, 18, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    border-color: rgba(139, 92, 246, 0.15);
  }

  .testimonial-stars {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    color: #f59e0b;
  }

  .testimonial-text {
    font-size: 1rem;
    color: #a1a1aa;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .testimonial-avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
  }

  .testimonial-name {
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }

  .testimonial-role {
    font-size: 0.8rem;
    color: #71717a;
  }

  /* Pricing Section */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: center;
  }

  .pricing-card {
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.8), rgba(10, 10, 18, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 24px;
    padding: 2.5rem;
    transition: all 0.3s ease;
  }

  .pricing-card.featured {
    background: linear-gradient(145deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.1));
    border-color: rgba(139, 92, 246, 0.3);
    transform: scale(1.05);
    box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
  }

  .pricing-badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .pricing-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .pricing-price {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 0.25rem;
    letter-spacing: -0.02em;
  }

  .pricing-price span {
    font-size: 1rem;
    font-weight: 500;
    color: #71717a;
  }

  .pricing-desc {
    font-size: 0.9rem;
    color: #71717a;
    margin-bottom: 1.5rem;
  }

  .pricing-features {
    list-style: none;
    margin-bottom: 2rem;
  }

  .pricing-features li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-bottom: 0.75rem;
  }

  .pricing-features li i {
    color: #10b981;
  }

  .pricing-btn {
    width: 100%;
    padding: 0.875rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    text-decoration: none;
    display: block;
  }

  .pricing-btn.primary {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    color: white;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  }

  .pricing-btn.secondary {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #a1a1aa;
  }

  /* Waitlist CTA Section */
  .waitlist-section {
    background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.05));
  }

  .waitlist-card {
    max-width: 700px;
    margin: 0 auto;
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.95), rgba(10, 10, 18, 0.98));
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 32px;
    padding: 3rem;
    text-align: center;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  }

  .waitlist-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
  }

  .waitlist-subtitle {
    font-size: 1rem;
    color: #71717a;
    margin-bottom: 2rem;
  }

  .waitlist-form {
    display: flex;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .waitlist-input {
    flex: 1;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: white;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.3s ease;
  }

  .waitlist-input::placeholder {
    color: #71717a;
  }

  .waitlist-input:focus {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.05);
  }

  .waitlist-btn {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .waitlist-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.45);
  }

  .waitlist-note {
    font-size: 0.8rem;
    color: #71717a;
  }

  .waitlist-note i {
    color: #10b981;
    margin-right: 0.25rem;
  }

  /* Footer */
  .footer {
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    padding: 4rem 2rem 2rem;
    position: relative;
    z-index: 1;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-brand p {
    font-size: 0.9rem;
    color: #71717a;
    line-height: 1.7;
    margin-top: 1rem;
  }

  .footer-title {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
    color: #a1a1aa;
  }

  .footer-links {
    list-style: none;
  }

  .footer-links li {
    margin-bottom: 0.75rem;
  }

  .footer-links a {
    color: #71717a;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }

  .footer-links a:hover {
    color: #a78bfa;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .footer-copyright {
    font-size: 0.85rem;
    color: #71717a;
  }

  .footer-socials {
    display: flex;
    gap: 1rem;
  }

  .footer-socials a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #71717a;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer-socials a:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: #a78bfa;
  }

  /* Success State */
  .success-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 12px;
    color: #10b981;
    font-weight: 600;
    max-width: 500px;
    margin: 0 auto;
  }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .features-grid,
    .testimonials-grid,
    .pricing-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .steps-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }

    .steps-grid::before {
      display: none;
    }

    .pricing-card.featured {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-actions {
      flex-direction: column;
    }

    .hero-stats {
      flex-direction: column;
      gap: 1.5rem;
    }

    .features-grid,
    .testimonials-grid,
    .pricing-grid,
    .steps-grid {
      grid-template-columns: 1fr;
    }

    .nav-links {
      display: none;
    }

    .section-title {
      font-size: 2rem;
    }

    .waitlist-form {
      flex-direction: column;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
`;

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const features = [
    { icon: 'bi-lightning-charge-fill', title: 'Lightning Fast', desc: 'Find and hire top talent in minutes, not weeks. Our AI matches you with the perfect freelancers.' },
    { icon: 'bi-shield-check', title: 'Secure Payments', desc: 'Your funds are protected with escrow until you approve the work. Zero risk, total peace of mind.' },
    { icon: 'bi-robot', title: 'AI-Powered', desc: 'Smart recommendations, automated proposals, and intelligent project matching powered by AI.' },
    { icon: 'bi-graph-up-arrow', title: 'Analytics Dashboard', desc: 'Track your earnings, performance metrics, and growth with beautiful real-time analytics.' },
    { icon: 'bi-people-fill', title: 'Global Talent Pool', desc: 'Access vetted professionals from 150+ countries. Find the perfect skill match for any project.' },
    { icon: 'bi-chat-dots-fill', title: 'Real-time Collaboration', desc: 'Built-in chat, video calls, and file sharing. Work together seamlessly from anywhere.' },
  ];

  const steps = [
    { num: '1', title: 'Create Profile', desc: 'Set up your profile in under 2 minutes' },
    { num: '2', title: 'Get Matched', desc: 'AI finds perfect jobs or talent for you' },
    { num: '3', title: 'Collaborate', desc: 'Work together with integrated tools' },
    { num: '4', title: 'Get Paid', desc: 'Secure payments with milestone tracking' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Product Designer', text: '"JustFai transformed how I find clients. The AI matching is incredibly accurate and I\'ve tripled my income."', avatar: 'SC' },
    { name: 'Michael Park', role: 'Startup Founder', text: '"We built our entire MVP with freelancers from JustFai. The quality of talent here is unmatched."', avatar: 'MP' },
    { name: 'Emma Wilson', role: 'Full Stack Developer', text: '"The payment security and milestone system gives me confidence. Best platform I\'ve used."', avatar: 'EW' },
  ];

  const pricing = [
    { name: 'Starter', price: 'Free', desc: 'Perfect for getting started', features: ['5 proposals/month', 'Basic analytics', 'Email support', 'Standard matching'], featured: false },
    { name: 'Pro', price: '$29', desc: 'For serious freelancers', features: ['Unlimited proposals', 'Advanced analytics', 'Priority support', 'AI recommendations', 'Featured profile'], featured: true },
    { name: 'Business', price: '$99', desc: 'For teams and agencies', features: ['Team management', 'Custom branding', 'API access', 'Dedicated manager', 'Enterprise security'], featured: false },
  ];

  return (
    <>
      <style>{customStyles}</style>
      <div className="landing-page">
        {/* Background */}
        <div className="bg-gradient" />
        <motion.div className="floating-orb orb-1" animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="floating-orb orb-2" animate={{ y: [0, 25, 0], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="floating-orb orb-3" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Navigation */}
        <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-inner">
            <Link to="/" className="brand-logo">
              <div className="brand-icon"><i className="bi bi-lightning-charge-fill" /></div>
              <span className="brand-text">Just<span>Fai</span></span>
            </Link>
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
            </div>
            <div className="nav-buttons">
              <Link to="/login" className="btn-login">Sign In</Link>
              <Link to="/signup" className="btn-cta">Get Started</Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <i className="bi bi-stars" /> Launching Soon • Join 10,000+ on Waitlist
            </motion.div>
            <h1 className="hero-title">
              The Future of<br /><span className="gradient-text">Freelancing</span> is Here
            </h1>
            <p className="hero-subtitle">
              Connect with world-class talent, powered by AI. Build your dream team
              or launch your freelance career on the most innovative platform.
            </p>
            <div className="hero-actions">
              <motion.a href="#waitlist" className="btn-primary-lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <i className="bi bi-rocket-takeoff-fill" /> Join Waitlist
              </motion.a>
              <motion.a href="#features" className="btn-secondary-lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <i className="bi bi-play-circle" /> See How It Works
              </motion.a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="hero-stat-value">10K+</div><div className="hero-stat-label">Waitlist Members</div></div>
              <div className="hero-stat"><div className="hero-stat-value">150+</div><div className="hero-stat-label">Countries</div></div>
              <div className="hero-stat"><div className="hero-stat-value">$2M+</div><div className="hero-stat-label">Projects Value</div></div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="section" ref={featuresRef}>
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge"><i className="bi bi-gem" /> Features</span>
              <h2 className="section-title">Everything You Need to Succeed</h2>
              <p className="section-subtitle">Powerful tools designed to help both freelancers and businesses thrive in the modern economy.</p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div key={index} className="feature-card" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -8 }}>
                  <div className="feature-icon"><i className={feature.icon} /></div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="section steps-section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge"><i className="bi bi-lightning" /> How It Works</span>
              <h2 className="section-title">Start in Minutes</h2>
              <p className="section-subtitle">Getting started is simple. Follow these steps and begin your journey.</p>
            </div>
            <div className="steps-grid">
              {steps.map((step, index) => (
                <motion.div key={index} className="step-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                  <motion.div className="step-number" whileHover={{ scale: 1.1 }}>{step.num}</motion.div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge"><i className="bi bi-chat-quote" /> Testimonials</span>
              <h2 className="section-title">Loved by Thousands</h2>
              <p className="section-subtitle">Join thousands of satisfied freelancers and businesses already using our platform.</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, index) => (
                <motion.div key={index} className="testimonial-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill" />)}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">{t.role}</div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge"><i className="bi bi-tag" /> Pricing</span>
              <h2 className="section-title">Simple, Transparent Pricing</h2>
              <p className="section-subtitle">Choose the plan that fits your needs. All plans include core features.</p>
            </div>
            <div className="pricing-grid">
              {pricing.map((plan, index) => (
                <motion.div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  {plan.featured && <div className="pricing-badge">Most Popular</div>}
                  <h3 className="pricing-name">{plan.name}</h3>
                  <div className="pricing-price">{plan.price}<span>/month</span></div>
                  <p className="pricing-desc">{plan.desc}</p>
                  <ul className="pricing-features">
                    {plan.features.map((f, i) => <li key={i}><i className="bi bi-check-circle-fill" /> {f}</li>)}
                  </ul>
                  <a href="#waitlist" className={`pricing-btn ${plan.featured ? 'primary' : 'secondary'}`}>Get Started</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section id="waitlist" className="section waitlist-section">
          <div className="section-container">
            <motion.div className="waitlist-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="waitlist-title">Ready to Get Started?</h2>
              <p className="waitlist-subtitle">Join our waitlist and be the first to experience the future of freelancing.</p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form className="waitlist-form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <input type="email" className="waitlist-input" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <motion.button type="submit" className="waitlist-btn" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                      {loading ? <><div className="spinner" /> Joining...</> : <><i className="bi bi-arrow-right" /> Join Now</>}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div className="success-state" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <i className="bi bi-check-circle-fill" /> You're on the list! We'll be in touch soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="waitlist-note"><i className="bi bi-shield-check" /> No spam, ever. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              <div className="footer-brand">
                <Link to="/" className="brand-logo">
                  <div className="brand-icon"><i className="bi bi-lightning-charge-fill" /></div>
                  <span className="brand-text">Just<span>Fai</span></span>
                </Link>
                <p>The next generation freelancing platform powered by AI. Connect, collaborate, and succeed.</p>
              </div>
              <div>
                <h4 className="footer-title">Product</h4>
                <ul className="footer-links">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#waitlist">Join Waitlist</a></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Company</h4>
                <ul className="footer-links">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Legal</h4>
                <ul className="footer-links">
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copyright">© 2026 JustFai. All rights reserved.</p>
              <div className="footer-socials">
                <a href="#"><i className="bi bi-twitter-x" /></a>
                <a href="#"><i className="bi bi-linkedin" /></a>
                <a href="#"><i className="bi bi-github" /></a>
                <a href="#"><i className="bi bi-instagram" /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Waitlist;
