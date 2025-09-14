import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./componets/signup.jsx";
import Homedashboard from "./componets/Homepage.jsx";
import LoginForm from "./componets/login.jsx";
import Workspace from "./componets/Workspace.jsx";
import JobListing from "./componets/Joblisting.jsx";
import JobDetailsPage from "./componets/Jobdetails.jsx";
import ProposalPage from "./componets/SubmitPropsoal.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Homedashboard />} />
          <Route path="/login" element={<LoginForm></LoginForm>}/>
          <Route path="/workspace" element={<Workspace></Workspace>}/>
                    <Route path="/Jobs" element={<JobListing></JobListing>}/>
                                        <Route path="/Job/next" element={<JobDetailsPage></JobDetailsPage>}/>
          <Route path="/milestone" element={<ProposalPage></ProposalPage>}/>


                    



          
          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
