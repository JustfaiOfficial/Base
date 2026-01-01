import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Badge, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

// CSS Styles
const customStyles = `
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #1a1a24;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #6d28d9;
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --error-red: #ef4444;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --border-color: rgba(255, 255, 255, 0.08);
    --glow-purple: 0 0 30px rgba(139, 92, 246, 0.15);
  }

  .proposal-page {
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    min-height: 100vh;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
  }

  .proposal-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .glass-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.9), rgba(30, 30, 40, 0.8));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    box-shadow: var(--glow-purple);
  }

  /* Step Tabs */
  .step-tabs {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .step-tab {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 10px;
    position: relative;
  }

  .step-tab.active {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    color: white;
  }

  .step-tab.completed {
    color: var(--success-green);
  }

  .step-number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.1);
  }

  .step-tab.active .step-number {
    background: rgba(255, 255, 255, 0.2);
  }

  .step-tab.completed .step-number {
    background: var(--success-green);
    color: white;
  }

  /* Section Header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: rgba(139, 92, 246, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px 16px 0 0;
  }

  .section-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .section-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .section-subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  /* Form Inputs */
  .form-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    padding: 0.85rem 1rem;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    background: rgba(139, 92, 246, 0.05);
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    outline: none;
    color: white;
  }

  .form-input::placeholder {
    color: var(--text-muted);
  }

  /* Milestone Cards */
  .milestone-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 1.25rem;
    margin-bottom: 1rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .milestone-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.03);
  }

  .milestone-number {
    position: absolute;
    top: -12px;
    left: 1.25rem;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    border: 3px solid var(--bg-card);
  }

  .milestone-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .milestone-actions {
    display: flex;
    gap: 0.5rem;
  }

  .milestone-action-btn {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .milestone-action-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .milestone-action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: var(--error-red);
    color: var(--error-red);
  }

  .add-milestone-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1.25rem;
    background: rgba(139, 92, 246, 0.05);
    border: 2px dashed rgba(139, 92, 246, 0.3);
    border-radius: 14px;
    color: var(--accent-purple-light);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-milestone-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
  }

  /* Budget Summary */
  .budget-summary {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.02));
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 14px;
    padding: 1.5rem;
  }

  .budget-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .budget-item:last-child {
    border-bottom: none;
  }

  .budget-total {
    background: rgba(16, 185, 129, 0.15);
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
  }

  /* Client Card */
  .client-card-header {
    height: 80px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    position: relative;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
  }

  .client-header-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .client-avatar-main {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border: 4px solid var(--bg-card);
    border-radius: 50%;
    overflow: hidden;
    margin-top: -40px;
    position: relative;
    z-index: 1;
  }

  .client-avatar-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .client-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .client-stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .client-stat-item i {
    color: var(--accent-purple-light);
    font-size: 0.9rem;
  }

  .client-stat-content {
    display: flex;
    flex-direction: column;
  }

  .client-stat-value {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
  }

  .client-stat-label {
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  /* Action Buttons */
  .btn-primary-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--success-green), #059669);
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .btn-primary-action:hover {
    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5);
    transform: translateY(-2px);
  }

  .btn-secondary-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--accent-purple-light);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary-action:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: var(--accent-purple);
  }

  /* Tips Card */
  .tips-card {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02));
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .tip-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }

  .tip-item i {
    color: var(--success-green);
    margin-top: 2px;
  }

  .tip-item span {
    color: var(--text-secondary);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  /* Template Buttons */
  .template-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .template-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  /* Icon Buttons */
  .icon-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .icon-btn:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  /* AI Suggestions */
  .ai-icon-wrapper {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
  }

  .ai-suggestions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ai-suggestion-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .ai-suggestion-item:hover {
    background: rgba(139, 92, 246, 0.1);
  }

  .ai-suggestion-item span {
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  /* Upload Zone */
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border: 2px dashed rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .upload-zone:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: var(--accent-purple);
  }

  /* Success Rate Card */
  .success-rate-card {
    padding: 0.75rem 1rem;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 10px;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  /* Milestone Status Indicator */
  .milestone-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .milestone-status.pending {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-yellow);
  }

  .milestone-status.active {
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple-light);
  }

  /* Milestone Timeline */
  .milestone-timeline {
    position: relative;
    padding-left: 2rem;
  }

  .milestone-timeline::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 1px;
  }

  .timeline-dot {
    position: absolute;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    background: var(--accent-purple);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    color: white;
    font-weight: 700;
    border: 3px solid var(--bg-card);
  }

  /* Budget Summary */
  .budget-summary {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .budget-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
  }

  .budget-total {
    padding: 1rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 10px;
    margin-top: 0.5rem;
  }

  /* Badge Optional */
  .badge-optional {
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Progress Indicator */
  .milestone-progress {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .progress-stat {
    text-align: center;
  }

  .progress-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
  }

  .progress-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .progress-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
  }

  /* Character Counter */
  .char-counter {
    text-align: right;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  /* Badge Styles */
  .badge-required {
    background: rgba(239, 68, 68, 0.15);
    color: var(--error-red);
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .badge-optional {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-muted);
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }
`;

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const ProposalPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [coverLetter, setCoverLetter] = useState('');
    const [milestones, setMilestones] = useState([
        { id: 1, title: 'Project Setup & Planning', description: 'Initial setup, requirements gathering, and project architecture', amount: 1500, duration: '1 week' },
        { id: 2, title: 'Development Phase 1', description: 'Core features development and implementation', amount: 3000, duration: '2 weeks' },
        { id: 3, title: 'Testing & Delivery', description: 'Quality assurance, bug fixes, and final delivery', amount: 1500, duration: '1 week' },
    ]);

    const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
    const serviceFee = totalAmount * 0.1;
    const netAmount = totalAmount - serviceFee;

    const addMilestone = () => {
        const newId = Math.max(...milestones.map(m => m.id), 0) + 1;
        setMilestones([...milestones, {
            id: newId,
            title: '',
            description: '',
            amount: 0,
            duration: '1 week'
        }]);
    };

    const removeMilestone = (id) => {
        if (milestones.length > 1) {
            setMilestones(milestones.filter(m => m.id !== id));
        }
    };

    const updateMilestone = (id, field, value) => {
        setMilestones(milestones.map(m =>
            m.id === id ? { ...m, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : m
        ));
    };

    const steps = [
        { id: 1, label: 'Cover Letter', icon: 'bi-envelope' },
        { id: 2, label: 'Milestones', icon: 'bi-flag' },
        { id: 3, label: 'Review', icon: 'bi-check-circle' }
    ];

    return (
        <>
            <Navbar />
            <style>{customStyles}</style>

            <div className="proposal-page">
                <Container>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Step Tabs */}
                        <motion.div variants={cardVariants} className="step-tabs">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    className={`step-tab ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                                    onClick={() => setCurrentStep(step.id)}
                                >
                                    <span className="step-number">
                                        {currentStep > step.id ? <i className="bi bi-check" /> : step.id}
                                    </span>
                                    <span>{step.label}</span>
                                </button>
                            ))}
                        </motion.div>

                        <Row className="g-4">
                            {/* Left Column - Main Content */}
                            <Col lg={8}>
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Cover Letter */}
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <div className="section-header">
                                                    <div className="section-header-left">
                                                        <div className="section-icon">
                                                            <i className="bi bi-envelope-paper" />
                                                        </div>
                                                        <div>
                                                            <h3 className="section-title">Cover Letter</h3>
                                                            <span className="section-subtitle">Write a compelling proposal</span>
                                                        </div>
                                                    </div>
                                                    <span className="badge-required">Required</span>
                                                </div>
                                                <Card.Body className="p-4">
                                                    {/* Quick Templates */}
                                                    <div className="mb-4">
                                                        <label className="small text-muted mb-2 d-block">Quick Templates</label>
                                                        <div className="d-flex gap-2 flex-wrap">
                                                            {['Professional', 'Friendly', 'Technical', 'Creative'].map((template) => (
                                                                <motion.button
                                                                    key={template}
                                                                    className="template-btn"
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    <i className="bi bi-file-text me-1" />
                                                                    {template}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <textarea
                                                        className="form-input w-100"
                                                        rows="10"
                                                        placeholder={`Write a personalized proposal that showcases your expertise...

Example:
Dear Sarah,

I've reviewed your project requirements for building an e-commerce platform and I'm excited about the opportunity. With 5+ years of experience in full-stack development using React, Node.js, and MongoDB, I'm confident I can deliver exceptional results.

Here's why I'm the perfect fit:
• Successfully completed 15+ similar e-commerce platforms
• Expert in payment gateway integration
• Strong focus on performance optimization

I'd love to discuss your project in detail.

Best regards`}
                                                        value={coverLetter}
                                                        onChange={(e) => setCoverLetter(e.target.value)}
                                                        maxLength={2000}
                                                        style={{ resize: 'none', minHeight: '280px' }}
                                                    />
                                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                                        <div className="d-flex gap-2">
                                                            <motion.button className="icon-btn" whileHover={{ scale: 1.1 }} title="Bold">
                                                                <i className="bi bi-type-bold" />
                                                            </motion.button>
                                                            <motion.button className="icon-btn" whileHover={{ scale: 1.1 }} title="Italic">
                                                                <i className="bi bi-type-italic" />
                                                            </motion.button>
                                                            <motion.button className="icon-btn" whileHover={{ scale: 1.1 }} title="List">
                                                                <i className="bi bi-list-ul" />
                                                            </motion.button>
                                                        </div>
                                                        <div className="char-counter">{coverLetter.length}/2000 characters</div>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            {/* AI Suggestions Card */}
                                            <Card className="glass-card border-0 mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.02))', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                                <Card.Body className="p-4">
                                                    <div className="d-flex align-items-center gap-3 mb-3">
                                                        <div className="ai-icon-wrapper">
                                                            <i className="bi bi-stars" />
                                                        </div>
                                                        <div>
                                                            <h6 className="text-white mb-0">AI-Powered Suggestions</h6>
                                                            <small style={{ color: 'var(--text-secondary)' }}>Enhance your proposal</small>
                                                        </div>
                                                        <Badge className="ms-auto" style={{ background: 'rgba(139, 92, 246, 0.3)', color: 'var(--accent-purple-light)' }}>Beta</Badge>
                                                    </div>
                                                    <div className="ai-suggestions">
                                                        <motion.div className="ai-suggestion-item" whileHover={{ x: 4 }}>
                                                            <i className="bi bi-lightbulb" style={{ color: 'var(--warning-yellow)' }} />
                                                            <span>Mention your experience with similar e-commerce platforms</span>
                                                        </motion.div>
                                                        <motion.div className="ai-suggestion-item" whileHover={{ x: 4 }}>
                                                            <i className="bi bi-graph-up-arrow" style={{ color: 'var(--success-green)' }} />
                                                            <span>Include specific metrics from past projects</span>
                                                        </motion.div>
                                                        <motion.div className="ai-suggestion-item" whileHover={{ x: 4 }}>
                                                            <i className="bi bi-question-circle" style={{ color: 'var(--accent-purple-light)' }} />
                                                            <span>Ask about their preferred tech stack</span>
                                                        </motion.div>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            {/* Attachments */}
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <Card.Body className="p-4">
                                                    <h6 className="text-white mb-3">
                                                        <i className="bi bi-paperclip me-2" style={{ color: 'var(--accent-purple-light)' }} />
                                                        Portfolio & Attachments
                                                        <span className="badge-optional ms-2">Optional</span>
                                                    </h6>
                                                    <div className="upload-zone">
                                                        <i className="bi bi-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--accent-purple-light)' }} />
                                                        <p className="text-muted mb-1">Drag & drop files or click to browse</p>
                                                        <small style={{ color: 'var(--text-muted)' }}>PDF, DOC, JPG, PNG (Max 10MB each)</small>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            {/* Tips */}
                                            <div className="tips-card glass-card p-4 mb-4">
                                                <h6 className="text-white mb-3">
                                                    <i className="bi bi-lightbulb-fill me-2" style={{ color: 'var(--warning-yellow)' }} />
                                                    Pro Tips for a Winning Proposal
                                                </h6>
                                                <Row className="g-3">
                                                    <Col md={6}>
                                                        <div className="tip-item">
                                                            <i className="bi bi-check-circle-fill" />
                                                            <span>Address the client by name</span>
                                                        </div>
                                                        <div className="tip-item">
                                                            <i className="bi bi-check-circle-fill" />
                                                            <span>Reference specific requirements</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="tip-item">
                                                            <i className="bi bi-check-circle-fill" />
                                                            <span>Include relevant past projects</span>
                                                        </div>
                                                        <div className="tip-item">
                                                            <i className="bi bi-check-circle-fill" />
                                                            <span>Ask thoughtful questions</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="success-rate-card mt-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <i className="bi bi-trophy-fill" style={{ color: 'var(--warning-yellow)' }} />
                                                        <span style={{ color: 'var(--success-green)', fontWeight: 700, fontSize: '1.25rem' }}>73%</span>
                                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>higher response rate with personalized proposals</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <motion.button
                                                className="btn-primary-action"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setCurrentStep(2)}
                                            >
                                                Continue to Milestones
                                                <i className="bi bi-arrow-right" />
                                            </motion.button>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Milestones */}
                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <div className="section-header">
                                                    <div className="section-header-left">
                                                        <div className="section-icon">
                                                            <i className="bi bi-flag" />
                                                        </div>
                                                        <div>
                                                            <h3 className="section-title">Project Milestones</h3>
                                                            <span className="section-subtitle">Break down your project into deliverables</span>
                                                        </div>
                                                    </div>
                                                    <Badge bg="none" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple-light)' }}>
                                                        {milestones.length} Milestones
                                                    </Badge>
                                                </div>
                                                <Card.Body className="p-4">
                                                    {/* Progress Stats */}
                                                    <div className="milestone-progress">
                                                        <div className="progress-stat">
                                                            <div className="progress-value">{milestones.length}</div>
                                                            <div className="progress-label">Milestones</div>
                                                        </div>
                                                        <div className="progress-divider" />
                                                        <div className="progress-stat">
                                                            <div className="progress-value" style={{ color: 'var(--success-green)' }}>${totalAmount.toLocaleString()}</div>
                                                            <div className="progress-label">Total Budget</div>
                                                        </div>
                                                        <div className="progress-divider" />
                                                        <div className="progress-stat">
                                                            <div className="progress-value" style={{ color: 'var(--accent-purple-light)' }}>${netAmount.toLocaleString()}</div>
                                                            <div className="progress-label">You'll Receive</div>
                                                        </div>
                                                        <div className="progress-divider" />
                                                        <div className="progress-stat">
                                                            <div className="progress-value">4 weeks</div>
                                                            <div className="progress-label">Duration</div>
                                                        </div>
                                                    </div>

                                                    {/* Milestone Cards */}
                                                    {milestones.map((milestone, index) => (
                                                        <motion.div
                                                            key={milestone.id}
                                                            className="milestone-card"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            style={{ borderLeft: `3px solid ${index === 0 ? 'var(--success-green)' : 'var(--accent-purple)'}` }}
                                                        >
                                                            <div className="milestone-number">{index + 1}</div>
                                                            <div className="milestone-header">
                                                                <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                                                                    <div className="d-flex align-items-center gap-2 mb-2">
                                                                        <Form.Control
                                                                            type="text"
                                                                            className="form-input"
                                                                            placeholder="Milestone title"
                                                                            value={milestone.title}
                                                                            onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                                                                            style={{ flex: 1 }}
                                                                        />
                                                                        {index === 0 && (
                                                                            <span className="milestone-status active">
                                                                                <i className="bi bi-play-circle" />
                                                                                First Release
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="milestone-actions">
                                                                    <motion.button
                                                                        className="milestone-action-btn"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="Drag to reorder"
                                                                    >
                                                                        <i className="bi bi-grip-vertical" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        className="milestone-action-btn delete"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => removeMilestone(milestone.id)}
                                                                    >
                                                                        <i className="bi bi-trash" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={2}
                                                                className="form-input mb-3"
                                                                placeholder="Describe what will be delivered in this milestone..."
                                                                value={milestone.description}
                                                                onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                                                            />
                                                            <Row className="g-3">
                                                                <Col md={4}>
                                                                    <label className="small text-muted mb-1 d-block">Amount</label>
                                                                    <div className="input-group">
                                                                        <span className="input-group-text bg-transparent border-0 text-white" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px 0 0 12px' }}>$</span>
                                                                        <Form.Control
                                                                            type="number"
                                                                            className="form-input"
                                                                            style={{ borderRadius: '0 12px 12px 0' }}
                                                                            value={milestone.amount}
                                                                            onChange={(e) => updateMilestone(milestone.id, 'amount', e.target.value)}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <label className="small text-muted mb-1 d-block">Duration</label>
                                                                    <Form.Select
                                                                        className="form-input"
                                                                        value={milestone.duration}
                                                                        onChange={(e) => updateMilestone(milestone.id, 'duration', e.target.value)}
                                                                    >
                                                                        <option value="1 week">1 week</option>
                                                                        <option value="2 weeks">2 weeks</option>
                                                                        <option value="3 weeks">3 weeks</option>
                                                                        <option value="1 month">1 month</option>
                                                                    </Form.Select>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <label className="small text-muted mb-1 d-block">Share</label>
                                                                    <div className="form-input d-flex align-items-center justify-content-center" style={{ padding: '0.6rem', background: 'rgba(139, 92, 246, 0.1)' }}>
                                                                        <span style={{ color: 'var(--accent-purple-light)', fontWeight: 700 }}>
                                                                            {totalAmount > 0 ? Math.round((milestone.amount / totalAmount) * 100) : 0}%
                                                                        </span>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </motion.div>
                                                    ))}

                                                    {/* Add Milestone Button */}
                                                    <motion.button
                                                        className="add-milestone-btn"
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={addMilestone}
                                                    >
                                                        <i className="bi bi-plus-circle" />
                                                        Add Another Milestone
                                                    </motion.button>
                                                </Card.Body>
                                            </Card>

                                            {/* Budget Summary Card */}
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <Card.Body className="p-4">
                                                    <h6 className="text-white mb-3">
                                                        <i className="bi bi-calculator me-2" style={{ color: 'var(--success-green)' }} />
                                                        Budget Breakdown
                                                    </h6>
                                                    <div className="budget-summary">
                                                        <div className="budget-item">
                                                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({milestones.length} milestones)</span>
                                                            <span className="text-white fw-bold">${totalAmount.toLocaleString()}</span>
                                                        </div>
                                                        <div className="budget-item">
                                                            <span style={{ color: 'var(--text-secondary)' }}>Platform Fee (10%)</span>
                                                            <span style={{ color: 'var(--error-red)' }}>-${serviceFee.toLocaleString()}</span>
                                                        </div>
                                                        <div className="budget-total d-flex justify-content-between">
                                                            <span className="text-white fw-bold">You'll Receive</span>
                                                            <span style={{ color: 'var(--success-green)', fontSize: '1.25rem', fontWeight: 800 }}>${netAmount.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            {/* Payment Timeline */}
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <Card.Body className="p-4">
                                                    <h6 className="text-white mb-3">
                                                        <i className="bi bi-calendar-check me-2" style={{ color: 'var(--accent-purple-light)' }} />
                                                        Payment Schedule Preview
                                                    </h6>
                                                    <div className="payment-timeline">
                                                        {milestones.map((m, i) => (
                                                            <div key={m.id} className="payment-item d-flex align-items-center gap-3 py-2" style={{ borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                                                <div className="payment-icon" style={{
                                                                    width: '36px',
                                                                    height: '36px',
                                                                    background: i === 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                                                                    borderRadius: '10px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    <i className="bi bi-wallet2" style={{ color: i === 0 ? 'var(--success-green)' : 'var(--accent-purple-light)' }} />
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div className="text-white small fw-semibold">{m.title || `Milestone ${i + 1}`}</div>
                                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{m.duration} from start</div>
                                                                </div>
                                                                <div className="text-white fw-bold">${m.amount.toLocaleString()}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            <div className="d-flex gap-3">
                                                <motion.button
                                                    className="btn-secondary-action"
                                                    whileHover={{ scale: 1.02 }}
                                                    onClick={() => setCurrentStep(1)}
                                                >
                                                    <i className="bi bi-arrow-left" />
                                                    Back
                                                </motion.button>
                                                <motion.button
                                                    className="btn-primary-action"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setCurrentStep(3)}
                                                >
                                                    Continue to Review
                                                    <i className="bi bi-arrow-right" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Review */}
                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <Card className="glass-card border-0 mb-4 overflow-hidden">
                                                <div className="section-header">
                                                    <div className="section-header-left">
                                                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, var(--success-green), #059669)' }}>
                                                            <i className="bi bi-check-circle" />
                                                        </div>
                                                        <div>
                                                            <h3 className="section-title">Review Your Proposal</h3>
                                                            <span className="section-subtitle">Make sure everything looks good</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Card.Body className="p-4">
                                                    {/* Cover Letter Summary */}
                                                    <div className="milestone-card mb-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 className="text-white mb-0">
                                                                <i className="bi bi-envelope me-2" style={{ color: 'var(--accent-purple-light)' }} />
                                                                Cover Letter
                                                            </h6>
                                                            <button className="milestone-action-btn" onClick={() => setCurrentStep(1)}>
                                                                <i className="bi bi-pencil" />
                                                            </button>
                                                        </div>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                            {coverLetter || 'No cover letter provided'}
                                                        </p>
                                                    </div>

                                                    {/* Milestones Summary */}
                                                    <div className="milestone-card mb-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 className="text-white mb-0">
                                                                <i className="bi bi-flag me-2" style={{ color: 'var(--accent-purple-light)' }} />
                                                                Milestones ({milestones.length})
                                                            </h6>
                                                            <button className="milestone-action-btn" onClick={() => setCurrentStep(2)}>
                                                                <i className="bi bi-pencil" />
                                                            </button>
                                                        </div>
                                                        {milestones.map((m, i) => (
                                                            <div key={m.id} className="d-flex justify-content-between py-2" style={{ borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                                                <span style={{ color: 'var(--text-secondary)' }}>{i + 1}. {m.title || 'Untitled'}</span>
                                                                <span className="text-white fw-bold">${m.amount.toLocaleString()}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Budget Summary */}
                                                    <div className="budget-summary">
                                                        <h6 className="text-white mb-3">
                                                            <i className="bi bi-calculator me-2" style={{ color: 'var(--success-green)' }} />
                                                            Budget Breakdown
                                                        </h6>
                                                        <div className="budget-item">
                                                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                                            <span className="text-white">${totalAmount.toLocaleString()}</span>
                                                        </div>
                                                        <div className="budget-item">
                                                            <span style={{ color: 'var(--text-secondary)' }}>Service Fee (10%)</span>
                                                            <span style={{ color: 'var(--error-red)' }}>-${serviceFee.toLocaleString()}</span>
                                                        </div>
                                                        <div className="budget-total d-flex justify-content-between">
                                                            <span className="text-white fw-bold">You'll Receive</span>
                                                            <span style={{ color: 'var(--success-green)', fontSize: '1.25rem', fontWeight: 800 }}>${netAmount.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                            <div className="d-flex gap-3">
                                                <motion.button
                                                    className="btn-secondary-action"
                                                    whileHover={{ scale: 1.02 }}
                                                    onClick={() => setCurrentStep(2)}
                                                >
                                                    <i className="bi bi-arrow-left" />
                                                    Back
                                                </motion.button>
                                                <motion.button
                                                    className="btn-primary-action"
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <i className="bi bi-send-fill" />
                                                    Submit Proposal
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Col>

                            {/* Right Column - Sidebar */}
                            <Col lg={4}>
                                {/* Client Card */}
                                <motion.div variants={cardVariants}>
                                    <Card className="glass-card border-0 mb-4 overflow-hidden">
                                        <div className="client-card-header">
                                            <div className="client-header-pattern" />
                                        </div>
                                        <Card.Body className="p-4 text-center">
                                            <div className="client-avatar-main">
                                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" />
                                            </div>
                                            <h5 className="text-white fw-bold mt-3 mb-1">Sarah Johnson</h5>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }} className="mb-2">TechCorp Solutions</p>
                                            <div className="d-flex justify-content-center gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <i key={i} className="bi bi-star-fill" style={{ color: i <= 5 ? 'var(--warning-yellow)' : 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }} />
                                                ))}
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>4.9 (127)</span>
                                            </div>

                                            <div className="client-stats-grid mt-4">
                                                <div className="client-stat-item">
                                                    <i className="bi bi-calendar3" />
                                                    <div className="client-stat-content">
                                                        <span className="client-stat-value">Jan 2020</span>
                                                        <span className="client-stat-label">Member since</span>
                                                    </div>
                                                </div>
                                                <div className="client-stat-item">
                                                    <i className="bi bi-currency-dollar" />
                                                    <div className="client-stat-content">
                                                        <span className="client-stat-value">$125K+</span>
                                                        <span className="client-stat-label">Total spent</span>
                                                    </div>
                                                </div>
                                                <div className="client-stat-item">
                                                    <i className="bi bi-briefcase" />
                                                    <div className="client-stat-content">
                                                        <span className="client-stat-value">45</span>
                                                        <span className="client-stat-label">Jobs posted</span>
                                                    </div>
                                                </div>
                                                <div className="client-stat-item">
                                                    <i className="bi bi-geo-alt" />
                                                    <div className="client-stat-content">
                                                        <span className="client-stat-value">SF, CA</span>
                                                        <span className="client-stat-label">Location</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3 p-2 d-inline-flex align-items-center gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                                                <i className="bi bi-patch-check-fill" style={{ color: 'var(--success-green)' }} />
                                                <span style={{ color: 'var(--success-green)', fontSize: '0.8rem', fontWeight: 600 }}>Payment Verified</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>

                                {/* Competition Insights */}
                                <motion.div variants={cardVariants}>
                                    <Card className="glass-card border-0 p-4 mb-4">
                                        <h6 className="text-white mb-3">
                                            <i className="bi bi-bar-chart me-2" style={{ color: 'var(--accent-purple-light)' }} />
                                            Competition Insights
                                        </h6>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div>
                                                <div className="text-muted small">Proposals</div>
                                                <div className="text-white fw-bold fs-5">15</div>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Avg. Bid</div>
                                                <div style={{ color: 'var(--success-green)' }} className="fw-bold fs-5">$4,800</div>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Interviewing</div>
                                                <div className="text-white fw-bold fs-5">3</div>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            now={70}
                                            style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}
                                            className="mb-2"
                                        />
                                        <div className="d-flex justify-content-between">
                                            <small style={{ color: 'var(--text-muted)' }}>Your rate position</small>
                                            <small style={{ color: 'var(--success-green)', fontWeight: 600 }}>Above average</small>
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Your Stats */}
                                <motion.div variants={cardVariants}>
                                    <Card className="glass-card border-0 p-4">
                                        <h6 className="text-white mb-3">
                                            <i className="bi bi-award me-2" style={{ color: 'var(--warning-yellow)' }} />
                                            Your Performance
                                        </h6>
                                        <div className="d-flex justify-content-around text-center mb-3">
                                            <div>
                                                <div style={{ color: 'var(--success-green)', fontSize: '1.5rem', fontWeight: 800 }}>89%</div>
                                                <div className="text-muted small">Success</div>
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--warning-yellow)', fontSize: '1.5rem', fontWeight: 800 }}>4.8</div>
                                                <div className="text-muted small">Rating</div>
                                            </div>
                                            <div>
                                                <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>28</div>
                                                <div className="text-muted small">Projects</div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>
                    </motion.div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default ProposalPage;
