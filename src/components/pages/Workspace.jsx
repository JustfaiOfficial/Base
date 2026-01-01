import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

// === RESPONSIVE CSS ===
const responsiveCSS = `
  .workspace-container {
    display: grid;
    grid-template-columns: 320px 1fr 380px;
    height: calc(100vh - 80px);
    gap: 0;
  }
  
  .messages-panel, .sidebar-panel { display: flex !important; }
  .chat-panel { display: flex !important; }
  .mobile-nav { display: none; }
  
  @media (max-width: 1200px) {
    .workspace-container { grid-template-columns: 280px 1fr 320px; }
  }
  
  @media (max-width: 992px) {
    .workspace-container { grid-template-columns: 1fr; height: auto; min-height: calc(100vh - 80px); }
    .messages-panel, .sidebar-panel { display: none !important; }
    .messages-panel.active, .sidebar-panel.active { display: flex !important; position: fixed; top: 70px; left: 0; right: 0; bottom: 0; z-index: 100; }
    .chat-panel { min-height: calc(100vh - 140px); }
    .mobile-nav { display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; background: #0f0f18; border-top: 1px solid rgba(255,255,255,0.06); padding: 0.75rem; justify-content: space-around; z-index: 99; }
    .mobile-nav-btn { background: transparent; border: none; color: #64748b; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; font-size: 0.7rem; padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; }
    .mobile-nav-btn.active { color: #8b5cf6; background: rgba(139,92,246,0.1); }
    .mobile-nav-btn i { font-size: 1.25rem; }
    .chat-panel { padding-bottom: 70px; }
  }
  
  @media (max-width: 576px) {
    .chat-header { padding: 1rem !important; }
    .chat-messages { padding: 1rem !important; }
    .input-area { padding: 0.75rem !important; }
    .message-bubble { max-width: 85% !important; padding: 0.75rem 1rem !important; font-size: 0.85rem !important; }
    .avatar { width: 40px !important; height: 40px !important; font-size: 0.8rem !important; }
    .sidebar-card { padding: 1rem !important; }
  }
`;

// === MOCK DATA ===
const conversations = [
    { id: 1, name: 'Marcus Johnson', project: 'E-Commerce Redesign', message: 'Great work on the mockups!', time: '2m', avatar: 'MJ', unread: 2, online: true },
    { id: 2, name: 'Emma Rodriguez', project: 'Mobile Banking App', message: 'The prototype is ready.', time: '1h', avatar: 'ER', unread: 0, online: true, typing: true },
    { id: 3, name: 'David Park', project: 'Brand Identity', message: 'Perfect! Let\'s proceed.', time: '3h', avatar: 'DP', unread: 1, online: false },
];

const chatMessages = [
    { id: 1, sender: 'them', text: 'Hi! I\'ve reviewed the mockups. They look fantastic! 🎉', time: '10:32 AM' },
    { id: 2, sender: 'you', text: 'Thank you! Glad you like the direction.', time: '10:35 AM' },
    { id: 3, sender: 'them', text: 'Can we make the CTA buttons more prominent?', time: '10:38 AM' },
    { id: 4, sender: 'you', text: 'Absolutely! Will add a glow effect. Ready by EOD.', time: '10:40 AM' },
];

const projectData = {
    title: 'E-Commerce Website Redesign', client: 'TechStore Inc.',
    budget: 8500, earned: 3500, daysLeft: 12, progress: 65,
    milestones: [
        { name: 'Research & Analysis', status: 'completed', amount: 1500 },
        { name: 'Wireframes & Mockups', status: 'completed', amount: 2000 },
        { name: 'Frontend Development', status: 'in-progress', amount: 3000 },
        { name: 'Testing & Launch', status: 'pending', amount: 2000 },
    ],
    tasks: [
        { title: 'Finalize product page', priority: 'high', due: 'Tomorrow' },
        { title: 'Shopping cart', priority: 'high', due: 'Dec 20', progress: 60 },
    ],
    files: [
        { name: 'Requirements.pdf', size: '2.3 MB', type: 'pdf' },
        { name: 'mockup_v3.fig', size: '1.8 MB', type: 'figma' },
    ]
};

