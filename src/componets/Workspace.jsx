import React, { useState } from 'react';
import { Container, Row, Col, Nav, Form, InputGroup, ListGroup, Image, Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import {
    Search, PlusSquareFill, TelephoneFill, CameraVideoFill, ThreeDotsVertical, Paperclip, SendFill, CheckCircleFill, Circle,
    PencilSquare, ArrowRepeat, ClockHistory, Upload, Receipt, Clock, Download, Share, Eye, ChatDots,
    CloudArrowUp, FileEarmarkPdfFill, FileEarmarkImageFill, FileEarmarkExcelFill, FileEarmarkWordFill, FileEarmarkZipFill,
    FloppyFill, Calendar2Event // Added necessary icons
} from 'react-bootstrap-icons';
import Navbar from './Navbar';
import Footer from './Footer';

// --- STYLING ---
const primaryBg = '#1e1f26';
const secondaryBg = '#272932';
const cardBorder = '1px solid #3a3d4a';
const purpleAccent = '#8B5CF6';
const blueAccent = '#3B82F6';
const greenAccent = '#10B981';
const orangeAccent = '#F59E0B';

const cardStyle = {
    backgroundColor: secondaryBg,
    border: cardBorder,
    borderRadius: '0.75rem',
    marginBottom: '1rem',
};

// --- MOCK DATA ---
const messages = [
    { id: 1, name: 'Marcus Johnson', project: 'E-commerce Website Redesign', message: 'Great work on the mockups! Ca...', time: '2m ago', avatar: 'https://i.pravatar.cc/150?u=marcus', unread: 2, online: true },
    { id: 2, name: 'Emma Rodriguez', project: 'Mobile App Development', message: 'You: The prototype is ready for...', time: '1h ago', avatar: 'https://i.pravatar.cc/150?u=emma' },
    { id: 3, name: 'David Park', project: 'Brand Identity Design', message: 'Perfect! Let\'s proceed with opti...', time: '3h ago', avatar: 'https://i.pravatar.cc/150?u=david', unread: 1 },
];

const chatHistory = [
    { sender: 'Marcus', text: 'Hi Sarah! I\'ve reviewed the initial mockups you sent. They look fantastic!', time: '10:32 AM' },
    { sender: 'You', text: 'Thank you so much, Marcus! I\'m glad you like the direction.', time: '10:35 AM' },
];

const projectOverview = {
    title: 'E-commerce Website Redesign',
    description: 'Complete redesign of the existing e-Commerce platform with modern UI/UX principles.',
    budget: '$8,500',
    daysLeft: 12,
    progress: 65,
    milestones: [
        { name: 'Research & Analysis', status: 'Completed', cost: '$1,500', icon: <CheckCircleFill className="text-light" /> },
        { name: 'Wireframes & Mockups', status: 'Completed', cost: '$2,000', icon: <CheckCircleFill className="text-light" /> },
        { name: 'Frontend Development', status: 'In Progress', cost: '$3,000', icon: <ClockHistory className="text-light" /> },
        { name: 'Testing & Launch', status: 'Pending', cost: '$2,000', icon: <ClockHistory className="text-light" /> },
    ]
};

const tasks = {
    todo: [
        { title: 'Finalize product page layout', due: 'Tomorrow', priority: 'High' },
        { title: 'Optimize mobile responsiveness', due: 'Dec 18', priority: 'Medium' },
        { title: 'Update color scheme documentation', due: 'Dec 20', priority: 'Low' },
    ],
    inProgress: [
        { title: 'Implement shopping cart functionality', started: '2 days ago', priority: 'High', progress: 60 },
        { title: 'Create user authentication flow', started: 'yesterday', priority: 'Medium', progress: 30 },
    ],
    done: [
        { title: 'Design homepage layout', completed: '3 days ago' },
        { title: 'Create wireframes', completed: '5 days ago' },
    ]
};

const files = {
    recent: [
        { name: 'Project_Requirements.pdf', size: '2.3 MB', time: 'Uploaded 2 hours ago', icon: <FileEarmarkPdfFill className="text-danger fs-4" /> },
        { name: 'homepage_mockup_v3.png', size: '1.8 MB', time: 'Uploaded 5 hours ago', icon: <FileEarmarkImageFill className="text-info fs-4" />, preview: true },
        { name: 'product_database.xlsx', size: '456 KB', time: 'Uploaded yesterday', icon: <FileEarmarkExcelFill className="text-success fs-4" /> },
    ],
    shared: [
        { name: 'Brand_Guidelines.docx', size: '3.2 MB', time: 'Shared 3 days ago', icon: <FileEarmarkWordFill className="text-primary fs-4" />, comment: true },
        { name: 'existing_assets.zip', size: '15.7 MB', time: 'Shared 1 week ago', icon: <FileEarmarkZipFill className="text-warning fs-4" />, comment: true },
    ]
};

const notes = {
    shared: [
        { title: 'Design Feedback', content: 'The color scheme looks great! Maybe we can make the CTA buttons slightly larger for better mobile experience.', author: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?u=marcus', time: '2 hours ago' },
        { title: 'Technical Requirements', content: 'Remember to implement lazy loading for product images and optimize for Core Web Vitals.', author: 'You', avatar: 'https://i.pravatar.cc/150?u=sarah', time: '1 day ago' },
    ],
    meeting: [
        { title: 'Project Kickoff Meeting', date: 'Dec 10, 2024', points: ['Discussed project timeline and milestones', 'Reviewed brand guidelines and target audience', 'Agreed on weekly check-in meetings'] }
    ]
};

// --- COMPONENTS ---
const MessagesList = () => (
    <Col lg={3} md={4} className="p-0 border-end" style={{
        background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
        height: '100vh', overflowY: 'auto', borderColor: '#3a3d4a !important'
    }}>
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-white mb-0">Messages</h5>
                <PlusSquareFill size={20} className="text-light" />
            </div>
            <InputGroup>
                <Form.Control type="search" placeholder="Search messages..." className="text-white border-0" style={{ backgroundColor: primaryBg }} />
            </InputGroup>
        </div>
        <ListGroup variant="flush">
            {messages.map(msg => (
                <ListGroup.Item key={msg.id} action className="d-flex align-items-start p-3 border-0"
                    style={{ backgroundColor: msg.name === 'Marcus Johnson' ? primaryBg : 'transparent' }}>
                    <Image src={msg.avatar} roundedCircle width="40" height="40" className="me-3 mt-1" />
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold text-white mb-0 small">{msg.name}</p>
                            <small className="text-light">{msg.time}</small>
                        </div>
                        <p className="text-light small mb-1">{msg.project}</p>
                        <p className="text-light small mb-0 text-truncate d-flex justify-content-between">
                            {msg.message}
                            {msg.unread && <Badge pill bg="danger" className="ms-2">{msg.unread}</Badge>}
                        </p>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Col>
);

const ChatWindow = () => (
    <Col lg={5} md={8} className="d-flex flex-column p-0" style={{
        background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
        height: '100vh'
    }}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ borderColor: '#3a3d4a !important' }}>
            <div><h6 className="text-white mb-0">Marcus Johnson</h6><small className="text-success">● Online</small></div>
            <div className="d-flex align-items-center text-light"><TelephoneFill className="me-3" /><CameraVideoFill className="me-3" /><ThreeDotsVertical /></div>
        </div>
        <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
            {chatHistory.map((chat, index) => (
                <div key={index} className={`d-flex mb-3 ${chat.sender === 'You' ? 'justify-content-end' : ''}`}>
                    <div style={{ maxWidth: '75%' }}>
                        <div className="p-3 rounded text-white" style={{ backgroundColor: chat.sender === 'Marcus' ? purpleAccent : secondaryBg }}>
                            <p className="mb-1 small">{chat.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-3 border-top" style={{ borderColor: '#3a3d4a !important' }}>
            <InputGroup>
                <Form.Control as="textarea" rows={1} placeholder="Type your message..." className="text-white border-0"
                    style={{ resize: 'none', backgroundColor: secondaryBg }} />
                <Button style={{ backgroundColor: secondaryBg }} className="border-0 text-light"><Paperclip size={20} /></Button>
                <Button className="border-0" style={{ backgroundColor: purpleAccent }}><SendFill size={20} /></Button>
            </InputGroup>
        </div>
    </Col>
);

// --- Right Sidebar Content Panes ---
const OverviewTab = () => (
    <>
        <Card style={{...cardStyle, padding: '1rem' }}><Card.Body>
            <h6 className="mb-0 text-white">Project Overview</h6>
            <h5 className="my-3 text-white">{projectOverview.title}</h5>
            <p className="text-light small">{projectOverview.description}</p>
            <div className="p-3 rounded mt-3" style={{ backgroundColor: primaryBg }}>
                <Row>
                    <Col><h5 style={{ color: greenAccent }}>{projectOverview.budget}</h5><small className="text-light">Total Budget</small></Col>
                    <Col><h5 className="text-white">{projectOverview.daysLeft}</h5><small className="text-light">Days Left</small></Col>
                </Row>
                <div className="d-flex justify-content-between mt-3 mb-1 small text-light"><span>Progress</span><span className="text-white">{projectOverview.progress}%</span></div>
                <ProgressBar now={projectOverview.progress} style={{ height: '8px', backgroundColor: '#3a3d4a' }}>
                    <ProgressBar now={projectOverview.progress} style={{ backgroundColor: purpleAccent }} />
                </ProgressBar>
            </div>
        </Card.Body></Card>

        <Card style={{...cardStyle, padding: '1rem'}}><Card.Body>
            <h6 className="mb-3 text-white">Milestones</h6>
            <ListGroup variant="flush">
                {projectOverview.milestones.map((item, index) => (
                    <ListGroup.Item key={index} className="bg-transparent d-flex align-items-center border-0 px-0 py-1">
                        <div className="fs-5 me-3 text-light">{item.icon}</div>
                        <div className="flex-grow-1">
                            <p className="mb-0 text-white small">{item.name}</p>
                            <small className="text-light">{item.status} • {item.cost}</small>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body></Card>

        <Card style={cardStyle}>
            <Card.Body className="p-3">
                <Row className="g-2">
                    <Col xs={6} className="d-grid">
                        <Button size="sm" variant="primary" style={{ backgroundColor: purpleAccent, borderColor: purpleAccent }}><TelephoneFill className="me-1" /> Schedule Call</Button>
                    </Col>
                    <Col xs={6} className="d-grid">
                        <Button size="sm" variant="info" style={{ backgroundColor: blueAccent, borderColor: blueAccent }}><Receipt className="me-1" /> Send Invoice</Button>
                    </Col>
                    <Col xs={6} className="d-grid">
                        <Button size="sm" variant="success" style={{ backgroundColor: greenAccent, borderColor: greenAccent }}><Upload className="me-1" /> Upload File</Button>
                    </Col>
                    <Col xs={6} className="d-grid">
                        <Button size="sm" variant="warning" style={{ backgroundColor: orangeAccent, borderColor: orangeAccent }}><Clock className="me-1" /> Time Track</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>
);

const TasksTab = () => {
    const priorityBadge = (p) => {
        const styles = { padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '0.5rem' };
        switch (p) {
            case 'High': return <Badge style={{ ...styles, color: '#F87171', backgroundColor: 'rgba(248, 113, 113, 0.1)' }}>High</Badge>;
            case 'Medium': return <Badge style={{ ...styles, color: '#FBBF24', backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>Medium</Badge>;
            case 'Low': return <Badge style={{ ...styles, color: '#34D399', backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>Low</Badge>;
            default: return null;
        }
    };

    return (
        <>
            <Row className="g-3 mb-3">{[{ title: 'To Do', count: tasks.todo.length }, { title: 'In Progress', count: tasks.inProgress.length }, { title: 'Done', count: tasks.done.length }].map(s => (
                <Col key={s.title}>
                    <div className="p-2 text-center" style={cardStyle}>
                        <h5 className="text-white mb-1">{s.count}</h5>
                        <small className="text-light">{s.title}</small>
                    </div>
                </Col>
            ))}</Row>

            <Card style={cardStyle}><Card.Body className="p-3">
                <h6 className="text-white mb-2"><CheckCircleFill className="text-success me-2" />To Do</h6>
                <ListGroup variant="flush">
                    {tasks.todo.map((task, i) => (
                        <ListGroup.Item key={i} className="bg-transparent px-0 border-bottom d-flex align-items-center py-2" style={{ borderColor: '#3a3d4a !important' }}>
                            <Form.Check type="checkbox" className="me-3" />
                            <div className="flex-grow-1"><p className="mb-0 text-white small">{task.title}</p><small className="text-light">Due: {task.due}</small></div>
                            {priorityBadge(task.priority)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body></Card>

            <Card style={cardStyle}><Card.Body className="p-3">
                <h6 className="text-white mb-2"><ArrowRepeat className="text-info me-2" />In Progress</h6>
                <ListGroup variant="flush">
                    {tasks.inProgress.map((task, i) => (
                        <ListGroup.Item key={i} className="bg-transparent px-0 border-bottom py-2" style={{ borderColor: '#3a3d4a !important' }}>
                            <div className="d-flex align-items-center">
                                <Circle className="text-warning me-3" />
                                <div className="flex-grow-1"><p className="mb-0 text-white small">{task.title}</p><small className="text-light">Started {task.started}</small></div>
                                {priorityBadge(task.priority)}
                            </div>
                            <ProgressBar style={{ height: '4px', marginTop: '6px' }} now={task.progress} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body></Card>

            <Card style={cardStyle}><Card.Body className="p-3">
                <h6 className="text-white mb-2"><CheckCircleFill className="text-success me-2" />Done</h6>
                <ListGroup variant="flush">
                    {tasks.done.map((task, i) => (
                        <ListGroup.Item key={i} className="bg-transparent px-0 border-bottom py-2" style={{ borderColor: '#3a3d4a !important' }}>
                            <div className="d-flex align-items-center">
                                <CheckCircleFill className="text-success me-3" />
                                <div><p className="mb-0 text-white small">{task.title}</p><small className="text-light">Completed {task.completed}</small></div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body></Card>
        </>
    );
};

const FilesTab = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Images', 'Documents', 'Archives'];
    const uploadBoxStyle = { ...cardStyle, border: `2px dashed ${cardBorder}`, backgroundColor: 'rgba(40, 40, 50, 0.5)', textAlign: 'center', padding: '2rem', cursor: 'pointer' };
    return (
        <>
            <Card style={uploadBoxStyle} className="mb-4">
                <Card.Body>
                    <CloudArrowUp className="fs-1 mb-3" style={{ color: purpleAccent }} />
                    <h6 className="text-white mb-1">Drop files here or click to upload</h6>
                    <p className="text-light small mb-3">Support for images, documents, and archives</p>
                    <Button variant="primary" style={{ backgroundColor: purpleAccent, borderColor: purpleAccent }}>Browse Files</Button>
                </Card.Body>
            </Card>
            <div className="d-flex mb-3">
                {filters.map(filter => (<Button key={filter} variant="dark" size="sm" className="me-2" onClick={() => setActiveFilter(filter)} style={{ backgroundColor: activeFilter === filter ? purpleAccent : secondaryBg, borderColor: activeFilter === filter ? purpleAccent : cardBorder, color: 'white', fontWeight: '500' }}>{filter}</Button>))}
            </div>
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <h6 className="mb-3 text-white">Recent Files</h6>
                    <ListGroup variant="flush">
                        {files.recent.map((f, i) => (<ListGroup.Item key={i} className="bg-transparent border-0 px-0 d-flex align-items-center py-2">{f.icon}<div className="ms-3 flex-grow-1"><p className="mb-0 text-white small" style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</p><small className="text-light">{f.size} • {f.time}</small></div><div className="text-light d-flex align-items-center">{f.preview && <Eye className="me-3" style={{ cursor: 'pointer' }} />}<Download className="me-3" style={{ cursor: 'pointer' }} /><Share style={{ cursor: 'pointer' }} /></div></ListGroup.Item>))}
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <h6 className="mb-3 text-white">Shared by Client</h6>
                    <ListGroup variant="flush">
                        {files.shared.map((f, i) => (<ListGroup.Item key={i} className="bg-transparent border-0 px-0 d-flex align-items-center py-2">{f.icon}<div className="ms-3 flex-grow-1"><p className="mb-0 text-white small" style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</p><small className="text-light">{f.size} • {f.time}</small></div><div className="text-light d-flex align-items-center"><Download className="me-3" style={{ cursor: 'pointer' }} />{f.comment && <ChatDots style={{ cursor: 'pointer' }} />}</div></ListGroup.Item>))}
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2"><h6 className="text-white mb-0">Storage Usage</h6><span className="text-light small">2.8 GB / 10 GB</span></div>
                    <ProgressBar style={{ height: '8px', backgroundColor: primaryBg }}><ProgressBar now={28} style={{ backgroundColor: purpleAccent }} /></ProgressBar>
                    <div className="d-flex justify-content-between align-items-center mt-2"><small className="text-light">28% used</small><small className="text-light">7.2 GB available</small></div>
                </Card.Body>
            </Card>
        </>
    );
};

// --- CORRECTED NotesTab Component ---
const NotesTab = () => {
    const noteCardStyle = (author) => ({
        backgroundColor: primaryBg,
        borderRadius: '0.5rem',
        borderLeft: author === 'You' ? `3px solid ${purpleAccent}` : 'none',
        padding: '1rem',
        marginBottom: '1rem'
    });

    return (
        <>
            {/* ADDED: Quick Note Section */}
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-white mb-0">Quick Note</h6>
                        <FloppyFill className="text-light" style={{ cursor: 'pointer' }} />
                    </div>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Add a quick note..."
                        className="text-white border-0 mt-2"
                        style={{ backgroundColor: primaryBg, resize: 'none' }}
                    />
                </Card.Body>
            </Card>

            {/* MODIFIED: Shared Notes Section */}
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-white mb-0">Shared Notes</h6>
                        <Button size="sm" style={{ backgroundColor: purpleAccent, borderColor: purpleAccent }}>New Note</Button>
                    </div>
                    {notes.shared.map((note, i) => (
                        <div key={i} style={noteCardStyle(note.author)}>
                            <div className="d-flex justify-content-between align-items-start">
                                <h6 className="text-white mb-1 small fw-bold">{note.title}</h6>
                                <small className="text-light flex-shrink-0 ms-2">{note.time}</small>
                            </div>
                            <p className="text-light small mb-2">{note.content}</p>
                            <div className="d-flex align-items-center">
                                <Image src={note.avatar} roundedCircle width="20" height="20" className="me-2" />
                                <small className="text-light">{note.author}</small>
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>

            {/* MODIFIED: Meeting Notes Section */}
            <Card style={cardStyle}>
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-white mb-0">Meeting Notes</h6>
                        <Calendar2Event className="text-light" />
                    </div>
                    {notes.meeting.map((meet, i) => (
                        <div key={i} style={{ backgroundColor: primaryBg, borderRadius: '0.5rem', padding: '1rem' }}>
                            <div className="d-flex justify-content-between">
                                <h6 className="text-white small fw-bold">{meet.title}</h6>
                                <small className="text-light">{meet.date}</small>
                            </div>
                            <ul className="text-light small mt-2 mb-0 ps-3">
                                {meet.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
                            </ul>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </>
    );
};


// --- CORRECTED RightSidebar Component ---
const RightSidebar = () => {
    const [activeTab, setActiveTab] = useState('Notes'); // Set to 'Notes' to show the changes
    const tabs = ['Overview', 'Tasks', 'Files', 'Notes'];

    const navLinkStyle = (tab) => ({
        color: activeTab === tab ? 'white' : '#adb5bd',
        fontWeight: activeTab === tab ? 'bold' : 'normal',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: activeTab === tab ? `2px solid ${purpleAccent}` : '2px solid transparent',
        paddingBottom: '0.75rem',
        marginBottom: '-1px'
    });

    return (
        <Col lg={4} className="p-3 d-flex flex-column" style={{
            background: `radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 60%),
                       radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 70%),
                       linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))`,
            height: '100vh',
        }}>
            <Nav variant="tabs" className="mb-3" style={{ borderBottomColor: cardBorder }}>
                {tabs.map(tab => (
                    <Nav.Item key={tab}>
                        <Nav.Link
                            eventKey={tab}
                            onClick={() => setActiveTab(tab)}
                            style={navLinkStyle(tab)}
                        >
                            {tab}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                {activeTab === 'Overview' && <OverviewTab />}
                {activeTab === 'Tasks' && <TasksTab />}
                {activeTab === 'Files' && <FilesTab />}
                {activeTab === 'Notes' && <NotesTab />}
            </div>

            <div className="mt-auto p-2" style={{ backgroundColor: secondaryBg, borderRadius: '0.5rem' }}>
                <div className="d-flex justify-content-between align-items-center text-light small">
                    <span>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: greenAccent, marginRight: '8px' }}></span>
                        All changes saved
                    </span>
                    <span>
                        ● Connected ● Last sync: 2m ago
                    </span>
                </div>
            </div>
        </Col>
    );
};

// --- Main App Component ---
const Workspace = () => (
    <>
    <Navbar></Navbar>
    <Container fluid>

        <Row className='vh-100' style={{ backgroundColor: primaryBg, color: 'white' }}>
            <MessagesList />
            <ChatWindow />
            <RightSidebar />
        </Row>
    </Container>
    <Footer></Footer>
    </>
);

export default Workspace;