// ProfilePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";
import Avatar from "react-avatar";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  Button,
} from "@mui/material";

function ProfilePage() {
  const { username } = useParams();
  const [favorites, setFavorites] = useState([]);

  const fetchProfileData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/users`, {
        withCredentials: true,
      }
    );
    console.log(response.data.favoriteUsers);
    const {favoriteUsers} = response.data;
    // remove the username from the favorites list
    const filteredFavorites = favoriteUsers.filter((user) => user !== username);
    setFavorites(filteredFavorites);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
        <Grid container className="user-container" sx={{ marginTop: "2rem" }}>
          {favorites.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={12} key={index}>
              <Paper elevation={6} className="app-card">
                <Card>
                  <CardContent className="card-content">
                    <div className="name-avatar-sec">
                      <Avatar
                        color={Avatar.getRandomColor("sitebase", [
                          "red",
                          "green",
                          "blue",
                        ])}
                        name={user}
                        value="86%"
                        size="60"
                        round="20px"
                      />
                      <Typography variant="h5" sx={{ marginLeft: "2rem" }}>
                        {user}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
