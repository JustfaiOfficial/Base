import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://justfaibackend.vercel.app//api/freelancers/login",
        formData
      );

      // save token for future requests
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      console.log("User:", res.data);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,0.3), transparent 80%), radial-gradient(circle at bottom right, rgba(167,139,250,0.25), transparent 80%), linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,1))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="card text-light p-4 rounded-4 shadow-lg"
        style={{
          width: "380px",
          background: "rgba(15, 15, 30, 0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h3
            className="fw-bold"
            style={{
              background: "linear-gradient(90deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </h3>
          <p style={{ color: "white" }}>Login to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email / Username</label>
            <input
              type="text"
              className="form-control text-light"
              placeholder="Enter your email or username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: "transparent",
                border: "2px solid #9333ea",
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-light"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #9333ea",
                  borderRadius: "10px 0 0 10px",
                }}
              />
              <button
                type="button"
                className="btn btn-dark border border-2 border-start-0"
                style={{ borderColor: "#9333ea" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
            </div>
          </div>

          {error && <p className="text-danger small">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn w-100 fw-bold text-light"
            style={{
              background: "linear-gradient(to right, #9333ea, #3b82f6)",
              borderRadius: "12px",
            }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
