import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import PictureComponent from "./components/PictureComponent";
import FriendsListComponent from "./components/FriendsListComponent";
import InformationComponent from "./components/InformationComponent";
import BioComponent from "./components/BioComponent";
import WallComponent from "./components/WallComponent";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams(); // Access the userID from the URL parameter
  
  // const [token, setToken] = useState(null);
  

  useEffect(
    () => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          const userData = response.data;
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    },
    [id]
  );


  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a JWT
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/users/check-login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setIsLoggedIn(true); // Set the isLoggedIn state to true if the user is logged in
        const userData = response.data;
        setUser(userData); // Set the user data in the state
      } catch (error) {
        setIsLoggedIn(false); // Set the isLoggedIn state to false if the user is not logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard user={user} /> : <LoginForm />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;