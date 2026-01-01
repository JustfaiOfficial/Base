import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const customStyles = `
  :root {
    --bg-primary: #030305;
    --bg-secondary: #0f0f18;
    --bg-card: #1a1a28;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --accent-gradient: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --error-red: #ef4444;
    --info-blue: #3b82f6;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-subtle: rgba(255, 255, 255, 0.06);
  }

  .milestone-page {
    background: var(--bg-primary);
    min-height: 100vh;
    color: white;
  }

  .page-content {
    padding: 2rem 0 4rem;
  }

  /* Page Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    letter-spacing: -0.02em;
  }

  .page-title i {
    color: var(--accent-purple-light);
  }

  .page-stats {
    display: flex;
    gap: 2rem;
  }

  .page-stat {
    text-align: center;
  }

  .page-stat-value {
    font-size: 1.5rem;
    font-weight: 800;
  }

  .page-stat-value.green { color: var(--success-green); }
  .page-stat-value.purple { color: var(--accent-purple-light); }
  .page-stat-value.yellow { color: var(--warning-yellow); }

  .page-stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Two Column Layout */
  .milestone-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2rem;
    min-height: 70vh;
  }

  /* Milestone List */
  .milestone-list-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .list-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-title {
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .list-count {
    background: var(--accent-gradient);
    color: white;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .filter-tabs {
    display: flex;
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-tab:hover {
    border-color: rgba(139, 92, 246, 0.3);
    color: var(--text-secondary);
  }

  .filter-tab.active {
    background: rgba(139, 92, 246, 0.15);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .milestone-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem;
  }

  .milestone-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
  }

  .milestone-item:hover {
    background: rgba(255, 255, 255, 0.02);
    border-color: var(--border-subtle);
  }

  .milestone-item.selected {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
  }

  .milestone-item.completed {
    border-left: 3px solid var(--success-green);
  }

  .milestone-item.in-progress {
    border-left: 3px solid var(--accent-purple);
  }

  .milestone-item.pending {
    border-left: 3px solid var(--text-muted);
    opacity: 0.7;
  }

  .milestone-item.review {
    border-left: 3px solid var(--info-blue);
  }

  .item-number {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .item-number.completed {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .item-number.in-progress {
    background: var(--accent-gradient);
    color: white;
  }

  .item-number.pending {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-muted);
  }

  .item-number.review {
    background: rgba(59, 130, 246, 0.15);
    color: var(--info-blue);
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .item-amount {
    color: var(--success-green);
    font-weight: 600;
  }

  /* Detail Panel */
  .detail-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    overflow: hidden;
  }

  .detail-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: var(--accent-purple-light);
    font-size: 2rem;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .empty-text {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* Detail Header */
  .detail-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .detail-title-section {
    flex: 1;
  }

  .detail-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.85rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 0.75rem;
  }

  .detail-badge.completed {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .detail-badge.in-progress {
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple-light);
  }

  .detail-badge.pending {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-muted);
  }

  .detail-badge.review {
    background: rgba(59, 130, 246, 0.15);
    color: var(--info-blue);
  }

  .detail-title {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .detail-desc {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .detail-amount {
    text-align: right;
  }

  .amount-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .amount-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--success-green);
  }

  /* Detail Body */
  .detail-body {
    padding: 1.5rem;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .detail-stat {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    padding: 1.25rem;
    text-align: center;
  }

  .detail-stat-icon {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
    color: var(--accent-purple-light);
  }

  .detail-stat-value {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.15rem;
  }

  .detail-stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Progress Section */
  .progress-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .progress-title {
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .progress-title i {
    color: var(--accent-purple-light);
  }

  .progress-percent {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--accent-purple-light);
  }

  .progress-bar-container {
    height: 10px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--accent-gradient);
    border-radius: 5px;
    transition: width 0.5s ease;
  }

  .progress-tasks {
    display: flex;
    gap: 1rem;
  }

  .progress-task {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .progress-task i {
    font-size: 0.9rem;
  }

  .progress-task i.completed { color: var(--success-green); }
  .progress-task i.pending { color: var(--text-muted); }

  /* Deliverables Section */
  .deliverables-section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-title i {
    color: var(--accent-purple-light);
  }

  .deliverable-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .deliverable-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .deliverable-item:hover {
    border-color: rgba(139, 92, 246, 0.2);
  }

  .deliverable-icon {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-purple-light);
    flex-shrink: 0;
  }

  .deliverable-info {
    flex: 1;
  }

  .deliverable-name {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.15rem;
  }

  .deliverable-meta {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .deliverable-status {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .deliverable-status.done {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .deliverable-status.pending {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-muted);
  }

  /* Action Buttons */
  .detail-actions {
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-subtle);
  }

  .btn-action {
    flex: 1;
    padding: 0.875rem 1.5rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: var(--accent-gradient);
    border: none;
    color: white;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
  }

  /* Timeline */
  .timeline-section {
    margin-bottom: 1.5rem;
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-subtle);
  }

  .timeline-item {
    position: relative;
    padding-bottom: 1.5rem;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -2rem;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 2px solid var(--accent-purple);
    z-index: 1;
  }

  .timeline-dot.completed {
    background: var(--success-green);
    border-color: var(--success-green);
  }

  .timeline-content {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 1rem;
  }

  .timeline-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .timeline-date {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .milestone-layout {
      grid-template-columns: 350px 1fr;
    }
  }

  @media (max-width: 992px) {
    .milestone-layout {
      grid-template-columns: 1fr;
    }

    .milestone-list-container {
      max-height: 400px;
    }

    .detail-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .page-header {
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-start;
    }
  }

  @media (max-width: 576px) {
    .detail-grid {
      grid-template-columns: 1fr 1fr;
    }

    .detail-header {
      flex-direction: column;
      gap: 1rem;
    }

    .detail-amount {
      text-align: left;
    }
  }
`;

