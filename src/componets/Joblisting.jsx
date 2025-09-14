import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, Badge, Dropdown } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Footer from './Footer'; // Assuming you have a Footer component

// Custom CSS to match the design with glassmorphism
const customStyles = `
  body {
    background-color: #1a1a2e;
    color: #e0e0e0;
    font-family: 'Poppins', sans-serif;
  }
  
  /* Glassmorphism base style */
  .glassmorphism-card {
    backdrop-filter: blur(10px);
    background-color: rgba(46, 46, 72, 0.5); /* Semi-transparent background */
    border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle white border */
    border-radius: 15px; /* Rounded edges */
  }

  /* Applying glassmorphism to specific elements */
  .search-bar, .stats-card, .job-card, .category-card {
    @extend .glassmorphism-card; /* Using @extend for Sass-like functionality, or copy properties */
    border-radius: 15px; /* Ensure rounded edges */
  }

  /* Specific overrides/adjustments */
  .search-bar {
    padding: 1.5rem;
  }
  .form-control-custom {
    background-color: rgba(64, 64, 92, 0.7); /* Slightly more opaque for input fields */
    border: 1px solid rgba(90, 90, 125, 0.5);
    color: #fff;
    border-radius: 8px;
  }
  .form-control-custom::placeholder {
    color: #a0a0c0;
  }
  .btn-primary-custom {
    background-color: #9d4edd;
    border-color: #9d4edd;
    font-weight: 600;
    padding: 0.6rem 1.5rem;
    border-radius: 8px;
    color: #fff;
  }
  .btn-primary-custom:hover {
    background-color: #c77dff;
    border-color: #c77dff;
  }
  .tag-btn {
    background-color: rgba(64, 64, 92, 0.7);
    border: 1px solid rgba(90, 90, 125, 0.5);
    color: #e0e0e0;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 8px;
  }
  .stats-card {
    padding: 1.5rem;
    text-align: center;
    height: 100%;
  }
  .stats-icon {
    font-size: 2.5rem;
    color: #9d4edd;
  }
  .job-card {
    padding: 1.5rem;
  }
  .company-logo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 1rem;
    background-color: #fff;
  }
  .job-badge {
    font-size: 0.75rem;
    padding: 0.4em 0.6em;
  }
  .text-muted-custom {
    color: #a0a0c0 !important;
  }
  .category-card {
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    height: 100%;
  }
  .category-icon {
    font-size: 3rem;
    color: #9d4edd;
    margin-bottom: 1rem;
  }
  .category-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e0e0e0;
  }
  .category-jobs-count {
    color: #a0a0c0;
    font-size: 0.9rem;
  }
  .load-more-btn {
    background-color: rgba(46, 46, 72, 0.5);
    border: 1px solid rgba(90, 90, 125, 0.5);
    color: #e0e0e0;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 600;
  }

  /* Adjustments for dropdowns */
  .dropdown-menu {
    background-color: #2e2e48; /* Darker background for dropdown */
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dropdown-item {
    color: #e0e0e0;
  }
  .dropdown-item:hover {
    background-color: #40405c;
    color: #fff;
  }
`;

// Dummy data for job listings
const jobs = [
    {
    logo: 'https://via.placeholder.com/50/9d4edd/ffffff?text=T',
    title: 'Full-Stack React Developer for E-commerce Platform',
    company: 'TechCorp Solutions',
    reviews: 154,
    verified: true,
    description: 'We\'re looking for an experienced React developer to build a scalable e-commerce platform with advanced features including real-time inventory management, payment processing, and user analytics dashboard.',
    budget: '$3,000 - $5,000',
    duration: '2-3 months',
    location: 'Remote',
    level: 'Expert Level',
    tags: ['React.js', 'Node.js', 'MongoDB', 'TypeScript'],
    proposals: 15,
  },
  {
    logo: 'https://via.placeholder.com/50/fca311/ffffff?text=D',
    title: 'UI/UX Designer for Mobile Banking App',
    company: 'DesignStudio Pro',
    reviews: 98,
    premium: true,
    description: 'Design a modern, intuitive mobile banking application with a focus on user experience, accessibility, and security. Deliver wireframes, prototypes, and final designs.',
    rate: '$45/hr',
    hours: '40 hours/week',
    location: 'US/EU Timezone',
    level: 'Intermediate',
    tags: ['Figma', 'Sketch', 'Prototyping', 'Mobile Design'],
    proposals: 8,
  },
  {
    logo: 'https://via.placeholder.com/50/28a745/ffffff?text=D',
    title: 'Python Data Scientist for ML Project',
    company: 'DataAnalytics Inc',
    reviews: 108,
    verified: true,
    description: 'Build machine learning models for customer behavior analysis. Experience with pandas, scikit-learn, and TensorFlow is required. Large dataset project.',
    budget: '$4,000 - $6,000',
    duration: '3-4 months',
    location: 'Remote',
    level: 'Expert Level',
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas'],
    proposals: 23,
  },
];

