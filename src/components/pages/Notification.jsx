import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const customStyles = `
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #1a1a28;
    --bg-card-hover: #222236;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --accent-gradient: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --error-red: #ef4444;
    --info-blue: #3b82f6;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-subtle: rgba(255, 255, 255, 0.06);
  }

  * {
    box-sizing: border-box;
  }

  .notification-page {
    background: var(--bg-primary);
    min-height: 100vh;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .notification-page::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
    pointer-events: none;
    animation: ambientFloat 20s ease-in-out infinite;
  }

  @keyframes ambientFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(2%, 2%) rotate(1deg); }
    50% { transform: translate(-1%, 3%) rotate(-1deg); }
    75% { transform: translate(-2%, -1%) rotate(0.5deg); }
  }

  .page-content {
    position: relative;
    z-index: 1;
  }

  /* Header Styles */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    padding: 1rem 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-icon {
    width: 56px;
    height: 56px;
    background: var(--accent-gradient);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
    animation: iconPulse 3s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 12px 32px rgba(139, 92, 246, 0.5); }
  }

  .header-text h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .header-text p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0.25rem 0 0 0;
  }

  .btn-mark-all {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 12px;
    color: var(--accent-purple-light);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-mark-all:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: var(--accent-purple);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  }

  /* Filter Pills */
  .filter-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: var(--bg-secondary);
    border-radius: 14px;
    border: 1px solid var(--border-subtle);
    flex-wrap: wrap;
  }

  .filter-pill {
    position: relative;
    padding: 0.6rem 1.25rem;
    background: transparent;
    border: none;
    border-radius: 10px;
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-pill:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.03);
  }

  .filter-pill.active {
    color: white;
  }

  .filter-bg {
    position: absolute;
    inset: 0;
    background: var(--accent-gradient);
    border-radius: 10px;
    z-index: -1;
  }

  .filter-count {
    font-size: 0.7rem;
    padding: 0.15rem 0.45rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    font-weight: 600;
  }

  /* Main Card */
  .main-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    overflow: hidden;
  }

  /* Notification List */
  .notification-list {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .notification-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid transparent;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .notification-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .notification-item:hover {
    background: var(--bg-card);
    border-color: rgba(139, 92, 246, 0.15);
    transform: translateX(4px);
  }

  .notification-item:hover::before {
    opacity: 1;
  }

  .notification-item.unread {
    background: rgba(139, 92, 246, 0.06);
    border-left: 3px solid var(--accent-purple);
  }

  .unread-dot {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 10px;
    height: 10px;
    background: var(--accent-purple);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
    animation: dotPulse 2s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  .notification-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .notification-icon.job { background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05)); color: var(--info-blue); }
  .notification-icon.proposal { background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05)); color: var(--accent-purple-light); }
  .notification-icon.message { background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05)); color: var(--success-green); }
  .notification-icon.payment { background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05)); color: var(--warning-yellow); }
  .notification-icon.alert { background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05)); color: var(--error-red); }
  .notification-icon.system { background: linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)); color: var(--text-secondary); }

  .notification-body {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 1;
  }

  .notification-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.4rem;
    line-height: 1.4;
  }

  .notification-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 0.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .notification-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .notification-time {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .notification-tag {
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .notification-tag.urgent { background: rgba(239, 68, 68, 0.15); color: var(--error-red); }
  .notification-tag.new { background: rgba(16, 185, 129, 0.15); color: var(--success-green); }

  /* Sidebar */
  .sidebar-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 18px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .sidebar-icon {
    width: 38px;
    height: 38px;
    background: var(--accent-gradient);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
  }

  .sidebar-header h6 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .stat-row:last-child { border-bottom: none; }

  .stat-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 700;
    color: white;
  }

  .stat-value.purple { color: var(--accent-purple-light); }
  .stat-value.green { color: var(--success-green); }
  .stat-value.yellow { color: var(--warning-yellow); }

  /* Settings */
  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .setting-row:last-child { border-bottom: none; }

  .setting-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .form-switch .form-check-input {
    width: 44px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .form-switch .form-check-input:checked {
    background-color: var(--accent-purple);
  }

  .form-switch .form-check-input:focus {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25);
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: var(--accent-purple-light);
    margin: 0 auto 1.5rem;
  }

  .empty-state h5 { color: white; margin-bottom: 0.5rem; }
  .empty-state p { color: var(--text-secondary); font-size: 0.9rem; }

  /* Action Button */
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem;
    background: var(--accent-gradient);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  }

  .action-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  /* Comprehensive Responsive */
  @media (max-width: 1200px) {
    .notification-page .container { padding: 0 1.5rem; }
  }

  @media (max-width: 992px) {
    .page-header { flex-direction: column; gap: 1rem; text-align: center; }
    .header-left { flex-direction: column; }
    .sidebar-card { padding: 1.25rem; }
  }

  @media (max-width: 768px) {
    .filter-container { gap: 0.35rem; padding: 0.4rem; }
    .filter-pill { padding: 0.5rem 0.75rem; font-size: 0.8rem; }
    .notification-item { padding: 1rem; gap: 0.75rem; }
    .notification-icon { width: 42px; height: 42px; font-size: 1.1rem; }
    .notification-title { font-size: 0.9rem; }
    .notification-desc { font-size: 0.8rem; }
    .sidebar-card { padding: 1rem; border-radius: 14px; }
  }

  @media (max-width: 576px) {
    .page-header { margin-bottom: 1.5rem; padding: 0.5rem 0; }
    .header-icon { width: 48px; height: 48px; font-size: 1.25rem; }
    .header-text h1 { font-size: 1.35rem; }
    .btn-mark-all { padding: 0.6rem 1rem; font-size: 0.8rem; }
    .filter-container { overflow-x: auto; flex-wrap: nowrap; padding: 0.35rem; }
    .filter-pill { flex: 0 0 auto; padding: 0.45rem 0.6rem; font-size: 0.75rem; }
    .filter-count { font-size: 0.6rem; padding: 0.1rem 0.35rem; }
    .main-card { border-radius: 14px; }
    .notification-list { padding: 0.5rem; gap: 0.35rem; }
    .notification-item { padding: 0.875rem; border-radius: 12px; }
    .notification-icon { width: 38px; height: 38px; font-size: 1rem; border-radius: 10px; }
    .notification-title { font-size: 0.85rem; }
    .notification-desc { font-size: 0.75rem; -webkit-line-clamp: 1; }
    .notification-time { font-size: 0.65rem; }
    .unread-dot { width: 8px; height: 8px; top: 1rem; right: 1rem; }
    .sidebar-card { padding: 0.875rem; border-radius: 12px; margin-bottom: 1rem; }
    .sidebar-icon { width: 32px; height: 32px; font-size: 0.85rem; }
    .sidebar-header h6 { font-size: 0.85rem; }
    .stat-row { padding: 0.6rem 0; }
    .stat-label { font-size: 0.75rem; }
    .stat-value { font-size: 0.9rem; }
    .action-btn { padding: 0.875rem; font-size: 0.85rem; }
  }

  @media (max-width: 400px) {
    .header-icon { width: 40px; height: 40px; }
    .header-text h1 { font-size: 1.15rem; }
    .notification-item { padding: 0.75rem; }
    .notification-icon { width: 34px; height: 34px; font-size: 0.9rem; }
    .filter-pill { font-size: 0.7rem; }
  }
`;

