import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, Grid, Briefcase, Bell, Wallet, Flag, Person } from 'react-bootstrap-icons';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link.active {
          color: #a78bfa;
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
          border: none;
          background: none;
          cursor: pointer;
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
          display: inline-block;
        }

        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
          color: white;
        }

        /* Mobile Bottom Navbar */
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1030;
          width: 92%;
          margin: 1rem auto;
          padding: 0.6rem 0.8rem;
          border-radius: 2rem;
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(15px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          justify-content: space-around;
          align-items: center;
          left: 50%;
          transform: translateX(-50%);
        }

        .mobile-nav-link {
          flex: 1;
          text-align: center;
          color: white;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          transition: color 0.2s ease;
        }

        .mobile-nav-link.active {
          color: #a855f7;
          text-shadow: 0 0 8px rgba(168,85,247,0.7);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-nav {
            display: flex;
          }

          .nav-inner {
            justify-content: space-between;
          }

          .nav-buttons {
            gap: 0.5rem;
          }

          .brand-text {
            font-size: 1.1rem;
          }
        }
      `}</style>

      {/* Desktop Navbar */}
      <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner" style={{ display: window.innerWidth <= 768 ? 'flex' : 'flex' }}>
          <Link to="/" className="brand-logo">
            <div className="brand-icon"><i className="bi bi-lightning-charge-fill" /></div>
            <span className="brand-text">Just<span>Fai</span></span>
          </Link>
          <div className="nav-links">
            <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
              <Grid size={16} />
              Dashboard
            </Link>
            <Link to="/Jobs" className={`nav-link ${isActive("/Jobs") ? "active" : ""}`}>
              <Briefcase size={16} />
              Jobs
            </Link>
            <Link to="/milestones" className={`nav-link ${isActive("/milestones") ? "active" : ""}`}>
              <Flag size={16} />
              Milestones
            </Link>
            <Link to="/payments" className={`nav-link ${isActive("/payments") ? "active" : ""}`}>
              <Wallet size={16} />
              Payments
            </Link>
            <Link to="/notifications" className={`nav-link ${isActive("/notifications") ? "active" : ""}`}>
              <Bell size={16} />
              Notifications
            </Link>
          </div>
          <div className="nav-buttons">
            <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}>
              <Person size={18} />
              Profile
            </Link>
            <Link to="/login" className="btn-login">Sign In</Link>
            <Link to="/signup" className="btn-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <div className="mobile-nav">
        <Link to="/" className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}>
          <House size={22} />
          Home
        </Link>
        <Link to="/Jobs" className={`mobile-nav-link ${isActive("/Jobs") ? "active" : ""}`}>
          <Briefcase size={22} />
          Jobs
        </Link>
        <Link to="/dashboard" className={`mobile-nav-link ${isActive("/dashboard") ? "active" : ""}`}>
          <Grid size={22} />
          Dashboard
        </Link>
        <Link to="/notifications" className={`mobile-nav-link ${isActive("/notifications") ? "active" : ""}`}>
          <Bell size={22} />
          Alerts
        </Link>
        <Link to="/profile" className={`mobile-nav-link ${isActive("/profile") ? "active" : ""}`}>
          <Person size={22} />
          Profile
        </Link>
      </div>
    </>
  );
};

export default Navbar;