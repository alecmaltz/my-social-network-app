import React from "react";

const InformationComponent = ({ city, numFriends }) => {
  return (
    <div>
      <h2>Information</h2>
      <p>
        City: {city}
      </p>
      <p>
        Number of Friends: {numFriends}
      </p>
    </div>
  );
};

export default InformationComponent;