// === STYLES ===
const styles = {
    page: { minHeight: '100vh', background: '#030305', fontFamily: "'Inter', sans-serif" },
    messagesPanel: { background: 'rgba(15, 15, 24, 0.98)', borderRight: '1px solid rgba(255,255,255,0.04)', flexDirection: 'column', overflowY: 'auto' },
    chatPanel: { background: '#030305', display: 'flex', flexDirection: 'column' },
    sidebarPanel: { background: 'rgba(15, 15, 24, 0.98)', borderLeft: '1px solid rgba(255,255,255,0.04)', flexDirection: 'column', overflowY: 'auto' },
    searchBox: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', width: '100%', fontSize: '0.85rem' },
    avatar: { width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0, position: 'relative' },
    onlineDot: { position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', border: '2px solid #0f0f18' },
    unreadBadge: { background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', fontSize: '0.65rem', fontWeight: '700', padding: '0.1rem 0.4rem', borderRadius: '8px' },
    conversationItem: { display: 'flex', gap: '0.75rem', padding: '0.875rem', borderRadius: '12px', cursor: 'pointer', marginBottom: '0.25rem' },
    chatHeader: { padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    chatMessages: { flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    messageBubble: { maxWidth: '75%', padding: '0.875rem 1rem', borderRadius: '16px', fontSize: '0.875rem', lineHeight: 1.5 },
    inputArea: { padding: '0.875rem 1rem', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '0.5rem', alignItems: 'center' },
    messageInput: { flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.875rem', resize: 'none' },
    iconBtn: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    sendBtn: { width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    tabBtn: { padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', borderBottom: '2px solid transparent' },
    tabActive: { color: '#fff', borderColor: '#8b5cf6' },
    card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '14px', padding: '1rem', marginBottom: '0.75rem' },
    progressBar: { height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '3px' },
};

const Workspace = () => {
    const [activeConversation, setActiveConversation] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');
    const [mobileView, setMobileView] = useState('chat'); // 'messages', 'chat', 'sidebar'
    const [message, setMessage] = useState('');

    const selectedConv = conversations.find(c => c.id === activeConversation);

    const getStatusStyle = (status) => {
        if (status === 'completed') return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: 'bi-check-lg' };
        if (status === 'in-progress') return { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', icon: 'bi-arrow-repeat' };
        return { bg: 'rgba(255,255,255,0.05)', color: '#64748b', icon: 'bi-clock' };
    };

    const getFileIcon = (type) => {
        const icons = { pdf: 'bi-file-pdf-fill', figma: 'bi-palette-fill', zip: 'bi-file-zip-fill' };
        const colors = { pdf: '#ef4444', figma: '#a78bfa', zip: '#f59e0b' };
        return { icon: icons[type] || 'bi-file', color: colors[type] || '#8b5cf6' };
    };

    return (
        <>
            <Navbar />
            <style>{responsiveCSS}</style>
            <div style={styles.page}>
                <div className="workspace-container">
                    {/* Messages Panel */}
                    <motion.div className={`messages-panel ${mobileView === 'messages' ? 'active' : ''}`} style={styles.messagesPanel} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Messages</h2>
                                <motion.button style={{ ...styles.iconBtn, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', width: '36px', height: '36px' }} whileTap={{ scale: 0.95 }}>
                                    <i className="bi bi-plus-lg" style={{ fontSize: '0.9rem' }} />
                                </motion.button>
                            </div>
                            <input type="text" placeholder="Search..." style={styles.searchBox} />
                        </div>
                        <div style={{ flex: 1, padding: '0 0.5rem', overflowY: 'auto' }}>
                            {conversations.map((conv) => (
                                <motion.div key={conv.id} style={{ ...styles.conversationItem, background: activeConversation === conv.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent', border: activeConversation === conv.id ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent' }}
                                    onClick={() => { setActiveConversation(conv.id); setMobileView('chat'); }} whileHover={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <div className="avatar" style={styles.avatar}>{conv.avatar}{conv.online && <div style={styles.onlineDot} />}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '0.85rem' }}>{conv.name}</span>
                                            <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{conv.time}</span>
                                        </div>
                                        <div style={{ color: '#8b5cf6', fontSize: '0.7rem', marginBottom: '0.2rem' }}>{conv.project}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#94a3b8', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                                                {conv.typing ? <em style={{ color: '#8b5cf6' }}>typing...</em> : conv.message}
                                            </span>
                                            {conv.unread > 0 && <span style={styles.unreadBadge}>{conv.unread}</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Chat Panel */}
                    <motion.div className="chat-panel" style={styles.chatPanel} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="chat-header" style={styles.chatHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="avatar" style={styles.avatar}>{selectedConv?.avatar}{selectedConv?.online && <div style={styles.onlineDot} />}</div>
                                <div>
                                    <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', margin: 0 }}>{selectedConv?.name}</h3>
                                    <span style={{ color: selectedConv?.online ? '#10b981' : '#64748b', fontSize: '0.75rem' }}>{selectedConv?.online ? '● Online' : '○ Offline'}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                                {['bi-telephone', 'bi-camera-video', 'bi-three-dots-vertical'].map((icon, i) => (
                                    <motion.button key={i} style={{ ...styles.iconBtn, width: '36px', height: '36px' }} whileHover={{ color: '#8b5cf6' }}><i className={icon} /></motion.button>
                                ))}
                            </div>
                        </div>
                        <div className="chat-messages" style={styles.chatMessages}>
                            {chatMessages.map((msg) => (
                                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start' }}>
                                    <div className="message-bubble" style={{ ...styles.messageBubble, background: msg.sender === 'you' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.05)', color: '#fff' }}>
                                        <p style={{ margin: 0 }}>{msg.text}</p>
                                        <span style={{ fontSize: '0.65rem', color: msg.sender === 'you' ? 'rgba(255,255,255,0.6)' : '#64748b', marginTop: '0.35rem', display: 'block' }}>{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="input-area" style={styles.inputArea}>
                            <motion.button style={{ ...styles.iconBtn, width: '36px', height: '36px' }} whileHover={{ color: '#8b5cf6' }}><i className="bi bi-paperclip" /></motion.button>
                            <textarea style={styles.messageInput} placeholder="Type a message..." rows={1} value={message} onChange={(e) => setMessage(e.target.value)} />
                            <motion.button style={styles.sendBtn} whileTap={{ scale: 0.95 }}><i className="bi bi-send-fill" /></motion.button>
                        </div>
                    </motion.div>

                    {/* Sidebar Panel */}
                    <motion.div className={`sidebar-panel ${mobileView === 'sidebar' ? 'active' : ''}`} style={styles.sidebarPanel} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            {['overview', 'tasks', 'files'].map((tab) => (
                                <button key={tab} style={{ ...styles.tabBtn, flex: 1, ...(activeTab === tab ? styles.tabActive : {}) }} onClick={() => setActiveTab(tab)}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                            {activeTab === 'overview' && (
                                <>
                                    <div className="sidebar-card" style={styles.card}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>Project</span>
                                            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: '600' }}>{projectData.daysLeft}d left</span>
                                        </div>
                                        <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.2rem' }}>{projectData.title}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.75rem' }}>{projectData.client}</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                            <div style={{ flex: 1, padding: '0.6rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                                <div style={{ color: '#10b981', fontSize: '1rem', fontWeight: '800' }}>${projectData.earned.toLocaleString()}</div>
                                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>Earned</div>
                                            </div>
                                            <div style={{ flex: 1, padding: '0.6rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                                <div style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: '800' }}>${projectData.budget.toLocaleString()}</div>
                                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>Budget</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                                            <span style={{ color: '#94a3b8' }}>Progress</span>
                                            <span style={{ color: '#a78bfa', fontWeight: '600' }}>{projectData.progress}%</span>
                                        </div>
                                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${projectData.progress}%` }} /></div>
                                    </div>
                                    <div className="sidebar-card" style={styles.card}>
                                        <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}><i className="bi bi-flag-fill" style={{ color: '#8b5cf6', marginRight: '0.4rem' }} />Milestones</h4>
                                        {projectData.milestones.map((m, i) => {
                                            const st = getStatusStyle(m.status);
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: i < projectData.milestones.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: st.bg, color: st.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}><i className={`bi ${st.icon}`} /></div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '500' }}>{m.name}</div>
                                                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>${m.amount.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                            {activeTab === 'tasks' && (
                                <div className="sidebar-card" style={styles.card}>
                                    <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.75rem' }}><i className="bi bi-check2-square" style={{ color: '#8b5cf6', marginRight: '0.4rem' }} />Tasks</h4>
                                    {projectData.tasks.map((task, i) => (
                                        <div key={i} style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '0.4rem', borderLeft: `3px solid ${task.priority === 'high' ? '#ef4444' : '#f59e0b'}` }}>
                                            <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '500' }}>{task.title}</div>
                                            <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Due: {task.due}</div>
                                            {task.progress && <div style={{ ...styles.progressBar, marginTop: '0.4rem' }}><div style={{ ...styles.progressFill, width: `${task.progress}%` }} /></div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'files' && (
                                <div className="sidebar-card" style={styles.card}>
                                    <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.75rem' }}><i className="bi bi-folder2-open" style={{ color: '#8b5cf6', marginRight: '0.4rem' }} />Files</h4>
                                    {projectData.files.map((file, i) => {
                                        const fi = getFileIcon(file.type);
                                        return (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '0.4rem' }}>
                                                <i className={`bi ${fi.icon}`} style={{ fontSize: '1.25rem', color: fi.color }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ color: '#fff', fontSize: '0.8rem' }}>{file.name}</div>
                                                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{file.size}</div>
                                                </div>
                                                <i className="bi bi-download" style={{ color: '#64748b', cursor: 'pointer' }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Navigation */}
                <div className="mobile-nav">
                    {[
                        { id: 'messages', icon: 'bi-chat-dots', label: 'Messages' },
                        { id: 'chat', icon: 'bi-chat-text', label: 'Chat' },
                        { id: 'sidebar', icon: 'bi-folder', label: 'Project' },
                    ].map((item) => (
                        <button key={item.id} className={`mobile-nav-btn ${mobileView === item.id ? 'active' : ''}`} onClick={() => setMobileView(item.id)}>
                            <i className={`bi ${item.icon}`} />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Workspace;
