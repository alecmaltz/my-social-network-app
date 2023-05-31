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

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams(); // Access the userID from the URL parameter

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a JWT
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/users/check-login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT in the request headers
          },
        });

        setIsLoggedIn(true); // Set the isLoggedIn state to true if the user is logged in
      } catch (error) {
        setIsLoggedIn(false); // Set the isLoggedIn state to false if the user is not logged in
      }
    };

    checkLoginStatus();
  }, []);

  const handleBioSubmit = (bio) => {
    // Handle bio submission, e.g., send to backend API
  };

  return (
    <Router>
      <div className="app-container">
        <div className="left-column">
          {user && (
            <>
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PictureComponent imageUrl={`/api/users/${id}/picture`} />
                  }
                />
                <Route
                  path="/albums"
                  element={
                    <div>
                      {/* Render your albums component */}
                    </div>
                  }
                />
                {!isLoggedIn && (
                  <Route
                    path="/register"
                    element={<RegistrationForm />}
                  />
                )}
              </Routes>
              <InformationComponent
                city={user.city}
                numFriends={user.numFriends}
                firstName={user.firstName}
                lastName={user.lastName}
              />
              <FriendsListComponent friends={user.friends} />
            </>
          )}
        </div>
        <div className="right-column">
          {isLoggedIn ? (
            <>
              <BioComponent
                bio={user?.bio}
                headline={user?.headline}
                onBioSubmit={handleBioSubmit}
              />
              <WallComponent />
            </>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
