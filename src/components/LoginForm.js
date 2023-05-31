import React, { useState } from "react";
import axiosInstance from "../components/axiosInstance";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password
      });

      const { token } = response.data; // Extract the JWT token from the response

      // Store the token in the browser's local storage
      localStorage.setItem("token", token);

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error response
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
