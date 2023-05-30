import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import PictureComponent from "./components/PictureComponent";
import FriendsListComponent from "./components/FriendsListComponent";
import InformationComponent from "./components/InformationComponent";
import TextAreaComponent from "./components/TextAreaComponent";
import WallComponent from "./components/WallComponent";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  const [user, setUser] = useState(null);
  const { userID } = useParams(); // Access the userID from the URL parameter

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userID}`);
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userID]);

  const handleBioSubmit = bio => {
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
                    <PictureComponent imageUrl={`/api/users/${userID}/picture`} />
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
                <Route path="/api/users/register" element={<RegistrationForm />} />
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
          <TextAreaComponent onBioSubmit={handleBioSubmit} />
          <WallComponent />
        </div>
      </div>
    </Router>
  );
};

export default App;
