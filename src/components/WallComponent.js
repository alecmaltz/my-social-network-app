import React, { useState } from "react";

const WallComponent = () => {
  const [thought, setThought] = useState("");
  const [replies, setReplies] = useState([]);

  const handleThoughtChange = event => {
    setThought(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Handle thought submission, e.g., send to backend API
    // Add the thought to the replies state or update the server response
    setReplies(prevReplies => [...prevReplies, thought]);
    setThought("");
  };

  return <div className="components">
      <h2>Wall</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={thought} onChange={handleThoughtChange} />
        <button type="submit">Post</button>
      </form>
      <ul>
        {replies.map((reply, index) => <li key={index}>
            {reply}
          </li>)}
      </ul>
    </div>;
};

export default WallComponent;
