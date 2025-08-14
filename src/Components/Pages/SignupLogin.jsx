import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupLogin = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Toggle between Login and Signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      age: "",
      contact: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
        newErrors.age = "Enter a valid age";
      }
      if (!formData.contact) {
        newErrors.contact = "Contact is required";
      } else if (!/^\d{10}$/.test(formData.contact)) {
        newErrors.contact = "Enter a valid 10-digit contact number";
      }
    }

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        // Login API
        const response = await axios.post(
          "http://localhost:5000/api/user/login", 
          {
            email: formData.email,
            password: formData.password,
          }
        );

        alert(response.data.message || "Login successful!");
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);

        navigate("/");
      } else {
        // Signup API
        const response = await axios.post(
          "http://localhost:5000/api/user/signup", 
          formData
        );

        alert(response.data.message || "Signup successful!");
        setIsLogin(true);
        setFormData({
          name: "",
          age: "",
          contact: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="formBody">
      <form onSubmit={handleSubmit}>
        <h1>{isLogin ? "Login" : "Signup"}</h1>

        {!isLogin && (
          <>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
              />
              <span>{errors.name}</span>
            </div>

            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                autoComplete="off"
              />
              <span>{errors.age}</span>
            </div>

            <div>
              <label>Contact:</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact"
                autoComplete="tel"
              />
              <span>{errors.contact}</span>
            </div>
          </>
        )}

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <span>{errors.email}</span>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          <span>{errors.password}</span>
        </div>

        <button type="submit">{isLogin ? "Login" : "Signup"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleForm}>
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupLogin;
