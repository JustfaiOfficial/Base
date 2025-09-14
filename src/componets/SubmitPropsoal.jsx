import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const ProposalPage = () => {
    const [hourlyRate, setHourlyRate] = useState(33);
    const [deliveryTime, setDeliveryTime] = useState('1 Week');
    const [pricingOption, setPricingOption] = useState('fixed'); // 'fixed' or 'milestone'
    const [fixedPrice, setFixedPrice] = useState(5000);
    const [coverLetterCharCount, setCoverLetterCharCount] = useState(0);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const pageStyle = {
        background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                     radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                     linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
        color: '#E5E7EB',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        minHeight: '100vh',
    };

    const cardStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
    };

    const inputStyle = {
        backgroundColor: '#1F2937',
        border: '1px solid #4B5563',
        color: '#D1D5DB',
    };

    const badgeStyle = {
        backgroundColor: '#374151',
        color: '#D1D5DB',
        padding: '0.4em 0.8em',
        borderRadius: '0.3rem',
    };

    const handleCoverLetterChange = (e) => {
        setCoverLetterCharCount(e.target.value.length);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <>
        <Navbar></Navbar>
        <motion.div
            style={pageStyle}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container">
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-8">
                        {/* Submit Your Proposal Header */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h2 className="text-white mb-2"><i className="bi bi-file-earmark-text-fill me-2 text-primary"></i>Submit Your Proposal</h2>
                            <p className="text-white-50">Craft a compelling proposal to stand out from the competition</p>
                        </motion.div>

                        {/* Cover Letter */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-white mb-0"><i className="bi bi-envelope-fill me-2 text-primary"></i>Cover Letter</h4>
                                <span className="badge" style={badgeStyle}>Required</span>
                            </div>
                            <textarea
                                className="form-control mb-3"
                                style={{ ...inputStyle, minHeight: '150px' }}
                                placeholder="Write a personalized proposal that showcases your expertise and explains why you're the perfect fit for this project..."
                                maxLength="2000"
                                onChange={handleCoverLetterChange}
                            ></textarea>
                            <div className="small text-end text-white-50">{coverLetterCharCount}/2000 characters</div>
                            
                            <p className="small text-white mt-3">
                                <strong>Tips:</strong>
                                <ul className="list-unstyled mb-0 ms-3 mt-2">
                                    <li><i className="bi bi-dot me-2 text-success"></i>Address the client's specific needs</li>
                                    <li><i className="bi bi-dot me-2 text-success"></i>Highlight relevant experience</li>
                                    <li><i className="bi bi-dot me-2 text-success"></i>Mention similar projects you've completed</li>
                                    <li><i className="bi bi-dot me-2 text-success"></i>Ask thoughtful questions about the project</li>
                                </ul>
                            </p>
                            <p className="text-warning small mt-3"><i className="bi bi-lightbulb-fill me-2"></i>Personalized proposals get 3x more responses</p>
                        </motion.div>

                        {/* Hourly Rate & Estimated Delivery */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <div className="row">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <h4 className="text-white mb-3"><i className="bi bi-cash-stack me-2 text-success"></i>Hourly Rate</h4>
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark border-secondary text-white">$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={inputStyle}
                                            value={hourlyRate}
                                            onChange={(e) => setHourlyRate(e.target.value)}
                                        />
                                        <span className="input-group-text bg-dark border-secondary text-white">/hour</span>
                                    </div>
                                    <p className="small text-white-50 mt-2">Your rate after fees: <span className="text-success fw-bold">$76.50/hr</span></p>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="text-white mb-3"><i className="bi bi-calendar-fill me-2 text-info"></i>Estimated Delivery</h4>
                                    <select
                                        className="form-select"
                                        style={inputStyle}
                                        value={deliveryTime}
                                        onChange={(e) => setDeliveryTime(e.target.value)}
                                    >
                                        <option value="1 Week">1 Week</option>
                                        <option value="2 Weeks">2 Weeks</option>
                                        <option value="1 Month">1 Month</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Alternative Pricing Options */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-tags-fill me-2 text-warning"></i>Alternative Pricing Options</h4>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div
                                        className="p-3 d-flex align-items-center justify-content-between"
                                        style={{ ...cardStyle, backgroundColor: pricingOption === 'fixed' ? 'rgba(124,58,237,0.2)' : '#1F2937', cursor: 'pointer' }}
                                        onClick={() => setPricingOption('fixed')}
                                    >
                                        <div>
                                            <p className="mb-1 text-white-50 small">Fixed Price Project</p>
                                            <div className="input-group">
                                                <span className="input-group-text bg-transparent border-0 text-white p-0">$</span>
                                                <input
                                                    type="number"
                                                    className="form-control bg-transparent border-0 text-white p-0"
                                                    value={fixedPrice}
                                                    onChange={(e) => setFixedPrice(e.target.value)}
                                                    disabled={pricingOption !== 'fixed'}
                                                />
                                            </div>
                                        </div>
                                        <div className={`form-check form-check-inline ${pricingOption === 'fixed' ? 'text-primary' : ''}`}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="pricingOption"
                                                id="fixedPriceRadio"
                                                value="fixed"
                                                checked={pricingOption === 'fixed'}
                                                onChange={() => setPricingOption('fixed')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div
                                        className="p-3 d-flex align-items-center justify-content-between"
                                        style={{ ...cardStyle, backgroundColor: pricingOption === 'milestone' ? 'rgba(124,58,237,0.2)' : '#1F2937', cursor: 'pointer' }}
                                        onClick={() => setPricingOption('milestone')}
                                    >
                                        <div>
                                            <p className="mb-1 text-white-50 small">Milestone-Based</p>
                                            <h5 className="text-white">Set up milestones...</h5>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="pricingOption"
                                                id="milestoneRadio"
                                                value="milestone"
                                                checked={pricingOption === 'milestone'}
                                                onChange={() => setPricingOption('milestone')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Portfolio & Supporting Documents */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-folder-fill me-2 text-info"></i>Portfolio & Supporting Documents</h4>
                            <div
                                className="border border-dashed p-5 text-center"
                                style={{ borderColor: '#4B5563', borderRadius: '0.5rem', backgroundColor: '#1F2937' }}
                            >
                                <i className="bi bi-cloud-arrow-up-fill fs-1 text-primary mb-3"></i>
                                <p className="text-white-50 mb-2">Drag & drop files here or click to browse</p>
                                <p className="small text-white-50 mb-3">Support: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                                <button className="btn btn-primary" style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}>Choose Files</button>
                            </div>
                        </motion.div>

                        {/* Additional Notes */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-lightbulb-fill me-2 text-warning"></i>Additional Notes <span className="badge" style={badgeStyle}>Optional</span></h4>
                            <textarea
                                className="form-control"
                                style={{ ...inputStyle, minHeight: '100px' }}
                                placeholder="Any additional information, questions, or special considerations for this project..."
                            ></textarea>
                        </motion.div>

                        {/* Terms & Conditions */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="agreeToTerms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}
                                />
                                <label className="form-check-label text-white-50 ms-2" htmlFor="agreeToTerms">
                                    I agree to the <a href="#" className="text-primary text-decoration-none">Terms of Service</a>, <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>, and <a href="#" className="text-primary text-decoration-none">User Agreement</a>. I understand that all work must be completed through the platform for payment protection.
                                </label>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div className="d-flex justify-content-start gap-3" variants={itemVariants}>
                            <button className="btn btn-success btn-lg px-4 py-2" style={{ backgroundColor: '#22C55E', border: 'none' }} disabled={!agreeToTerms}>
                                <i className="bi bi-check-circle-fill me-2"></i>Submit Proposal
                            </button>
                            <button className="btn btn-primary btn-lg px-4 py-2" style={{ backgroundColor: '#7C3AED', border: 'none' }}>
                                <i className="bi bi-save-fill me-2"></i>Save Draft
                            </button>
                            <button className="btn btn-danger btn-lg px-4 py-2" style={{ backgroundColor: '#EF4444', border: 'none' }}>
                                <i className="bi bi-x-circle-fill me-2"></i>Cancel
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-4">
                        {/* About the Client */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-4"><i className="bi bi-person-fill me-2 text-primary"></i>About the Client</h4>
                            <div className="d-flex align-items-center mb-3">
                                <img src="https://i.pravatar.cc/150?u=marcus" alt="Sarah Johnson" className="rounded-circle me-3" />
                                <div>
                                    <h5 className="text-white mb-0">Sarah Johnson</h5>
                                    <p className="text-white-50 mb-0 small">TechCorp Solutions</p>
                                    <p className="text-warning mb-0"><i className="bi bi-star-fill"></i> 4.9 <span className="text-white-50">(127 reviews)</span></p>
                                </div>
                            </div>
                            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 small">
                                <li><strong>Member since:</strong><span className="float-end text-white">Jan 2020</span></li>
                                <li><strong>Total spent:</strong><span className="float-end text-white">$125,000+</span></li>
                                <li><strong>Jobs posted:</strong><span className="float-end text-white">45</span></li>
                                <li><strong>Location:</strong><span className="float-end text-white">San Francisco, CA</span></li>
                            </ul>
                            <div className="mt-3">
                                <span className="badge bg-success-subtle text-success-emphasis p-2"><i className="bi bi-patch-check-fill me-2"></i>Payment method verified</span>
                            </div>
                        </motion.div>

                        {/* Proposal Tips */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-lightbulb-fill me-2 text-warning"></i>Proposal Tips</h4>
                            <ul className="list-unstyled d-flex flex-column gap-3 text-white-50 small">
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Address the client by name and reference specific project requirements</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Highlight 2-3 most relevant past projects with results</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Ask thoughtful questions about the project scope</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Include portfolio samples directly related to their needs</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Propose a clear project timeline with milestones</li>
                            </ul>
                            <p className="text-white-50 mt-4 mb-1">Success Rate</p>
                            <h3 className="text-success fw-bold">73%</h3>
                            <p className="small text-white-50">of proposals following these tips get responses</p>
                        </motion.div>

                        {/* Competition Insights */}
                        <motion.div className="p-4 mb-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-bar-chart-fill me-2 text-danger"></i>Competition Insights</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className="mb-0 text-white-50 small">Proposals submitted</p>
                                    <h4 className="text-white">15</h4>
                                </div>
                                <div>
                                    <p className="mb-0 text-white-50 small">Average bid</p>
                                    <h4 className="text-success fw-bold">$65</h4>
                                </div>
                            </div>
                            <p className="text-white-50 mb-1">Your rate position:</p>
                            <div className="progress mb-3" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '70%' }}></div>
                            </div>
                            <h5 className="text-white mb-2">Above average</h5>
                            <div className="p-3" style={{ ...cardStyle, backgroundColor: '#1F2937', border: '1px solid #4B5563' }}>
                                <p className="small mb-0 text-white">
                                    <i className="bi bi-info-circle-fill me-2 text-info"></i>
                                    <strong>Recommendation:</strong> Your rate is competitive. Focus on showcasing unique value in your proposal.
                                </p>
                            </div>
                        </motion.div>

                        {/* Your Performance */}
                        <motion.div className="p-4" style={cardStyle} variants={itemVariants}>
                            <h4 className="text-white mb-3"><i className="bi bi-award-fill me-2 text-warning"></i>Your Performance</h4>
                            <div className="d-flex justify-content-around mb-3">
                                <div className="text-center">
                                    <h3 className="text-success fw-bold">89%</h3>
                                    <p className="small text-white-50 mb-0">Success Rate</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-info fw-bold">4.8</h3>
                                    <p className="small text-white-50 mb-0">Avg. Rating</p>
                                </div>
                            </div>
                            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 small">
                                <li>Proposals sent:<span className="float-end text-white">127</span></li>
                                <li>Interviews:<span className="float-end text-white">34</span></li>
                                <li>Projects won:<span className="float-end text-success">28</span></li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
                
            </div>
            <Footer></Footer>
        </motion.div></>
    );
};

export default ProposalPage;