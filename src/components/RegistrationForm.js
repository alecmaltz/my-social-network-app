import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleStateChange = event => {
    setState(event.target.value);
  };

  const handlePictureChange = event => {
    setPicture(event.target.files[0]);
  };

  const handleRegistration = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password don't match.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("picture", picture);

      const response = await axios.post("/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={handleCityChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={handleStateChange} />
        </div>
        <div>
          <label>Picture:</label>
          <input type="file" onChange={handlePictureChange} />
        </div>
        <button type="submit">Register</button>
        {errorMessage &&
          <p>
            {errorMessage}
          </p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
