import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

// === MOCK DATA ===
const conversations = [
    { id: 1, name: 'Marcus Johnson', project: 'E-Commerce Redesign', message: 'Great work on the mockups! The design looks amazing.', time: '2m', avatar: 'MJ', unread: 2, online: true, typing: false },
    { id: 2, name: 'Emma Rodriguez', project: 'Mobile Banking App', message: 'The prototype is ready for review.', time: '1h', avatar: 'ER', unread: 0, online: true, typing: true },
    { id: 3, name: 'David Park', project: 'Brand Identity', message: 'Perfect! Let\'s proceed with option 2.', time: '3h', avatar: 'DP', unread: 1, online: false },
    { id: 4, name: 'Sarah Chen', project: 'Dashboard Analytics', message: 'Can we schedule a call for tomorrow?', time: '1d', avatar: 'SC', unread: 0, online: false },
];

const chatMessages = [
    { id: 1, sender: 'them', text: 'Hi Sarah! I\'ve reviewed the initial mockups you sent. They look fantastic! 🎉', time: '10:32 AM' },
    { id: 2, sender: 'you', text: 'Thank you so much, Marcus! I\'m glad you like the direction we\'re going.', time: '10:35 AM' },
    { id: 3, sender: 'them', text: 'The color scheme really captures the brand essence. Can we make the CTA buttons slightly more prominent?', time: '10:38 AM' },
    { id: 4, sender: 'you', text: 'Absolutely! I\'ll increase the button size and add a subtle glow effect. Should be ready by EOD.', time: '10:40 AM' },
    { id: 5, sender: 'them', text: 'Great work on the mockups! The design looks amazing.', time: '10:45 AM' },
];

const projectData = {
    title: 'E-Commerce Website Redesign',
    client: 'TechStore Inc.',
    budget: 8500, earned: 3500,
    daysLeft: 12, progress: 65,
    milestones: [
        { name: 'Research & Analysis', status: 'completed', amount: 1500 },
        { name: 'Wireframes & Mockups', status: 'completed', amount: 2000 },
        { name: 'Frontend Development', status: 'in-progress', amount: 3000 },
        { name: 'Testing & Launch', status: 'pending', amount: 2000 },
    ],
    tasks: [
        { title: 'Finalize product page layout', priority: 'high', due: 'Tomorrow' },
        { title: 'Implement shopping cart', priority: 'high', due: 'Dec 20', progress: 60 },
        { title: 'Mobile responsiveness', priority: 'medium', due: 'Dec 22' },
    ],
    files: [
        { name: 'Project_Requirements.pdf', size: '2.3 MB', type: 'pdf' },
        { name: 'homepage_mockup_v3.fig', size: '1.8 MB', type: 'figma' },
        { name: 'brand_assets.zip', size: '15.7 MB', type: 'zip' },
    ]
};

