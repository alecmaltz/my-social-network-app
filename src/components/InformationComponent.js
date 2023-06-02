import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const InformationComponent = () => {
  const [city, setCity] = useState("");
  const [numFriends, setNumFriends] = useState(0);
  const {id} = useParams();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users/:{id}"); // Replace ":id" with the actual user ID
      const userData = response.data;

      setCity(userData.city);
      setNumFriends(userData.friends.length);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="components">
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
