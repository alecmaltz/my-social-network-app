import React from "react";

const FriendsListComponent = ({ friends }) => {
    return (
    <div className="components">
        <h2>Friends List</h2>
        {friends.map(friend =>
        <div key={friend.id}>
            <img src={friend.imageUrl} alt="Friend" />
            <p>
            {friend.name}
            </p>
        </div>
        )}
    </div>
    );
};

export default FriendsListComponent;
