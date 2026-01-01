import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Mock Data
const earningsData = [
    { name: 'Jan 1', amount: 1200 },
    { name: 'Jan 5', amount: 1800 },
    { name: 'Jan 10', amount: 2100 },
    { name: 'Jan 15', amount: 1900 },
    { name: 'Jan 20', amount: 2400 },
    { name: 'Jan 25', amount: 2800 },
    { name: 'Jan 30', amount: 3200 },
];

const performanceData = [
    { name: 'Week 1', quality: 90, delivery: 94, communication: 88 },
    { name: 'Week 2', quality: 92, delivery: 95, communication: 90 },
    { name: 'Week 3', quality: 93, delivery: 96, communication: 91 },
    { name: 'Week 4', quality: 94, delivery: 96, communication: 92 },
];

const skillData = [
    { name: 'React', value: 25, color: '#8b5cf6' },
    { name: 'UI/UX', value: 30, color: '#a78bfa' },
    { name: 'Node.js', value: 20, color: '#7c3aed' },
    { name: 'Python', value: 15, color: '#6d28d9' },
    { name: 'AWS', value: 10, color: '#c4b5fd' },
];

const projects = [
    { id: 1, title: 'E-Commerce Platform', client: 'TechStore Inc.', progress: 75, status: 'active', dueIn: '5 days', tags: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, title: 'Mobile Banking App', client: 'FinanceFlow', progress: 45, status: 'review', dueIn: '12 days', tags: ['Flutter', 'Firebase'] },
];

const deadlines = [
    { id: 1, title: 'Homepage Mockups', project: 'E-Commerce Platform', progress: 85, daysLeft: 2, urgency: 'critical' },
    { id: 2, title: 'API Integration', project: 'Mobile Banking App', progress: 60, daysLeft: 5, urgency: 'warning' },
    { id: 3, title: 'Brand Guidelines', project: 'Brand Identity', progress: 100, daysLeft: 0, urgency: 'completed' },
    { id: 4, title: 'Dashboard Wireframes', project: 'Analytics Dashboard', progress: 35, daysLeft: 8, urgency: 'normal' },
];

const messages = [
    { id: 1, name: 'Michael Chen', role: 'Project Manager', message: 'Great work! The new mockups look amazing. 🎉', time: '2m ago', unread: true, online: true },
    { id: 2, name: 'Sarah Johnson', role: 'Lead Developer', message: 'API integration is verified by the team.', time: '1h ago', online: true },
    { id: 3, name: 'David Martinez', role: 'Brand Designer', message: "Let's finalize the branding tonight.", time: '3h ago', typing: true },
];

const styles = {
    page: {
        minHeight: '100vh',
        background: '#030305',
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
    },
    // Welcome Section
    welcomeCard: {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(15, 15, 24, 0.9) 50%)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '24px',
        padding: '2.5rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
    },
    welcomeGlow: {
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    welcomeTitle: {
        fontSize: '2.25rem',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '0.5rem',
        letterSpacing: '-0.02em',
    },
    welcomeSubtitle: {
        fontSize: '1rem',
        color: '#94a3b8',
        marginBottom: '1.5rem',
    },
    proBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(139, 92, 246, 0.15)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '100px',
        color: '#a78bfa',
        fontSize: '0.8rem',
        fontWeight: '700',
    },
    // Stats Grid
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        background: 'rgba(15, 15, 24, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '20px',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
    },
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '0.25rem',
        letterSpacing: '-0.02em',
    },
    statLabel: {
        fontSize: '0.85rem',
        color: '#64748b',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    // Section Header
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    sectionIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewAllBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#a78bfa',
        fontSize: '0.85rem',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
    },
    // Project Cards
    projectCard: {
        background: 'rgba(15, 15, 24, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '1rem',
    },
    projectStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        borderRadius: '100px',
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    progressBar: {
        height: '6px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '3px',
        overflow: 'hidden',
        margin: '1rem 0',
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
        borderRadius: '3px',
        transition: 'width 0.5s ease',
    },
    tag: {
        display: 'inline-block',
        padding: '0.375rem 0.75rem',
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '6px',
        color: '#a78bfa',
        fontSize: '0.75rem',
        fontWeight: '500',
        marginRight: '0.5rem',
    },
    // Deadline Items
    deadlineItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '14px',
        marginBottom: '0.75rem',
        transition: 'all 0.2s ease',
    },
    // Message Items
    messageItem: {
        display: 'flex',
        gap: '0.875rem',
        padding: '1rem',
        borderRadius: '14px',
        marginBottom: '0.5rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    },
    avatar: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: '1rem',
        flexShrink: 0,
    },
    onlineDot: {
        width: '10px',
        height: '10px',
        background: '#10b981',
        borderRadius: '50%',
        border: '2px solid #0f0f18',
        position: 'absolute',
        bottom: '0',
        right: '0',
    },
    // Chart Card
    chartCard: {
        background: 'rgba(15, 15, 24, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '20px',
        padding: '1.5rem',
    },
    // Metric Cards
    metricCard: {
        background: 'rgba(139, 92, 246, 0.05)',
        border: '1px solid rgba(139, 92, 246, 0.1)',
        borderRadius: '16px',
        padding: '1.25rem',
        textAlign: 'center',
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
};

