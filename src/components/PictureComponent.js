import React from "react";
import { Link } from "react-router-dom";

const PictureComponent = ({ imageUrl }) => {
    return <div className="components">
        
        
        <Link to="/albums">
          <img src={imageUrl} alt="Album" />
        </Link>
      </div>;
};

export default PictureComponent;
