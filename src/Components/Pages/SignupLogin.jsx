import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupLogin = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", age: "", email: "", password: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.age) newErrors.age = "Age is required";
      else if (isNaN(formData.age) || formData.age <= 0)
        newErrors.age = "Enter a valid age";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(
          "http://localhost:3000/api/user/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("Login successful:", response.data);

        alert(response.data.message || "Login successful!");

        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        // Signup logic
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            password: formData.password,
          }
        );
        console.log("frontend res", response);

        alert(response.data.message || "Signup successful!");
        setIsLogin(true);
        setFormData({ name: "", age: "", email: "", password: "" });
      }
    } catch (error) {
      console.log("Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong");
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
                autoComplete="age"
              />
              <span>{errors.age}</span>
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
