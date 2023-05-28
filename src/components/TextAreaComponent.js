import React, { useState } from "react";

const TextAreaComponent = ({ onBioSubmit }) => {
    const [bio, setBio] = useState("");

    const handleBioChange = event => {
    setBio(event.target.value);
    };

    const handleSubmit = event => {
    event.preventDefault();
    onBioSubmit(bio);
    };

    return (
    <div>
        <h2>Bio</h2>
        <form onSubmit={handleSubmit}>
        <textarea value={bio} onChange={handleBioChange} />
        <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default TextAreaComponent;
