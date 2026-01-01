import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";

const footerStyles = `
  .premium-footer {
    background: linear-gradient(180deg, #0a0a0f 0%, #030305 100%);
    border-top: 1px solid rgba(139, 92, 246, 0.1);
    padding: 4rem 0 0;
    position: relative;
    overflow: hidden;
  }

  .footer-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .footer-glow-1 { top: -300px; left: -200px; }
  .footer-glow-2 { bottom: -300px; right: -200px; }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 992px) {
    .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  }

  @media (max-width: 576px) {
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
    .premium-footer { padding: 2.5rem 0 0; }
    .footer-brand-socials { justify-content: center; }
    .footer-links { display: flex; flex-direction: column; align-items: center; }
    .newsletter-form { flex-direction: column; }
    .newsletter-form input, .newsletter-form button { width: 100%; }
  }

  .footer-brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .footer-brand-icon {
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

  .footer-brand-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
  }

  .footer-brand-text span {
    background: linear-gradient(135deg, #a78bfa, #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .footer-brand-desc {
    color: #71717a;
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    max-width: 280px;
  }

  @media (max-width: 576px) {
    .footer-brand-logo { justify-content: center; }
    .footer-brand-desc { max-width: 100%; margin: 0 auto 1.5rem; }
  }

  .footer-brand-socials {
    display: flex;
    gap: 0.75rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a1a1aa;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.4);
    color: #a78bfa;
    transform: translateY(-3px);
  }

  .footer-column-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li { margin-bottom: 0.75rem; }

  .footer-links a {
    color: #71717a;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-links a:hover {
    color: #a78bfa;
    transform: translateX(4px);
  }

  .newsletter-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .newsletter-desc {
    color: #71717a;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .newsletter-form {
    display: flex;
    gap: 0.5rem;
  }

  .newsletter-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.3s ease;
  }

  .newsletter-form input::placeholder { color: #52525b; }

  .newsletter-form input:focus {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.05);
  }

  .newsletter-form button {
    padding: 0.75rem 1.25rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .newsletter-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
  }

  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent);
    margin-bottom: 1.5rem;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 576px) {
    .footer-bottom { flex-direction: column; text-align: center; }
  }

  .footer-copyright {
    color: #52525b;
    font-size: 0.85rem;
  }

  .footer-legal {
    display: flex;
    gap: 2rem;
  }

  .footer-legal a {
    color: #71717a;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s ease;
  }

  .footer-legal a:hover { color: #a78bfa; }
`;

function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="premium-footer">
        <div className="footer-glow footer-glow-1" />
        <div className="footer-glow footer-glow-2" />

        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand-logo">
                <div className="footer-brand-icon">
                  <i className="bi bi-lightning-charge-fill" />
                </div>
                <span className="footer-brand-text">JUSTFAI<span>TECH</span></span>
              </div>
              <p className="footer-brand-desc">
                Pioneering the future of freelancing with innovative solutions
                connecting talent with opportunity.
              </p>
              <div className="footer-brand-socials">
                {[
                  { icon: "bi-twitter-x", href: "#" },
                  { icon: "bi-linkedin", href: "#" },
                  { icon: "bi-github", href: "#" },
                  { icon: "bi-instagram", href: "#" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="social-link"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`bi ${social.icon}`} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-links">
                {["About Us", "Careers", "Partners", "Blog", "Press Kit"].map((link, i) => (
                  <li key={i}><Link to="#">{link}</Link></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="footer-column-title">Resources</h4>
              <ul className="footer-links">
                {["Help Center", "Documentation", "API Reference", "Community", "Tutorials"].map((link, i) => (
                  <li key={i}><Link to="#">{link}</Link></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-desc">Get the latest updates and news.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" />
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <i className="bi bi-send-fill" />
                </motion.button>
              </form>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} JustFaiTech. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
