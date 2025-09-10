import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./componets/signup.jsx";
import Homedashboard from "./componets/Homepage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Homedashboard />} />

          
          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
