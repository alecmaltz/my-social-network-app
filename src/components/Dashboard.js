import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import PictureComponent from "./PictureComponent";
import FriendsListComponent from "./FriendsListComponent";
import InformationComponent from "./InformationComponent";
import BioComponent from "./BioComponent";
import WallComponent from "./WallComponent";

const Dashboard = ({ user }) => {
  const handleBioSubmit = bio => {
    // Handle bio submission, e.g., send to backend API
  };

  return (
    <div className="dashboard">
      <div className="left-column">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <Routes>
          <Route
            path="/api/users/:user.id"
            element={
              <PictureComponent imageUrl={`/api/users/${user.id}/picture`} />
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
        </Routes>
        <InformationComponent
          city={user.city}
          numFriends={user.friendsList.length}
        />
        <FriendsListComponent friends={user.friendsList} />
      </div>
      <div className="right-column">
        <h2>
          {user.headline}
        </h2>
        <BioComponent bio={user.bio} onBioSubmit={handleBioSubmit} />
        <WallComponent />
      </div>
    </div>
  );
};

export default Dashboard;
