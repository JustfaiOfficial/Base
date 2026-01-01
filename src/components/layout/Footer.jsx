import React from "react";
import { Container, Navbar as BSNavbar} from "react-bootstrap";


function Footer() {
  return (

        
    <footer className="mt-5 pt-5 border-top border-secondary" style={{ background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                     linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
        color: "white", }}>
        <div className="container text-start">
          <div className="row">
            {/* Logo + Tagline */}
            <div className="col-md-3 mb-4">
              <h4 className="fw-bold">
                <BSNavbar.Brand
                            href="#"
                            className="d-flex align-items-center text-white fw-bold ms-2"
                          >
                            JUSTFAI<span className="text-purple">TECH</span>
                          </BSNavbar.Brand>
              </h4>
              <p>
                Pioneering the future of technology with innovative solutions
                for modern challenges.
              </p>
              <div className="d-flex gap-3 fs-5">
                <a href="#" className="text-light">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="bi bi-github"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="col-md-2 mb-4">
              <h6 className="fw-bold">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-light">About Us</a></li>
                <li><a href="#" className="text-decoration-none text-light">Careers</a></li>
                <li><a href="#" className="text-decoration-none text-light">Partners</a></li>
                <li><a href="#" className="text-decoration-none text-light">News</a></li>
                <li><a href="#" className="text-decoration-none text-light">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-md-2 mb-4">
              <h6 className="fw-bold">Resources</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-light">Documentation</a></li>
                <li><a href="#" className="text-decoration-none text-light">API Reference</a></li>
                <li><a href="#" className="text-decoration-none text-light">Tutorials</a></li>
                <li><a href="#" className="text-decoration-none text-light">Blog</a></li>
                <li><a href="#" className="text-decoration-none text-light">Support</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Stay Updated</h6>
              <p>Subscribe to our newsletter for the latest updates and news.</p>
              <div className="d-flex">
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Your email"
                />
                <button className="btn btn-primary">
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
