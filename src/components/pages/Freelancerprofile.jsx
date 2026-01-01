import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import {
    GeoAltFill,
    ClockFill,
    Translate,
    EnvelopeFill,
    Calendar2CheckFill,
    StarFill,
    TrophyFill,
    CheckCircleFill,
    ArrowUpRight,
    AwardFill,
    BriefcaseFill,
    ClockHistory
} from 'react-bootstrap-icons';
import axios from 'axios';

const CircularProgress = ({ value, label }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="position-relative d-flex justify-content-center align-items-center flex-column">
            <svg height="140" width="140" viewBox="0 0 120 120">
                <circle stroke="rgba(255, 255, 255, 0.1)" cx="60" cy="60" r={radius} strokeWidth="8" fill="transparent" />
                <motion.circle
                    stroke="url(#gradient)"
                    cx="60" cy="60" r={radius} strokeWidth="8" fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="position-absolute text-white text-center">
                <h1 className="mb-0 fw-bolder">{value}</h1>
                <p className="small text-white-50 mb-0">Score</p>
            </div>
            <p className="text-white fw-bold mt-2 mb-0">{label}</p>
        </div>
    );
};

const FreelancerProfilePage = () => {
    const [form, setform] = useState(null);

    useEffect(() => {
        async function getprofile() {
            try {
                const res = await axios.get("https://justfaibackend.vercel.app/api/profile");
                setform(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getprofile();
    }, []);

    const pageStyle = {
        background: `radial-gradient(circle at top left, rgba(124, 58, 237, 0.62), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167, 139, 250, 0.62), transparent 70%),
                     linear-gradient(to bottom, rgba(12, 12, 12, 1), rgba(0,0,0,1))`,
        color: '#E5E7EB',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        minHeight: '100vh'
    };

    const cardStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.57)",
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const motionProps = {
        variants: itemVariants,
        whileHover: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } }
    };

    return (
        <>
            <Navbar />
            <div style={pageStyle}>
                {form ? (
                    <Container>
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                                <Row className="align-items-center">
                                    <Col md="auto">
                                        <div className="position-relative">
                                            <img src="https://i.imgur.com/8b243d5.png" alt={form.fullName} className="rounded-circle" style={{ width: '120px', height: '120px', border: '3px solid #A78BFA' }} />
                                            <CheckCircleFill className="position-absolute text-success" style={{ bottom: '10px', right: '10px', fontSize: '1.5rem', background: 'rgba(31, 29, 43, 0.7)', borderRadius: '50%' }} />
                                        </div>
                                    </Col>
                                    <Col md>
                                        <h1 className="text-white fw-bolder">{form.fullName}</h1>
                                        <p className="text-white-50 fs-5">Senior Full-stack Developer & UI/UX Designer</p>
                                        <div className="d-flex flex-wrap text-white-50 small gap-3">
                                            <span><GeoAltFill className="me-2 text-primary" />{form.country || 'USA'}</span>
                                            <span><ClockFill className="me-2 text-primary" />PST (UTC-8)</span>
                                            <span><Translate className="me-2 text-primary" />English, Spanish, French</span>
                                        </div>
                                    </Col>
                                    <Col md="auto" className="d-flex gap-2 mt-3 mt-md-0">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button style={{ background: 'linear-gradient(to right, #A78BFA, #7C3AED)', border: 'none' }} className="px-4 py-2 fw-bold">Hire Me</Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button variant="outline-light" className="px-4 py-2">Message</Button>
                                        </motion.div>
                                    </Col>
                                </Row>
                                <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                                <p className="text-white-50">Passionate full-stack developer with 8+ years of experience crafting exceptional digital experiences. I specialize in React, Node.js, and modern web technologies, delivering scalable solutions that drive business growth.</p>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge p-2" style={{ backgroundColor: '#166534', color: '#A7F3D0' }}>Available</span>
                                    <span className="badge p-2" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>Response time: &lt; 2 hours</span>
                                    <span className="badge p-2" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>Rate: $85-120/hr</span>
                                </div>
                            </motion.div>

                            <Row className="g-4">
                                <Col lg={8}>
                                    <motion.div className="d-flex flex-column gap-4">
                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Performance Overview</h3>
                                            <div className="d-flex flex-wrap justify-content-around align-items-center text-center gap-4">
                                                <CircularProgress value={96} label="Overall Performance" />
                                                <div className="text-center"> <CheckCircleFill className="fs-1 text-success mb-2" /><h3 className="text-white">98%</h3><p className="text-white-50 small">On-time Delivery</p></div>
                                                <div className="text-center"> <TrophyFill className="fs-1 text-primary mb-2" /><h3 className="text-white">95%</h3><p className="text-white-50 small">Job Success Rate</p></div>
                                                <div className="text-center"> <StarFill className="fs-1 text-warning mb-2" /><h3 className="text-white">4.9</h3><p className="text-white-50 small">Client Satisfaction</p></div>
                                                <div className="text-center"> <ClockHistory className="fs-1 text-info mb-2" /><h3 className="text-white">78%</h3><p className="text-white-50 small">Repeat Clients</p></div>
                                            </div>
                                        </motion.div>

                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Skills & Expertise</h3>
                                            <p className="text-white-50 small mb-2">Top Rated Skills</p>
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {[{ name: 'React.js', rating: 5.0 }, { name: 'Node.js', rating: 4.9 }, { name: 'UI/UX Design', rating: 4.8 }].map(skill => (
                                                    <span key={skill.name} className="badge fs-6 p-2" style={{ background: 'linear-gradient(to right, #A78BFA, #7C3AED)', border: 'none' }}>{skill.name} <StarFill className="ms-1 mb-1" size={12} /> {skill.rating}</span>
                                                ))}
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <p className="text-white-50 small mb-2">Frontend Development</p>
                                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                                        {['JavaScript', 'TypeScript', 'Vue.js', 'Angular', 'Next.js', 'Tailwind CSS'].map(skill => <span key={skill} className="badge p-2" style={{ backgroundColor: '#374151', color: '#D1D5DB' }}>{skill}</span>)}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <p className="text-white-50 small mb-2">Backend Development</p>
                                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                                        {['Express.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker'].map(skill => <span key={skill} className="badge p-2" style={{ backgroundColor: '#374151', color: '#D1D5DB' }}>{skill}</span>)}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </motion.div>

                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Work History <span className="fs-6 text-white-50 fw-normal">145 completed jobs</span></h3>
                                            <div className="d-flex flex-column gap-4">
                                                <div className="p-3" style={{ ...cardStyle, backgroundColor: '#111827' }}>
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <h5 className="text-white">Senior Full-Stack Developer</h5>
                                                            <p className="text-white-50 small mb-2">TechStore Inc. | Jan 2024 - Present</p>
                                                        </div>
                                                        <h4 className="text-success fw-bold">$15,750</h4>
                                                    </div>
                                                    <p className="text-white-50">Leading the development of a comprehensive e-commerce platform. Implemented microservices architecture and real-time analytics.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </Col>

                                <Col lg={4}>
                                    <motion.div className="d-flex flex-column gap-4">
                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Availability & Contact</h3>
                                            <p className="text-white-50 small mb-1">Weekly Capacity</p>
                                            <ProgressBar now={75} style={{ height: '8px' }} variant="success" />
                                            <p className="small text-white-50 mt-1">75% booked this week</p>
                                            <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                                            <p className="text-white mb-1"><span className="me-2" style={{ color: '#22C55E' }}>●</span> Available for new projects</p>
                                            <div className="d-grid gap-2 my-4">
                                                <Button variant="dark" className="d-flex justify-content-between align-items-center p-3 text-start" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><EnvelopeFill className="text-primary me-2" /><div><p className="mb-0 text-white">Send Message</p><p className="small text-white-50 mb-0">Response within 2 hours</p></div><ArrowUpRight /></Button>
                                                <Button variant="dark" className="d-flex justify-content-between align-items-center p-3 text-start" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><Calendar2CheckFill className="text-success me-2" /><div><p className="mb-0 text-white">Schedule Video Call</p><p className="small text-white-50 mb-0">Free 15-min consultation</p></div><ArrowUpRight /></Button>
                                            </div>
                                        </motion.div>

                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Quick Stats</h3>
                                            <div className="text-center mb-4">
                                                <p className="text-white-50 mb-0">Total Earnings</p>
                                                <h1 className="display-4 fw-bolder" style={{ color: '#22C55E' }}>$247,500</h1>
                                            </div>
                                            <div className="d-flex justify-content-between text-center">
                                                <div><h4 className="text-white">145</h4><p className="text-white-50 small">Completed Jobs</p></div>
                                                <div><h4 className="text-white">$95</h4><p className="text-white-50 small">Avg Hourly Rate</p></div>
                                            </div>
                                        </motion.div>

                                        <motion.div className="p-4" style={cardStyle} {...motionProps}>
                                            <h3 className="text-white mb-4">Badges</h3>
                                            <Row className="g-2 text-center">
                                                <Col><div className="p-3" style={{ ...cardStyle, backgroundColor: '#111827' }}><AwardFill className="fs-3 text-warning mb-2" /><p className="small mb-0 text-white-50">Top Rated</p></div></Col>
                                                <Col><div className="p-3" style={{ ...cardStyle, backgroundColor: '#111827' }}><BriefcaseFill className="fs-3 text-success mb-2" /><p className="small mb-0 text-white-50">On Time</p></div></Col>
                                                <Col><div className="p-3" style={{ ...cardStyle, backgroundColor: '#111827' }}><CheckCircleFill className="fs-3 text-primary mb-2" /><p className="small mb-0 text-white-50">Expert</p></div></Col>
                                            </Row>
                                        </motion.div>
                                    </motion.div>
                                </Col>
                            </Row>
                        </motion.div>
                    </Container>
                ) : (
                    <Container className="text-center py-5">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-white">Loading profile...</h2>
                        </motion.div>
                    </Container>
                )}
                <Footer />
            </div>
        </>
    );
};

export default FreelancerProfilePage;
