import { Container, Nav, Navbar as BSNavbar, NavDropdown, Button } from "react-bootstrap";
import { House, Grid, Briefcase, Bell, Wallet, Flag, Person, BoxArrowInRight } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#a855f7" : "rgba(255,255,255,0.85)",
    fontWeight: isActive(path) ? "600" : "500",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: isActive(path) ? "rgba(168, 85, 247, 0.1)" : "transparent",
  });

  const mobileActiveStyle = {
    color: "#a855f7",
    textShadow: "0 0 8px rgba(168,85,247,0.7)",
  };

  return (
    <>
      {/* Desktop Navbar */}
      <BSNavbar
        expand="lg"
        sticky="top"
        className="d-none d-lg-flex"
        style={{
          padding: "0.5rem 1rem",
          transition: "all 0.4s ease",
          ...(scrolled
            ? {
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(10px) saturate(180%)",
              WebkitBackdropFilter: "blur(10px) saturate(180%)",
              borderRadius: "50px",
              width: "95%",
              margin: "10px auto",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }
            : {
              background: "#0a0a0f",
              borderRadius: "0px",
              width: "100%",
              margin: "0 auto",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }),
        }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Premium Logo */}
          <Link to="/" className="d-flex align-items-center text-decoration-none" style={{ gap: '0.75rem' }}>
            {/* Logo Icon */}
            <div style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Icon Inner Glow */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
                borderRadius: '12px 12px 0 0'
              }} />
              {/* Lightning Bolt Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                <path d="M13 2L4.09998 12.6C3.74181 13.0389 3.56272 13.2583 3.56299 13.4437C3.56322 13.6052 3.63898 13.7572 3.76772 13.8556C3.91548 13.9693 4.19755 13.9693 4.76169 13.9693H12L11 22L19.9 11.4C20.2582 10.9611 20.4373 10.7417 20.437 10.5563C20.4368 10.3948 20.361 10.2428 20.2323 10.1444C20.0845 10.0307 19.8024 10.0307 19.2383 10.0307H12L13 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Logo Text */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(255,255,255,0.1)'
              }}>
                JUSTFAI
              </span>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                marginLeft: '1px'
              }}>
                TECH
              </span>
              {/* Beta Badge */}
              <span style={{
                fontSize: '0.55rem',
                fontWeight: '700',
                color: '#a78bfa',
                background: 'rgba(139, 92, 246, 0.15)',
                padding: '2px 6px',
                borderRadius: '4px',
                marginLeft: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                Beta
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <Nav className="d-flex align-items-center gap-1">
            <Link to="/dashboard" style={navLinkStyle("/dashboard")}>
              <Grid size={16} />
              Dashboard
            </Link>
            <Link to="/Jobs" style={navLinkStyle("/Jobs")}>
              <Briefcase size={16} />
              Jobs
            </Link>
            <Link to="/milestones" style={navLinkStyle("/milestones")}>
              <Flag size={16} />
              Milestones
            </Link>
            <Link to="/payments" style={navLinkStyle("/payments")}>
              <Wallet size={16} />
              Payments
            </Link>
            <Link to="/notifications" style={navLinkStyle("/notifications")}>
              <Bell size={16} />
              Notifications
            </Link>
          </Nav>

          {/* Right Side - Profile & Auth */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/profile" style={navLinkStyle("/profile")}>
              <Person size={18} />
              Profile
            </Link>
            <Link to="/login">
              <Button
                variant="dark"
                className="px-4 py-2 text-white border-0 rounded-pill"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)"
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </Container>
      </BSNavbar>

      {/* Mobile Bottom Navbar */}
      <div
        className="d-lg-none d-flex justify-content-around align-items-center position-fixed bottom-0 start-50 translate-middle-x shadow-lg mb-3"
        style={{
          zIndex: 1030,
          width: "92%",
          padding: "0.6rem 0.8rem",
          borderRadius: "2rem",
          background: "rgba(10, 10, 15, 0.9)",
          backdropFilter: "blur(15px) saturate(180%)",
          WebkitBackdropFilter: "blur(15px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Link to="/" className="text-center flex-fill text-decoration-none" style={isActive("/") ? mobileActiveStyle : { color: "white" }}>
          <House size={22} />
          <div style={{ fontSize: "11px", marginTop: "2px" }}>Home</div>
        </Link>
        <Link to="/Jobs" className="text-center flex-fill text-decoration-none" style={isActive("/Jobs") ? mobileActiveStyle : { color: "white" }}>
          <Briefcase size={22} />
          <div style={{ fontSize: "11px", marginTop: "2px" }}>Jobs</div>
        </Link>
        <Link to="/dashboard" className="text-center flex-fill text-decoration-none" style={isActive("/dashboard") ? mobileActiveStyle : { color: "white" }}>
          <Grid size={22} />
          <div style={{ fontSize: "11px", marginTop: "2px" }}>Dashboard</div>
        </Link>
        <Link to="/notifications" className="text-center flex-fill text-decoration-none" style={isActive("/notifications") ? mobileActiveStyle : { color: "white" }}>
          <Bell size={22} />
          <div style={{ fontSize: "11px", marginTop: "2px" }}>Alerts</div>
        </Link>
        <Link to="/profile" className="text-center flex-fill text-decoration-none" style={isActive("/profile") ? mobileActiveStyle : { color: "white" }}>
          <Person size={22} />
          <div style={{ fontSize: "11px", marginTop: "2px" }}>Profile</div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;