const mockProjects = [
  { id: 'proj1', name: 'E-Commerce Platform', client: 'TechStore Inc.', totalBudget: 6000, color: '#8b5cf6' },
  { id: 'proj2', name: 'Mobile Banking App', client: 'FinanceFlow', totalBudget: 4500, color: '#3b82f6' },
  { id: 'proj3', name: 'Brand Identity', client: 'StartupXYZ', totalBudget: 2000, color: '#10b981' },
];

const mockMilestones = [
  // E-Commerce Platform Milestones
  {
    id: 1, projectId: 'proj1', title: 'Project Setup & Planning', description: 'Initial setup, requirements gathering, and project architecture planning.', amount: 500, status: 'completed', paymentStatus: 'paid', dueDate: 'Dec 15, 2024', completedDate: 'Dec 14, 2024', progress: 100,
    deliverables: [{ name: 'Requirements Doc', type: 'pdf', status: 'done' }, { name: 'Architecture Diagram', type: 'figma', status: 'done' }],
    timeline: [{ title: 'Milestone started', date: 'Dec 10, 2024', completed: true }, { title: 'Milestone completed', date: 'Dec 14, 2024', completed: true }]
  },
  {
    id: 2, projectId: 'proj1', title: 'UI/UX Design', description: 'Complete design mockups for all pages including responsive layouts.', amount: 1200, status: 'completed', paymentStatus: 'paid', dueDate: 'Dec 22, 2024', completedDate: 'Dec 21, 2024', progress: 100,
    deliverables: [{ name: 'Figma Design Files', type: 'figma', status: 'done' }, { name: 'Design System', type: 'doc', status: 'done' }],
    timeline: [{ title: 'Design started', date: 'Dec 16, 2024', completed: true }, { title: 'Design approved', date: 'Dec 21, 2024', completed: true }]
  },
  {
    id: 3, projectId: 'proj1', title: 'Frontend Development', description: 'Build all frontend components using React with animations.', amount: 2000, status: 'in-progress', paymentStatus: 'pending', dueDate: 'Jan 5, 2025', progress: 65,
    deliverables: [{ name: 'Homepage', type: 'code', status: 'done' }, { name: 'Dashboard', type: 'code', status: 'done' }, { name: 'User Profile', type: 'code', status: 'pending' }],
    timeline: [{ title: 'Development started', date: 'Dec 23, 2024', completed: true }, { title: 'Core components done', date: 'Dec 28, 2024', completed: true }]
  },
  {
    id: 4, projectId: 'proj1', title: 'Backend Integration', description: 'API integration, database setup, and authentication.', amount: 1500, status: 'pending', paymentStatus: 'pending', dueDate: 'Jan 12, 2025', progress: 0,
    deliverables: [{ name: 'API Integration', type: 'code', status: 'pending' }], timeline: []
  },
  {
    id: 5, projectId: 'proj1', title: 'Testing & Deployment', description: 'QA testing, bug fixes, and production deployment.', amount: 800, status: 'pending', paymentStatus: 'pending', dueDate: 'Jan 16, 2025', progress: 0,
    deliverables: [{ name: 'Test Reports', type: 'doc', status: 'pending' }], timeline: []
  },
  // Mobile Banking App Milestones
  {
    id: 6, projectId: 'proj2', title: 'App Architecture', description: 'Mobile app architecture and tech stack decisions.', amount: 800, status: 'completed', paymentStatus: 'paid', dueDate: 'Dec 20, 2024', completedDate: 'Dec 19, 2024', progress: 100,
    deliverables: [{ name: 'Tech Stack Doc', type: 'doc', status: 'done' }], timeline: [{ title: 'Architecture approved', date: 'Dec 19, 2024', completed: true }]
  },
  {
    id: 7, projectId: 'proj2', title: 'Core Features', description: 'Build core banking features: accounts, transfers, payments.', amount: 2000, status: 'in-progress', paymentStatus: 'pending', dueDate: 'Jan 10, 2025', progress: 45,
    deliverables: [{ name: 'Account Module', type: 'code', status: 'done' }, { name: 'Transfer Module', type: 'code', status: 'pending' }],
    timeline: [{ title: 'Development started', date: 'Dec 21, 2024', completed: true }]
  },
  {
    id: 8, projectId: 'proj2', title: 'Security & Compliance', description: 'Implement security features and banking compliance.', amount: 1200, status: 'pending', paymentStatus: 'pending', dueDate: 'Jan 18, 2025', progress: 0,
    deliverables: [{ name: 'Security Audit', type: 'doc', status: 'pending' }], timeline: []
  },
  {
    id: 9, projectId: 'proj2', title: 'App Store Launch', description: 'Final testing and app store submission.', amount: 500, status: 'pending', paymentStatus: 'pending', dueDate: 'Jan 25, 2025', progress: 0,
    deliverables: [{ name: 'App Store Assets', type: 'figma', status: 'pending' }], timeline: []
  },
  // Brand Identity Milestones
  {
    id: 10, projectId: 'proj3', title: 'Logo Design', description: 'Create brand logo with variations.', amount: 600, status: 'completed', paymentStatus: 'paid', dueDate: 'Dec 18, 2024', completedDate: 'Dec 17, 2024', progress: 100,
    deliverables: [{ name: 'Logo Files', type: 'figma', status: 'done' }], timeline: [{ title: 'Logo approved', date: 'Dec 17, 2024', completed: true }]
  },
  {
    id: 11, projectId: 'proj3', title: 'Brand Guidelines', description: 'Complete brand style guide document.', amount: 800, status: 'review', paymentStatus: 'pending', dueDate: 'Dec 28, 2024', progress: 90,
    deliverables: [{ name: 'Brand Guide PDF', type: 'pdf', status: 'done' }], timeline: [{ title: 'Submitted for review', date: 'Dec 26, 2024', completed: true }]
  },
  {
    id: 12, projectId: 'proj3', title: 'Marketing Collateral', description: 'Social media templates and marketing assets.', amount: 600, status: 'pending', paymentStatus: 'pending', dueDate: 'Jan 5, 2025', progress: 0,
    deliverables: [{ name: 'Social Templates', type: 'figma', status: 'pending' }], timeline: []
  },
];

