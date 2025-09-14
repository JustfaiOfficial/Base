import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

// Animation variants for cleaner code
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

// --- NEW: Similar Projects Component ---
const similarJobs = [
    {
        title: 'React Dashboard Development',
        price: '$70-$90/hr',
        type: 'hourly',
        description: 'Looking for a React developer to build an analytics dashboard with real-time data visualization...',
        skills: ['React', 'D3.js', 'Charts'],
        posted: '3 hours ago',
    },
    {
        title: 'Full-Stack Web Application',
        price: '$5,000',
        type: 'fixed',
        description: 'Need a full-stack developer to create a social networking platform with user authentication...',
        skills: ['React', 'Node.js', 'PostgreSQL'],
        posted: '5 hours ago',
    },
    {
        title: 'Mobile App Backend',
        price: '$65-$85/hr',
        type: 'hourly',
        description: 'Seeking a backend developer to build APIs for a mobile fitness tracking application...',
        skills: ['Node.js', 'MongoDB', 'REST API'],
        posted: '8 hours ago',
    },
];

const SimilarProjects = () => {
    const similarCardStyle = {
        backgroundColor: '#1F1D2B', // A slightly different dark shade
        border: '1px solid #7C3AED',
        borderRadius: '1rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const skillTagStyle = {
        backgroundColor: '#374151',
        color: '#D1D5DB',
        fontSize: '0.75rem',
        padding: '0.25rem 0.6rem',
    };

    return (
        <div className="container py-5">
            <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={{ color: '#A78BFA' }}>Similar Projects You Might Like</h2>
                <p className="text-white-50">Discover more opportunities that match your expertise</p>
            </motion.div>

            <motion.div
                className="row g-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {similarJobs.map((job, index) => (
                    <motion.div className="col-lg-4 d-flex align-items-stretch" key={index} variants={cardVariants} whileHover={{ y: -8, scale: 1.03 }}>
                        <div className="p-4 d-flex flex-column w-100" style={similarCardStyle}>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h5 className="text-white mb-0">{job.title}</h5>
                                <p className="mb-0 fw-bold" style={{ color: '#34D399', whiteSpace: 'nowrap', paddingLeft: '1rem' }}>{job.price}</p>
                            </div>
                            <p className="text-white-50 small mb-4">{job.description}</p>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {job.skills.map(skill => (
                                    <span key={skill} className="badge rounded-pill" style={skillTagStyle}>{skill}</span>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary border-opacity-25">
                                <p className="text-white-50 small mb-0">{job.posted}</p>
                                <a href="#" className="fw-bold text-decoration-none" style={{ color: '#A78BFA' }}>View Details</a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
// --- END: Similar Projects Component ---


// Helper component for progress bars in the Skills Match section
const SkillProgressBar = ({ skill, level, percentage, color }) => (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-1">
            <p className="mb-0 small text-white">{skill}</p>
            <p className="mb-0 small fw-bold" style={{ color }}>{level}</p>
        </div>
        <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <motion.div
                className="progress-bar"
                role="progressbar"
                style={{ backgroundColor: color }}
                initial={{ width: '0%' }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
            ></motion.div>
        </div>
    </div>
);

// Helper component for the circular progress in the Skills Match section
const CircularProgress = ({ percentage }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="position-relative d-flex justify-content-center align-items-center">
            <svg height="140" width="140" viewBox="0 0 120 120">
                <circle
                    stroke="rgba(255, 255, 255, 0.1)"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth="8"
                    fill="transparent"
                />
                <motion.circle
                    stroke="#A78BFA"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }}
                />
            </svg>
            <motion.div 
                className="position-absolute text-white text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <h2 className="mb-0 fw-bold">{percentage}%</h2>
            </motion.div>
        </div>
    );
};


const JobDetailsPage = () => {
    const pageStyle = {
        background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                     linear-gradient(to bottom, #111111, #000000)`,
        color: '#E5E7EB',
        paddingTop: '3rem',
    };
    
    const cardStyle = {
      backgroundColor: 'rgba(31, 29, 43, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
    };

    const primarySkillStyle = { backgroundColor: '#7C3AED', color: 'white' };
    const secondarySkillStyle = { backgroundColor: '#374151', color: '#D1D5DB' };
    const niceToHaveSkillStyle = { backgroundColor: '#1F2937', color: '#9CA3AF', border: '1px solid #374151'};

    return (
        <>
        <Navbar></Navbar>
        <div style={pageStyle}>
            <motion.div 
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="row g-4">
                    {/* Left Column */}
                    <motion.div className="col-lg-8" variants={containerVariants}>
                        {/* Job Header */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                            <div className="d-flex justify-content-between align-items-start">
                                <h1 className="text-white fw-bolder">Senior Full Stack Developer for E-Commerce Platform</h1>
                                <div>
                                    <motion.i whileHover={{ scale: 1.2, color: '#FBBF24' }} className="bi bi-bookmark fs-5 me-3" role="button"></motion.i>
                                    <motion.i whileHover={{ scale: 1.2, color: '#60A5FA' }} className="bi bi-share-fill fs-5" role="button"></motion.i>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap align-items-center text-white-50 mt-3 mb-4">
                                <span className="me-4"><i className="bi bi-cash-stack me-2 text-success"></i>$75-$120/hr</span>
                                <span className="me-4"><i className="bi bi-briefcase-fill me-2 text-primary"></i>5+ years</span>
                                <span className="me-4"><i className="bi bi-geo-alt-fill me-2 text-warning"></i>Remote Worldwide</span>
                                <span className="me-4"><i className="bi bi-clock-fill me-2 text-info"></i>2 hours ago</span>
                            </div>
                            <div>
                                <span className="badge bg-success-subtle text-success-emphasis me-2 p-2">Active</span>
                                <span className="badge bg-primary-subtle text-primary-emphasis me-2 p-2">Featured</span>
                                <span className="badge bg-danger-subtle text-danger-emphasis me-2 p-2">Urgent</span>
                                <span className="badge bg-secondary-subtle text-secondary-emphasis p-2">234 views</span>
                            </div>
                        </motion.div>

                        {/* Skills Match Analysis */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                             <h3 className="text-white mb-4">Skills Match Analysis</h3>
                             <p className="text-white-50">See how well your skills align with this project.</p>
                             <div className="row align-items-center">
                                 <div className="col-md-7">
                                    <div className="d-flex flex-column gap-3">
                                        <SkillProgressBar skill="React.js" level="Expert" percentage={95} color="#22C55E" />
                                        <SkillProgressBar skill="Node.js" level="Advanced" percentage={80} color="#34D399" />
                                        <SkillProgressBar skill="MongoDB" level="Intermediate" percentage={60} color="#F59E0B" />
                                        <SkillProgressBar skill="E-commerce" level="Expert" percentage={98} color="#22C55E" />
                                    </div>
                                 </div>
                                 <div className="col-md-5 d-flex flex-column align-items-center mt-4 mt-md-0">
                                     <CircularProgress percentage={92} />
                                     <motion.h5 
                                        className="text-white mt-3 mb-1" 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ delay: 1 }}
                                    >Excellent Match</motion.h5>
                                     <motion.p 
                                        className="text-white-50 small text-center"
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ delay: 1.2 }}
                                    >Your skills align very well with this project's requirements.</motion.p>
                                 </div>
                             </div>
                        </motion.div>

                        {/* Job Description and other sections... */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                            <h3 className="text-white mb-3">Job Description</h3>
                            <p>We are looking for an experienced Full Stack Developer to join our dynamic team and help build the next generation of our E-commerce platform. This is an exciting opportunity to work with cutting-edge technologies and contribute to a product that serves millions of users worldwide.</p>
                            <p>As a Senior Full Stack Developer, you will be responsible for designing, developing, and maintaining both frontend and backend components of our platform. You'll work closely with our product, design, and DevOps teams to deliver high-quality, scalable solutions.</p>
                            
                            <h4 className="text-white mt-4 mb-3">Key Responsibilities</h4>
                            <motion.ul 
                                className="list-unstyled d-flex flex-column gap-2"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Develop and maintain web applications using React.js and Node.js</motion.li>
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Design and implement RESTful APIs and GraphQL endpoints</motion.li>
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Optimize application performance and ensure scalability</motion.li>
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Collaborate with UI/UX designers to implement pixel-perfect designs</motion.li>
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Write clean, maintainable, and well-documented code</motion.li>
                                <motion.li variants={listItemVariants}><i className="bi bi-check-circle-fill text-primary me-2"></i>Participate in code reviews and maintain coding standards</motion.li>
                            </motion.ul>
                        </motion.div>
                        
                        {/* Skills Required */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                            <h3 className="text-white mb-3">Skills Required</h3>
                            <h5 className="text-white-50 fw-normal mb-3">Primary Skills</h5>
                            <motion.div className="d-flex flex-wrap gap-2 mb-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                {['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Express.js'].map(skill => (
                                    <motion.span variants={listItemVariants} key={skill} className="badge p-2" style={primarySkillStyle}>{skill}</motion.span>
                                ))}
                            </motion.div>
                             <h5 className="text-white-50 fw-normal mb-3">Secondary Skills</h5>
                            <motion.div className="d-flex flex-wrap gap-2 mb-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                {['GraphQL', 'Docker', 'AWS', 'Redis', 'Jest', 'Cypress', 'Git', 'Agile/Scrum'].map(skill => (
                                    <motion.span variants={listItemVariants} key={skill} className="badge p-2" style={secondarySkillStyle}>{skill}</motion.span>
                                ))}
                            </motion.div>
                        </motion.div>

                    </motion.div>

                    {/* Right Column */}
                    <motion.div className="col-lg-4" variants={containerVariants}>
                        {/* Client Info */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                            <h4 className="text-white mb-4">Client Information</h4>
                            <div className="d-flex align-items-center mb-3">
                                <div className="flex-shrink-0">
                                    <div className="d-flex align-items-center justify-content-center text-white fw-bold" style={{width: '50px', height: '50px', backgroundColor: '#7C3AED', borderRadius: '0.5rem'}}>TC</div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="text-white mb-0">TechCorp Solutions</h5>
                                    <p className="text-warning mb-0"><i className="bi bi-star-fill"></i> 4.9 <span className="text-white-50">(127 reviews)</span></p>
                                </div>
                            </div>
                            <p className="text-white-50 small fst-italic">"We're a fast-growing tech company focused on delivering innovative e-commerce solutions..."</p>
                            <hr style={{borderColor: 'rgba(255,255,255,0.2)'}} />
                            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
                                <li><strong>Member since:</strong><span className="float-end text-white">Jan 2019</span></li>
                                <li><strong>Jobs posted:</strong><span className="float-end text-white">47</span></li>
                                <li><strong>Hire rate:</strong><span className="float-end text-white">89%</span></li>
                            </ul>
                        </motion.div>
                        
                        {/* Actions */}
                        <motion.div className="d-grid gap-3 mb-4" variants={cardVariants}>
                            <motion.button 
                                className="btn btn-success btn-lg p-3 fw-bold" 
                                style={{backgroundColor: '#22C55E', border: 'none'}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >Apply Now</motion.button>
                            <motion.button 
                                className="btn btn-outline-light btn-lg p-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >Save Job</motion.button>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={cardVariants}>
                             <h5 className="text-white mb-3">Quick Stats</h5>
                             <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
                                <li>Proposals:<span className="float-end text-white">12 submitted</span></li>
                                <li>Interviewing:<span className="float-end text-white">3 candidates</span></li>
                                <li>Invites sent:<span className="float-end text-white">8</span></li>
                            </ul>
                        </motion.div>

                    </motion.div>
                </div>
            </motion.div>
            
            <SimilarProjects />

            <Footer />

        </div>
        </>
    );
};

export default JobDetailsPage;