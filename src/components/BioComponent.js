import React, { useState } from "react";

const BioComponent = ({ bio, headline, onBioSubmit }) => {
  const [bioText, setBioText] = useState(bio || "");
  const [headlineText, setHeadlineText] = useState(headline || "");

  const handleBioChange = event => {
    setBioText(event.target.value);
  };

  const handleHeadlineChange = event => {
    setHeadlineText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Call the onBioSubmit function with the updated bio and headline
    onBioSubmit(bioText, headlineText);
  };

  return (
    <div className="components">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>${ headline}</label>
          <input
            type="text"
            value={headlineText}
            onChange={handleHeadlineChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bioText} onChange={handleBioChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BioComponent;
