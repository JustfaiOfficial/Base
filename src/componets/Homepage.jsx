import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Shield, Lightning, Cpu, Code, BarChart, Cloud, Palette, Box } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/homepage.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Homepage = () => {
  const features = [
    { icon: <Shield size={32} color="#a855f7" />, title: "Advanced Security", description: "Enterprise-grade protection with multi-layer encryption and biometric authentication systems." },
    { icon: <Lightning size={32} color="#a855f7" />, title: "Lightning Speed", description: "Optimized architecture ensures blazing-fast performance even under heavy workloads." },
    { icon: <Cpu size={32} color="#a855f7" />, title: "AI Integration", description: "Cutting-edge artificial intelligence that learns and adapts to your specific needs." },
    { icon: <Code size={32} color="#a855f7" />, title: "Custom API", description: "Flexible API endpoints that allow seamless integration with your existing systems." },
    { icon: <BarChart size={32} color="#a855f7" />, title: "Analytics Dashboard", description: "Comprehensive real-time data visualization and reporting tools for informed decisions." },
    { icon: <Cloud size={32} color="#a855f7" />, title: "Cloud Syncing", description: "Seamless multi-device synchronization with automatic backup and recovery options." },
  ];
  const steps = [
  {
    number: "1",
    title: "Register",
    description:
      "Create your account with a simple signup process that takes less than 2 minutes.",
  },
  {
    number: "2",
    title: "Configure",
    description:
      "Customize your settings and preferences to match your specific requirements.",
  },
  {
    number: "3",
    title: "Connect",
    description:
      "Integrate with your existing systems through our comprehensive API suite.",
  },
  {
    number: "4",
    title: "Launch",
    description:
      "Go live with your fully optimized system and start seeing results immediately.",
  },
];

  const jobs = [
    {
      title: "Senior AI Engineer",
      company: "NexusTech, Inc.",
      location: "San Francisco, CA",
      type: ["Full-time", "Remote"],
      salary: "$150K - $180K",
      description: "Lead the development of our next-gen AI algorithms and machine learning models.",
      icon: <Cpu size={24} color="#a855f7" />,
    },
    {
      title: "UX/UI Designer",
      company: "NexusTech, Inc.",
      location: "Austin, TX",
      type: ["Contract", "Hybrid"],
      salary: "$110K - $130K",
      description: "Create stunning futuristic interfaces with focus on user experience and accessibility.",
      icon: <Palette size={24} color="#a855f7" />,
    },
    {
      title: "Blockchain Developer",
      company: "NexusTech, Inc.",
      location: "New York, NY",
      type: ["Full-time", "On-site"],
      salary: "$140K - $170K",
      description: "Build secure and scalable blockchain solutions for our enterprise clients.",
      icon: <Box size={24} color="#a855f7" />,
    },
    {
      title: "Cybersecurity Analyst",
      company: "NexusTech, Inc.",
      location: "Chicago, IL",
      type: ["Part-time", "Remote"],
      salary: "$90K - $110K",
      description: "Identify and address security vulnerabilities in our advanced systems.",
      icon: <Shield size={24} color="#a855f7" />,
    },
  ];

  return (
    <>
    <Navbar></Navbar>
      

      {/* Hero Section */}
      <section className={styles.home}>
        <motion.div
          className={styles.grid}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className={styles.overlay} />
        <motion.div
          className={styles.glowOne}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.glowTwo}
          animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className={styles.content}>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span>Freelancers.</span>
            <span className={styles.highlight}>Creators. Innovators.</span>
            <span>Transform Your Work.</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            The ultimate platform connecting talented freelancers with cutting-edge projects.
            Where independent professionals meet limitless opportunities.
          </motion.p>
          <motion.div
            className={styles.actions}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <a href="#join" className={styles.btnPrimary}>Join as Freelancer</a>
            <a href="#find" className={styles.btnGhost}>Find Talent</a>
          </motion.div>
          <motion.ul
            className={styles.tags}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <li>Video editing gigs</li>
            <li>Programming projects</li>
            <li>Design contracts</li>
            <li>Content creation</li>
            <li>Remote collaboration</li>
            <li>Flexible schedules</li>
          </motion.ul>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-5"
        style={{
          background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
          color: "white",
        }}
      >
        <style>{`
          .text-purple { color: #a855f7 !important; }
          .feature-card {
            border-radius: 1rem;
            background: rgba(0,0,0,0.6);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            color: white !important;
          }
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 0 25px rgba(168, 85, 247, 0.4);
          }
          .feature-card .text-muted {
            color: white !important;
          }
        `}</style>

        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Platform <span className="text-purple">Features</span>
            </h2>
            <p className="text-white">Discover the powerful tools and capabilities that set our platform apart.</p>
          </div>

          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col key={idx} md={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <Card className="h-100 border-0 shadow-sm text-light p-4 feature-card">
                    <div className="mb-3">{feature.icon}</div>
                    <Card.Title className="fw-semibold">{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section
      className="py-5 text-light"
      style={{
        background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                     linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
      }}
    >
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            How It <span className="text-purple">Works</span>
          </h2>
          <p className="text-white-50">
            Our streamlined process makes implementation simple and efficient.
          </p>
        </div>

        {/* Steps */}
        <Row className="text-center">
          {steps.map((step, idx) => (
            <Col md={3} key={idx} className="mb-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#a855f7",
                  color: "white",
                  fontSize: "1.25rem",
                }}
              >
                {step.number}
              </div>
              <h5 className="fw-bold">{step.title}</h5>
              <p className="text-white-50">{step.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  

      {/* Jobs Section */}
      <section
        className="py-5"
        style={{
          background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
          color: "white",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Live <span style={{ color: "#a855f7" }}>Jobs</span> <Badge bg="danger">LIVE</Badge>
            </h2>
            <p style={{ color: "white" }}>Currently available positions in our talent pool.</p>
          </div>
          <Row className="g-4">
            {jobs.map((job, idx) => (
              <Col key={idx} md={6} lg={6}>
                <Card
                  className="h-100 border-0 shadow-lg p-3"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    borderRadius: "1rem",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      {job.type.map((t, i) => (
                        <Badge key={i} pill className="me-2" style={{ backgroundColor: "#a855f7", color: "white" }}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="p-2 rounded-circle bg-dark">{job.icon}</div>
                  </div>
                  <Card.Title className="fw-bold">{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2" style={{ color: "white" }}>
                    {job.company} • {job.location}
                  </Card.Subtitle>
                  <Card.Text style={{ color: "white" }}>{job.description}</Card.Text>
                  <h6 className="fw-bold mb-3" style={{ color: "#a855f7" }}>{job.salary}</h6>
                  <div className="mt-auto text-end">
                    <Button variant="primary" className="px-4 py-2 border-0 rounded-pill" style={{ backgroundColor: "#a855f7" }}>
                      Apply Now
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <div
      className="bg-dark text-light text-center py-5"
      style={{ background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                     linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
        color: "white", }}
    >
      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container"
      >
        <h2 className="fw-bold mb-3">
          Ready to <span className="text-primary">Transform</span> Your Tech
          Experience?
        </h2>
        <p className="mb-4">
          Join thousands of forward-thinking companies that have already made
          the switch to our cutting-edge platform.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary px-4 py-2"
          >
            Join Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-light px-4 py-2"
          >
            Schedule Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Section */}
      
    
    <Footer></Footer></div>


      </section>
    </>
  );
};

export default Homepage;
