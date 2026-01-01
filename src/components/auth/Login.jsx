import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg-primary: #030305;
    --bg-secondary: #0a0a12;
    --bg-card: #0f0f18;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --accent-violet: #c4b5fd;
    --success-green: #10b981;
    --error-red: #ef4444;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --border-subtle: rgba(255, 255, 255, 0.04);
  }

  .auth-page {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    position: relative;
    overflow: hidden;
  }

  /* Animated Background */
  .auth-bg-gradient {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 92, 246, 0.12), transparent),
      radial-gradient(ellipse 60% 40% at 80% 60%, rgba(124, 58, 237, 0.08), transparent);
  }

  .auth-bg-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%);
  }

  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    pointer-events: none;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    top: -100px;
    left: -100px;
    animation: float-1 15s ease-in-out infinite;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    bottom: -80px;
    right: -80px;
    animation: float-2 12s ease-in-out infinite;
  }

  .orb-3 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #c4b5fd, #a78bfa);
    top: 50%;
    right: 30%;
    animation: float-3 18s ease-in-out infinite;
  }

  @keyframes float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  @keyframes float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-40px, -30px) scale(1.1); }
  }

  @keyframes float-3 {
    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
    50% { transform: translate(30px, 30px); opacity: 0.5; }
  }

  /* Left Panel - Branding */
  .auth-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    position: relative;
    z-index: 1;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 4rem;
  }

  .brand-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
  }

  .brand-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
  }

  .brand-text span {
    color: var(--accent-purple-light);
  }

  .hero-content {
    max-width: 500px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-purple-light);
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 900;
    color: white;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
  }

  .hero-title .gradient {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 3rem;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-purple-light);
    font-size: 1rem;
    flex-shrink: 0;
  }

  /* Right Panel - Form */
  .auth-right {
    width: 520px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    z-index: 1;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.8), rgba(10, 10, 18, 0.9));
    backdrop-filter: blur(40px);
    border: 1px solid var(--border-subtle);
    border-radius: 28px;
    padding: 2.5rem;
    box-shadow: 
      0 0 0 1px rgba(139, 92, 246, 0.05),
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 100px rgba(139, 92, 246, 0.05);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .auth-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .auth-subtitle {
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  /* Social Login Buttons */
  .social-login {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .social-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: white;
    transform: translateY(-2px);
  }

  .social-btn i {
    font-size: 1.25rem;
  }

  .social-btn.google:hover {
    border-color: rgba(234, 67, 53, 0.4);
    box-shadow: 0 8px 20px rgba(234, 67, 53, 0.1);
  }

  .social-btn.github:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.05);
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
  }

  /* Form Styles */
  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .form-label a {
    color: var(--accent-purple-light);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .form-label a:hover {
    color: var(--accent-purple);
  }

  .input-wrapper {
    position: relative;
  }

  .form-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    color: white;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    outline: none;
  }

  .form-input::placeholder {
    color: var(--text-muted);
  }

  .form-input:focus {
    border-color: var(--accent-purple);
    background: rgba(139, 92, 246, 0.05);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    transition: color 0.3s;
  }

  .form-input:focus + .input-icon,
  .input-wrapper:focus-within .input-icon {
    color: var(--accent-purple-light);
  }

  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    transition: color 0.3s;
  }

  .password-toggle:hover {
    color: var(--accent-purple-light);
  }

  /* Remember Me & Forgot */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .remember-me input {
    width: 18px;
    height: 18px;
    accent-color: var(--accent-purple);
    cursor: pointer;
  }

  .remember-me span {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  /* Submit Button */
  .btn-submit {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    border-radius: 14px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
  }

  .btn-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  .btn-submit:hover::before {
    left: 100%;
  }

  .btn-submit:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.5);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Error Message */
  .error-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    margin-bottom: 1.25rem;
    color: #fca5a5;
    font-size: 0.9rem;
  }

  .error-box i {
    font-size: 1.25rem;
    color: #ef4444;
  }

  /* Sign Up Link */
  .signup-link {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .signup-link a {
    color: var(--accent-purple-light);
    text-decoration: none;
    font-weight: 700;
    margin-left: 0.25rem;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .auth-left {
      display: none;
    }
    
    .auth-right {
      width: 100%;
      padding: 1.5rem;
    }
    
    .auth-card {
      max-width: 440px;
    }
  }

  @media (max-width: 480px) {
    .auth-card {
      padding: 1.5rem;
      border-radius: 20px;
    }
    
    .social-login {
      flex-direction: column;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
  }

  /* Loading Spinner */
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://justfaibackend.vercel.app/api/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      if (rememberMe) {
        localStorage.setItem("rememberUser", formData.email);
      }
      alert("Login successful!");
      console.log("User:", res.data.user);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth implementation would go here
    console.log("Google login clicked");
    alert("Google Login - Integration coming soon!");
  };

  const handleGithubLogin = () => {
    // GitHub OAuth implementation would go here
    console.log("GitHub login clicked");
    alert("GitHub Login - Integration coming soon!");
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="auth-page">
        {/* Background Effects */}
        <div className="auth-bg-gradient" />
        <div className="auth-bg-grid" />
        <motion.div
          className="floating-orb orb-1"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-orb orb-2"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-orb orb-3"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Panel - Branding */}
        <div className="auth-left">
          <motion.div
            className="brand-logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-icon">
              <i className="bi bi-lightning-charge-fill" />
            </div>
            <span className="brand-text">JUSTFAI<span>TECH</span></span>
          </motion.div>

          <div className="hero-content">
            <motion.span
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <i className="bi bi-shield-check" />
              Secure & Trusted Platform
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to the<br />
              <span className="gradient">Future of Work</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of freelancers and clients who are building the future together.
              Access top projects, secure payments, and AI-powered matching.
            </motion.p>

            <motion.div
              className="features-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="bi bi-wallet2" />
                </div>
                <span>Secure escrow payments with fraud protection</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="bi bi-cpu" />
                </div>
                <span>AI-powered project matching algorithm</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="bi bi-globe" />
                </div>
                <span>Connect with clients from 150+ countries</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="bi bi-trophy" />
                </div>
                <span>Top freelancers earn $5,000+/month</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="auth-right">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="auth-header">
              <h2 className="auth-title">Sign In</h2>
              <p className="auth-subtitle">Enter your credentials to continue</p>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <motion.button
                type="button"
                className="social-btn google"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="bi bi-google" />
                Google
              </motion.button>
              <motion.button
                type="button"
                className="social-btn github"
                onClick={handleGithubLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="bi bi-github" />
                GitHub
              </motion.button>
            </div>

            <div className="divider">or continue with email</div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="error-box"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <i className="bi bi-exclamation-triangle-fill" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <i className="bi bi-envelope input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                  <a href="#">Forgot password?</a>
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: '3rem' }}
                  />
                  <i className="bi bi-lock input-icon" />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <motion.button
                type="submit"
                className="btn-submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="bi bi-arrow-right" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="signup-link">
              Don't have an account?
              <Link to="/signup">Create one free</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
