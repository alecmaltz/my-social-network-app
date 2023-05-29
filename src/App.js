import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PictureComponent from "./components/PictureComponent";
import FriendsListComponent from "./components/FriendsListComponent";
import InformationComponent from "./components/InformationComponent";
import TextAreaComponent from "./components/TextAreaComponent";
import WallComponent from "./components/WallComponent";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  // Assuming you have some sample data to pass as props
  const pictureUrl = "sample_picture_url";
  const friends = [
    { id: 1, imageUrl: "friend1_picture_url", name: "Friend 1" },
    { id: 2, imageUrl: "friend2_picture_url", name: "Friend 2" }
    // Add more friends as needed
  ];
  const city = "Sample City";
  const numFriends = 10;

  const handleBioSubmit = bio => {
    // Handle bio submission, e.g., send to backend API
  };

  return <Router>
      <div className="app-container">
        <div className="left-column">
          <h1>Frankenstein's Monster</h1>
          <Routes>
            <Route path="/" element={<PictureComponent imageUrl={pictureUrl} />} />
            <Route path="/albums" element={<div>
                  Render your albums component
                </div>} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
          <FriendsListComponent friends={friends} />
          <InformationComponent city={city} numFriends={numFriends} />
        </div>
        <div className="right-column">
          <TextAreaComponent onBioSubmit={handleBioSubmit} />
          <WallComponent />
        </div>
      </div>
    </Router>;
};

export default App;
