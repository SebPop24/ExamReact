import React, { useState } from 'react';
import '../css/Register.css';


const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log('Registration submitted:', formData);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="registrer">
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Left section - Registration Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="text-center w-100" style={{ maxWidth: '400px' }}>
              {/* Email input field with SVG icon */}
              <div className="form-group mb-3 position-relative">
                <span className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89 4 2 4.9 2 6V18C2 19.1 2.89 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#888"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control pl-5"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              {/* Password input field with SVG icon */}
              <div className="form-group mb-3 position-relative">
                <span className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17C11.45 17 11 16.55 11 16V14C11 13.45 11.45 13 12 13C12.55 13 13 13.45 13 14V16C13 16.55 12.55 17 12 17ZM17 8V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V8C5.9 8 5 8.9 5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10C19 8.9 18.1 8 17 8ZM9 7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V8H9V7ZM17 20H7V10H17V20Z" fill="#888"/>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control pl-5"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              {/* Confirm Password input field with SVG icon */}
              <div className="form-group mb-3 position-relative">
                <span className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17C11.45 17 11 16.55 11 16V14C11 13.45 11.45 13 12 13C12.55 13 13 13.45 13 14V16C13 16.55 12.55 17 12 17ZM17 8V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V8C5.9 8 5 8.9 5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10C19 8.9 18.1 8 17 8ZM9 7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V8H9V7ZM17 20H7V10H17V20Z" fill="#888"/>
                  </svg>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control pl-5"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              <button type="submit" className="w-100 btn btn-lg btn-primary">
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        {/* Right section - Image */}
        <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center">
          <img src="/images/register.png" alt="Illustration" className="img-fluid mt-4" style={{ maxWidth: '70%' }} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;