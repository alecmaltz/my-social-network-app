import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password
      });

      const { token } = response.data;
      setToken(token);

      // Store the token in the browser's local storage
      localStorage.setItem("token", token);
      console.log("Token:", token);

      navigate("/dashboard"); // Redirect to the dashboard page after successful login
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage &&
          <p>
            {errorMessage}
          </p>}
      </form>
    </div>
  );
};

export default LoginForm;
