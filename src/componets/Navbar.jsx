import { Container, Nav, Navbar as BSNavbar, Button } from "react-bootstrap";
import { House, Grid, Briefcase, Star, BoxArrowInRight } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStyle = {
    color: "#a855f7",
    fontWeight: "600",
    textShadow: "0 0 8px rgba(168,85,247,0.7)",
  };

  return (
    <>
      {/* Desktop Navbar */}
      <BSNavbar
        expand="lg"
        sticky="top"
        className={`d-none d-lg-flex`}
        style={{
          padding: "0.5rem 1rem",
          transition: "all 0.4s ease",
          // The logic is now inverted.
          ...(scrolled
            ? {
                // STYLES WHEN SCROLLED (GLASSMORPHIC) ✨
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                borderRadius: "50px",
                width: "90%",
                margin: "10px auto",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }
            : {
                // STYLES AT THE TOP (SOLID PURPLE & BLACK) ⚫
                background: "#000",
                borderRadius: "0px",
                width: "100%",
                margin: "0 auto",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              }),
        }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <BSNavbar.Brand
            href="#"
            className="d-flex align-items-center text-white fw-bold ms-2"
          >
            JUSTFAI<span style={{ color: "#a855f7" }}>TECH</span>
          </BSNavbar.Brand>

          {/* Nav Links */}
          <Nav className="d-flex align-items-center ms-5">
            <Nav.Link href="#features" className="text-light px-3">
              Features
            </Nav.Link>
            <Nav.Link href="#how" className="text-light px-3">
              How It Works
            </Nav.Link>
            <Nav.Link href="#jobs" className="text-light px-3">
              Live Jobs
            </Nav.Link>
            <Nav.Link href="#testimonials" className="text-light px-3">
              Testimonials
            </Nav.Link>
          </Nav>

          {/* Sign In Button */}
          <Button
            variant="dark"
            className="ms-3 px-4 py-2 text-white border-0 rounded-pill"
            style={{ backgroundColor: "#a855f7" }}
          >
            Sign In
          </Button>
        </Container>
      </BSNavbar>

      {/* Mobile Bottom Navbar (No changes needed here) */}
      <div
        className="d-lg-none d-flex justify-content-around align-items-center position-fixed bottom-0 start-50 translate-middle-x shadow-lg mb-3"
        style={{
          zIndex: 1030,
          width: "92%",
          padding: "0.6rem 0.8rem",
          borderRadius: "2rem",
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(15px) saturate(180%)",
          WebkitBackdropFilter: "blur(15px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <a href="#home" className="text-center flex-fill" onClick={() => setActiveTab("home")} style={activeTab === "home" ? activeStyle : { color: "white" }}>
            <House size={22} />
            <div style={{ fontSize: "12px" }}>Home</div>
        </a>
        <a href="#features" className="text-center flex-fill" onClick={() => setActiveTab("features")} style={activeTab === "features" ? activeStyle : { color: "white" }}>
            <Grid size={22} />
            <div style={{ fontSize: "12px" }}>Features</div>
        </a>
        <a href="#jobs" className="text-center flex-fill" onClick={() => setActiveTab("jobs")} style={activeTab === "jobs" ? activeStyle : { color: "white" }}>
            <Briefcase size={22} />
            <div style={{ fontSize: "12px" }}>Jobs</div>
        </a>
        <a href="#testimonials" className="text-center flex-fill" onClick={() => setActiveTab("reviews")} style={activeTab === "reviews" ? activeStyle : { color: "white" }}>
            <Star size={22} />
            <div style={{ fontSize: "12px" }}>Reviews</div>
        </a>
        <a href="#signin" className="text-center flex-fill" onClick={() => setActiveTab("signin")} style={activeTab === "signin" ? activeStyle : { color: "white" }}>
            <BoxArrowInRight size={22} />
            <div style={{ fontSize: "12px" }}>Sign In</div>
        </a>
      </div>
    </>
  );
};

export default Navbar;