const mockNotifications = [
  { id: 1, type: 'job', title: 'New Job Match: Senior React Developer', description: 'A new job matching your skills has been posted. Budget: $5,000-$8,000', time: '5 min ago', unread: true, tag: 'new' },
  { id: 2, type: 'proposal', title: 'Proposal Accepted! 🎉', description: 'Your proposal for "E-commerce Platform Development" has been accepted by Sarah Johnson.', time: '1 hour ago', unread: true, tag: null },
  { id: 3, type: 'message', title: 'New Message from David Chen', description: '"Hi! I reviewed your portfolio and would like to discuss the project timeline..."', time: '2 hours ago', unread: true, tag: null },
  { id: 4, type: 'payment', title: 'Payment Received: $2,500', description: 'Milestone 2 payment for "Mobile App UI Design" has been released to your account.', time: '5 hours ago', unread: false, tag: null },
  { id: 5, type: 'alert', title: 'Deadline Reminder', description: 'Project "Dashboard Redesign" milestone is due in 2 days. Submit before the deadline.', time: '1 day ago', unread: false, tag: 'urgent' },
  { id: 6, type: 'proposal', title: 'Proposal Viewed', description: 'Emily Parker viewed your proposal for "Brand Identity Design".', time: '1 day ago', unread: false, tag: null },
  { id: 7, type: 'system', title: 'Profile Strength: 95%', description: 'Your profile is almost complete. Add a video introduction to reach 100%.', time: '2 days ago', unread: false, tag: null },
  { id: 8, type: 'job', title: 'Saved Job Updated', description: 'The job "Full Stack Developer" you saved has updated requirements.', time: '3 days ago', unread: false, tag: null }
];

const NotificationPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({ email: true, push: true, jobs: true });

  const filters = [
    { id: 'all', label: 'All', icon: 'bi-bell' },
    { id: 'unread', label: 'Unread', icon: 'bi-envelope' },
    { id: 'job', label: 'Jobs', icon: 'bi-briefcase' },
    { id: 'proposal', label: 'Proposals', icon: 'bi-file-text' },
    { id: 'message', label: 'Messages', icon: 'bi-chat' },
    { id: 'payment', label: 'Payments', icon: 'bi-wallet2' }
  ];

  const getCount = (id) => {
    if (id === 'all') return notifications.length;
    if (id === 'unread') return notifications.filter(n => n.unread).length;
    return notifications.filter(n => n.type === id).length;
  };

  const getIcon = (type) => {
    const icons = { job: 'bi-briefcase-fill', proposal: 'bi-file-earmark-text-fill', message: 'bi-chat-dots-fill', payment: 'bi-wallet2', alert: 'bi-exclamation-triangle-fill', system: 'bi-gear-fill' };
    return icons[type] || 'bi-bell-fill';
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return n.unread;
    return n.type === activeFilter;
  });

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));
  const markRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>

      <div className="notification-page">
        <div className="page-content">
          <Container className="py-5">
            {/* Header */}
            <motion.div
              className="page-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="header-left">
                <div className="header-icon">
                  <i className="bi bi-bell-fill" />
                </div>
                <div className="header-text">
                  <h1>Notifications</h1>
                  <p>{notifications.filter(n => n.unread).length} unread notifications</p>
                </div>
              </div>
              <motion.button
                className="btn-mark-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={markAllRead}
              >
                <i className="bi bi-check-all" />
                Mark all as read
              </motion.button>
            </motion.div>

            <Row className="g-4">
              <Col lg={8}>
                {/* Filters */}
                <motion.div
                  className="filter-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {filters.map((f) => (
                    <motion.button
                      key={f.id}
                      className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
                      onClick={() => setActiveFilter(f.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeFilter === f.id && (
                        <motion.div
                          className="filter-bg"
                          layoutId="filterBg"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <i className={`bi ${f.icon}`} />
                      {f.label}
                      <span className="filter-count">{getCount(f.id)}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Notification List */}
                <motion.div
                  className="main-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="notification-list">
                    <AnimatePresence mode="popLayout">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((n, i) => (
                          <motion.div
                            key={n.id}
                            className={`notification-item ${n.unread ? 'unread' : ''}`}
                            initial={{ opacity: 0, x: -30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 30, scale: 0.95 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            whileHover={{ x: 6 }}
                            onClick={() => markRead(n.id)}
                            layout
                          >
                            {n.unread && <div className="unread-dot" />}
                            <div className={`notification-icon ${n.type}`}>
                              <i className={`bi ${getIcon(n.type)}`} />
                            </div>
                            <div className="notification-body">
                              <div className="notification-title">{n.title}</div>
                              <div className="notification-desc">{n.description}</div>
                              <div className="notification-footer">
                                <span className="notification-time">
                                  <i className="bi bi-clock" />
                                  {n.time}
                                </span>
                                {n.tag && (
                                  <span className={`notification-tag ${n.tag}`}>{n.tag}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          className="empty-state"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <div className="empty-icon">
                            <i className="bi bi-bell-slash" />
                          </div>
                          <h5>No notifications</h5>
                          <p>You're all caught up! Check back later.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </Col>

              <Col lg={4}>
                {/* Activity Summary */}
                <motion.div
                  className="sidebar-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="sidebar-header">
                    <div className="sidebar-icon"><i className="bi bi-graph-up" /></div>
                    <h6>Activity Summary</h6>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label"><i className="bi bi-envelope" style={{ color: 'var(--info-blue)' }} /> Unread</span>
                    <span className="stat-value purple">{notifications.filter(n => n.unread).length}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label"><i className="bi bi-briefcase" style={{ color: 'var(--info-blue)' }} /> Job Alerts</span>
                    <span className="stat-value">{notifications.filter(n => n.type === 'job').length}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label"><i className="bi bi-file-text" style={{ color: 'var(--accent-purple-light)' }} /> Proposals</span>
                    <span className="stat-value">{notifications.filter(n => n.type === 'proposal').length}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label"><i className="bi bi-wallet2" style={{ color: 'var(--warning-yellow)' }} /> Payments</span>
                    <span className="stat-value green">{notifications.filter(n => n.type === 'payment').length}</span>
                  </div>
                </motion.div>

                {/* Settings */}
                <motion.div
                  className="sidebar-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="sidebar-header">
                    <div className="sidebar-icon"><i className="bi bi-sliders" /></div>
                    <h6>Settings</h6>
                  </div>
                  <div className="setting-row">
                    <span className="setting-label">Email Notifications</span>
                    <Form.Check type="switch" checked={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.checked })} />
                  </div>
                  <div className="setting-row">
                    <span className="setting-label">Push Notifications</span>
                    <Form.Check type="switch" checked={settings.push} onChange={(e) => setSettings({ ...settings, push: e.target.checked })} />
                  </div>
                  <div className="setting-row">
                    <span className="setting-label">Job Alerts</span>
                    <Form.Check type="switch" checked={settings.jobs} onChange={(e) => setSettings({ ...settings, jobs: e.target.checked })} />
                  </div>
                </motion.div>

                {/* Action */}
                <motion.button
                  className="action-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-gear" />
                  Manage Preferences
                </motion.button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotificationPage;
