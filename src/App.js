import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";

// Pages
import Homepage from "./components/pages/Homepage.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Workspace from "./components/pages/Workspace.jsx";
import Joblisting from "./components/pages/Joblisting.jsx";
import Jobdetails from "./components/pages/Jobdetails.jsx";
import SubmitProposal from "./components/pages/SubmitProposal.jsx";
import Freelancerprofile from "./components/pages/Freelancerprofile.jsx";
import Notification from "./components/pages/Notification.jsx";
import Payment from "./components/pages/Payment.jsx";
import MilestoneTracker from "./components/pages/MilestoneTracker.jsx";
import Waitlist from "./components/pages/Waitlist.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* Main pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Freelancerprofile />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/Jobs" element={<Joblisting />} />
          <Route path="/Job/next" element={<Jobdetails />} />
          <Route path="/milestone" element={<SubmitProposal />} />
          <Route path="/milestones" element={<MilestoneTracker />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/waitlist" element={<Waitlist />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
