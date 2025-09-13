import { useState, ChangeEvent, KeyboardEvent, FC, ReactNode } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ProgressBar,
  InputGroup,
  Badge,
} from "react-bootstrap";
import axios from "axios";





// Main component for the Freelancer Signup multistep form
// NOTE: This component requires the Bootstrap Icons CSS to be linked in your main HTML file.
// Example: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
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
    country: "",
    language: "English",
    aboutMe: "Passionate developer with 5 years of experience in creating dynamic web applications. I specialize in the MERN stack and love bringing ideas to life with clean, efficient code.",
    experience: "3-5 years",
    availability: "Full-time",
    workPreferences: ["Remote", "Hybrid"],
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    portfolioLinks: { github: '', linkedin: '', website: '' },
    hourlyRate: 50,
    currency: "USD ($)",
    idVerified: true,
    featuredProfile: false,
    agreeReview: true,
    agreeUnderstand: true,
    agreeEmail: false,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [activeRate, setActiveRate] = useState('Intermediate');

  // Generic handler for text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handler for portfolio link changes
  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        portfolioLinks: {
            ...prev.portfolioLinks,
            [name]: value
        }
    }));
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handler for work preference checkboxes
  const handleWorkPrefChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
        const newPrefs = checked 
            ? [...prev.workPreferences, value] 
            : prev.workPreferences.filter(pref => pref !== value);
        return { ...prev, workPreferences: newPrefs };
    });
  };

  // Function to add a new skill to the list
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
  }
