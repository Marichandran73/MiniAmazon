import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const SignupLogin = () => {
  const navigate = useNavigate(); 

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', age: '', email: '', password: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.age) newErrors.age = 'Age is required';
      else if (isNaN(formData.age) || formData.age <= 0)
        newErrors.age = 'Enter a valid age';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      if (isLogin) {
        alert('Login successful');
        console.log('Login Data:', formData);
        navigate('/dashboard'); 
      } else {
        alert('Signup successful');
        console.log('Signup Data:', formData);
      }
      setFormData({ name: '', age: '', email: '', password: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="formBody">
    <form onSubmit={handleSubmit}>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>

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
        />
        <span>{errors.password}</span>
      </div>

      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button type="button" onClick={toggleForm}>
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </p>
    </form>

    </div>
  );
};

export default SignupLogin;
