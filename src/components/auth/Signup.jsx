import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --bg-primary: #030305;
    --bg-secondary: #0a0a12;
    --bg-card: #0f0f18;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --accent-violet: #c4b5fd;
    --accent-pink: #ec4899;
    --success-green: #10b981;
    --error-red: #ef4444;
    --warning-yellow: #f59e0b;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --border-subtle: rgba(255, 255, 255, 0.04);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .signup-page {
    min-height: 100vh;
    background: var(--bg-primary);
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* Background Effects */
  .signup-bg {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.08), transparent),
      radial-gradient(ellipse 50% 50% at 0% 50%, rgba(139, 92, 246, 0.05), transparent),
      radial-gradient(ellipse 50% 50% at 100% 50%, rgba(124, 58, 237, 0.05), transparent);
    pointer-events: none;
  }

  .floating-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    pointer-events: none;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    top: -150px;
    right: -100px;
  }

  .orb-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    bottom: -100px;
    left: -100px;
  }

  /* Header */
  .signup-header {
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .brand-icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: white;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }

  .brand-text {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
  }

  .brand-text span {
    color: var(--accent-purple-light);
  }

  .login-link {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .login-link a {
    color: var(--accent-purple-light);
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.25rem;
  }

  /* Main Container */
  .signup-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem 1.5rem 6rem;
    position: relative;
    z-index: 1;
  }

  /* Progress Steps */
  .steps-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    position: relative;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  }

  .step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .step-circle.completed {
    background: linear-gradient(135deg, var(--success-green), #059669);
    color: white;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .step-circle.active {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    color: white;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  }

  .step-circle.pending {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-subtle);
    color: var(--text-muted);
  }

  .step-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text-muted);
    margin-top: 0.5rem;
    text-align: center;
  }

  .step-label.active {
    color: var(--accent-purple-light);
  }

  .step-connector {
    position: absolute;
    top: 24px;
    left: calc(50% + 24px);
    width: calc(100% - 48px);
    height: 2px;
    background: var(--border-subtle);
  }

  .step-connector-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--success-green), var(--accent-purple));
    transition: width 0.3s ease;
  }

  /* Form Card */
  .signup-card {
    background: linear-gradient(145deg, rgba(15, 15, 24, 0.9), rgba(10, 10, 18, 0.95));
    backdrop-filter: blur(40px);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: 
      0 0 0 1px rgba(139, 92, 246, 0.03),
      0 20px 60px rgba(0, 0, 0, 0.4);
  }

  .step-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .step-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .step-subtitle {
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  /* Form Elements */
  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .input-wrapper {
    position: relative;
  }

  .form-input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    outline: none;
  }

  .form-input::placeholder {
    color: var(--text-muted);
  }

  .form-input:focus {
    border-color: var(--accent-purple);
    background: rgba(139, 92, 246, 0.03);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  .form-input.no-icon {
    padding-left: 1rem;
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .form-textarea {
    padding: 1rem;
    min-height: 120px;
    resize: vertical;
  }

  .form-select {
    appearance: none;
    cursor: pointer;
    padding-right: 2.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
  }

  /* Grid Layout */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 576px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Skills Section */
  .skills-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    min-height: 60px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    color: var(--accent-violet);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .skill-tag button {
    background: none;
    border: none;
    color: var(--accent-purple-light);
    cursor: pointer;
    padding: 0;
    font-size: 0.8rem;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .skill-tag button:hover {
    opacity: 1;
  }

  .popular-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-suggestion {
    padding: 0.5rem 0.875rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-suggestion:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: var(--accent-purple-light);
  }

  /* Work Preferences */
  .preference-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .preference-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .preference-item:hover {
    border-color: rgba(139, 92, 246, 0.3);
  }

  .preference-item.active {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
  }

  .preference-item input {
    accent-color: var(--accent-purple);
  }

  .preference-item span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Rate Cards */
  .rate-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .rate-card {
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rate-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
  }

  .rate-card.active {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
  }

  .rate-level {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .rate-value {
    font-size: 1.1rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.25rem;
  }

  .rate-unit {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  /* Review Card */
  .review-card {
    background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05));
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .review-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .review-avatar {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }

  .review-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.15rem;
  }

  .review-title {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .review-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .review-info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .review-info-item i {
    color: var(--accent-purple-light);
    font-size: 0.9rem;
  }

  /* Checkbox Styles */
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .checkbox-item input {
    width: 18px;
    height: 18px;
    accent-color: var(--accent-purple);
    margin-top: 2px;
    cursor: pointer;
  }

  .checkbox-item label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .checkbox-item a {
    color: var(--accent-purple-light);
    text-decoration: none;
  }

  /* Navigation */
  .nav-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
  }

  .btn-back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-back:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .btn-next {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }

  .btn-next:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  }

  .btn-submit {
    background: linear-gradient(135deg, var(--success-green), #059669);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .btn-submit:hover {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }

  .step-counter {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  /* Message Box */
  .message-box {
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .message-box.success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    color: var(--success-green);
  }

  .message-box.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }

  /* Mobile Steps */
  @media (max-width: 768px) {
    .signup-container {
      padding: 1rem 1rem 5rem;
    }
    
    .signup-card {
      padding: 1.5rem;
      border-radius: 20px;
    }
    
    .steps-container {
      display: none;
    }
    
    .mobile-steps {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .mobile-step {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }
  }

  @media (min-width: 769px) {
    .mobile-steps {
      display: none;
    }
  }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    agreeTerms: true,
    fullName: "",
    professionalTitle: "",
    country: "United States",
    language: "English",
    aboutMe: "",
    experience: "3-5 years",
    availability: "Full-time",
    workPreferences: ["Remote"],
    skills: ["JavaScript", "React"],
    portfolioLinks: { github: '', linkedin: '', website: '' },
    hourlyRate: 50,
    currency: "USD ($)",
    agreeReview: true,
    agreeUnderstand: true,
    agreeEmail: false,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [activeRate, setActiveRate] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const steps = [
    { id: 1, title: "Account", icon: "bi-person" },
    { id: 2, title: "Personal", icon: "bi-person-vcard" },
    { id: 3, title: "Work", icon: "bi-briefcase" },
    { id: 4, title: "Skills", icon: "bi-tools" },
    { id: 5, title: "Portfolio", icon: "bi-folder" },
    { id: 6, title: "Pricing", icon: "bi-currency-dollar" },
    { id: 7, title: "Review", icon: "bi-check2-circle" },
  ];

  const totalSteps = steps.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      portfolioLinks: { ...prev.portfolioLinks, [name]: value }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleWorkPrefChange = (pref) => {
    setFormData(prev => {
      const newPrefs = prev.workPreferences.includes(pref)
        ? prev.workPreferences.filter(p => p !== pref)
        : [...prev.workPreferences, pref];
      return { ...prev, workPreferences: newPrefs };
    });
  };

  const handleSkillAdd = (skillToAdd) => {
    const skill = skillToAdd.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setCurrentSkill("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSkillAdd(currentSkill);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        FullName: formData.fullName,
        Username: formData.username,
        PhoneNumber: formData.phone,
        Title: formData.professionalTitle,
        experienceYears: formData.experience === "0-1 years" ? 0 : formData.experience === "1-3 years" ? 2 : formData.experience === "3-5 years" ? 4 : 6,
        availability: formData.availability,
        Skills: formData.skills,
        AboutMe: formData.aboutMe,
        Country: formData.country,
        Language: formData.language,
        portfolioFiles: [
          { fileName: "GitHub", fileUrl: formData.portfolioLinks.github, fileType: "link" },
          { fileName: "LinkedIn", fileUrl: formData.portfolioLinks.linkedin, fileType: "link" },
          { fileName: "Website", fileUrl: formData.portfolioLinks.website, fileType: "link" }
        ],
        resumeFile: null,
        hourlyRate: formData.hourlyRate,
      };

      const res = await axios.post("https://justfaibackend.vercel.app/api/register", payload);
      setMessage(res.data.message || "Account created successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const getStepStatus = (stepId) => {
    if (stepId < step) return 'completed';
    if (stepId === step) return 'active';
    return 'pending';
  };

  const getInitials = (name) => {
    if (!name) return 'JD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="signup-page">
        <div className="signup-bg" />
        <motion.div
          className="floating-orb orb-1"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-orb orb-2"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header */}
        <header className="signup-header">
          <Link to="/" className="brand-logo">
            <div className="brand-icon">
              <i className="bi bi-lightning-charge-fill" />
            </div>
            <span className="brand-text">JUSTFAI<span>TECH</span></span>
          </Link>
          <div className="login-link">
            Already have an account?<Link to="/login">Sign in</Link>
          </div>
        </header>

        {/* Main Container */}
        <div className="signup-container">
          {/* Desktop Steps */}
          <div className="steps-container">
            {steps.map((s, index) => (
              <div key={s.id} className="step-item">
                <motion.div
                  className={`step-circle ${getStepStatus(s.id)}`}
                  initial={false}
                  animate={{ scale: s.id === step ? 1.1 : 1 }}
                >
                  {s.id < step ? (
                    <i className="bi bi-check-lg" />
                  ) : (
                    <i className={`bi ${s.icon}`} />
                  )}
                </motion.div>
                <span className={`step-label ${s.id === step ? 'active' : ''}`}>
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <div
                      className="step-connector-fill"
                      style={{ width: s.id < step ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Steps */}
          <div className="mobile-steps">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`mobile-step step-circle ${getStepStatus(s.id)}`}
              >
                {s.id < step ? <i className="bi bi-check-lg" /> : s.id}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            className="signup-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Account */}
                {step === 1 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Create Your Account</h2>
                      <p className="step-subtitle">Let's start with the basics</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <motion.button
                        type="button"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          padding: '0.875rem 1rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                          borderRadius: '12px',
                          color: '#a1a1aa',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        onClick={() => alert("Google Sign Up - Integration coming soon!")}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="bi bi-google" style={{ fontSize: '1.25rem' }} />
                        Google
                      </motion.button>
                      <motion.button
                        type="button"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          padding: '0.875rem 1rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                          borderRadius: '12px',
                          color: '#a1a1aa',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        onClick={() => alert("GitHub Sign Up - Integration coming soon!")}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="bi bi-github" style={{ fontSize: '1.25rem' }} />
                        GitHub
                      </motion.button>
                    </div>

                    {/* Divider */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      color: '#71717a',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                      or continue with email
                      <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrapper">
                          <input type="email" className="form-input" placeholder="your@email.com" name="email" value={formData.email} onChange={handleChange} />
                          <i className="bi bi-envelope input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                          <input type="password" className="form-input" placeholder="Create password" name="password" value={formData.password} onChange={handleChange} />
                          <i className="bi bi-lock input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-wrapper">
                          <input type="text" className="form-input" placeholder="@username" name="username" value={formData.username} onChange={handleChange} />
                          <i className="bi bi-at input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-wrapper">
                          <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" name="phone" value={formData.phone} onChange={handleChange} />
                          <i className="bi bi-telephone input-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleCheckboxChange} />
                      <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal */}
                {step === 2 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Personal Information</h2>
                      <p className="step-subtitle">Tell us more about yourself</p>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-wrapper">
                          <input type="text" className="form-input" placeholder="John Doe" name="fullName" value={formData.fullName} onChange={handleChange} />
                          <i className="bi bi-person input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Professional Title</label>
                        <div className="input-wrapper">
                          <input type="text" className="form-input" placeholder="Full Stack Developer" name="professionalTitle" value={formData.professionalTitle} onChange={handleChange} />
                          <i className="bi bi-briefcase input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <div className="input-wrapper">
                          <select className="form-input form-select" name="country" value={formData.country} onChange={handleChange}>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>India</option>
                          </select>
                          <i className="bi bi-geo-alt input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Primary Language</label>
                        <div className="input-wrapper">
                          <select className="form-input form-select" name="language" value={formData.language} onChange={handleChange}>
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                          <i className="bi bi-translate input-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">About Me</label>
                      <textarea className="form-input form-textarea no-icon" placeholder="Tell us about yourself, your experience, and what you're passionate about..." name="aboutMe" value={formData.aboutMe} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {/* Step 3: Professional */}
                {step === 3 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Professional Background</h2>
                      <p className="step-subtitle">Share your work experience</p>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Years of Experience</label>
                        <div className="input-wrapper">
                          <select className="form-input form-select" name="experience" value={formData.experience} onChange={handleChange}>
                            <option>0-1 years</option>
                            <option>1-3 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                          </select>
                          <i className="bi bi-calendar-event input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Availability</label>
                        <div className="input-wrapper">
                          <select className="form-input form-select" name="availability" value={formData.availability} onChange={handleChange}>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Open to offers</option>
                          </select>
                          <i className="bi bi-clock input-icon" />
                        </div>
                      </div>
                    </div>
                    <label className="form-label" style={{ marginBottom: '0.75rem' }}>Work Preferences</label>
                    <div className="preference-grid">
                      {["Remote", "On-site", "Hybrid", "Travel OK"].map(pref => (
                        <div
                          key={pref}
                          className={`preference-item ${formData.workPreferences.includes(pref) ? 'active' : ''}`}
                          onClick={() => handleWorkPrefChange(pref)}
                        >
                          <input type="checkbox" checked={formData.workPreferences.includes(pref)} readOnly />
                          <span>{pref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Skills */}
                {step === 4 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Skills & Expertise</h2>
                      <p className="step-subtitle">Showcase what you're good at</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Add Skills</label>
                      <div className="input-wrapper">
                        <input type="text" className="form-input" placeholder="Type a skill and press Enter" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={handleSkillKeyDown} />
                        <i className="bi bi-plus-lg input-icon" />
                      </div>
                    </div>
                    <div className="skills-display">
                      {formData.skills.map(skill => (
                        <span key={skill} className="skill-tag">
                          {skill}
                          <button onClick={() => handleSkillRemove(skill)}><i className="bi bi-x" /></button>
                        </span>
                      ))}
                    </div>
                    <label className="form-label">Popular Skills</label>
                    <div className="popular-skills">
                      {["Python", "UI/UX Design", "TypeScript", "Node.js", "Data Analysis", "AWS", "Figma", "Vue.js"].map(skill => (
                        <button key={skill} className="skill-suggestion" onClick={() => handleSkillAdd(skill)}>
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Portfolio */}
                {step === 5 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Portfolio & Links</h2>
                      <p className="step-subtitle">Show off your best work</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub Profile</label>
                      <div className="input-wrapper">
                        <input type="url" className="form-input" placeholder="https://github.com/username" name="github" value={formData.portfolioLinks.github} onChange={handlePortfolioChange} />
                        <i className="bi bi-github input-icon" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn Profile</label>
                      <div className="input-wrapper">
                        <input type="url" className="form-input" placeholder="https://linkedin.com/in/username" name="linkedin" value={formData.portfolioLinks.linkedin} onChange={handlePortfolioChange} />
                        <i className="bi bi-linkedin input-icon" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Personal Website</label>
                      <div className="input-wrapper">
                        <input type="url" className="form-input" placeholder="https://yourwebsite.com" name="website" value={formData.portfolioLinks.website} onChange={handlePortfolioChange} />
                        <i className="bi bi-globe input-icon" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Pricing */}
                {step === 6 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Set Your Rates</h2>
                      <p className="step-subtitle">How much do you charge?</p>
                    </div>
                    <label className="form-label">Rate Suggestions</label>
                    <div className="rate-cards">
                      {[
                        { level: 'Entry', rate: '$15-25', value: 20 },
                        { level: 'Intermediate', rate: '$25-50', value: 40 },
                        { level: 'Expert', rate: '$50+', value: 60 }
                      ].map(item => (
                        <div
                          key={item.level}
                          className={`rate-card ${activeRate === item.level ? 'active' : ''}`}
                          onClick={() => {
                            setActiveRate(item.level);
                            setFormData(prev => ({ ...prev, hourlyRate: item.value }));
                          }}
                        >
                          <div className="rate-level">{item.level}</div>
                          <div className="rate-value">{item.rate}</div>
                          <div className="rate-unit">per hour</div>
                        </div>
                      ))}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Hourly Rate</label>
                        <div className="input-wrapper">
                          <input type="number" className="form-input" placeholder="50" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
                          <i className="bi bi-currency-dollar input-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Currency</label>
                        <div className="input-wrapper">
                          <select className="form-input form-select" name="currency" value={formData.currency} onChange={handleChange}>
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                          </select>
                          <i className="bi bi-coin input-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {step === 7 && (
                  <div>
                    <div className="step-header">
                      <h2 className="step-title">Review Your Profile</h2>
                      <p className="step-subtitle">Make sure everything looks perfect</p>
                    </div>
                    <div className="review-card">
                      <div className="review-header">
                        <div className="review-avatar">{getInitials(formData.fullName)}</div>
                        <div>
                          <h3 className="review-name">{formData.fullName || 'Your Name'}</h3>
                          <p className="review-title">{formData.professionalTitle || 'Your Title'}</p>
                        </div>
                      </div>
                      <div className="review-info-grid">
                        <div className="review-info-item"><i className="bi bi-envelope" />{formData.email || 'your@email.com'}</div>
                        <div className="review-info-item"><i className="bi bi-telephone" />{formData.phone || '+1 (555) 000-0000'}</div>
                        <div className="review-info-item"><i className="bi bi-geo-alt" />{formData.country}</div>
                        <div className="review-info-item"><i className="bi bi-currency-dollar" />${formData.hourlyRate}/hour</div>
                        <div className="review-info-item"><i className="bi bi-briefcase" />{formData.experience}</div>
                        <div className="review-info-item"><i className="bi bi-clock" />{formData.availability}</div>
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                        <label className="form-label" style={{ marginBottom: '0.5rem' }}>Skills</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {formData.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="agreeReview" name="agreeReview" checked={formData.agreeReview} onChange={handleCheckboxChange} />
                      <label htmlFor="agreeReview">I agree to the <a href="#">Terms of Service</a></label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="agreeUnderstand" name="agreeUnderstand" checked={formData.agreeUnderstand} onChange={handleCheckboxChange} />
                      <label htmlFor="agreeUnderstand">I understand that my profile will be reviewed</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="agreeEmail" name="agreeEmail" checked={formData.agreeEmail} onChange={handleCheckboxChange} />
                      <label htmlFor="agreeEmail">I want to receive email notifications about jobs</label>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Message */}
            {message && (
              <motion.div
                className={`message-box ${message.includes('success') ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className={`bi ${message.includes('success') ? 'bi-check-circle' : 'bi-exclamation-triangle'}`} />
                {message}
              </motion.div>
            )}

            {/* Navigation */}
            <div className="nav-buttons">
              {step > 1 ? (
                <motion.button
                  className="btn-back"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-arrow-left" />
                  Back
                </motion.button>
              ) : <div />}

              <span className="step-counter">Step {step} of {totalSteps}</span>

              {step < totalSteps ? (
                <motion.button
                  className="btn-next"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <i className="bi bi-arrow-right" />
                </motion.button>
              ) : (
                <motion.button
                  className="btn-next btn-submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-rocket-takeoff" />
                      Launch Profile
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Signup;