const MilestoneTracker = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Calculations
  const completedCount = mockMilestones.filter(m => m.status === 'completed').length;
  const totalAmount = mockMilestones.reduce((sum, m) => sum + m.amount, 0);
  const earnedAmount = mockMilestones.filter(m => m.paymentStatus === 'paid').reduce((sum, m) => sum + m.amount, 0);
  const pendingPayment = mockMilestones.filter(m => m.status === 'completed' && m.paymentStatus === 'pending').reduce((sum, m) => sum + m.amount, 0);

  // Filter milestones
  let filteredMilestones = mockMilestones;
  if (selectedProject !== 'all') {
    filteredMilestones = filteredMilestones.filter(m => m.projectId === selectedProject);
  }
  if (filter !== 'all') {
    filteredMilestones = filteredMilestones.filter(m => m.status === filter);
  }

  const getProjectInfo = (projectId) => mockProjects.find(p => p.id === projectId);

  const getStatusIcon = (status) => {
    const icons = { completed: 'bi-check-lg', 'in-progress': 'bi-arrow-repeat', pending: 'bi-clock', review: 'bi-eye' };
    return icons[status] || 'bi-circle';
  };

  const getFileIcon = (type) => {
    const icons = { pdf: 'bi-file-pdf', figma: 'bi-palette', doc: 'bi-file-text', code: 'bi-code-slash', link: 'bi-link-45deg' };
    return icons[type] || 'bi-file';
  };

  const selected = mockMilestones.find(m => m.id === selectedMilestone);

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>

      <div className="milestone-page">
        <Container className="page-content">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="page-title">
              <i className="bi bi-flag-fill" />
              Milestone Tracker
            </h1>
            <div className="page-stats">
              <div className="page-stat">
                <div className="page-stat-value green">${earnedAmount.toLocaleString()}</div>
                <div className="page-stat-label">Paid</div>
              </div>
              <div className="page-stat">
                <div className="page-stat-value" style={{ color: '#3b82f6' }}>${pendingPayment.toLocaleString()}</div>
                <div className="page-stat-label">Awaiting Payment</div>
              </div>
              <div className="page-stat">
                <div className="page-stat-value yellow">${(totalAmount - earnedAmount - pendingPayment).toLocaleString()}</div>
                <div className="page-stat-label">Remaining</div>
              </div>
              <div className="page-stat">
                <div className="page-stat-value purple">{completedCount}/{mockMilestones.length}</div>
                <div className="page-stat-label">Completed</div>
              </div>
            </div>
          </motion.div>

          {/* Project Filter */}
          <motion.div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <button className={`filter-tab ${selectedProject === 'all' ? 'active' : ''}`} onClick={() => setSelectedProject('all')} style={{ padding: '0.5rem 1rem' }}>
              All Projects
            </button>
            {mockProjects.map(proj => (
              <button key={proj.id} className={`filter-tab ${selectedProject === proj.id ? 'active' : ''}`} onClick={() => setSelectedProject(proj.id)} style={{ padding: '0.5rem 1rem', borderLeft: `3px solid ${proj.color}` }}>
                {proj.name}
              </button>
            ))}
          </motion.div>

          {/* Main Layout */}
          <div className="milestone-layout">
            {/* Milestone List */}
            <motion.div
              className="milestone-list-container"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="list-header">
                <div className="list-title">
                  Milestones
                  <span className="list-count">{filteredMilestones.length}</span>
                </div>
                <div className="filter-tabs">
                  {['all', 'in-progress', 'completed', 'review'].map(f => (
                    <button
                      key={f}
                      className={`filter-tab ${filter === f ? 'active' : ''}`}
                      onClick={() => setFilter(f)}
                    >
                      {f === 'all' ? 'All' : f === 'in-progress' ? 'Active' : f === 'review' ? 'Review' : 'Done'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="milestone-list">
                <AnimatePresence>
                  {filteredMilestones.map((milestone, index) => {
                    const project = getProjectInfo(milestone.projectId);
                    return (
                      <motion.div
                        key={milestone.id}
                        className={`milestone-item ${milestone.status} ${selectedMilestone === milestone.id ? 'selected' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedMilestone(milestone.id)}
                        whileHover={{ x: 4 }}
                      >
                        <div className={`item-number ${milestone.status}`} style={{ borderLeft: `3px solid ${project?.color || '#8b5cf6'}` }}>
                          {milestone.status === 'completed' ? <i className="bi bi-check-lg" /> : milestone.id}
                        </div>
                        <div className="item-info">
                          <div style={{ fontSize: '0.65rem', color: project?.color || '#8b5cf6', fontWeight: '600', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{project?.name}</div>
                          <div className="item-title">{milestone.title}</div>
                          <div className="item-meta">
                            <span className="item-amount">${milestone.amount}</span>
                            <span>Due: {milestone.dueDate}</span>
                            {milestone.paymentStatus === 'paid' && <span style={{ color: '#10b981', fontWeight: '600' }}><i className="bi bi-check-circle-fill" style={{ marginRight: '0.2rem' }} />Paid</span>}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Detail Panel */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {!selected ? (
                  <motion.div
                    className="detail-empty"
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="empty-icon">
                      <i className="bi bi-cursor-fill" />
                    </div>
                    <h3 className="empty-title">Select a Milestone</h3>
                    <p className="empty-text">Click on a milestone from the list to view its details</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Detail Header */}
                    <div className="detail-header">
                      <div className="detail-title-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.7rem', padding: '0.35rem 0.75rem', borderRadius: '6px', background: `${getProjectInfo(selected.projectId)?.color}20`, color: getProjectInfo(selected.projectId)?.color, fontWeight: '600', border: `1px solid ${getProjectInfo(selected.projectId)?.color}40` }}>
                            {getProjectInfo(selected.projectId)?.name}
                          </span>
                          <span className={`detail-badge ${selected.status}`}>
                            <i className={`bi ${getStatusIcon(selected.status)}`} />
                            {selected.status.replace('-', ' ')}
                          </span>
                          {selected.paymentStatus === 'paid' && (
                            <span style={{ fontSize: '0.7rem', padding: '0.35rem 0.75rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: '600' }}>
                              <i className="bi bi-check-circle-fill" style={{ marginRight: '0.3rem' }} />Paid
                            </span>
                          )}
                        </div>
                        <h2 className="detail-title">{selected.title}</h2>
                        <p className="detail-desc">{selected.description}</p>
                      </div>
                      <div className="detail-amount">
                        <div className="amount-label">Payment</div>
                        <div className="amount-value">${selected.amount.toLocaleString()}</div>
                        <div style={{ fontSize: '0.75rem', color: selected.paymentStatus === 'paid' ? '#10b981' : '#f59e0b', fontWeight: '600', marginTop: '0.25rem' }}>
                          {selected.paymentStatus === 'paid' ? '✓ Received' : '⏳ Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Detail Body */}
                    <div className="detail-body">
                      {/* Stats Grid */}
                      <div className="detail-grid">
                        <div className="detail-stat">
                          <div className="detail-stat-icon"><i className="bi bi-calendar3" /></div>
                          <div className="detail-stat-value">{selected.dueDate}</div>
                          <div className="detail-stat-label">Due Date</div>
                        </div>
                        <div className="detail-stat">
                          <div className="detail-stat-icon"><i className="bi bi-pie-chart" /></div>
                          <div className="detail-stat-value">{selected.progress}%</div>
                          <div className="detail-stat-label">Progress</div>
                        </div>
                        <div className="detail-stat">
                          <div className="detail-stat-icon"><i className="bi bi-paperclip" /></div>
                          <div className="detail-stat-value">{selected.deliverables.length}</div>
                          <div className="detail-stat-label">Deliverables</div>
                        </div>
                        <div className="detail-stat">
                          <div className="detail-stat-icon"><i className="bi bi-clock-history" /></div>
                          <div className="detail-stat-value">{selected.timeline.length}</div>
                          <div className="detail-stat-label">Updates</div>
                        </div>
                      </div>

                      {/* Progress Section */}
                      {selected.status !== 'pending' && (
                        <div className="progress-section">
                          <div className="progress-header">
                            <div className="progress-title">
                              <i className="bi bi-graph-up" />
                              Milestone Progress
                            </div>
                            <div className="progress-percent">{selected.progress}%</div>
                          </div>
                          <div className="progress-bar-container">
                            <motion.div
                              className="progress-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${selected.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                          <div className="progress-tasks">
                            <div className="progress-task">
                              <i className="bi bi-check-circle-fill completed" />
                              {selected.deliverables.filter(d => d.status === 'done').length} completed
                            </div>
                            <div className="progress-task">
                              <i className="bi bi-circle pending" />
                              {selected.deliverables.filter(d => d.status === 'pending').length} remaining
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Deliverables */}
                      <div className="deliverables-section">
                        <h4 className="section-title">
                          <i className="bi bi-folder2-open" />
                          Deliverables
                        </h4>
                        <div className="deliverable-list">
                          {selected.deliverables.map((item, index) => (
                            <motion.div
                              key={index}
                              className="deliverable-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <div className="deliverable-icon">
                                <i className={`bi ${getFileIcon(item.type)}`} />
                              </div>
                              <div className="deliverable-info">
                                <div className="deliverable-name">{item.name}</div>
                                <div className="deliverable-meta">{item.type.toUpperCase()}</div>
                              </div>
                              <span className={`deliverable-status ${item.status}`}>
                                {item.status === 'done' ? 'Completed' : 'Pending'}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      {selected.timeline.length > 0 && (
                        <div className="timeline-section">
                          <h4 className="section-title">
                            <i className="bi bi-clock-history" />
                            Activity Timeline
                          </h4>
                          <div className="timeline">
                            {selected.timeline.map((item, index) => (
                              <div key={index} className="timeline-item">
                                <div className={`timeline-dot ${item.completed ? 'completed' : ''}`} />
                                <div className="timeline-content">
                                  <div className="timeline-title">{item.title}</div>
                                  <div className="timeline-date">{item.date}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="detail-actions">
                        {selected.status === 'in-progress' && (
                          <motion.button
                            className="btn-action btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <i className="bi bi-upload" />
                            Submit Work
                          </motion.button>
                        )}
                        <motion.button
                          className="btn-action btn-secondary"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className="bi bi-chat-dots" />
                          Message Client
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default MilestoneTracker;