// Dummy data for categories
const categories = [
  { icon: 'bi-code-slash', title: 'Web Development', jobs: 1247 },
  { icon: 'bi-phone', title: 'Mobile Development', jobs: 892 },
  { icon: 'bi-palette', title: 'Design & Creative', jobs: 1567 },
  { icon: 'bi-pencil-square', title: 'Writing & Content', jobs: 743 },
];

function JobListing() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay }
    })
  };

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>
      <Container 
        fluid 
        className="p-4 p-md-5 overflow-hidden" 
        style={{
          background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       #1a1a2e` // Ensure a base dark color
        }}
      >
        
        <header className="text-center mb-5">
          <motion.h1 
            className="display-4 fw-bold text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Perfect Freelance Project
          </motion.h1>
          <motion.p 
            className="lead text-muted-custom"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover thousands of opportunities from top companies worldwide
          </motion.p>
        </header>

        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <motion.div 
              className="search-bar glassmorphism-card" // Apply glassmorphism
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Form>
                <Row className="g-3 align-items-center">
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: 'rgba(64, 64, 92, 0.7)', border: '1px solid rgba(90, 90, 125, 0.5)' }}>
                        <i className="bi bi-search text-white"></i>
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Search jobs, skills, companies..." className="form-control-custom" />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Form.Select className="form-control-custom h-100">
                      <option>All Categories</option>
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>Design</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                       <InputGroup.Text style={{ backgroundColor: 'rgba(64, 64, 92, 0.7)', border: '1px solid rgba(90, 90, 125, 0.5)' }}>
                        <i className="bi bi-geo-alt-fill text-white"></i>
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Location" className="form-control-custom" />
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <motion.button 
                      type="submit" 
                      className="w-100 btn-primary-custom"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Search
                    </motion.button>
                  </Col>
                </Row>
              </Form>
              <div className="mt-3">
                {['React.js', 'Python', 'UI/UX Design', 'Content Writing', 'Digital Marketing', 'Data Analysis'].map(tag => (
                  <motion.button 
                    key={tag} 
                    className="tag-btn"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(90, 90, 125, 0.8)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
        
        <Row className="mb-5 text-center g-4">
          <Col md={3}>
            <motion.div 
              className="stats-card glassmorphism-card" // Apply glassmorphism
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.4)'}}
              initial="hidden" animate={controls} variants={sectionVariants} custom={0.6}
            >
              <i className="bi bi-briefcase-fill stats-icon mb-2"></i>
              <h3 className="fw-bold text-white">12,847</h3>
              <p className="text-muted-custom mb-0">Active Jobs</p>
            </motion.div>
          </Col>
          <Col md={3}>
            <motion.div 
              className="stats-card glassmorphism-card" // Apply glassmorphism
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.4)'}}
              initial="hidden" animate={controls} variants={sectionVariants} custom={0.7}
            >
              <i className="bi bi-people-fill stats-icon mb-2"></i>
              <h3 className="fw-bold text-white">48,923</h3>
              <p className="text-muted-custom mb-0">Freelancers</p>
            </motion.div>
          </Col>
          <Col md={3}>
            <motion.div 
              className="stats-card glassmorphism-card" // Apply glassmorphism
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.4)'}}
              initial="hidden" animate={controls} variants={sectionVariants} custom={0.8}
            >
              <i className="bi bi-building-fill stats-icon mb-2"></i>
              <h3 className="fw-bold text-white">3,287</h3>
              <p className="text-muted-custom mb-0">Companies</p>
            </motion.div>
          </Col>
          <Col md={3}>
            <motion.div 
              className="stats-card glassmorphism-card" // Apply glassmorphism
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.4)'}}
              initial="hidden" animate={controls} variants={sectionVariants} custom={0.9}
            >
              <i className="bi bi-currency-dollar stats-icon mb-2"></i>
              <h3 className="fw-bold text-white">$2.4M</h3>
              <p className="text-muted-custom mb-0">Paid This Month</p>
            </motion.div>
          </Col>
        </Row>
        
        <Row ref={ref}>
          {/* Removed the filter column entirely */}
          <Col xs={12}> {/* This column now takes full width */}
            <motion.div className="d-flex justify-content-between align-items-center mb-3" initial="hidden" animate={controls} variants={sectionVariants} custom={0.2}>
              <span className="fw-bold text-white">2,847 Jobs Found</span> {/* Updated text */}
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic" size="sm">Most Recent</Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#">Most Recent</Dropdown.Item>
                    <Dropdown.Item href="#">Most Relevant</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </motion.div>

            <Row className="g-4">
              {jobs.map((job, index) => (
                <Col md={6} key={index}> {/* Changed to md=6 for two columns as per image */}
                  <motion.div initial="hidden" animate={controls} variants={sectionVariants} custom={index * 0.1 + 0.3}>
                    <Card className="job-card h-100 glassmorphism-card"> {/* Apply glassmorphism */}
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex align-items-start flex-grow-1">
                          {/* Image Placeholder - Adjusted to match the image's round avatar */}
                           <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" // Example avatar
                            alt="Company Logo" 
                            className="rounded-circle" 
                            style={{ width: '50px', height: '50px', marginRight: '1rem', objectFit: 'cover' }} 
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                              <div>
                                <h5 className="mb-0 fw-bold text-white">{job.company}</h5>
                                <div className="d-flex align-items-center">
                                  {/* Star ratings - Example implementation */}
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`bi bi-star-fill me-1`} style={{ color: i < 5 ? '#fca311' : '#a0a0c0', fontSize: '0.8rem' }}></i>
                                  ))}
                                  <small className="text-muted-custom ms-2">5.0 (124 reviews)</small>
                                </div>
                              </div>
                              <div>{job.verified && <Badge bg="success" className="ms-2 job-badge">Verified</Badge>}{job.premium && <Badge bg="warning" text="dark" className="ms-2 job-badge">Premium</Badge>}</div>
                            </div>
                            <h4 className="mt-3 mb-3 fw-bold text-white">{job.title}</h4> {/* Larger title */}
                            <p className="text-muted-custom">{job.description}</p>
                            <Row className="text-muted-custom g-2" style={{ fontSize: '0.9rem' }}>
                              <Col xs={6} md={6}><strong><i className="bi bi-currency-dollar me-1"></i> {job.budget || job.rate}</strong></Col>
                              <Col xs={6} md={6}><i className="bi bi-stopwatch me-1"></i> {job.duration || job.hours}</Col>
                              <Col xs={6} md={6}><i className="bi bi-bar-chart me-1"></i> {job.level}</Col>
                              <Col xs={6} md={6}><i className="bi bi-geo-alt me-1"></i> {job.location}</Col>
                            </Row>
                            <div className="mt-3">{job.tags.map(tag => (<Badge pill bg="dark" text="light" className="me-2 p-2 fw-normal" key={tag}>{tag}</Badge>))}</div>
                          </div>
                        </div>
                        <hr style={{borderColor: 'rgba(255, 255, 255, 0.1)'}} />
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="text-muted-custom" style={{ fontSize: '0.9rem' }}><i className="bi bi-people me-1"></i>{job.proposals} proposals</span>
                          <motion.button className="btn-primary-custom" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Apply Now</motion.button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <motion.div className="text-center mt-5" initial="hidden" animate={controls} variants={sectionVariants} custom={jobs.length * 0.1 + 0.5}>
              <motion.button className="btn load-more-btn" whileHover={{ scale: 1.05, backgroundColor: 'rgba(64, 64, 92, 0.8)' }} whileTap={{ scale: 0.95 }}>Load More Jobs</motion.button>
            </motion.div>
          </Col>
        </Row>

        <motion.div className="mt-5 pt-5 text-center" initial="hidden" animate={controls} variants={sectionVariants} custom={0.5}>
          <h2 className="display-5 fw-bold mb-3 text-white">Popular Categories</h2>
          <p className="lead text-muted-custom mb-5">Explore jobs by category and find your perfect match</p>
          <Row className="g-4 justify-content-center">
            {categories.map((category, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div 
                  className="category-card glassmorphism-card" // Apply glassmorphism
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(157, 78, 221, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  initial="hidden" animate={controls} variants={sectionVariants} custom={jobs.length * 0.1 + 0.8 + index * 0.15}
                >
                  <i className={`bi ${category.icon} category-icon`}></i>
                  <h4 className="category-title">{category.title}</h4>
                  <p className="category-jobs-count">{category.jobs} jobs available</p>
                  <motion.button 
                    className="btn"
                    style={{ backgroundColor: 'transparent', border: '1px solid #9d4edd', color: '#9d4edd' }}
                    whileHover={{ backgroundColor: '#9d4edd', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Jobs
                  </motion.button>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

      </Container>
      
      {/* Offcanvas is removed entirely */}

      <Footer />
    </>
  );
}

export default JobListing;