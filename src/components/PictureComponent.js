import React from "react";
import { Link } from "react-router-dom";

const PictureComponent = ({ imageUrl }) => {
    return (
    <div>
        <Link to="/albums">
        <img src={imageUrl} alt="Album" />
        </Link>
    </div>
    );
};

export default PictureComponent;