const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Function to remove a skill from the list
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
    console.log(payload)

    const res = await axios.post(
      "https://justfaibackend.vercel.app/api/signup/freelancers/register",
      payload
    );

    setMessage(res.data.message || "Signup successful!");
  } catch (err) {
    setMessage(err.response?.data?.message || "Signup failed!");
  } finally {
    setLoading(false);
  }
};

  
  const steps = [
    { id: 1, title: "Account", icon: <i className="bi bi-person fs-5"></i> },
    { id: 2, title: "Personal", icon: <i className="bi bi-person-vcard fs-5"></i> },
    { id: 3, title: "Professional", icon: <i className="bi bi-briefcase fs-5"></i> },
    { id: 4, title: "Skills", icon: <i className="bi bi-wrench fs-5"></i> },
    { id: 5, title: "Portfolio", icon: <i className="bi bi-folder2-open fs-5"></i> },
    { id: 6, title: "Pricing", icon: <i className="bi bi-currency-dollar fs-5"></i> },
    { id: 7, title: "Review", icon: <i className="bi bi-check-circle fs-5"></i> },
  ];

  const totalSteps = steps.length;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  // Determine the styling for each stepper item based on its state
  const getStepStyle = (s) => {
    if (s.id < step) return {
        icon: { backgroundColor: '#10B981', color: 'white', border: '1px solid #10B981'},
        text: "text-white"
    };
    if (s.id === step) return {
        icon: { backgroundColor: '#8B5CF6', color: 'white', border: '1px solid #8B5CF6' },
        text: "text-white fw-semibold"
    };
    return {
        icon: { backgroundColor: '#374151', color: '#9CA3AF', border: '1px solid #4B5563'},
        text: "text-light"
    };
  };
  
  // Common styles for dark-themed form inputs
  const darkInputStyle = {
      backgroundColor: '#374151',
      color: 'white',
      border: '1px solid #4B5563'
  };
  
  const darkInputGroupStyle = {
      ...darkInputStyle,
      borderRight: 'none'
  };

  const NextButton = () => <Button style={{background: 'linear-gradient(to right, #8B5CF6, #EC4899'}} className="px-4 border-0 rounded-pill" onClick={nextStep}>Next →</Button>;
  const BackButton = () => <Button style={{backgroundColor: '#374151', border: 'none'}} className="px-4 rounded-pill" onClick={prevStep}>← Back</Button>;
  const StepCounter = () => <span className="text-light small d-none d-md-inline">Step {step} of {totalSteps}</span>;

  // Navigation controls that will be displayed differently on mobile and desktop
  const NavigationControls = () => {
    return(
      <>
        {/* Desktop Navigation */}
        <div className="d-none d-md-flex justify-content-between align-items-center mt-4">
          {step > 1 ? <BackButton /> : <div/>}
          <StepCounter />
          {step < totalSteps ? <NextButton /> : 
  <Button 
    variant="success" 
    className="px-4 flex-grow-1 ms-3 rounded-pill" 
    style={{backgroundColor: '#10B981', border: 'none'}}
    onClick={handleSubmit}       
    disabled={loading}           
  >
    {loading ? "Launching..." : <><i className="bi bi-rocket-takeoff me-2"></i> Launch My Profile</>}
  </Button>
}

        </div>
        {message && (
  <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"} mt-3`} role="alert">
    {message}
  </div>
)}


        {/* Mobile Glass Bar Navigation */}
        <div className="d-md-none d-flex justify-content-between align-items-center p-2 rounded-pill position-fixed start-50 translate-middle-x shadow-lg"
            style={{ 
                bottom: '1rem',
                zIndex: 1030, 
                width: "95%", 
                backgroundColor: "rgba(30,27,51,0.7)", 
                backdropFilter: "blur(10px)", 
                WebkitBackdropFilter: "blur(10px)", 
                border: "1px solid rgba(255,255,255,0.1)"
            }}
        >
          {step > 1 ? <BackButton /> : <div style={{width: '80px'}}/>}
          <span className="text-light small">Step {step} of {totalSteps}</span>
          {step < totalSteps ? <NextButton /> : <Button variant="success" className="px-3 rounded-pill" style={{backgroundColor: '#10B981', border: 'none'}}><i className="bi bi-rocket-takeoff"></i></Button>}
        </div>
      </>
    )
  };


  return (
    <div style={{backgroundColor: '#0B081A'}} className="text-light min-vh-100 d-flex align-items-center">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="text-center mb-5">
              <h1 className="h2 fw-bold text-white display-md-6">Join Our Freelance Community</h1>
              <p className="text-light fs-6 fs-md-5">Complete your profile in just a few steps</p>
            </div>
            
            {/* Mobile Stepper */}
             <div className="d-flex d-md-none align-items-center justify-content-between mb-4">
                 {steps.map(s => (
                     <div key={s.id} className="rounded-circle d-flex align-items-center justify-content-center" style={{width: "30px", height: "30px", transition: 'all 0.3s ease', ...getStepStyle(s).icon}}>
                        {s.id < step ? <i className="bi bi-check-lg"></i> : s.id === step ? <b>{s.id}</b> : <small>{s.id}</small> }
                     </div>
                 ))}
                 <span className="text-light small ms-3">{step} of {totalSteps}</span>
            </div>


            {/* Desktop Stepper */}
            <div className="d-none d-md-block">
                <ProgressBar className="mb-4" style={{height: "0.5rem", backgroundColor: '#374151'}}>
                    <ProgressBar style={{background: 'linear-gradient(to right, #8B5CF6, #EC4899'}} now={progress} />
                </ProgressBar>
                <div className="d-flex justify-content-between mb-5">
                  {steps.map((s) => (
                    <div key={s.id} className="text-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{width: "40px", height: "40px", transition: 'all 0.3s ease', ...getStepStyle(s).icon}}>
                        {s.icon}
                      </div>
                      <small className={getStepStyle(s).text} style={{fontSize: '0.7rem'}}>{s.title}</small>
                    </div>
                  ))}
                </div>
            </div>

            <Card style={{backgroundColor: '#1A162E', border: '1px solid #2A2640'}} className="shadow-lg rounded-4 mb-5 pb-5 mb-md-0 pb-md-0">
              <Card.Body className="p-3 p-md-5">
                
                {/* Step 1: Account */}
                {step === 1 && (
                  <section>
                    <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Create Your Account</h2><p className="text-light">Let's start with the basics</p></div>
                    <Form>
                      <Row>
                        <Col md={6} className="mb-3"><Form.Label className="text-light">Email Address</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-envelope"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="email" placeholder="your@email.com" name="email" value={formData.email} onChange={handleChange}/></InputGroup></Col>
                        <Col md={6} className="mb-3"><Form.Label className="text-light">Password</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-lock"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="password" placeholder="Create password" name="password" value={formData.password} onChange={handleChange}/></InputGroup></Col>
                        <Col md={6} className="mb-3"><Form.Label className="text-light">Username</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-at"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} /></InputGroup></Col>
                        <Col md={6} className="mb-3"><Form.Label className="text-light">Phone Number</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-telephone"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="tel" placeholder="+1 (555) 000-0000" name="phone" value={formData.phone} onChange={handleChange} /></InputGroup></Col>
                      </Row>
                      <Form.Check type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleCheckboxChange} label={<>I agree to the <a href="#terms" className="text-decoration-none" style={{color: '#C4B5FD'}}>Terms of Service</a> and <a href="#privacy" className="text-decoration-none" style={{color: '#C4B5FD'}}>Privacy Policy</a></>} className="mb-4"/>
                    </Form>
                  </section>
                )}
                
                {/* Step 2: Personal */}
                {step === 2 && (
                   <section>
                    <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Personal Information</h2><p className="text-light">Tell us more about yourself</p></div>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3"><Form.Label className="text-light">Full Name</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-person"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="text" placeholder="John Doe" name="fullName" value={formData.fullName} onChange={handleChange}/></InputGroup></Col>
                            <Col md={6} className="mb-3"><Form.Label className="text-light">Professional Title</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-briefcase"></i></InputGroup.Text><Form.Control style={darkInputStyle} type="text" placeholder="Full Stack Developer" name="professionalTitle" value={formData.professionalTitle} onChange={handleChange}/></InputGroup></Col>
                            <Col md={6} className="mb-3"><Form.Label className="text-light">Country</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-geo-alt"></i></InputGroup.Text><Form.Select style={darkInputStyle} name="country" value={formData.country} onChange={handleChange}><option>United States</option><option>Canada</option><option>United Kingdom</option></Form.Select></InputGroup></Col>
                            <Col md={6} className="mb-3"><Form.Label className="text-light">Primary Language</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-translate"></i></InputGroup.Text><Form.Select style={darkInputStyle} name="language" value={formData.language} onChange={handleChange}><option>English</option><option>Spanish</option><option>French</option></Form.Select></InputGroup></Col>
                        </Row>
                        <Form.Group className="mb-4"><Form.Label className="text-light">About Me</Form.Label><Form.Control style={darkInputStyle} as="textarea" rows={4} name="aboutMe" value={formData.aboutMe} onChange={handleChange} placeholder="Tell us about yourself..." /></Form.Group>
                    </Form>
                  </section>
                )}
                
                {/* Step 3: Professional */}
                 {step === 3 && (
                  <section>
                    <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Professional Background</h2><p className="text-light">Share your professional experience</p></div>
                    <Form>
                      <Row className="mb-4">
                        <Col md={6} className="mb-3 mb-md-0"><Form.Label className="text-light">Years of Experience</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-calendar-event"></i></InputGroup.Text><Form.Select style={darkInputStyle} name="experience" value={formData.experience} onChange={handleChange}><option>0-1 years</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></Form.Select></InputGroup></Col>
                        <Col md={6}><Form.Label className="text-light">Availability</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-clock"></i></InputGroup.Text><Form.Select style={darkInputStyle} name="availability" value={formData.availability} onChange={handleChange}><option>Full-time</option><option>Part-time</option><option>Open to offers</option></Form.Select></InputGroup></Col>
                      </Row>
                      <Form.Label className="mb-3 text-light">Work Preferences</Form.Label>
                      <Row>{["Remote", "On-site", "Hybrid", "Travel OK"].map(pref => (<Col xs={6} key={pref} className="mb-3"><div style={{backgroundColor: '#374151'}} className="border-0 rounded p-3"><Form.Check type="checkbox" id={`pref-${pref}`} value={pref} checked={formData.workPreferences.includes(pref)} onChange={handleWorkPrefChange} label={pref} /></div></Col>))}</Row>
                    </Form>
                  </section>
                )}

                {/* Step 4: Skills */}
                {step === 4 && (
                    <section>
                        <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Skills & Expertise</h2><p className="text-light">Showcase what you're good at</p></div>
                        <Form.Group className="mb-3"><Form.Label className="text-light">Add Skills</Form.Label><Form.Control style={darkInputStyle} type="text" placeholder="e.g., JavaScript" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={handleSkillKeyDown} /></Form.Group>
                        <div style={{backgroundColor: '#374151', minHeight: '80px'}} className="p-3 rounded mb-4">
                            {formData.skills.map(skill => (
                                <Badge pill style={{backgroundColor: '#8B5CF6'}} key={skill} className="p-2 me-2 mb-2 fs-6 fw-normal border-0">
                                    {skill} <i className="bi bi-x-lg ms-1" style={{cursor: "pointer"}} onClick={() => handleSkillRemove(skill)}></i>
                                </Badge>
                            ))}
                        </div>
                        <p className="mb-2 fw-semibold text-light">Popular Skills</p>
                        <div className="d-flex flex-wrap gap-2">{["Python", "UI/UX Design", "Data Analysis", "Content Writing", "SEO", "Vue.js"].map(skill => (<Button key={skill} style={{backgroundColor: '#374151', border: '1px solid #4B5563'}} size="sm" onClick={() => handleSkillAdd(skill)}>+ {skill}</Button>))}</div>
                    </section>
                )}

                {/* Step 5: Portfolio */}
                {step === 5 && (
                    <section>
                        <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Portfolio & Documents</h2><p className="text-light">Show off your best work</p></div>
                        <div style={{backgroundColor: '#374151'}} className="p-4 rounded-3">
                            <p className="form-label mb-3 text-light">Portfolio Links</p>
                            <InputGroup className="mb-3"><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-github"></i></InputGroup.Text><Form.Control style={darkInputStyle} name="github" value={formData.portfolioLinks.github} onChange={handlePortfolioChange} placeholder="GitHub profile URL" /></InputGroup>
                            <InputGroup className="mb-3"><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-linkedin"></i></InputGroup.Text><Form.Control style={darkInputStyle} name="linkedin" value={formData.portfolioLinks.linkedin} onChange={handlePortfolioChange} placeholder="LinkedIn profile URL" /></InputGroup>
                            <InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-globe2"></i></InputGroup.Text><Form.Control style={darkInputStyle} name="website" value={formData.portfolioLinks.website} onChange={handlePortfolioChange} placeholder="Personal website URL" /></InputGroup>
                        </div>
                    </section>
                )}
                
                {/* Step 6: Pricing */}
                {step === 6 && (
                    <section>
                        <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Set Your Rates</h2><p className="text-light">How much do you charge?</p></div>
                        <Row className="mb-4">
                           <Col md={6} className="mb-3 mb-md-0"><Form.Label className="text-light">Hourly Rate</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}>$</InputGroup.Text><Form.Control style={darkInputStyle} type="number" placeholder="50" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange}/><InputGroup.Text style={darkInputStyle}>/hour</InputGroup.Text></InputGroup></Col>
                           <Col md={6}><Form.Label className="text-light">Currency</Form.Label><InputGroup><InputGroup.Text style={darkInputGroupStyle}><i className="bi bi-currency-bitcoin"></i></InputGroup.Text><Form.Select style={darkInputStyle} name="currency" value={formData.currency} onChange={handleChange}><option>USD ($)</option><option>EUR (€)</option></Form.Select></InputGroup></Col>
                        </Row>
                        <div style={{backgroundColor: '#374151'}} className="p-3 p-md-4 rounded-3 mb-4">
                            <p className="form-label mb-3 text-center text-light">Rate Suggestions</p>
                            <Row>{[{level:'Entry', rate:'$15-25', value: 20},{level:'Intermediate', rate:'$25-50', value: 40},{level:'Expert', rate:'$50+', value: 60}].map(item => (
                                <Col xs={4} key={item.level}><Card className={`text-center h-100 ${activeRate === item.level ? 'border-primary shadow' : 'border-0'}`} style={{cursor: "pointer", backgroundColor: '#1A162E'}} onClick={() => { setActiveRate(item.level); setFormData(prev => ({...prev, hourlyRate: item.value})); }}><Card.Body className="p-2 p-md-3"><small className="text-light d-block" style={{fontSize: '0.7rem'}}>{item.level}</small><h6 className="my-1 fw-bold text-white">{item.rate}</h6><small className="text-light d-none d-md-block" style={{fontSize: '0.7rem'}}>per hour</small></Card.Body></Card></Col>
                            ))}</Row>
                        </div>
                        <div style={{backgroundColor: '#374151'}} className="p-4 rounded-3">
                            <p className="form-label mb-3 text-light">Additional Options</p>
                            <Form.Group className="d-flex justify-content-between align-items-center mb-3"><div className="me-3"><i className="bi bi-shield-check me-2"></i> <span className="fw-semibold">ID Verified</span><p className="text-light small mb-0">Verify your identity to build trust</p></div><Form.Check type="switch" id="id-verified" checked={formData.idVerified} disabled/></Form.Group>
                            <hr className="border-secondary"/>
                            <Form.Group className="d-flex justify-content-between align-items-center"><div className="me-3"><i className="bi bi-star-fill me-2"></i> <span className="fw-semibold">Featured Profile</span><p className="text-light small mb-0">Get more visibility (+$10/month)</p></div><Form.Check type="switch" id="featured-profile" checked={formData.featuredProfile} onChange={handleCheckboxChange} name="featuredProfile" /></Form.Group>
                        </div>
                    </section>
                )}

                {/* Step 7: Review */}
                {step === 7 && (
                    <section>
                         <div className="text-center mb-4"><h2 className="h3 fw-bold text-white">Review Your Profile</h2><p className="text-light">Make sure everything looks perfect</p></div>
                        <Card className="border-0 mb-4 rounded-3" style={{background: 'linear-gradient(145deg, #3a2a5b, #1a162e)'}}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rounded-circle bg-primary bg-gradient text-white d-flex align-items-center justify-content-center fw-bold me-3" style={{width: '60px', height: '60px', fontSize: '1.5rem', background: 'linear-gradient(to right, #8B5CF6, #EC4899)'}}>JD</div>
                                    <div><h5 className="mb-0 fw-bold">{formData.fullName}</h5><p className="mb-0 text-light">@{formData.username}</p><p className="mb-0 text-light">{formData.professionalTitle}</p></div>
                                </div>
                                <Row>
                                    <Col md={6} className="mb-3 mb-md-0"><p className="fw-semibold text-light">Contact Info</p><p className="text-light small mb-1"><i className="bi bi-envelope me-2"></i> {formData.email || 'john@example.com'}</p><p className="text-light small mb-1"><i className="bi bi-telephone me-2"></i> {formData.phone}</p><p className="text-light small mb-1"><i className="bi bi-geo-alt me-2"></i> {formData.country}</p></Col>
                                    <Col md={6}><p className="fw-semibold text-light">Professional Info</p><p className="text-light small mb-1"><i className="bi bi-briefcase me-2"></i> {formData.experience}</p><p className="text-light small mb-1"><i className="bi bi-clock me-2"></i> {formData.availability}</p><p className="text-light small mb-1"><i className="bi bi-currency-dollar me-2"></i> ${formData.hourlyRate}/hour</p><p className="text-light small mb-1 text-success"><i className="bi bi-shield-check-fill me-2"></i> ID Verified</p></Col>
                                </Row>
                                <hr className="border-secondary" />
                                <p className="fw-semibold text-light">Skills</p>
                                <div className="d-flex flex-wrap gap-2">{formData.skills.map(skill => (<Badge key={skill} pill style={{backgroundColor: '#8B5CF6'}} className="p-2 fs-6 fw-normal border-0">{skill}</Badge>))}</div>
                            </Card.Body>
                        </Card>
                        <div style={{backgroundColor: '#374151'}} className="p-4 rounded-3">
                            <p className="form-label mb-3 text-light">Terms & Conditions</p>
                            <Form.Check type="checkbox" className="mb-2" name="agreeReview" checked={formData.agreeReview} onChange={handleCheckboxChange} label={<>I agree to FreelanceHub's <a href="#terms" className="text-decoration-none" style={{color: '#C4B5FD'}}>Terms of Service</a></>} />
                            <Form.Check type="checkbox" className="mb-2" name="agreeUnderstand" checked={formData.agreeUnderstand} onChange={handleCheckboxChange} label="I understand that my profile will be reviewed" />
                            <Form.Check type="checkbox" className="mb-3" name="agreeEmail" checked={formData.agreeEmail} onChange={handleCheckboxChange} label="I want to receive email notifications" />
                        </div>
                    </section>
                )}
                 <NavigationControls />
              </Card.Body>
            </Card>

           

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;