// === STYLES ===
const styles = {
    page: { minHeight: '100vh', background: '#030305', fontFamily: "'Inter', sans-serif" },
    container: { display: 'grid', gridTemplateColumns: '320px 1fr 380px', height: 'calc(100vh - 80px)', gap: 0 },
    // Messages Panel
    messagesPanel: { background: 'rgba(15, 15, 24, 0.95)', borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' },
    searchBox: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', width: '100%', fontSize: '0.85rem' },
    conversationItem: { display: 'flex', gap: '0.875rem', padding: '1rem', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.25rem' },
    avatar: { width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0, position: 'relative' },
    onlineDot: { position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', border: '2px solid #0f0f18' },
    unreadBadge: { background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '10px', minWidth: '20px', textAlign: 'center' },
    // Chat Panel
    chatPanel: { background: '#030305', display: 'flex', flexDirection: 'column' },
    chatHeader: { padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    chatMessages: { flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' },
    messageBubble: { maxWidth: '70%', padding: '1rem 1.25rem', borderRadius: '18px', fontSize: '0.9rem', lineHeight: 1.5 },
    inputArea: { padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '0.75rem', alignItems: 'center' },
    messageInput: { flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '0.875rem 1.25rem', color: '#fff', fontSize: '0.9rem', resize: 'none' },
    sendBtn: { width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    iconBtn: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    // Sidebar Panel
    sidebarPanel: { background: 'rgba(15, 15, 24, 0.95)', borderLeft: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' },
    tabBtn: { padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', borderBottom: '2px solid transparent', transition: 'all 0.2s' },
    tabActive: { color: '#fff', borderColor: '#8b5cf6' },
    card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' },
    progressBar: { height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '3px' },
    milestoneItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    statusDot: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' },
    fileItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', marginBottom: '0.5rem' },
    quickAction: { flex: 1, padding: '0.75rem', borderRadius: '10px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
};

const Workspace = () => {
    const [activeConversation, setActiveConversation] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
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
            <div style={styles.page}>
                <div style={styles.container}>
                    {/* Messages Panel */}
                    <motion.div style={styles.messagesPanel} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Messages</h2>
                                <motion.button style={{ ...styles.iconBtn, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <i className="bi bi-plus-lg" />
                                </motion.button>
                            </div>
                            <input type="text" placeholder="Search conversations..." style={styles.searchBox} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div style={{ flex: 1, padding: '0 0.75rem', overflowY: 'auto' }}>
                            {conversations.map((conv) => (
                                <motion.div key={conv.id} style={{ ...styles.conversationItem, background: activeConversation === conv.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent', border: activeConversation === conv.id ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent' }}
                                    onClick={() => setActiveConversation(conv.id)} whileHover={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <div style={styles.avatar}>{conv.avatar}{conv.online && <div style={styles.onlineDot} />}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>{conv.name}</span>
                                            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{conv.time}</span>
                                        </div>
                                        <div style={{ color: '#8b5cf6', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{conv.project}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {conv.typing ? (
                                                <span style={{ color: '#8b5cf6', fontSize: '0.8rem', fontStyle: 'italic' }}>typing...</span>
                                            ) : (
                                                <span style={{ color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{conv.message}</span>
                                            )}
                                            {conv.unread > 0 && <span style={styles.unreadBadge}>{conv.unread}</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Chat Panel */}
                    <motion.div style={styles.chatPanel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <div style={styles.chatHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={styles.avatar}>{selectedConv?.avatar}{selectedConv?.online && <div style={styles.onlineDot} />}</div>
                                <div>
                                    <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: '600', margin: 0 }}>{selectedConv?.name}</h3>
                                    <span style={{ color: selectedConv?.online ? '#10b981' : '#64748b', fontSize: '0.8rem' }}>{selectedConv?.online ? '● Online' : '○ Offline'}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {['bi-telephone', 'bi-camera-video', 'bi-three-dots-vertical'].map((icon, i) => (
                                    <motion.button key={i} style={styles.iconBtn} whileHover={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}><i className={icon} /></motion.button>
                                ))}
                            </div>
                        </div>
                        <div style={styles.chatMessages}>
                            <AnimatePresence>
                                {chatMessages.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start' }}>
                                        <div style={{ ...styles.messageBubble, background: msg.sender === 'you' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.05)', color: '#fff' }}>
                                            <p style={{ margin: 0 }}>{msg.text}</p>
                                            <span style={{ fontSize: '0.7rem', color: msg.sender === 'you' ? 'rgba(255,255,255,0.7)' : '#64748b', marginTop: '0.5rem', display: 'block' }}>{msg.time}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div style={styles.inputArea}>
                            <motion.button style={styles.iconBtn} whileHover={{ color: '#8b5cf6' }}><i className="bi bi-paperclip" /></motion.button>
                            <textarea style={styles.messageInput} placeholder="Type your message..." rows={1} value={message} onChange={(e) => setMessage(e.target.value)} />
                            <motion.button style={styles.sendBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><i className="bi bi-send-fill" /></motion.button>
                        </div>
                    </motion.div>

                    {/* Sidebar Panel */}
                    <motion.div style={styles.sidebarPanel} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            {['overview', 'tasks', 'files'].map((tab) => (
                                <button key={tab} style={{ ...styles.tabBtn, ...(activeTab === tab ? styles.tabActive : {}) }} onClick={() => setActiveTab(tab)}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
                            {activeTab === 'overview' && (
                                <>
                                    <div style={styles.card}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project</span>
                                            <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>{projectData.daysLeft} days left</span>
                                        </div>
                                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{projectData.title}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Client: {projectData.client}</p>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', textAlign: 'center' }}>
                                                <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: '800' }}>${projectData.earned.toLocaleString()}</div>
                                                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Earned</div>
                                            </div>
                                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '10px', textAlign: 'center' }}>
                                                <div style={{ color: '#a78bfa', fontSize: '1.25rem', fontWeight: '800' }}>${projectData.budget.toLocaleString()}</div>
                                                <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Total Budget</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#94a3b8' }}>Progress</span>
                                            <span style={{ color: '#a78bfa', fontWeight: '600' }}>{projectData.progress}%</span>
                                        </div>
                                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${projectData.progress}%` }} /></div>
                                    </div>
                                    <div style={styles.card}>
                                        <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem' }}><i className="bi bi-flag-fill" style={{ color: '#8b5cf6', marginRight: '0.5rem' }} />Milestones</h4>
                                        {projectData.milestones.map((m, i) => {
                                            const st = getStatusStyle(m.status);
                                            return (
                                                <div key={i} style={{ ...styles.milestoneItem, borderBottom: i === projectData.milestones.length - 1 ? 'none' : undefined }}>
                                                    <div style={{ ...styles.statusDot, background: st.bg, color: st.color }}><i className={`bi ${st.icon}`} /></div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>{m.name}</div>
                                                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>${m.amount.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <motion.button style={{ ...styles.quickAction, background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff' }} whileHover={{ scale: 1.02 }}>
                                            <i className="bi bi-telephone" />Call
                                        </motion.button>
                                        <motion.button style={{ ...styles.quickAction, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }} whileHover={{ scale: 1.02 }}>
                                            <i className="bi bi-receipt" />Invoice
                                        </motion.button>
                                    </div>
                                </>
                            )}
                            {activeTab === 'tasks' && (
                                <div style={styles.card}>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}><i className="bi bi-check2-square" style={{ color: '#8b5cf6', marginRight: '0.5rem' }} />Active Tasks</h4>
                                    {projectData.tasks.map((task, i) => (
                                        <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', marginBottom: '0.5rem', borderLeft: `3px solid ${task.priority === 'high' ? '#ef4444' : '#f59e0b'}` }}>
                                            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>{task.title}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Due: {task.due}</span>
                                                <span style={{ background: task.priority === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: task.priority === 'high' ? '#ef4444' : '#f59e0b', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>{task.priority}</span>
                                            </div>
                                            {task.progress && <div style={{ ...styles.progressBar, marginTop: '0.5rem' }}><div style={{ ...styles.progressFill, width: `${task.progress}%` }} /></div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'files' && (
                                <div style={styles.card}>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}><i className="bi bi-folder2-open" style={{ color: '#8b5cf6', marginRight: '0.5rem' }} />Project Files</h4>
                                    {projectData.files.map((file, i) => {
                                        const fi = getFileIcon(file.type);
                                        return (
                                            <motion.div key={i} style={styles.fileItem} whileHover={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                                                <i className={`bi ${fi.icon}`} style={{ fontSize: '1.5rem', color: fi.color }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>{file.name}</div>
                                                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{file.size}</div>
                                                </div>
                                                <motion.button style={{ ...styles.iconBtn, width: '32px', height: '32px' }} whileHover={{ color: '#8b5cf6' }}><i className="bi bi-download" /></motion.button>
                                            </motion.div>
                                        );
                                    })}
                                    <motion.button style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '2px dashed rgba(139, 92, 246, 0.3)', background: 'transparent', color: '#8b5cf6', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' }} whileHover={{ background: 'rgba(139, 92, 246, 0.05)' }}>
                                        <i className="bi bi-cloud-upload" style={{ marginRight: '0.5rem' }} />Upload Files
                                    </motion.button>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#10b981', fontSize: '0.75rem' }}><i className="bi bi-check-circle-fill" style={{ marginRight: '0.35rem' }} />All synced</span>
                                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Last sync: 2m ago</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Workspace;