// Responsive CSS
const dashboardCSS = `
  @media (max-width: 992px) {
    .dashboard-grid3 { grid-template-columns: 1fr !important; }
    .dashboard-grid2 { grid-template-columns: 1fr !important; }
    .dashboard-grid4 { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 576px) {
    .dashboard-grid4 { grid-template-columns: 1fr !important; }
    .dashboard-container { padding: 1rem !important; }
    .welcome-card { padding: 1.5rem !important; }
    .stat-card { padding: 1rem !important; }
  }
`;

const Dashboard = () => {
    const getUrgencyColor = (urgency) => {
        const colors = {
            critical: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
            warning: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' },
            normal: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' },
            completed: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' },
        };
        return colors[urgency] || colors.normal;
    };

    return (
        <>
            <Navbar />
            <style>{dashboardCSS}</style>
            <div style={styles.page}>
                <div className="dashboard-container" style={styles.container}>
                    {/* Welcome Section */}
                    <motion.div
                        style={styles.welcomeCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={styles.welcomeGlow} />
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={styles.welcomeTitle}>Welcome back, Alex 👋</h1>
                                <p style={styles.welcomeSubtitle}>Track your milestones, earnings, and performance analytics in real-time.</p>
                                <div style={{ height: '4px', width: '120px', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa, transparent)', borderRadius: '4px' }} />
                            </div>
                            <div style={styles.proBadge}>
                                <i className="bi bi-lightning-charge-fill" />
                                PRO ACCOUNT
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div style={styles.statsGrid}>
                        {[
                            { icon: 'bi-calendar-check', label: 'Active Milestones', value: '12', sub: '8 on track', color: '#8b5cf6', link: '/milestones' },
                            { icon: 'bi-currency-dollar', label: 'Monthly Earnings', value: '$8,420', sub: '+12.5% this month', color: '#10b981' },
                            { icon: 'bi-cpu', label: 'AI Quality Score', value: '94.2%', sub: '+3.1% improvement', color: '#f59e0b' },
                            { icon: 'bi-people', label: 'Active Clients', value: '7', sub: '2 pending proposals', color: '#3b82f6' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                style={styles.statCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -4, borderColor: 'rgba(139, 92, 246, 0.2)' }}
                            >
                                <div style={{ ...styles.statIcon, background: `${stat.color}15`, color: stat.color }}>
                                    <i className={stat.icon} style={{ fontSize: '1.25rem' }} />
                                </div>
                                <div style={styles.statValue}>{stat.value}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                                <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem', fontWeight: '600' }}>
                                    <i className="bi bi-arrow-up-right" style={{ marginRight: '0.25rem' }} />
                                    {stat.sub}
                                </div>
                                {stat.link && (
                                    <Link to={stat.link} style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.8rem', color: '#a78bfa', fontWeight: '600', textDecoration: 'none' }}>
                                        View All <i className="bi bi-arrow-right" style={{ marginLeft: '0.25rem' }} />
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Projects & Deadlines Row */}
                    <div className="dashboard-grid3" style={styles.grid3}>
                        {/* Active Projects */}
                        <div>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>
                                    <div style={{ ...styles.sectionIcon, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                                        <i className="bi bi-folder2-open" />
                                    </div>
                                    Active Projects
                                </div>
                                <Link to="/projects" style={styles.viewAllBtn}>
                                    View All <i className="bi bi-arrow-right" />
                                </Link>
                            </div>
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    style={styles.projectCard}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{project.title}</h4>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Client: {project.client}</p>
                                        </div>
                                        <span style={{
                                            ...styles.projectStatus,
                                            background: project.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: project.status === 'active' ? '#10b981' : '#f59e0b',
                                            border: `1px solid ${project.status === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                                            {project.status === 'active' ? 'Active' : 'Review'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        <span>Progress</span>
                                        <span style={{ color: '#a78bfa', fontWeight: '600' }}>{project.progress}%</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div style={{ ...styles.progressFill, width: `${project.progress}%` }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            {project.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}
                                        </div>
                                        <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600' }}>
                                            <i className="bi bi-clock" style={{ marginRight: '0.25rem' }} />
                                            {project.dueIn}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Upcoming Deadlines */}
                        <div>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>
                                    <div style={{ ...styles.sectionIcon, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                                        <i className="bi bi-alarm" />
                                    </div>
                                    Deadlines
                                </div>
                            </div>
                            <div style={{ ...styles.chartCard, padding: '1rem' }}>
                                {deadlines.map((deadline, i) => {
                                    const colors = getUrgencyColor(deadline.urgency);
                                    return (
                                        <motion.div
                                            key={deadline.id}
                                            style={{
                                                ...styles.deadlineItem,
                                                background: colors.bg,
                                                border: `1px solid ${colors.border}`,
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ x: 4 }}
                                        >
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: colors.bg,
                                                border: `1px solid ${colors.border}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: colors.text,
                                            }}>
                                                <i className={deadline.urgency === 'completed' ? 'bi bi-check-lg' : 'bi bi-file-text'} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h5 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{deadline.title}</h5>
                                                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>{deadline.project}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '700',
                                                    background: colors.bg,
                                                    color: colors.text,
                                                    border: `1px solid ${colors.border}`,
                                                }}>
                                                    {deadline.urgency === 'completed' ? 'Done' : `${deadline.daysLeft}d left`}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Messages & Earnings Row */}
                    <div className="dashboard-grid2" style={styles.grid2}>
                        {/* Messages */}
                        <div>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>
                                    <div style={{ ...styles.sectionIcon, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                                        <i className="bi bi-chat-dots" />
                                    </div>
                                    Messages
                                    <span style={{
                                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '6px',
                                    }}>3</span>
                                </div>
                            </div>
                            <div style={styles.chartCard}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={msg.id}
                                        style={{
                                            ...styles.messageItem,
                                            background: msg.unread ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                                            borderLeft: msg.unread ? '3px solid #8b5cf6' : '3px solid transparent',
                                        }}
                                        whileHover={{ background: 'rgba(139, 92, 246, 0.08)' }}
                                    >
                                        <div style={{ position: 'relative' }}>
                                            <div style={styles.avatar}>
                                                {msg.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {msg.online && <div style={styles.onlineDot} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                                <h5 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{msg.name}</h5>
                                                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{msg.time}</span>
                                            </div>
                                            <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>{msg.role}</p>
                                            {msg.typing ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s infinite' }} />
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s infinite 0.2s' }} />
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s infinite 0.4s' }} />
                                                    <span style={{ color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '600', marginLeft: '0.5rem' }}>typing...</span>
                                                </div>
                                            ) : (
                                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                <button style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    marginTop: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <i className="bi bi-envelope" />
                                    Open Inbox
                                </button>
                            </div>
                        </div>

                        {/* Earnings Chart */}
                        <div>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>
                                    <div style={{ ...styles.sectionIcon, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                                        <i className="bi bi-graph-up-arrow" />
                                    </div>
                                    Weekly Earnings
                                </div>
                            </div>
                            <div style={styles.chartCard}>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={earningsData}>
                                        <defs>
                                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#0f0f18',
                                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                                borderRadius: '12px',
                                                color: '#fff',
                                            }}
                                        />
                                        <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorEarnings)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* AI Performance Section */}
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionTitle}>
                            <div style={{ ...styles.sectionIcon, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                                <i className="bi bi-robot" />
                            </div>
                            AI Analytics Hub
                        </div>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '10px',
                            color: '#94a3b8',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>
                            <i className="bi bi-download" />
                            Export Report
                        </button>
                    </div>

                    <div className="dashboard-grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                        {[
                            { label: 'Code Quality', value: '94.2%', trend: '+3.1%', icon: 'bi-code-slash', color: '#3b82f6' },
                            { label: 'Response Rate', value: '96.8%', trend: '+1.5%', icon: 'bi-clock', color: '#8b5cf6' },
                            { label: 'Delivery Success', value: '98.1%', trend: '+0.8%', icon: 'bi-check2-all', color: '#10b981' },
                            { label: 'AI Score', value: '4.95', trend: 'Top 1%', icon: 'bi-trophy', color: '#f59e0b' },
                        ].map((metric, i) => (
                            <motion.div
                                key={i}
                                style={styles.metricCard}
                                whileHover={{ y: -4 }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: `${metric.color}15`,
                                    color: metric.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 0.75rem',
                                }}>
                                    <i className={metric.icon} style={{ fontSize: '1.1rem' }} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>{metric.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.25rem' }}>{metric.value}</div>
                                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>
                                    <i className="bi bi-arrow-up-right" style={{ marginRight: '0.25rem' }} />
                                    {metric.trend}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div style={styles.grid3}>
                        <div style={styles.chartCard}>
                            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Performance Trends</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[85, 100]} />
                                    <Tooltip contentStyle={{ background: '#0f0f18', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px' }} />
                                    <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                                    <Line type="monotone" dataKey="delivery" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} />
                                    <Line type="monotone" dataKey="communication" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                                </LineChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                                {[
                                    { label: 'Quality', color: '#3b82f6' },
                                    { label: 'Delivery', color: '#8b5cf6' },
                                    { label: 'Communication', color: '#10b981' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.chartCard}>
                            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Skill Utilization</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={skillData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                                        {skillData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#0f0f18', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {skillData.map(skill => (
                                    <div key={skill.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: skill.color }} />
                                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{skill.name}</span>
                                        </div>
                                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>{skill.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help FAB */}
                <motion.div
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="bi bi-question-lg" style={{ color: 'white', fontSize: '1.5rem' }} />
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
