// ProfilePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";
import Avatar from "react-avatar";

function ProfilePage() {
  // get username from url
  // get avatar url from url
  const { username } = useParams();

  const [avatarUrl, setAvatarUrl] = useState(
    "https://youravatarurl.com/avatar.jpg"
  );
  const [favorites, setFavorites] = useState([
    "Favorite 1",
    "Favorite 2",
    "Favorite 3",
  ]);

  const fetchProfileData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/users/${username}`
    );
    // setAvatarUrl(response.data.avatarUrl);
    setFavorites(response.data.favoriteUsers);
  };

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  return (
    <div className="profile-page">
      <div className="profile-info">
        <Avatar
          color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
          name={username}
          value="86%"
          size="60"
          round="20px"
        />
        <h1>{username}</h1>
      </div>
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
